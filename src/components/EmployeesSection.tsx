import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Linkedin } from "lucide-react";
import garyBegleyImage from "@/assets/gary-begley-ceo.png";
import shaunMeyersImage from "@/assets/shaun-meyers-cto.png";

const EmployeesSection = () => {
  const employees = [
    {
      name: "Gary Begley",
      role: "Chief Executive Officer",
      department: "Executive",
      image: garyBegleyImage,
      email: "gary.begley@aestheticprotools.com",
      phone: "+1 (555) 123-4567",
      specialties: ["Business Strategy", "Medical Aesthetics", "Innovation"]
    },
    {
      name: "Shaun Meyers",
      role: "Chief Technology Officer",
      department: "Engineering",
      image: shaunMeyersImage,
      email: "shaun.meyers@aestheticprotools.com",
      phone: "+1 (555) 123-4568",
      specialties: ["Equipment Design", "R&D", "Quality Assurance"]
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Training",
      department: "Education",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
      email: "emily.watson@aestheticprotools.com",
      phone: "+1 (555) 123-4569",
      specialties: ["Clinical Training", "Certification", "Best Practices"]
    },
    {
      name: "James Thompson",
      role: "Senior Sales Director",
      department: "Sales",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      email: "james.thompson@aestheticprotools.com",
      phone: "+1 (555) 123-4570",
      specialties: ["Client Relations", "Market Analysis", "Partnership Development"]
    },
    {
      name: "Lisa Park",
      role: "Customer Success Manager",
      department: "Support",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "lisa.park@aestheticprotools.com",
      phone: "+1 (555) 123-4571",
      specialties: ["Customer Support", "Technical Assistance", "Account Management"]
    },
    {
      name: "David Kim",
      role: "Lead Equipment Technician",
      department: "Technical",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      email: "david.kim@aestheticprotools.com",
      phone: "+1 (555) 123-4572",
      specialties: ["Installation", "Maintenance", "Troubleshooting"]
    }
  ];

  const getDepartmentColor = (department: string) => {
    const colors = {
      "Executive": "bg-primary/20 text-primary dark:bg-primary/30 dark:text-white",
      "Engineering": "bg-accent/20 text-accent dark:bg-accent/30 dark:text-white",
      "Education": "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-white",
      "Sales": "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-white",
      "Support": "bg-orange-500/20 text-orange-600 dark:bg-orange-500/30 dark:text-white",
      "Technical": "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-white"
    };
    return colors[department as keyof typeof colors] || "bg-gray-500/20 text-gray-600 dark:bg-gray-500/30 dark:text-white";
  };

  return (
    <section id="employees" className="py-20 px-6 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Meet Our Experts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of professionals brings years of experience in aesthetic medicine, 
            engineering excellence, and customer success to serve you better.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {employees.map((employee, index) => (
            <Card 
              key={employee.name} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative mb-4">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover object-[center_30%] border-4 border-background shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary dark:text-white dark:group-hover:text-white transition-colors">
                    {employee.name}
                  </h3>
                  <p className="text-muted-foreground font-medium mb-3">
                    {employee.role}
                  </p>
                  <Badge className={`${getDepartmentColor(employee.department)} border-0`}>
                    {employee.department}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary dark:text-white">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {employee.specialties.map((specialty) => (
                        <Badge 
                          key={specialty} 
                          variant="outline" 
                          className="text-xs bg-muted/50 hover:bg-primary/10 transition-colors"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex flex-col space-y-2 text-sm">
                      <a 
                        href={`mailto:${employee.email}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/email"
                      >
                        <Mail className="w-4 h-4 group-hover/email:scale-110 transition-transform" />
                        <span className="truncate">{employee.email}</span>
                      </a>
                      <a 
                        href={`tel:${employee.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/phone"
                      >
                        <Phone className="w-4 h-4 group-hover/phone:scale-110 transition-transform" />
                        <span>{employee.phone}</span>
                      </a>
                      <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group/linkedin">
                        <Linkedin className="w-4 h-4 group-hover/linkedin:scale-110 transition-transform" />
                        <span>LinkedIn Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4 dark:text-white">Join Our Team</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented professionals to join our growing team. 
            If you're passionate about aesthetic medicine and cutting-edge technology, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@aestheticprotools.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
            >
              View Open Positions
            </a>
            <a 
              href="mailto:hr@aestheticprotools.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
            >
              Submit Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeesSection;