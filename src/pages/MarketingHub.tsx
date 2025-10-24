import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Megaphone, Globe } from "lucide-react";

const MarketingHub = () => {
  return (
    <>
      <Helmet>
        <title>Marketing & Content Hub | Aesthetic ProTools</title>
        <meta name="description" content="Manage client communications, content creation, and marketing campaigns. Create blog posts, email content, and social media updates." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-muted/40">
        <Navigation />
      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-4xl font-bold mb-2">Marketing & Content Hub</h1>
        <p className="text-muted-foreground mb-8">Manage client communications, content creation, and platform integrations.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Content Creation Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Create New Content</CardTitle>
              <CardDescription>Draft blog posts, social media updates, or email snippets to sync with WordPress and social platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Start drafting your post here (full Rich Text Editor integration required for final version)..." 
                  rows={8}
                />
                <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1">Save Draft</Button>
                  <Button className="flex-1">Publish to WordPress/Social</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration & Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-accent" /> Platform Management</CardTitle>
              <CardDescription>Sync contacts and manage outgoing client campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                <Mail className="mr-2 h-4 w-4" />
                Sync Shopify/WP Contacts (API Required)
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Globe className="mr-2 h-4 w-4" />
                Schedule Social Posts (API Required)
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" onClick={() => window.open('/admin', '_self')}>
                Return to Admin Portal
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
      </div>
    </>
  );
};

export default MarketingHub;
