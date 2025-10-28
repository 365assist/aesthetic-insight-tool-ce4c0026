import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <article id="about" className="py-20 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="about-heading" className="text-4xl md:text-6xl font-bold mb-8 text-primary dark:text-white leading-tight font-heading">
              OUR MISSION
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              By professionals, for professionals – our products empower you to elevate your practice and achieve unparalleled success in the aesthetic field.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Field Tested Excellence</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our aesthetic products are crafted by professional aestheticians for professional aestheticians. With firsthand experience and expertise, our team understands the unique needs and challenges of the industry. At Aesthetic ProTools, we believe you can be the best if you have the best tools. We have been involved in the Aesthetic and Laser Industry since 1984, constantly evolving alongside the professionals we serve.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Quality and Innovation</h3>
                <div className="space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Excellence in Craftsmanship:</span> We are committed to offering the highest quality tools and products, ensuring durability, precision, and exceptional performance.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Cutting-Edge Technology:</span> We stay ahead of industry trends by incorporating the latest advancements and innovations in aesthetics and beauty tools. We practice Aesthetics daily and constantly rebuild our techniques and devices to stay current with recent aesthetic breakthroughs.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Customer-Centric Approach</h3>
                <div className="space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Personalized Service:</span> We believe in tailoring our services and recommendations to meet the unique needs of each customer.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Education and Support:</span> We empower our customers with comprehensive resources, training, and support to maximize their success and satisfaction.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Integrity and Transparency</h3>
                <div className="space-y-3">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Honest Communication:</span> We value transparency in all our interactions, providing clear and accurate information about our products and services.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-primary dark:text-white">Ethical Practices:</span> We uphold the highest ethical standards in our business operations, ensuring fair practices and responsible sourcing.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Our Founder</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Gary Begley is the founder of Aesthetic Pro Tools. He began his journey into the field of beauty as a mechanical and photonic engineer. Mr. Begley purchased his first cosmetic laser in 1984 and noticed flaws in equipment designs, making a commitment to make them better. When he founded IMAj Institute and became the Chairman of the Barbering and Cosmetology Board in Arizona, he ensured his students had state-of-the-art equipment. That was the beginning of designing and developing all the devices you see now sold by Aesthetic Pro Tools to the Aestheticians he trusts.
                </p>
                <Button asChild className="shadow-elegant hover:shadow-luxury transition-all">
                  <a href="https://aesthetic-pro-tools.myshopify.com/" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Professional Grade</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Hospital-quality equipment for professional use</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Advanced Technology</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Cutting-edge innovations for superior results</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">🔬</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Research-Backed</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Clinically tested and scientifically proven</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 shadow-subtle hover:shadow-elegant transition-all duration-300 border-0 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-xl">🏆</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary dark:text-white">Award Winning</h3>
              <p className="text-sm text-muted-foreground dark:text-white/80">Industry-recognized excellence</p>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AboutSection;