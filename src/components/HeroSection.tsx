import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional aesthetic spa environment showcasing cutting-edge medical equipment" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground animate-fade-in-up">
        <div className="inline-block px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-background/20 text-sm font-medium mb-6">
          Premium Medical-Grade Equipment
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-heading">
          Cutting-Edge
          <br />
          <span className="bg-gradient-to-r from-background to-background/80 bg-clip-text text-transparent">
            Aesthetic Equipment
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
          Revolutionize Your Aesthetic Practice with Innovative Solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero"
            size="lg" 
            onClick={() => scrollToSection('products')}
            className="px-8 py-6 text-lg font-semibold"
          >
            Our Products
          </Button>
          <Button 
            variant="hero-outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="px-8 py-6 text-lg font-semibold"
          >
            Get In Touch
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/10 to-transparent"></div>
    </section>
  );
};

export default HeroSection;