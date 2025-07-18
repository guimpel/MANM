
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceType {
  id: string;
  name: string;
  category: string;
  active: boolean;
  created_at: string;
  description?: string;
}

export const useServiceTypes = () => {
  return useQuery({
    queryKey: ['service-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_types')
        .select('*')
        .eq('active', true)
        .order('category')
        .order('name');
      
      if (error) throw error;
      return data as ServiceType[];
    },
  });
};

export const useServiceTypesByCategory = () => {
  const { data: serviceTypes, ...query } = useServiceTypes();
  
  const groupedByCategory = serviceTypes?.reduce((acc, serviceType) => {
    const category = serviceType.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(serviceType);
    return acc;
  }, {} as Record<string, ServiceType[]>);
  
  return {
    ...query,
    data: groupedByCategory,
    serviceTypes,
  };
};
