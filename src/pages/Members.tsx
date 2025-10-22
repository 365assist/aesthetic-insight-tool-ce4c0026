import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import TechnicalTrainingLibrary from "@/components/training/TechnicalTrainingLibrary";

const Members = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary dark:text-white">
            Exclusive Access
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:bg-none dark:text-white">
            Members Portal
          </h1>
          <p className="text-2xl font-semibold text-primary dark:text-accent mb-6">
            Coming Soon
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed dark:text-white">
            Access exclusive resources, training materials, and priority support designed for our valued partners.
          </p>
        </div>
      </section>


      {/* Member Resources */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Member Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">Training Center</h3>
              <p className="text-sm text-muted-foreground">Access comprehensive equipment training modules</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">Product Updates</h3>
              <p className="text-sm text-muted-foreground">Stay informed about new features and releases</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Connect with other members and share insights</p>
            </Card>
          </div>
        </div>
      </section>

      <TechnicalTrainingLibrary />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to Join?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto dark:text-white">
            Become a member today and unlock exclusive benefits, training resources, and priority support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all">
              Apply for Membership
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Members;