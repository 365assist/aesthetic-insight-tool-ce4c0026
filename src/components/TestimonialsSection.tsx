import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Jennifer Martinez",
      title: "Medical Director, Elite MedSpa",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "The VADER Laser System has transformed our practice. The precision and results are unmatched. Our clients are thrilled, and ROI exceeded expectations within 6 months."
    },
    {
      name: "Marcus Thompson",
      title: "Owner, Aesthetic Wellness Center",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding equipment and even better support. The training was comprehensive, and the technical team is always responsive. These are truly professional-grade devices."
    },
    {
      name: "Dr. Sarah Kim",
      title: "Aesthetic Physician",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "As an aesthetician with 15 years of experience, I can confidently say Aesthetic ProTools delivers the highest quality equipment I've worked with. Game-changing for my practice."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white font-heading">
            Trusted by Leading Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of aesthetic professionals who have elevated their practice with our equipment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="p-8 bg-card border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary dark:fill-[#f97316] dark:text-[#f97316]" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.title}`}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary dark:text-white font-heading">500+</div>
              <div className="text-sm text-muted-foreground">Practices Equipped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary dark:text-white font-heading">98%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary dark:text-white font-heading">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary dark:text-white font-heading">FDA</div>
              <div className="text-sm text-muted-foreground">Approved Equipment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
