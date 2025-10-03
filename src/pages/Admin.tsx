import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, Shield, User, Copy, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useShopifySync } from "@/hooks/useShopifySync";
import { useQueryClient } from "@tanstack/react-query";

type UserRole = "admin" | "employee";

interface Profile {
  full_name: string;
  email: string;
  user_id: string;
}

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: syncShopify, isPending } = useShopifySync();
  const queryClient = useQueryClient();

  const handleSync = () => {
    syncShopify(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, email, user_id")
        .eq("user_id", session.user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (rolesError) throw rolesError;
      setRoles(rolesData.map(r => r.role as UserRole));

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const copyUserId = () => {
    if (profile?.user_id) {
      navigator.clipboard.writeText(profile.user_id);
      toast({
        title: "Copied!",
        description: "User ID copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAdmin = roles.includes("admin");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Employee Portal</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <div className="flex items-center gap-2 mb-3">
                <p className="font-mono text-xs truncate flex-1">{profile?.user_id}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUserId}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium mb-3">{profile?.full_name}</p>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium mb-3">{profile?.email}</p>
              <p className="text-sm text-muted-foreground mb-1">Role</p>
              <div className="flex gap-2">
                {roles.map(role => (
                  <span key={role} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {role}
                  </span>
                ))}
                {roles.length === 0 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm">
                    No roles assigned
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Access
                </CardTitle>
                <CardDescription>Manage employee roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You have admin privileges. Use the backend dashboard to manage users and roles.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Backend Access",
                      description: "Open the backend dashboard from the Lovable interface to manage users.",
                    });
                  }}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Access important resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/members")}>
                Members Portal
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/marketing-hub")}>
                Marketing Hub
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/udi-program")}>
                UDI Program
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleSync}
                disabled={isPending}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
                {isPending ? 'Syncing...' : 'Sync Shopify'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {!isAdmin && roles.length === 0 && (
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-yellow-600 dark:text-yellow-400">No Roles Assigned</CardTitle>
              <CardDescription>
                Your account doesn't have any roles assigned yet. Contact an administrator to get the appropriate access.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
