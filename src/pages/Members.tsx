import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TechnicalTrainingLibrary from "@/components/training/TechnicalTrainingLibrary";

const Members = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary dark:text-white">
            Exclusive Access
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:bg-none dark:text-white">
            Members Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed dark:text-white">
            Access exclusive resources, training materials, and priority support designed for our valued partners.
          </p>
        </div>
      </section>


      {/* Member Resources */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Member Resources</h2>
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
                <MessageSquare className="w-8 h-8 text-primary dark:text-[#f97316]" />
              </div>
              <h3 className="font-semibold mb-2">AI Support Portal</h3>
              <p className="text-sm text-muted-foreground">Get instant technical support with our AI troubleshooter</p>
              <Button variant="link" className="mt-2 p-0 h-auto font-semibold dark:text-[#f97316]">
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