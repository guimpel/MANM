
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Trash2, Edit } from 'lucide-react';
import { useQuoteItems, useDeleteQuoteItem, QuoteItem } from '@/hooks/useQuoteItems';

interface QuoteItemsListProps {
  quoteId: string;
  onEdit?: (item: QuoteItem) => void;
  readonly?: boolean;
}

export const QuoteItemsList: React.FC<QuoteItemsListProps> = ({ 
  quoteId, 
  onEdit,
  readonly = false 
}) => {
  const { data: items, isLoading } = useQuoteItems(quoteId);
  const deleteItem = useDeleteQuoteItem();
  
  const handleDelete = async (itemId: string) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      await deleteItem.mutateAsync(itemId);
    }
  };
  
  const totalAmount = items?.reduce((sum, item) => sum + item.total_price, 0) || 0;
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!items || items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Nenhum item adicionado à cotação ainda.
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens da Cotação</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-center">Qtd</TableHead>
              <TableHead className="text-right">Valor Unit.</TableHead>
              <TableHead className="text-right">Total</TableHead>
              {!readonly && <TableHead className="text-center">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.service_type ? (
                    <div>
                      <div className="font-medium">{item.service_type.name}</div>
                      <Badge variant="secondary" className="text-xs">
                        {item.service_type.category}
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Serviço personalizado</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={item.description}>
                    {item.description}
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  R$ {item.unit_price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ {item.total_price.toFixed(2)}
                </TableCell>
                {!readonly && (
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteItem.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total da Cotação:</span>
            <span className="text-xl font-bold text-green-600">
              R$ {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
