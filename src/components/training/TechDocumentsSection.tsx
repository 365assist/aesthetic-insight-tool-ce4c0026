import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import vaderLaser from "@/assets/vader-laser.jpg";
import artisanSculptor from "@/assets/artisan-sculptor.jpg";
import ariesAir from "@/assets/aries-air.png";

const TechDocumentsSection = () => {
  const documents = [
    {
      title: "VADER Poco Specifications",
      description: "Detailed specifications and features for the VADER Poco laser system.",
      fileUrl: "/documents/VADER_Poco_Poster.pdf",
      type: "PDF",
      image: vaderLaser
    },
    {
      title: "Artisan Poco Details",
      description: "Comprehensive specifications and technical details for the Artisan Poco system.",
      fileUrl: "/documents/Artisan_Poco_detail.pdf",
      type: "PDF",
      image: artisanSculptor
    },
    {
      title: "Artisan Model 10D User Manual",
      description: "Complete user manual for the Artisan Model 10D covering operation and maintenance.",
      fileUrl: "/documents/Artisan_Model_10D_User_Manual.docx",
      type: "DOCX",
      image: artisanSculptor
    },
    {
      title: "Tri-Pulse Q-Switched Laser User Manual",
      description: "User manual for the Tri-Pulse Q-Switched laser system.",
      fileUrl: "/documents/Tri_Pulse_Q_Switched_Laser_User_Manual.pdf",
      type: "PDF",
      image: vaderLaser
    },
    {
      title: "Aries Air Cooling Machine User Manual",
      description: "Operating instructions and maintenance guide for the Aries Air cooling system.",
      fileUrl: "/documents/Aries_Air_Cooling_Machine_User_Manual.pdf",
      type: "PDF",
      image: ariesAir
    },
    {
      title: "BUBBL Specifications",
      description: "Technical specifications and features for the BUBBL system.",
      fileUrl: "/documents/BUBBL_Poster.pdf",
      type: "PDF",
      image: artisanSculptor
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white">
            Technical Documents
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto dark:text-white">
            Download essential technical documentation, manuals, and guides for your equipment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {documents.map((doc, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {doc.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={doc.fileUrl} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechDocumentsSection;
