
/**
 * Safely process a single data item from Supabase, providing fallbacks for null/undefined values
 */
export function safeDataItem<T>(item: any, fallback: T): T {
  if (!item || typeof item !== 'object') {
    return fallback;
  }
  
  return { ...fallback, ...item };
}

/**
 * Map data array to a model array with type safety
 */
export function mapDataToModel<T>(data: any[], mapper: (item: any) => T): T[] {
  if (!Array.isArray(data)) {
    return [];
  }
  
  return data.map(mapper).filter(Boolean);
}

/**
 * Handle Supabase errors with user-friendly messages
 */
export function handleSupabaseError(error: any): string {
  if (!error) return 'Erro desconhecido';
  
  if (error.message) {
    if (error.message.includes('RLS')) {
      return 'Você não tem permissão para acessar estes dados';
    }
    if (error.message.includes('duplicate key')) {
      return 'Este registro já existe';
    }
    if (error.message.includes('foreign key')) {
      return 'Referência inválida nos dados';
    }
    return error.message;
  }
  
  return 'Erro ao processar dados';
}
