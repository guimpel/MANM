
import { routeGroups } from "@/lib/routes";
import { toast } from "sonner";

/**
 * Validates all routes in the application to ensure they are properly configured
 * @returns {boolean} Whether all routes are valid
 */
export function validateAllRoutes(): boolean {
  try {
    console.group("🧪 Route Validation");
    
    let allValid = true;
    let totalRoutes = 0;
    let protectedRoutes = 0;
    
    Object.entries(routeGroups).forEach(([groupKey, group]) => {
      console.log(`Checking group: ${groupKey} (${group.name})`);
      
      if (Object.keys(group.routes).length === 0) {
        console.warn(`⚠️ Route group "${groupKey}" has no routes defined`);
        allValid = false;
      }
      
      Object.entries(group.routes).forEach(([routeKey, route]) => {
        totalRoutes++;
        
        if (!route.path) {
          console.error(`❌ Route "${routeKey}" in group "${groupKey}" has no path defined`);
          allValid = false;
        }
        
        if (!route.title) {
          console.warn(`⚠️ Route "${routeKey}" in group "${groupKey}" has no title defined`);
        }
        
        if (route.requiresAuth) {
          protectedRoutes++;
        }
      });
    });
    
    console.log(`Total routes: ${totalRoutes}`);
    console.log(`Protected routes: ${protectedRoutes}`);
    console.log(`All routes valid: ${allValid ? 'Yes ✅' : 'No ❌'}`);
    
    console.groupEnd();
    
    if (allValid) {
      console.info("✅ ALL NAVIGATION VALIDATION COMPLETE: All routes are valid");
    } else {
      console.error("❌ Route validation failed");
      toast.error("Erro na validação de rotas. Verifique o console para mais detalhes.");
    }
    
    return allValid;
  } catch (error) {
    console.error("Error validating routes:", error);
    toast.error("Erro crítico ao validar rotas. Contate o suporte.");
    return false;
  }
}

/**
 * Validates a specific route to ensure it exists in the application
 * @param path The route path to validate
 * @returns {boolean} Whether the route is valid
 */
export function validateRoute(path: string): boolean {
  try {
    if (!path) {
      console.error("Empty route path provided to validateRoute");
      return false;
    }
    
    let routeExists = false;
    
    Object.values(routeGroups).forEach(group => {
      Object.values(group.routes).forEach(route => {
        if (route.path === path) {
          routeExists = true;
        }
      });
    });
    
    if (!routeExists) {
      console.warn(`Route "${path}" does not exist in any route group`);
    }
    
    return routeExists;
  } catch (error) {
    console.error("Error validating specific route:", error);
    return false;
  }
}

/**
 * Run route validation when the application loads in development mode
 */
export function initRouteValidation(): void {
  if (process.env.NODE_ENV === 'development') {
    validateAllRoutes();
  }
}

/**
 * Get the proper redirect path based on user type
 * @param userType The type of the user
 * @returns {string} The appropriate redirect path
 */
export function getRedirectPathForUserType(userType: string): string {
  switch (userType) {
    case 'client':
      return '/fleet-dashboard';
    case 'provider':
      return '/provider/dashboard';
    case 'integrator':
      return '/integrator/dashboard';
    default:
      return '/';
  }
}
