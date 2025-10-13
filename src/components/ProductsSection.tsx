import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import vaderLaser from "@/assets/vader-laser.jpg";
import artisanSculptor from "@/assets/artisan-sculptor.jpg";

const ProductsSection = () => {
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
        // VADER always first
        if (a.title === 'VADER') return -1;
        if (b.title === 'VADER') return 1;
        
        // Tri-Pulse second
        if (a.title.includes('Tri-Pulse')) return -1;
        if (b.title.includes('Tri-Pulse')) return 1;
        
        // Group gels, cleansers, and compounds together near the end
        const isAGelProduct = (title: string) => 
          title.includes('Gel') || title.includes('Cleanser') || title.includes('Compound');
        
        const aIsGel = isAGelProduct(a.title);
        const bIsGel = isAGelProduct(b.title);
        
        // Non-gel products come before gel products
        if (!aIsGel && bIsGel) return -1;
        if (aIsGel && !bIsGel) return 1;
        
        // Within gel products, sort alphabetically
        if (aIsGel && bIsGel) {
          return a.title.localeCompare(b.title);
        }
        
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
    <section id="products" className="py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white font-heading">
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
                  alt={`${product.title} - Professional aesthetic medical equipment`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary font-heading mb-4">{product.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(product.features) ? product.features : []).map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="px-3 py-1 bg-secondary/50 text-primary text-sm rounded-full border border-primary/20 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Button 
                  className="w-full shadow-elegant hover:shadow-luxury transition-all"
                  onClick={() => window.open(`https://aestheticprotools.com/shop/`, '_blank')}
                >
                  Learn More
                </Button>
              </div>
            </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            onClick={() => window.open('https://aestheticprotools.com/shop/', '_blank')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;