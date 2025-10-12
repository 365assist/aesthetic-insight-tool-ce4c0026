import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VideoModule from "./VideoModule";
import { useState } from "react";

const TechnicalTrainingLibrary = () => {
  const [showAll, setShowAll] = useState(false);
  
  const videoModules = [
    {
      moduleNumber: 1,
      title: "Packing and Shipping Guide",
      description: "Learn how to safely pack and ship your VADER Laser with this step-by-step guide.",
      videoId: "HYt3nKlcHSU"
    },
    {
      moduleNumber: 2,
      title: "Filter Change Guide",
      description: "Step-by-step instructions for changing the filter on your VADER Laser.",
      videoId: "iR8mTtIhq6Q"
    },
    {
      moduleNumber: 3,
      title: "Water Drainage Guide",
      description: "Learn how to properly drain water from your VADER Laser with this step-by-step guide.",
      videoId: "kiJCCPOJ8aM"
    },
    {
      moduleNumber: 4,
      title: "Initial Setup and Calibration",
      description: "Complete walkthrough of initial system setup and calibration procedures.",
      videoId: "VIDEO_ID_4"
    },
    {
      moduleNumber: 5,
      title: "Safety Protocols and Guidelines",
      description: "Essential safety procedures for operating the VADER Laser system.",
      videoId: "VIDEO_ID_5"
    },
    {
      moduleNumber: 6,
      title: "Basic Treatment Settings",
      description: "Introduction to treatment parameters and basic clinical settings.",
      videoId: "VIDEO_ID_6"
    },
    {
      moduleNumber: 7,
      title: "Advanced Treatment Techniques",
      description: "Advanced clinical applications and multi-wavelength treatments.",
      videoId: "VIDEO_ID_7"
    },
    {
      moduleNumber: 8,
      title: "System Maintenance Basics",
      description: "Regular maintenance procedures to keep your system running optimally.",
      videoId: "VIDEO_ID_8"
    },
    {
      moduleNumber: 9,
      title: "Troubleshooting Common Issues",
      description: "Identify and resolve common operational issues quickly.",
      videoId: "VIDEO_ID_9"
    },
    {
      moduleNumber: 10,
      title: "Error Codes and Diagnostics",
      description: "Understanding system error codes and diagnostic procedures.",
      videoId: "VIDEO_ID_10"
    },
    {
      moduleNumber: 11,
      title: "Cleaning and Sanitization",
      description: "Proper cleaning and sanitization protocols for clinical use.",
      videoId: "VIDEO_ID_11"
    },
    {
      moduleNumber: 12,
      title: "Component Replacement",
      description: "How to replace common components and parts safely.",
      videoId: "VIDEO_ID_12"
    },
    {
      moduleNumber: 13,
      title: "Software Updates and Settings",
      description: "Navigating software updates and system configuration.",
      videoId: "VIDEO_ID_13"
    },
    {
      moduleNumber: 14,
      title: "UDI Reporting and Compliance",
      description: "Required regulatory logging and UDI reporting procedures.",
      videoId: "VIDEO_ID_14"
    },
    {
      moduleNumber: 15,
      title: "Annual Maintenance Schedule",
      description: "Complete annual maintenance checklist and procedures.",
      videoId: "VIDEO_ID_15"
    },
    {
      moduleNumber: 16,
      title: "Advanced Diagnostics",
      description: "Deep dive into system diagnostics and performance optimization.",
      videoId: "VIDEO_ID_16"
    }
  ];

  const displayedModules = showAll ? videoModules : videoModules.slice(0, 3);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
          Exclusive Content
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Technical Training Library
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          Access on-demand video modules covering VADER Laser operation, maintenance, and clinical best practices.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedModules.map((module) => (
            <VideoModule
              key={module.moduleNumber}
              moduleNumber={module.moduleNumber}
              title={module.title}
              description={module.description}
              videoId={module.videoId}
            />
          ))}
        </div>
        
        <div className="mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            aria-label={showAll ? "Show fewer modules" : "View all 16 modules"}
          >
            {showAll ? "Show Less" : "View All 16 Modules"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalTrainingLibrary;
