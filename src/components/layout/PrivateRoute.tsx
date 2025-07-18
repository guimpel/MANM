
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { publicRoutes } from '@/lib/routes';
import { toast } from 'sonner';
import { getRedirectPathForUserType } from '@/utils/routeValidator';

interface PrivateRouteProps {
  requiredUserType?: 'client' | 'provider' | 'integrator' | 'any';
}

export function PrivateRoute({ requiredUserType = 'any' }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, userProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // TODO: Add route analytics/logging here if needed
    console.log(`🛡️ PrivateRoute guard: ${location.pathname} (required: ${requiredUserType})`);
  }, [location.pathname, requiredUserType]);

  // Show loading spinner while auth is being determined
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('🚫 User not authenticated, redirecting to login');
    toast.error('Você precisa estar logado para acessar esta página');
    return <Navigate to={publicRoutes.login.path} state={{ from: location }} replace />;
  }

  // Check user type authorization if specified
  if (requiredUserType !== 'any') {
    const userType = userProfile?.user_type;
    
    // Handle case where user is authenticated but profile is not loaded yet
    if (!userProfile) {
      console.warn('⚠️ User authenticated but profile not loaded');
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-sm text-muted-foreground">Carregando perfil do usuário...</p>
          </div>
        </div>
      );
    }
    
    // Check if user has the required type
    if (userType !== requiredUserType) {
      console.log(`🚫 User type mismatch: has '${userType}', needs '${requiredUserType}'`);
      
      const redirectTo = getRedirectPathForUserType(userType || 'client');
      
      toast.error(`Você não tem permissão para acessar esta página. Redirecionando para sua área.`);
      return <Navigate to={redirectTo} replace />;
    }
  }

  // User is authenticated and authorized
  console.log('✅ Route access granted');
  return <Outlet />;
}
