import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import aptLogo from "@/assets/apt-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={aptLogo} alt="APT Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="font-bold text-lg text-primary dark:text-white font-heading">Aesthetic</h1>
              <p className="text-xs text-muted-foreground dark:text-white/90 -mt-1">ProTools</p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium">
              About Us
            </button>
            <button onClick={() => scrollToSection('products')} className="text-foreground hover:text-primary transition-colors font-medium">
              Our Products
            </button>
            <a href="/members" className="text-foreground hover:text-primary transition-colors font-medium">
              Members
            </a>
            <a href="/technical-training" className="text-foreground hover:text-primary transition-colors font-medium">
              Training
            </a>
            <Button variant="default" size="sm" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
              About Us
            </button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
              Our Products
            </button>
            <a href="/members" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Members
            </a>
            <a href="/technical-training" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Training
            </a>
            <Button variant="default" size="sm" className="w-full" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <div className="flex justify-center py-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;