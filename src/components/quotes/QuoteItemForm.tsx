
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useServiceTypes } from '@/hooks/useServiceTypes';
import { CreateQuoteItemData } from '@/hooks/useQuoteItems';

interface QuoteItemFormProps {
  quoteId: string;
  onSubmit: (data: CreateQuoteItemData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface FormData {
  service_type_id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export const QuoteItemForm: React.FC<QuoteItemFormProps> = ({
  quoteId,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { data: serviceTypes, isLoading: loadingServices } = useServiceTypes();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      quantity: 1,
      unit_price: 0
    }
  });
  
  const quantity = watch('quantity');
  const unitPrice = watch('unit_price');
  const totalPrice = quantity * unitPrice;
  
  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      quote_id: quoteId,
      ...data
    });
  };
  
  if (loadingServices) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Item à Cotação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="service_type_id">Tipo de Serviço</Label>
            <Select onValueChange={(value) => setValue('service_type_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes?.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} ({service.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição do Serviço *</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Descrição é obrigatória' })}
              placeholder="Descreva detalhadamente o serviço a ser realizado"
              rows={3}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                {...register('quantity', { 
                  required: 'Quantidade é obrigatória',
                  min: { value: 1, message: 'Quantidade deve ser maior que 0' }
                })}
                className={errors.quantity ? 'border-destructive' : ''}
              />
              {errors.quantity && (
                <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="unit_price">Valor Unitário (R$) *</Label>
              <Input
                id="unit_price"
                type="number"
                min="0"
                step="0.01"
                {...register('unit_price', { 
                  required: 'Valor unitário é obrigatório',
                  min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                })}
                className={errors.unit_price ? 'border-destructive' : ''}
              />
              {errors.unit_price && (
                <p className="text-sm text-destructive mt-1">{errors.unit_price.message}</p>
              )}
            </div>
            
            <div>
              <Label>Total</Label>
              <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                R$ {totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Adicionando...
                </>
              ) : (
                'Adicionar Item'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
