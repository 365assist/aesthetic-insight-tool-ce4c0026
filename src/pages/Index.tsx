import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
      <Navigation />
      <main role="main">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;