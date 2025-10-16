import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import aptLogo from "@/assets/apt-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { ShopifyCart } from "@/components/ShopifyCart";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
            <a href="/shop" className="text-foreground hover:text-primary transition-colors font-medium">
              Shop
            </a>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </button>
            <a href="/members" className="text-foreground hover:text-primary transition-colors font-medium">
              Members
            </a>
            <Button variant="default" size="sm" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <ShopifyCart />
            <ThemeToggle />
            {isLoggedIn ? (
              <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                Portal
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                Employee Login
              </Button>
            )}
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
            <a href="/shop" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Shop
            </a>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2">
              Services
            </button>
            <a href="/members" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Members
            </a>
            <Button variant="default" size="sm" className="w-full" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <div className="flex justify-center gap-2 py-2">
              <ShopifyCart />
              <ThemeToggle />
            </div>
            {isLoggedIn ? (
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/admin')}>
                Portal
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                Employee Login
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;