
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { useProviderProfile, useUpdateProviderProfile, ProviderProfile } from '@/hooks/useProviderProfile';
import { useCities } from '@/hooks/useCities';
import { useServiceTypesByCategory } from '@/hooks/useServiceTypes';
import { handleApiError, validateCNPJ, validateEmail, validateBrazilianPhone, handleValidationError } from '@/utils/errorHandling';

// Schema de validação com Zod
const providerSchema = z.object({
  company_name: z.string().min(3, 'Nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string().refine(validateCNPJ, 'CNPJ inválido'),
  phone: z.string().refine(validateBrazilianPhone, 'Telefone inválido'),
  whatsapp: z.string().optional().refine((val) => !val || validateBrazilianPhone(val), 'WhatsApp inválido'),
  email: z.string().email('Email inválido'),
  city_id: z.string().min(1, 'Selecione uma cidade'),
  service_types: z.array(z.string()).min(1, 'Selecione pelo menos um tipo de serviço'),
  address: z.string().optional(),
  business_area: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  pix_type: z.string().optional(),
  pix_key: z.string().optional(),
});

interface ProfileFormProps {
  onSave?: (profile: ProviderProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave }) => {
  const { data: profile, isLoading: loadingProfile } = useProviderProfile();
  const { data: cities, isLoading: loadingCities } = useCities();
  const { data: servicesByCategory, isLoading: loadingServices } = useServiceTypesByCategory();
  const updateProfile = useUpdateProviderProfile();
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<ProviderProfile>({
    resolver: zodResolver(providerSchema),
    defaultValues: profile || {}
  });
  
  const watchedServiceTypes = watch('service_types') || [];
  const watchedCityId = watch('city_id');
  
  React.useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach(key => {
        setValue(key as keyof ProviderProfile, profile[key as keyof ProviderProfile]);
      });
    }
  }, [profile, setValue]);

  // Auto-fill state when city is selected
  React.useEffect(() => {
    if (watchedCityId && cities) {
      const selectedCity = cities.find(city => city.id === watchedCityId);
      if (selectedCity) {
        setValue('state', selectedCity.state);
      }
    }
  }, [watchedCityId, cities, setValue]);
  
  const onSubmit = async (data: ProviderProfile) => {
    try {
      console.log('📝 Submitting provider profile:', data);
      const updatedProfile = await updateProfile.mutateAsync(data);
      onSave?.(updatedProfile);
    } catch (error) {
      handleApiError(error, 'Erro ao salvar perfil');
    }
  };
  
  const toggleServiceType = (serviceTypeId: string) => {
    const currentTypes = watchedServiceTypes;
    const newTypes = currentTypes.includes(serviceTypeId)
      ? currentTypes.filter(id => id !== serviceTypeId)
      : [...currentTypes, serviceTypeId];
    setValue('service_types', newTypes);
    trigger('service_types'); // Validate after change
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    ).slice(0, 18);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };
  
  if (loadingProfile || loadingCities || loadingServices) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Nome da Empresa *</Label>
              <Input
                id="company_name"
                {...register('company_name')}
                placeholder="Ex: Auto Service Ltda"
              />
              {errors.company_name && (
                <p className="text-sm text-red-600 mt-1">{errors.company_name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                {...register('cnpj')}
                placeholder="00.000.000/0000-00"
                onChange={(e) => {
                  const formatted = formatCNPJ(e.target.value);
                  setValue('cnpj', formatted);
                  trigger('cnpj');
                }}
              />
              {errors.cnpj && (
                <p className="text-sm text-red-600 mt-1">{errors.cnpj.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="business_area">Área de Atuação</Label>
            <Input
              id="business_area"
              {...register('business_area')}
              placeholder="Ex: Oficina mecânica, Elétrica automotiva"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Endereço Completo</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Rua, número, bairro"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city_id">Cidade *</Label>
              <Select onValueChange={(value) => setValue('city_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name} - {city.state_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city_id && (
                <p className="text-sm text-red-600 mt-1">{errors.city_id.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="Estado"
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="zip_code">CEP</Label>
              <Input
                id="zip_code"
                {...register('zip_code')}
                placeholder="00000-000"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="(11) 99999-9999"
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue('phone', formatted);
                  trigger('phone');
                }}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                {...register('whatsapp')}
                placeholder="(11) 99999-9999"
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue('whatsapp', formatted);
                  trigger('whatsapp');
                }}
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-600 mt-1">{errors.whatsapp.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="contato@empresa.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Serviços Oferecidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(servicesByCategory || {}).map(([category, services]) => (
              <div key={category}>
                <h4 className="font-medium mb-2 capitalize">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={watchedServiceTypes.includes(service.id)}
                        onCheckedChange={() => toggleServiceType(service.id)}
                      />
                      <Label htmlFor={service.id} className="text-sm">
                        {service.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {errors.service_types && (
            <p className="text-sm text-red-600 mt-2">{errors.service_types.message}</p>
          )}
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Serviços selecionados:</p>
            <div className="flex flex-wrap gap-2">
              {watchedServiceTypes.map((typeId) => {
                const service = Object.values(servicesByCategory || {})
                  .flat()
                  .find(s => s.id === typeId);
                return service ? (
                  <Badge key={typeId} variant="secondary">
                    {service.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pix_type">Tipo PIX</Label>
              <Select onValueChange={(value) => setValue('pix_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="pix_key">Chave PIX</Label>
              <Input
                id="pix_key"
                {...register('pix_key')}
                placeholder="Sua chave PIX"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={updateProfile.isPending}
      >
        {updateProfile.isPending ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Salvando...
          </>
        ) : (
          'Salvar Perfil'
        )}
      </Button>
    </form>
  );
};
