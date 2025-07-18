
export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-';
  
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return 'Data inválida';
    }
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return 'Data inválida';
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};
