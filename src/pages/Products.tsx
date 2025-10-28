import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import ProductsSection from "@/components/ProductsSection";

const Products = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Professional Aesthetic Equipment | Aesthetic ProTools</title>
        <meta 
          name="description" 
          content="Explore our comprehensive range of professional medical-grade aesthetic equipment including VADER Laser, Artisan Sculptor, and Tri-Pulse systems for your practice." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aestheticprotools.com/products" />
        
        <meta property="og:title" content="Professional Aesthetic Equipment | Aesthetic ProTools" />
        <meta property="og:description" content="FDA-approved laser systems, body sculpting devices, and aesthetic equipment for medical spas" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aestheticprotools.com/products" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Aesthetic Equipment | Aesthetic ProTools" />
        <meta name="twitter:description" content="FDA-approved laser systems and aesthetic equipment" />
      </Helmet>
      
      <Navigation />
      <ProductsSection />
    </div>
  );
};

export default Products;
