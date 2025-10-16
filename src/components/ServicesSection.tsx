import { Card } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: "🏥",
      title: "Equipment Investment",
      description: "Our selection of advanced equipment ensures you stay ahead in the industry, offering clients the latest in aesthetic treatments."
    },
    {
      icon: "🔄",
      title: "Equipment Rental",
      description: "Expand your offerings with our rental options, giving you access to top-tier technology without the commitment of a purchase."
    },
    {
      icon: "⚡",
      title: "Laser Hair Reduction",
      description: "VADER laser technology delivers precise treatment for all skin types and hair colors, with collagen synthesis benefits."
    },
    {
      icon: "✨",
      title: "Body Sculpting",
      description: "Artisan Sculptor devices designed for modern professionals, offering comprehensive body sculpting treatment options."
    },
    {
      icon: "🎨",
      title: "Tattoo Removal",
      description: "Tri-Pulse technology combines power and precision to safely eliminate unwanted tattoos without scarring."
    },
    {
      icon: "🏆",
      title: "Expert Support",
      description: "Comprehensive resources, training, and personalized support to maximize your success and satisfaction."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white font-heading">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Solutions for Aesthetic Excellence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 text-center bg-gradient-to-br from-card to-secondary/10 border-0 shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-white">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;