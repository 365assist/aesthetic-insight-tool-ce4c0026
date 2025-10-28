import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <article id="about" className="py-20 bg-background" itemScope itemType="https://schema.org/AboutPage">
      <div className="container mx-auto px-6">
        {/* Mission Header */}
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary dark:text-white leading-tight font-heading">
            About Aesthetic ProTools
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto" itemProp="description">
            By professionals, for professionals – our products empower you to elevate your practice and achieve unparalleled success in the aesthetic field. Field-tested since 1984.
          </p>
        </header>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground font-bold text-xl">🔬</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Field Tested Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our aesthetic products are crafted by professional aestheticians for professional aestheticians. With firsthand experience and expertise, our team understands the unique needs and challenges of the industry. We have been involved in the Aesthetic and Laser Industry since 1984, constantly evolving alongside the professionals we serve.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground font-bold text-xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Quality and Innovation</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Excellence in Craftsmanship:</span> We are committed to offering the highest quality tools and products, ensuring durability, precision, and exceptional performance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Cutting-Edge Technology:</span> We stay ahead of industry trends by incorporating the latest advancements and innovations in aesthetics.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground font-bold text-xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Customer-Centric Approach</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Personalized Service:</span> We believe in tailoring our services and recommendations to meet the unique needs of each customer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Education and Support:</span> We empower our customers with comprehensive resources, training, and support to maximize their success.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground font-bold text-xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Integrity and Transparency</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Honest Communication:</span> We value transparency in all our interactions, providing clear and accurate information about our products and services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary dark:text-white">Ethical Practices:</span> We uphold the highest ethical standards in our business operations, ensuring fair practices and responsible sourcing.
              </p>
            </div>
          </Card>
        </div>

        {/* Founder Section */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 shadow-subtle">
          <h3 className="text-3xl font-bold mb-6 text-primary dark:text-white text-center">Our Founder</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto text-center">
            Gary Begley is the founder of Aesthetic Pro Tools. He began his journey into the field of beauty as a mechanical and photonic engineer. Mr. Begley purchased his first cosmetic laser in 1984 and noticed flaws in equipment designs, making a commitment to make them better. When he founded IMAj Institute and became the Chairman of the Barbering and Cosmetology Board in Arizona, he ensured his students had state-of-the-art equipment. That was the beginning of designing and developing all the devices you see now sold by Aesthetic Pro Tools to the Aestheticians he trusts.
          </p>
          <div className="text-center">
            <Button asChild className="shadow-elegant hover:shadow-luxury transition-all">
              <a href="https://aesthetic-pro-tools.myshopify.com/" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AboutSection;