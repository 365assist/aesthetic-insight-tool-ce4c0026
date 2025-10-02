import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-foreground/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary-foreground/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary-foreground/5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Contact our team of experts to discover how our cutting-edge equipment can elevate your aesthetic practice.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <Card className="p-8 bg-background/10 backdrop-blur-md border-background/20 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-6 font-heading">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                  />
                </div>
                <Input 
                  type="email"
                  placeholder="Email Address" 
                  className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                />
                <Input 
                  placeholder="Practice Name" 
                  className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                />
                <Textarea 
                  placeholder="Tell us about your needs..." 
                  rows={4}
                  className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                />
                <Button variant="hero" className="w-full py-6 text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
          
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
                    <p className="text-primary-foreground/80">123 Medical Plaza Drive<br />Suite 456, Beverly Hills, CA 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-primary-foreground/80">+1 (555) 123-4567<br />Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-primary-foreground/80">info@aestheticprotools.com<br />support@aestheticprotools.com</p>
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
    </section>
  );
};

export default ContactSection;