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
      name: "Terri Killion",
      role: "Senior Sales and Marketing",
      department: "Sales",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
      email: "terri.killion@aestheticprotools.com",
      phone: "+1 (555) 123-4569",
      specialties: ["Sales Strategy", "Marketing Campaigns", "Brand Development"]
    },
    {
      name: "Jose Vasquez",
      role: "Lead Engineer / Research and Development",
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      email: "jose.vasquez@aestheticprotools.com",
      phone: "+1 (555) 123-4570",
      specialties: ["Engineering Design", "R&D", "Product Innovation"]
    },
    {
      name: "Alison Roskelly",
      role: "Lead Administrator",
      department: "Administration",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "alison.roskelly@aestheticprotools.com",
      phone: "+1 (555) 123-4571",
      specialties: ["Administration", "Operations", "Client Coordination"]
    },
    {
      name: "Jack Jansen",
      role: "Technical Support",
      department: "Technical",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      email: "jack.jansen@aestheticprotools.com",
      phone: "+1 (555) 123-4572",
      specialties: ["Technical Support", "Customer Service", "Issue Resolution"]
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
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary dark:text-white">
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:bg-none dark:text-white">
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary dark:text-white dark:group-hover:text-[#f97316] transition-colors">
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
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary dark:hover:text-[#f97316] transition-colors group/email"
                      >
                        <Mail className="w-4 h-4 group-hover/email:scale-110 transition-transform" />
                        <span className="truncate">{employee.email}</span>
                      </a>
                      <a 
                        href={`tel:${employee.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary dark:hover:text-[#f97316] transition-colors group/phone"
                      >
                        <Phone className="w-4 h-4 group-hover/phone:scale-110 transition-transform" />
                        <span>{employee.phone}</span>
                      </a>
                      <div className="flex items-center gap-2 text-muted-foreground hover:text-primary dark:hover:text-[#f97316] transition-colors cursor-pointer group/linkedin">
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

      </div>
    </section>
  );
};

export default EmployeesSection;