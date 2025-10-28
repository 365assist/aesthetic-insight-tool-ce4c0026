import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");

  // Listen for hash changes to switch tabs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['about', 'products', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Set initial tab from hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>Aesthetic ProTools - Premium Medical Aesthetic Equipment | FDA-Approved Laser Systems</title>
        <meta name="description" content="Professional aesthetic equipment for medical spas: VADER laser hair removal, Tri-Pulse tattoo removal, body sculpting devices. FDA-approved, clinically tested, made by aestheticians for aestheticians." />
        <meta name="keywords" content="aesthetic equipment, medical spa equipment, laser hair removal, tattoo removal, body sculpting, FDA approved lasers, VADER laser, Tri-Pulse laser, Artisan Sculptor" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://aestheticprotools.com/" />
        
        <meta property="og:title" content="Aesthetic ProTools - Premium Medical Aesthetic Equipment" />
        <meta property="og:description" content="Professional aesthetic equipment for medical spas. FDA-approved laser systems and body sculpting devices by professionals, for professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aestheticprotools.com/" />
        <meta property="og:site_name" content="Aesthetic ProTools" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aesthetic ProTools - Premium Medical Equipment" />
        <meta name="twitter:description" content="Professional aesthetic equipment for medical spas. FDA-approved laser systems." />
      </Helmet>
      <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        <Navigation />
        <main role="main">
          <HeroSection />
          
          <div id="about" className="container mx-auto px-6 py-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-center mb-8 h-14 bg-card border-2 border-primary/20 shadow-elegant">
                <TabsTrigger value="about" className="text-base font-semibold px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  About Us
                </TabsTrigger>
                <TabsTrigger value="products" className="text-base font-semibold px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Our Products
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-base font-semibold px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Contact Us
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-0">
                <AboutSection />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductsSection />
              </TabsContent>
              
              <TabsContent value="contact" className="mt-0">
                <ContactSection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;