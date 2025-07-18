
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from './serviceRequest';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProvider: boolean;
  isFrotista: boolean;
  isIntegrator: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<UserProfile> & { plan_id?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  max_fleet?: number | null;
  max_quotes?: number | null;
}
