import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import equipment1 from "@/assets/equipment-1.jpg";
import equipment2 from "@/assets/equipment-2.jpg";

const ProductsSection = () => {
  const products = [
    {
      title: "VADER Laser System",
      description: "Professional-grade laser technology for advanced aesthetic treatments and optimal results.",
      image: equipment1,
      features: ["FDA Approved", "Multiple Wavelengths", "Professional Grade"],
      price: "$85,000.00",
      slug: "vader"
    },
    {
      title: "Cool Breeze System",
      description: "Advanced cooling technology for enhanced patient comfort during treatments.",
      image: equipment2,
      features: ["Temperature Control", "Patient Comfort", "Professional Use"],
      price: "$9,000.00",
      slug: "cool-breeze"
    },
    {
      title: "Tri-Pulse Laser",
      description: "State-of-the-art tattoo removal system with precision targeting technology.",
      image: equipment1,
      features: ["Tattoo Reduction", "Multi-Pulse", "High Precision"],
      price: "$80,000.00",
      slug: "tri-pulse-laser-tattoo-reduction"
    },
    {
      title: "Citadel Electric Table",
      description: "Premium treatment table designed for professional aesthetics practices.",
      image: equipment2,
      features: ["Electric Adjustment", "Professional Grade", "Ergonomic Design"],
      price: "$5,500.00",
      slug: "citadel-electric-table"
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
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-primary">{product.title}</h3>
                  <span className="text-xl font-bold text-accent">{product.price}</span>
                </div>
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
                
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-elegant"
                  onClick={() => window.open(`https://aestheticprotools.store/products/${product.slug}`, '_blank')}
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
            className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => window.open('https://aestheticprotools.store', '_blank')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;