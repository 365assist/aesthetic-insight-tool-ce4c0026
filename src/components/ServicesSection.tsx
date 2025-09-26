import { Card } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: "🏥",
      title: "Equipment Investment",
      description: "Strategic guidance on selecting the right equipment for your practice's needs and budget."
    },
    {
      icon: "🔧",
      title: "Installation & Setup",
      description: "Professional installation and comprehensive setup services to get you operational quickly."
    },
    {
      icon: "📚",
      title: "Training & Certification",
      description: "Comprehensive training programs to ensure you maximize your equipment's potential."
    },
    {
      icon: "🛠️",
      title: "Maintenance & Support",
      description: "Ongoing maintenance and technical support to keep your equipment running at peak performance."
    },
    {
      icon: "📈",
      title: "Business Consulting",
      description: "Strategic consulting to help grow your aesthetic practice and maximize ROI."
    },
    {
      icon: "🔄",
      title: "Equipment Upgrades",
      description: "Stay current with the latest technology through our equipment upgrade programs."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
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
              <h3 className="text-xl font-semibold mb-4 text-primary">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;