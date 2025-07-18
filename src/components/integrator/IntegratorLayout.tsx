
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IntegratorSidebar } from './IntegratorSidebar';
import { ThemeProvider } from 'next-themes';
import { IntegratorUser } from '@/types/serviceRequest';

interface IntegratorLayoutProps {
  children: ReactNode;
}

export function IntegratorLayout({ children }: IntegratorLayoutProps) {
  const [user, setUser] = useState<IntegratorUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Em um cenário real, verificaria o token JWT com o backend
    const userStr = localStorage.getItem("integratorUser");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/integrator/login" />;
  }

  return (
    <ThemeProvider defaultTheme="light" enableSystem>
      <div className="flex min-h-screen bg-background">
        <IntegratorSidebar />
        <div className="flex-1">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
