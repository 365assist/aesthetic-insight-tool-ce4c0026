import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import TechnicalTrainingLibrary from "@/components/training/TechnicalTrainingLibrary";
import TechDocumentsSection from "@/components/training/TechDocumentsSection";

const TechnicalTraining = () => {
  return (
    <>
      <Helmet>
        <title>Technical Training & Video Library | Aesthetic ProTools</title>
        <meta name="description" content="Comprehensive technical training videos and resources for aesthetic equipment. Learn laser operation, maintenance, and advanced techniques from certified professionals." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://aestheticprotools.com/technical-training" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <TechnicalTrainingLibrary />
          <TechDocumentsSection />
        </main>
      </div>
    </>
  );
};

export default TechnicalTraining;
