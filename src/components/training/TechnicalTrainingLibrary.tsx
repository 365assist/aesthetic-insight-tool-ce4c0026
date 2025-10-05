import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VideoModule from "./VideoModule";

const TechnicalTrainingLibrary = () => {
  const videoModules = [
    {
      moduleNumber: 1,
      title: "VADER Laser Quickstart",
      description: "Start here: Basic setup, interface tour, and safety protocols.",
      videoId: "VIDEO_ID_1"
    },
    {
      moduleNumber: 2,
      title: "Advanced Clinical Settings",
      description: "Deep dive into customized treatments and multi-wavelength use.",
      videoId: "VIDEO_ID_2"
    },
    {
      moduleNumber: 3,
      title: "Troubleshooting & UDI Reporting",
      description: "Annual maintenance, error codes, and required regulatory logging.",
      videoId: "VIDEO_ID_3"
    }
  ];

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
          {videoModules.map((module) => (
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
          <Button variant="outline" size="lg">
            View All 15+ Modules
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalTrainingLibrary;
