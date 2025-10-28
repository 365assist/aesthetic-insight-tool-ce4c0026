import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Code, Palette, FileEdit, Database, Settings, Eye } from "lucide-react";
import { z } from "zod";

const contentSchema = z.object({
  hero_title: z.string().max(200, "Title too long"),
  hero_subtitle: z.string().max(300, "Subtitle too long"),
  about_text: z.string().max(5000, "Text too long"),
});

const cssSchema = z.string().max(50000, "CSS too large");

export default function DeveloperTools() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customCSS, setCustomCSS] = useState("");
  const [pageContent, setPageContent] = useState({
    hero_title: "",
    hero_subtitle: "",
    about_text: "",
  });

  useEffect(() => {
    checkAuthorization();
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    const savedCSS = localStorage.getItem("custom-css");
    const savedContent = localStorage.getItem("page-content");
    
    if (savedCSS) setCustomCSS(savedCSS);
    if (savedContent) {
      try {
        setPageContent(JSON.parse(savedContent));
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  };

  const checkAuthorization = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("user_id", session.user.id)
        .single();

      // Check if user is admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const isAdmin = roles?.some(r => r.role === "admin");

      if (isAdmin) {
        setIsAuthorized(true);
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access developer tools.",
          variant: "destructive",
        });
        navigate("/admin");
      }
    } catch (error) {
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCSS = () => {
    try {
      cssSchema.parse(customCSS);
      localStorage.setItem("custom-css", customCSS);
      toast({
        title: "Custom CSS Saved",
        description: "Your custom styles have been saved.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveContent = () => {
    try {
      contentSchema.parse(pageContent);
      localStorage.setItem("page-content", JSON.stringify(pageContent));
      toast({
        title: "Content Saved",
        description: "Page content has been saved.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const clearDatabase = async () => {
    if (!confirm("Are you sure you want to clear test data? This cannot be undone.")) {
      return;
    }

    toast({
      title: "Database Tools",
      description: "Use the backend dashboard for database operations.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Developer Tools | Aesthetic ProTools</title>
        <meta name="description" content="Internal developer tools and website management utilities" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 mt-20">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Developer Tools</h1>
            <p className="text-muted-foreground">Website development and management utilities</p>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileEdit className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="styling" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Styling
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Page Content Editor</CardTitle>
                  <CardDescription>Edit static content across the website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      value={pageContent.hero_title}
                      onChange={(e) => setPageContent({ ...pageContent, hero_title: e.target.value })}
                      placeholder="Main hero section title"
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                    <Input
                      id="hero_subtitle"
                      value={pageContent.hero_subtitle}
                      onChange={(e) => setPageContent({ ...pageContent, hero_subtitle: e.target.value })}
                      placeholder="Hero section subtitle"
                      maxLength={300}
                    />
                  </div>
                  <div>
                    <Label htmlFor="about_text">About Section</Label>
                    <Textarea
                      id="about_text"
                      value={pageContent.about_text}
                      onChange={(e) => setPageContent({ ...pageContent, about_text: e.target.value })}
                      placeholder="About section content"
                      rows={6}
                      maxLength={5000}
                    />
                  </div>
                  <Button onClick={handleSaveContent}>Save Content Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom CSS</CardTitle>
                  <CardDescription>Add custom styles to override default styling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="custom-css">CSS Code</Label>
                    <Textarea
                      id="custom-css"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="Enter custom CSS here..."
                      rows={15}
                      className="font-mono text-sm"
                      maxLength={50000}
                    />
                  </div>
                  <Button onClick={handleSaveCSS}>Apply Custom CSS</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Design Tokens</CardTitle>
                  <CardDescription>View current design system values</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Primary Color</p>
                      <div className="h-12 bg-primary rounded border" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Secondary Color</p>
                      <div className="h-12 bg-secondary rounded border" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Accent Color</p>
                      <div className="h-12 bg-accent rounded border" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Muted Color</p>
                      <div className="h-12 bg-muted rounded border" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Database Management</CardTitle>
                  <CardDescription>View and manage backend data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Quick Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border rounded">
                        <p className="text-2xl font-bold">--</p>
                        <p className="text-sm text-muted-foreground">Total Products</p>
                      </div>
                      <div className="p-4 border rounded">
                        <p className="text-2xl font-bold">--</p>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                      </div>
                      <div className="p-4 border rounded">
                        <p className="text-2xl font-bold">--</p>
                        <p className="text-sm text-muted-foreground">Active Shipments</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={clearDatabase} variant="destructive">
                    Clear Test Data
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    For full database access, use the backend dashboard
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Component Preview</CardTitle>
                  <CardDescription>Preview UI components and their variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Buttons</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Cards</h3>
                    <Card className="max-w-sm">
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description goes here</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">This is example card content.</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Environment Info</CardTitle>
                  <CardDescription>Current environment configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 font-mono text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Environment:</span>
                    <span>{import.meta.env.MODE}</span>
                    
                    <span className="text-muted-foreground">Project Connected:</span>
                    <span className="text-green-600">✓ Lovable Cloud</span>
                    
                    <span className="text-muted-foreground">Auth Enabled:</span>
                    <span className="text-green-600">✓ Yes</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common development tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/")}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Live Site
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/admin")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Back to Admin
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.location.reload()}>
                    <Code className="w-4 h-4 mr-2" />
                    Reload Application
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}