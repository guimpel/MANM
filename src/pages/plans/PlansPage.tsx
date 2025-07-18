
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Database } from "@/integrations/supabase/types";
import { mapDataToModel } from "@/utils/supabaseHelpers";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string | null;
  max_fleet: number | null;
  max_quotes: number | null;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('plans')
          .select('*')
          .order('price', { ascending: true });
        
        if (error) throw error;
        
        // Convert the Supabase data to the Plan interface with safe mapping
        if (data) {
          const typedPlans = mapDataToModel(data, (plan): Plan => ({
            id: plan.id as string,
            name: plan.name as string,
            price: plan.price as number,
            description: plan.description as string | null,
            max_fleet: plan.max_fleet as number | null,
            max_quotes: plan.max_quotes as number | null
          }));
          setPlans(typedPlans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontre o plano ideal para o seu negócio e comece a usar nossa plataforma hoje mesmo.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {plans.map((plan) => (
                <Card key={plan.id} className="flex flex-col border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">R$ {plan.price.toFixed(2)}</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-center mb-6 text-muted-foreground">
                      {plan.description || "Solução completa para gerenciar sua frota."}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Gestão de frota completa</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Aprovação e gestão de serviços</span>
                      </li>
                      {plan.max_fleet && (
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Até {plan.max_fleet} veículos</span>
                        </li>
                      )}
                      {plan.max_quotes && (
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Até {plan.max_quotes} cotações por mês</span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Suporte 24/7</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-6 pb-8 flex justify-center">
                    <Link 
                      to={`/register?plan=${plan.id}`} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2 w-full"
                    >
                      Começar Agora
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhum plano disponível no momento.</p>
              <Link to="/">
                <Button className="mt-4">
                  Voltar para página inicial
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
