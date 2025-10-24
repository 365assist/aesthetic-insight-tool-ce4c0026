import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Aesthetic ProTools - Premium Medical Aesthetic Equipment | FDA-Approved Laser Systems</title>
        <meta name="description" content="Professional aesthetic equipment for medical spas: VADER laser hair removal, Tri-Pulse tattoo removal, body sculpting devices. FDA-approved, clinically tested, made by aestheticians for aestheticians." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://aestheticprotools.com/" />
      </Helmet>
      <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        <Navigation />
        <main role="main">
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default Index;