import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <article id="contact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-foreground/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary-foreground/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary-foreground/5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Contact our team of experts to discover how our cutting-edge equipment can elevate your aesthetic practice.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-8 font-heading">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Our Showroom</h4>
                    <p className="text-primary-foreground/80">8969 East Talking Stick Way<br />Suite C-5, Scottsdale, AZ 85250</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-primary-foreground/80">480-291-5880<br />Mon-Thu: 9AM-5PM, Fri: 9AM-3PM MST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <a href="mailto:customerservice@aestheticprotools.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      customerservice@aestheticprotools.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-6 bg-background/10 backdrop-blur-md border-background/20">
              <h4 className="font-semibold mb-3 text-primary-foreground">Schedule a Demo</h4>
              <p className="text-primary-foreground/80 mb-4 text-sm">
                See our equipment in action with a personalized demonstration at your practice.
              </p>
              <Button variant="hero-outline" className="w-full">
                Book Demo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactSection;