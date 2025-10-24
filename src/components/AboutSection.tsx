import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <article id="about" className="py-20 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="about-heading" className="text-4xl md:text-6xl font-bold mb-12 text-primary dark:text-white leading-tight font-heading">
              OUR MISSION
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Why?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Aesthetic ProTools, we believe you can be the best if you have the best tools. We have been involved in the Aesthetic and Laser Industry since 1984. We have seen the way beauty professionals' skills have evolved, yet often, their equipment has not. It is our goal to support beauty professionals so they can have top-tier equipment that they can rely on to produce the results they want.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">How?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We practice Aesthetics daily. We have noticed that nearly all high technology Aesthetic devices were built for Doctors. As Aesthetic research develops and we find new ways to rejuvenate the skin, our equipment needs to match the recent findings. At Aesthetic ProTools, we are constantly rebuilding and changing things within our techniques and devices to stay current with recent Aesthetic breakthroughs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">Who?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Gary Begley is the founder of Aesthetic Pro Tools. He began his journey into the field of beauty by being a mechanical and photonic engineer. Mr. Begley purchased his first cosmetic laser in 1984. He noticed flaws in equipment designs and made a commitment to make them better. When he founded IMAj Institute and again when he became the Chairman of the Barbering and Cosmetology Board in Arizona, he felt the need to make sure his students had state-of-the-art equipment. That was the beginning of designing and developing all the devices you see now sold by Aesthetic Pro Tools to the Aestheticians he trusts.
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