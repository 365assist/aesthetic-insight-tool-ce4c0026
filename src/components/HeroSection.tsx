import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional aesthetic spa environment" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Cutting-Edge
          <br />
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Aesthetic Equipment
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Revolutionize Your Aesthetic Practice with Innovative Solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-luxury transition-all duration-300 hover:transform hover:scale-105">
            Our Products
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold transition-all duration-300">
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