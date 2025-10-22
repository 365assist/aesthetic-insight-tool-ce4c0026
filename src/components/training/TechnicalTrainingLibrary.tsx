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
      videoId: "YXx4vE4t3HU"
    },
    {
      moduleNumber: 5,
      title: "Additional Training Module",
      description: "Additional technical training content for your VADER Laser system.",
      videoId: "KN3xMEdU7hU"
    }
  ];

  const displayedModules = showAll ? videoModules : videoModules.slice(0, 3);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary dark:text-white">
          Exclusive Content
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary dark:text-white">
          Technical Training Library
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 dark:text-white">
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
            {showAll ? "Show Less" : "View All Modules"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalTrainingLibrary;
