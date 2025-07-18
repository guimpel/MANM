
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ProviderProfile {
  id?: string;
  user_id: string;
  company_name: string;
  cnpj: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  city_id?: string;
  service_types?: string[];
  phone_formatted?: string;
  whatsapp_formatted?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  business_area?: string;
  pix_key?: string;
  pix_type?: string;
  rating?: number;
  total_services?: number;
  services?: any;
  verified_phone?: boolean;
  verified_email?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useProviderProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['provider-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('provider_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
};

export const useUpdateProviderProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileData: Partial<ProviderProfile>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Ensure required fields have default values for upsert
      const dataToUpsert = {
        user_id: user.id,
        company_name: profileData.company_name || '',
        cnpj: profileData.cnpj || '',
        ...profileData,
      };
      
      const { data, error } = await supabase
        .from('provider_profiles')
        .upsert(dataToUpsert)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar perfil: ${error.message}`);
    },
  });
};
