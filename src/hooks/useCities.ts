
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface City {
  id: string;
  name: string;
  state: string;
  state_code: string;
  active: boolean;
  created_at: string;
}

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('active', true)
        .order('state')
        .order('name');
      
      if (error) throw error;
      return data as City[];
    },
  });
};
