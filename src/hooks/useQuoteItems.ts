
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface QuoteItem {
  id: string;
  quote_id: string;
  service_type_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  service_type?: {
    name: string;
    category: string;
  };
}

export interface CreateQuoteItemData {
  quote_id: string;
  service_type_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export const useQuoteItems = (quoteId: string) => {
  return useQuery({
    queryKey: ['quote-items', quoteId],
    queryFn: async () => {
      if (!quoteId) return [];
      
      const { data, error } = await supabase
        .from('quote_items')
        .select(`
          *,
          service_type:service_types(name, category)
        `)
        .eq('quote_id', quoteId)
        .order('created_at');
      
      if (error) throw error;
      return data as QuoteItem[];
    },
    enabled: !!quoteId,
  });
};

export const useCreateQuoteItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (itemData: CreateQuoteItemData) => {
      const total_price = itemData.quantity * itemData.unit_price;
      
      const { data, error } = await supabase
        .from('quote_items')
        .insert({
          ...itemData,
          total_price,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quote-items', data.quote_id] });
      toast.success('Item adicionado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao adicionar item: ${error.message}`);
    },
  });
};

export const useUpdateQuoteItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...itemData }: Partial<QuoteItem> & { id: string }) => {
      const updateData: any = { ...itemData };
      
      if (itemData.quantity && itemData.unit_price) {
        updateData.total_price = itemData.quantity * itemData.unit_price;
      }
      
      const { data, error } = await supabase
        .from('quote_items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quote-items', data.quote_id] });
      toast.success('Item atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar item: ${error.message}`);
    },
  });
};

export const useDeleteQuoteItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('quote_items')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
      return itemId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quote-items'] });
      toast.success('Item removido com sucesso!');
    },
    onError: (error: any) => {
      toast.error(`Erro ao remover item: ${error.message}`);
    },
  });
};
