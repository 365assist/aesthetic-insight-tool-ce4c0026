import Navigation from "@/components/Navigation";
import TechnicalTrainingLibrary from "@/components/training/TechnicalTrainingLibrary";

const TechnicalTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <TechnicalTrainingLibrary />
      </main>
    </div>
  );
};

export default TechnicalTraining;
