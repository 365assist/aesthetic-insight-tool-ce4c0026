import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { secureLog } from "@/lib/logger";

const contactFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  practiceName: z.string()
    .trim()
    .min(1, "Practice name is required")
    .max(100, "Practice name must be less than 100 characters"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      practiceName: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      secureLog.info("Submitting contact form to database:", data);
      
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          practice_name: data.practiceName,
          message: data.message,
        });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      secureLog.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again or call us directly.");
    }
  };
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground relative overflow-hidden" aria-labelledby="contact-heading">
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
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <Card className="p-8 bg-background/10 backdrop-blur-md border-background/20 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-6 font-heading">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="First Name" 
                              className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive-foreground" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Last Name" 
                              className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive-foreground" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Email Address" 
                            className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="practiceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Practice Name" 
                            className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your needs..." 
                            rows={4}
                            className="bg-background/10 border-background/30 text-primary-foreground placeholder:text-primary-foreground/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full py-6 text-lg font-semibold"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
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
                    <p className="text-primary-foreground/80">customerservice@aestheticprotools.com</p>
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