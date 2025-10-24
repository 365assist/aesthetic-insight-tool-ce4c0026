import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const TechDocumentsSection = () => {
  const documents = [
    {
      title: "VADER Laser User Manual",
      description: "Complete user manual covering operation, maintenance, and troubleshooting.",
      fileSize: "2.4 MB",
      type: "PDF"
    },
    {
      title: "Quick Start Guide",
      description: "Quick reference guide for initial setup and basic operations.",
      fileSize: "850 KB",
      type: "PDF"
    },
    {
      title: "Safety Guidelines",
      description: "Essential safety information and best practices for laser operation.",
      fileSize: "1.2 MB",
      type: "PDF"
    },
    {
      title: "Maintenance Schedule",
      description: "Recommended maintenance procedures and schedules.",
      fileSize: "650 KB",
      type: "PDF"
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
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {doc.type} • {doc.fileSize}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechDocumentsSection;
