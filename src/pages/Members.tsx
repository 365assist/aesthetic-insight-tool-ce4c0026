import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Star, Zap, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            Exclusive Access
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Members Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access exclusive resources, training materials, and priority support designed for our valued partners.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Membership Tiers</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver Tier */}
            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Silver</CardTitle>
                <CardDescription>Essential Benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Basic training materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Quarterly newsletters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Equipment discounts (5%)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Gold Tier */}
            <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Gold</CardTitle>
                <CardDescription>Enhanced Experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Advanced training materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Priority phone support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Monthly webinars</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Equipment discounts (15%)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Free annual inspection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Platinum Tier */}
            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Platinum</CardTitle>
                <CardDescription>Premium Experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>All training materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Weekly consultations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Equipment discounts (25%)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Free maintenance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Exclusive product previews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Resources */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Member Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">Training Center</h3>
              <p className="text-sm text-muted-foreground">Access comprehensive equipment training modules</p>
            </Card>
            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate('/support-portal')}
            >
              <div className="flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Support Portal</h3>
              <p className="text-sm text-muted-foreground">Get instant technical support with our AI troubleshooter</p>
              <Button variant="link" className="mt-2 p-0 h-auto font-semibold">
                Launch Chat →
              </Button>
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

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
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