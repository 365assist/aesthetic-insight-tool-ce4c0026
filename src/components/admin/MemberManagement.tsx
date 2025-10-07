import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMembers, AppRole } from "@/hooks/useMembers";
import { UserPlus, UserMinus, Mail, Shield } from "lucide-react";

export const MemberManagement = () => {
  const { members, isLoading, addRole, removeRole, isAddingRole, isRemovingRole } = useMembers();
  const [selectedRole, setSelectedRole] = useState<Record<string, AppRole>>({});

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Member Management
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions. Changes are logged for audit purposes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.user_id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">{member.full_name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </div>
                <div className="flex gap-2 mt-2">
                  {member.roles.length > 0 ? (
                    member.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="flex items-center gap-1">
                        {role}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                          onClick={() => removeRole({ userId: member.user_id, role })}
                          disabled={isRemovingRole}
                        >
                          <UserMinus className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No roles assigned</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Select
                  value={selectedRole[member.user_id] || ""}
                  onValueChange={(value) => 
                    setSelectedRole({ ...selectedRole, [member.user_id]: value as AppRole })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  size="sm"
                  onClick={() => {
                    const role = selectedRole[member.user_id];
                    if (role && !member.roles.includes(role)) {
                      addRole({ userId: member.user_id, role });
                      setSelectedRole({ ...selectedRole, [member.user_id]: undefined as any });
                    }
                  }}
                  disabled={
                    !selectedRole[member.user_id] || 
                    member.roles.includes(selectedRole[member.user_id]) ||
                    isAddingRole
                  }
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}
          
          {members.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No members found.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
