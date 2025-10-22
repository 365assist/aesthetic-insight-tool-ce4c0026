import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProductUrl, SHOPIFY_STORE_DOMAIN } from "@/lib/shopify-config";
import vaderLaser from "@/assets/vader-laser.jpg";
import artisanSculptor from "@/assets/artisan-sculptor.jpg";

const ProductsSection = () => {
  const products = [
    {
      title: "VADER Laser Hair Reduction",
      description: "• Treats all skin types & hair colors\n• Induces collagen synthesis\n• Addresses vascular & pigment concerns",
      image: vaderLaser,
      features: ["All Skin Types", "Collagen Synthesis", "Multi-Purpose"],
      slug: "vader",
    },
    {
      title: "Artisan Sculptor Devices",
      description: "• Advanced body sculpting\n• Professional-grade results\n• Versatile treatment options",
      image: artisanSculptor,
      features: ["Body Sculpting", "Professional Grade", "Versatile Treatments"],
      slug: "artisan-sculptor",
    },
    {
      title: "Tri-Pulse Tattoo Removal",
      description: "• Eliminates all ink colors\n• No scarring guarantee\n• Precise, safe treatment",
      image: vaderLaser,
      features: ["All Ink Colors", "No Scarring", "High Precision"],
      slug: "tri-pulse-tattoo-removal",
    }
  ];

  return (
    <article id="products" className="py-20 bg-gradient-to-br from-muted/50 to-background" aria-labelledby="products-heading">
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
          {products.map((product, index) => (
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
                
                <Button 
                  className="w-full shadow-elegant hover:shadow-luxury transition-all"
                  onClick={() => window.open(getProductUrl(product.slug), '_blank')}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg border-2 border-primary text-primary dark:text-white hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            onClick={() => window.open(`https://${SHOPIFY_STORE_DOMAIN}/collections/shop-all-products`, '_blank')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductsSection;