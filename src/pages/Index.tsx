import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProductsSection from "@/components/ProductsSection";
import { Mountain, Lightbulb, TrendingUp, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="container mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-primary/10 text-primary-foreground">
            Aesthetic Innovation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Pioneering Precision in Aesthetic Lasers
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
            Delivering cutting-edge laser technology for unparalleled results and patient satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg">
              Explore Our Lasers
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/10 transition-all duration-300">
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* About/Features Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Aesthetic ProTools?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Innovation</CardTitle>
              <CardDescription>Leading the industry with next-generation laser technology.</CardDescription>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <Mountain className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Performance</CardTitle>
              <CardDescription>Unrivaled precision and efficacy for every treatment.</CardDescription>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Results</CardTitle>
              <CardDescription>Consistent, superior outcomes that delight patients.</CardDescription>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">Support</CardTitle>
              <CardDescription>Dedicated partnership and expert guidance every step of the way.</CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Elevate Your Practice Today</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Discover how Aesthetic ProTools can transform your aesthetic offerings and client satisfaction.
          </p>
          <Button size="lg" className="px-10 py-4 text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-xl">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;