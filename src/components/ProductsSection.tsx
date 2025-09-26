import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import equipment1 from "@/assets/equipment-1.jpg";
import equipment2 from "@/assets/equipment-2.jpg";

const ProductsSection = () => {
  const products = [
    {
      title: "Laser Therapy Systems",
      description: "Advanced laser technology for precision treatments and optimal patient outcomes.",
      image: equipment1,
      features: ["FDA Approved", "Multiple Wavelengths", "Safety Protocols"]
    },
    {
      title: "Skin Analysis Devices",
      description: "Comprehensive skin analysis tools for personalized treatment planning.",
      image: equipment2,
      features: ["AI-Powered", "Real-time Analysis", "Treatment Recommendations"]
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Our Premium Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of professional aesthetic devices, each designed to elevate your practice and deliver exceptional results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden bg-white shadow-luxury hover:shadow-xl transition-all duration-500 border-0 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">{product.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-elegant">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;