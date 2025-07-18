
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import SiteMap from '@/components/SiteMap';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { routeGroups } from '@/lib/routes';

const RouteVisualization = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Generate JSON for download
      const routesData = JSON.stringify(routeGroups, null, 2);
      const blob = new Blob([routesData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      
      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error("Error creating route visualization JSON:", error);
      toast.error("Erro ao gerar visualização de rotas");
    }
  }, []);

  // Log for validation
  useEffect(() => {
    console.info("Route visualization page loaded successfully");
    // Count total routes for validation
    let totalRoutes = 0;
    Object.values(routeGroups).forEach(group => {
      totalRoutes += Object.keys(group.routes).length;
    });
    console.info(`Total routes in application: ${totalRoutes}`);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visualização de Rotas</h1>
        
        {downloadUrl && (
          <a 
            href={downloadUrl} 
            download="imovan-routes-map.json"
            className="no-underline"
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download JSON
            </Button>
          </a>
        )}
      </div>
      
      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Mapa do Site</h2>
        <p className="text-yellow-700">
          Este mapa mostra todas as rotas disponíveis na aplicação IMOVAN. Clique em cada seção para expandir e ver as páginas.
          As rotas protegidas são marcadas com o tipo de usuário que pode acessá-las.
        </p>
      </div>
      
      <SiteMap showAllRoutes={true} />
      
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Informações de Navegação</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-3">Fluxos de Usuário</h3>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong>Fluxo Frotista:</strong> Login → Fleet Dashboard → Solicitar Atendimento → Acompanhar Serviço
              </li>
              <li>
                <strong>Fluxo Fornecedor:</strong> Login → Provider Dashboard → Visualizar Solicitações → Enviar Orçamento
              </li>
              <li>
                <strong>Fluxo Integrador:</strong> Login Integrador → Dashboard Integrador → Gerenciar Usuários/Clientes/Fornecedores
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-3">Tipos de Acesso</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span><strong>Público:</strong> Acessível sem autenticação</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span><strong>Frotista:</strong> Requer login como cliente</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                <span><strong>Fornecedor:</strong> Requer login como fornecedor</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                <span><strong>Integrador:</strong> Requer login como integrador</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteVisualization;
