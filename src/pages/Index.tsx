
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import PartnerLogos from "@/components/PartnerLogos";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { publicRoutes, howItWorksRoutes } from "@/lib/routes";
import { toast } from "sonner";
import { useEffect } from "react";

const Index: React.FC = () => {
  useEffect(() => {
    console.log("Homepage loaded successfully");
    // Verify all links on the page to ensure they're working
    const checkLinks = () => {
      const links = document.querySelectorAll('a');
      console.info(`Checking ${links.length} links on the homepage`);
    };
    
    checkLinks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <ServicesSection />
        
        <div className="bg-slate-50 py-20">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Entre na plataforma
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Faça login ou cadastre-se para acessar todos os recursos da nossa plataforma.
              Gerencie seus serviços, solicitações e acompanhe todo o processo em um só lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={publicRoutes.login.path}>
                <Button size="lg" className="text-white bg-primary hover:bg-primary/90 transition-colors">
                  Entrar / Cadastrar
                </Button>
              </Link>
              <Link to={howItWorksRoutes.forProviders.path}>
                <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <HowItWorks />
        
        <PartnerLogos />
        
        <Testimonials />
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
