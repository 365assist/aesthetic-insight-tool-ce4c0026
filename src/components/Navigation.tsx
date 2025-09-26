import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AP</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-primary">Aesthetic</h1>
            <p className="text-xs text-muted-foreground -mt-1">ProTools</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About Us</a>
          <a href="#products" className="text-foreground hover:text-primary transition-colors">Our Products</a>
          <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
          <a href="/members" className="text-foreground hover:text-primary transition-colors">Members</a>
          <Button variant="outline" size="sm">Contact Us</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;