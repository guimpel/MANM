
import { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuth as useAuthHook } from '@/hooks/useAuth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authData = useAuthHook();

  // Idle timeout logic
  const idleTimeout = 15 * 60 * 1000; // 15 minutos
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const resetTimer = () => {
      lastActivity.current = Date.now();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        // Só desloga se estiver autenticado
        if (authData.isAuthenticated) {
          authData.logout();
        }
      }, idleTimeout);
    };
    // Eventos de interação
    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [authData.isAuthenticated]);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
