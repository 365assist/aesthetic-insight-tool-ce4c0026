import Navigation from "@/components/Navigation";
import TechnicalTrainingLibrary from "@/components/training/TechnicalTrainingLibrary";

const TechnicalTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-foreground">
              Technical Training Library
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive training resources and video modules to master your aesthetic equipment
            </p>
          </div>
          <TechnicalTrainingLibrary />
        </div>
      </main>
    </div>
  );
};

export default TechnicalTraining;
