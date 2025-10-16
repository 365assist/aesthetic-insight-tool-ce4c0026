import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white leading-tight font-heading">
              Pro Aesthetician Devices Made By Aestheticians
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Elevate your practice with our premium aesthetic devices, expertly crafted by professional aestheticians for discerning professionals like you. Our products are engineered for exceptional reliability, durability, and effectiveness, ensuring you deliver outstanding results every time.
            </p>
            <Button className="shadow-elegant hover:shadow-luxury transition-all">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Professional Grade</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Hospital-quality equipment for professional use</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Advanced Technology</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Cutting-edge innovations for superior results</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">🔬</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Research-Backed</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Clinically tested and scientifically proven</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">🏆</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Award Winning</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Industry-recognized excellence</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;