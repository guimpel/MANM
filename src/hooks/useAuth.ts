
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/serviceRequest';
import { toast } from 'sonner';
import { getRedirectPathForUserType } from '@/utils/routeValidator';

interface UseAuthReturn {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProvider: boolean;
  isFrotista: boolean;
  isIntegrator: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, userData: Partial<UserProfile> & { plan_id?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("🔍 Fetching user profile for:", userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('❌ Error fetching user profile:', error);
        return null;
      }
      
      if (data) {
        const profile: UserProfile = {
          id: data.id,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          user_type: (data.user_type as "client" | "provider" | "integrator") || "client",
          plan_id: data.plan_id || null,
          created_at: data.created_at
        };
        
        console.log("✅ User profile loaded:", profile);
        return profile;
      }
    } catch (error) {
      console.error('❌ Exception fetching user profile:', error);
    }
    return null;
  };

  // Initialize auth state
  useEffect(() => {
    console.log("🚀 Initializing auth state");
    // Check for custom session (localStorage/sessionStorage)
    let stored = localStorage.getItem('auth.session') || sessionStorage.getItem('auth.session');
    let parsed: any = null;
    if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch {}
    }
    const now = Date.now();
    if (parsed && parsed.session && parsed.expiresAt > now) {
      setSession(parsed.session);
      setUser(parsed.session.user ?? null);
      fetchUserProfile(parsed.session.user.id).then(profile => {
        setUserProfile(profile);
        setIsLoading(false);
      });
    } else {
      // Remove expired session
      localStorage.removeItem('auth.session');
      sessionStorage.removeItem('auth.session');
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setIsLoading(false);
    }
    // Set up supabase auth state listener (for compatibility)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!currentSession) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          setTimeout(async () => {
            const profile = await fetchUserProfile(currentSession.user.id);
            setUserProfile(profile);
            setIsLoading(false);
          }, 0);
        } else {
          setUserProfile(null);
          setIsLoading(false);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setIsLoading(true);
      console.log("🔑 Attempting login for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Login error:", error);
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos. Verifique suas credenciais.");
        } else {
          toast.error(`Erro ao fazer login: ${error.message}`);
        }
        throw error;
      }

      if (data?.user && data.session) {
        console.log("✅ Login successful for:", data.user.email);
        toast.success('Login realizado com sucesso!');
        // Custom session persistence
        const now = Date.now();
        if (rememberMe) {
          // 7 days
          localStorage.setItem('auth.session', JSON.stringify({
            session: data.session,
            expiresAt: now + 7 * 24 * 60 * 60 * 1000
          }));
          sessionStorage.removeItem('auth.session');
        } else {
          // 15 min
          sessionStorage.setItem('auth.session', JSON.stringify({
            session: data.session,
            expiresAt: now + 15 * 60 * 1000
          }));
          localStorage.removeItem('auth.session');
        }
        // Redirect will be handled by auth state change
      }
    } catch (error: any) {
      console.error('❌ Login exception:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, userData: Partial<UserProfile> & { plan_id?: string }) => {
    try {
      setIsLoading(true);
      console.log("📝 Attempting registration for:", email);
      
      if (!email || !password) {
        toast.error('Email e senha são obrigatórios');
        throw new Error('Email e senha são obrigatórios');
      }

      const { plan_id, ...profileData } = userData;
      const actualPlanId = plan_id || '00000000-0000-0000-0000-000000000000';

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            user_type: profileData.user_type || 'client',
          }
        }
      });

      if (error) {
        console.error("❌ Registration error:", error);
        toast.error(`Erro de registro: ${error.message}`);
        throw error;
      }

      if (data?.user) {
        console.log("✅ Registration successful for:", data.user.email);
        toast.success('Registro realizado com sucesso!');
        
        // Update plan association
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ plan_id: actualPlanId })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error('⚠️ Error associating plan:', updateError);
        }
      }
    } catch (error: any) {
      console.error('❌ Registration exception:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      console.log("🚪 Logging out user");
      
      await supabase.auth.signOut();
      toast.success('Logout realizado com sucesso');
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      toast.error(`Erro ao fazer logout: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  // Update profile
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      toast.error('Você precisa estar logado para atualizar seu perfil');
      return;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) {
        console.error('❌ Error updating profile:', error);
        toast.error(`Erro ao atualizar perfil: ${error.message}`);
        throw error;
      }
      
      toast.success('Perfil atualizado com sucesso');
      await refreshProfile();
    } catch (error: any) {
      console.error('❌ Profile update exception:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isProvider = userProfile?.user_type === 'provider';
  const isFrotista = userProfile?.user_type === 'client';
  const isIntegrator = userProfile?.user_type === 'integrator';

  return {
    session,
    user,
    userProfile,
    isLoading,
    isAuthenticated,
    isProvider,
    isFrotista,
    isIntegrator,
    login,
    register,
    logout,
    refreshProfile,
    updateProfile
  };
};
