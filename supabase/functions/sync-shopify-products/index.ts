import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: { edges: Array<{ node: { url: string } }> };
  variants: {
    edges: Array<{
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice: {
          amount: string;
          currencyCode: string;
        } | null;
        quantityAvailable: number;
      }
    }>
  };
  productType: string;
  vendor: string;
  tags: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create authenticated Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const { data: { user }, error: userError } = await authClient.auth.getUser();
    if (userError || !user) {
      console.error('Authentication error:', userError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user has admin role
    const { data: roles, error: roleError } = await authClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (roleError || !roles) {
      console.error('Authorization error: User does not have admin role');
      return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Shopify sync triggered by admin user: ${user.id}`);
    const shopifyDomain = Deno.env.get('SHOPIFY_STORE_DOMAIN');
    const storefrontToken = Deno.env.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
    
    if (!shopifyDomain || !storefrontToken) {
      throw new Error('Missing Shopify credentials');
    }

    console.log('Fetching products from Shopify...');

    // GraphQL query to fetch products from Shopify
    const query = `
      query getProducts {
        products(first: 50) {
          edges {
            node {
              id
              title
              description
              handle
              productType
              vendor
              tags
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    quantityAvailable
                  }
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await fetch(
      `https://${shopifyDomain}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify API error: ${shopifyResponse.statusText}`);
    }

    const shopifyData = await shopifyResponse.json();
    console.log('Received data from Shopify:', shopifyData);

    // Initialize Supabase client with service role for database operations
    const supabaseServiceUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseServiceUrl, supabaseKey);

    // Transform and upsert products
    const products = shopifyData.data.products.edges.map((edge: any) => {
      const node: ShopifyProduct = edge.node;
      const variant = node.variants.edges[0]?.node;
      const image = node.images.edges[0]?.node;

      // Map tags to features for display
      const features = node.tags.slice(0, 3).map(tag => tag);

      return {
        id: node.id.split('/').pop(), // Extract ID from Shopify GID
        title: node.title,
        description: node.description,
        handle: node.handle,
        image_url: image?.url || null,
        price: variant?.price?.amount || '0',
        compare_at_price: variant?.compareAtPrice?.amount || null,
        inventory_quantity: variant?.quantityAvailable || 0,
        features: JSON.stringify(features),
        product_type: node.productType,
        vendor: node.vendor,
      };
    });

    console.log('Upserting products to database:', products.length);

    // Upsert products to database
    const { data, error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'id' });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Successfully synced products');

    return new Response(
      JSON.stringify({ 
        success: true, 
        productsCount: products.length,
        products: data 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in sync-shopify-products:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
