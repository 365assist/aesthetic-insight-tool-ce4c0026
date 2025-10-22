import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopifyBuy } from "@/hooks/useShopifyBuy";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import vaderLaser from "@/assets/vader-laser.jpg";
import artisanSculptor from "@/assets/artisan-sculptor.jpg";

const ProductsSection = () => {
  const { addToCart, isInitialized } = useShopifyBuy();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  const handleAddToCart = async (productId: string) => {
    if (!isInitialized) {
      toast.error('Cart is initializing, please try again');
      return;
    }
    
    setAddingToCart(productId);
    try {
      await addToCart(productId);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  };
  
  // Fetch products from database
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      // Map database products to component format
      const mappedProducts = data.map(product => {
        let features: string[] = [];
        try {
          features = Array.isArray(product.features) 
            ? product.features 
            : JSON.parse(String(product.features || '[]'));
        } catch {
          features = [];
        }
        
        return {
          title: product.title,
          description: product.description || '',
          image: product.image_url || vaderLaser,
          features,
          slug: product.handle,
          price: product.price || '0',
          inventory: product.inventory_quantity || 0
        };
      });
      
      // Custom sort order with specific positioning
      return mappedProducts.sort((a, b) => {
        // Helper to identify product types (case-insensitive)
        const isGelProduct = (title: string) => 
          title.toLowerCase().includes('gel') || 
          title.toLowerCase().includes('cleanser') || 
          title.toLowerCase().includes('compound');
        
        const isDepositProduct = (title: string) =>
          title.toLowerCase().includes('deposit');
        
        const aIsGel = isGelProduct(a.title);
        const bIsGel = isGelProduct(b.title);
        const aIsDeposit = isDepositProduct(a.title);
        const bIsDeposit = isDepositProduct(b.title);
        
        // Deposit products always go last
        if (!aIsDeposit && bIsDeposit) return -1;
        if (aIsDeposit && !bIsDeposit) return 1;
        
        // Gels and compounds go after regular products but before deposits
        if (!aIsGel && bIsGel && !aIsDeposit && !bIsDeposit) return -1;
        if (aIsGel && !bIsGel && !aIsDeposit && !bIsDeposit) return 1;
        
        // For regular products (not gel, not deposit): VADER first, Tri-Pulse second
        if (!aIsGel && !bIsGel && !aIsDeposit && !bIsDeposit) {
          if (a.title === 'VADER') return -1;
          if (b.title === 'VADER') return 1;
          
          if (a.title.includes('Tri-Pulse')) return -1;
          if (b.title.includes('Tri-Pulse')) return 1;
          
          return a.title.localeCompare(b.title);
        }
        
        // Within same category, sort alphabetically
        return a.title.localeCompare(b.title);
      });
    },
    // Fallback to static data if no products in database
    placeholderData: [
      {
        title: "VADER Laser Hair Reduction",
        description: "• Treats all skin types & hair colors\n• Induces collagen synthesis\n• Addresses vascular & pigment concerns",
        image: vaderLaser,
        features: ["All Skin Types", "Collagen Synthesis", "Multi-Purpose"],
        slug: "vader",
        price: "0",
        inventory: 0
      },
      {
        title: "Artisan Sculptor Devices",
        description: "• Advanced body sculpting\n• Professional-grade results\n• Versatile treatment options",
        image: artisanSculptor,
        features: ["Body Sculpting", "Professional Grade", "Versatile Treatments"],
        slug: "artisan-sculptor",
        price: "0",
        inventory: 0
      },
      {
        title: "Tri-Pulse Tattoo Removal",
        description: "• Eliminates all ink colors\n• No scarring guarantee\n• Precise, safe treatment",
        image: vaderLaser,
        features: ["All Ink Colors", "No Scarring", "High Precision"],
        slug: "tri-pulse-tattoo-removal",
        price: "0",
        inventory: 0
      }
    ]
  });

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-muted/50 to-background" aria-labelledby="products-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="products-heading" className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white font-heading">
            Our Premium Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of professional aesthetic devices, each designed to elevate your practice and deliver exceptional results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-8 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))
          ) : (
            products?.map((product, index) => (
            <Card 
              key={index} 
              className="overflow-hidden bg-card shadow-luxury hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.title} - Professional aesthetic medical equipment for spa and clinical treatments`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary dark:text-white font-heading mb-4">{product.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(product.features) ? product.features : []).map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="px-3 py-1 bg-secondary/50 text-primary dark:text-white text-sm rounded-full border border-primary/20 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 shadow-elegant hover:shadow-luxury transition-all"
                    onClick={() => window.open(`https://aestheticprotools.store/products/${product.slug}`, '_blank')}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddToCart(product.slug)}
                    disabled={addingToCart === product.slug || !isInitialized}
                    title="Add to cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg border-2 border-primary text-primary dark:text-white hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            onClick={() => window.open('https://aestheticprotools.store/collections/shop-all-products', '_blank')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;