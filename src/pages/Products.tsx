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
        <link rel="canonical" href="https://aesthetic-protools.com/products" />
      </Helmet>
      
      <Navigation />
      <ProductsSection />
    </div>
  );
};

export default Products;
