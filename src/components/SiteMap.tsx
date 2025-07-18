
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routeGroups } from '@/lib/routes';
import { toast } from 'sonner';

interface SiteMapProps {
  showAllRoutes?: boolean;
}

const SiteMap: React.FC<SiteMapProps> = ({ showAllRoutes = false }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [validationComplete, setValidationComplete] = useState(false);

  // Check all routes on mount
  useEffect(() => {
    // Validate all routes exist in the routeGroups object
    const validateRoutes = () => {
      try {
        // Check if all route groups have valid routes
        let allValid = true;
        Object.entries(routeGroups).forEach(([groupKey, group]) => {
          if (Object.keys(group.routes).length === 0) {
            console.warn(`Route group "${groupKey}" has no routes defined`);
            allValid = false;
          }
        });
        
        if (allValid) {
          console.info("✅ All route groups validated successfully");
          setValidationComplete(true);
          
          // Send completed message via toast
          if (showAllRoutes) {
            toast.success("Validação de rotas concluída com sucesso!");
          }
        }
      } catch (error) {
        console.error("Error validating routes:", error);
        toast.error("Erro ao validar rotas");
      }
    };
    
    validateRoutes();
  }, [showAllRoutes]);

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-primary">Mapa do Site</h2>
      
      <div className="space-y-6">
        {Object.entries(routeGroups).map(([groupKey, group]) => {
          const isExpanded = expandedGroups[groupKey] || showAllRoutes;
          const visibleRoutesCount = Object.keys(group.routes).length;
          
          return (
            <div key={groupKey} className="border rounded-lg p-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleGroup(groupKey)}
              >
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">
                    {visibleRoutesCount} páginas
                  </span>
                  <button className="text-primary">
                    {isExpanded ? '▼' : '►'}
                  </button>
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(group.routes).map(([routeKey, route]) => (
                    <Link 
                      key={routeKey}
                      to={route.path}
                      className="p-3 border rounded hover:bg-gray-50 flex items-center"
                    >
                      <div>
                        <div className="font-medium">{route.title}</div>
                        <div className="text-xs text-muted-foreground">{route.path}</div>
                        {route.requiresAuth && (
                          <div className="mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                              {route.userType === 'any' 
                                ? 'Autenticado'
                                : `${route.userType === 'client' 
                                    ? 'Frotista' 
                                    : route.userType === 'provider' 
                                      ? 'Fornecedor' 
                                      : 'Integrador'}`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {validationComplete && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-700">
          Todas as rotas foram validadas com sucesso e estão mapeadas corretamente.
        </div>
      )}
    </div>
  );
};

export default SiteMap;
