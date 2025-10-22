import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, Shield, User, Copy } from "lucide-react";
import Navigation from "@/components/Navigation";
import { secureLog } from "@/lib/logger";
import { MemberManagement } from "@/components/admin/MemberManagement";
import { ShippingTracker } from "@/components/shipping/ShippingTracker";

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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        secureLog.info('No session found, redirecting to auth');
        navigate("/auth");
        return;
      }

      secureLog.info('Session found for user:', session.user.id);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, email, user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profileError) {
        secureLog.error('Profile fetch error:', profileError);
        throw profileError;
      }
      
      if (!profileData) {
        secureLog.error('No profile found for user');
        toast({
          title: "Profile Not Found",
          description: "Your profile hasn't been created yet. Please contact an administrator.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      secureLog.info('Profile loaded:', profileData);
      setProfile(profileData);

      // Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (rolesError) {
        secureLog.error('Roles fetch error:', rolesError);
        throw rolesError;
      }
      
      secureLog.info('Roles loaded:', rolesData);
      setRoles(rolesData?.map(r => r.role as UserRole) || []);

    } catch (error: any) {
      secureLog.error('Auth check error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load your profile",
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
                  <span key={role} className="px-2 py-1 bg-primary/10 text-primary dark:text-[#f97316] rounded text-sm">
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
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/developer-tools")}>
                Developer Tools
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/udi-program")}>
                UDI Program
              </Button>
            </CardContent>
          </Card>
        </div>

        {(isAdmin || roles.includes("employee")) && (
          <div className="mb-8">
            <ShippingTracker />
          </div>
        )}

        {isAdmin && (
          <MemberManagement />
        )}

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
