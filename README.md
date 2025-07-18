
# Sistema Imovan - Plataforma de Gestão Automotiva

Sistema completo para gestão de serviços automotivos, conectando frotas, oficinas e fornecedores em uma plataforma integrada.

## 🚀 Funcionalidades Principais

### 👥 Multi-perfil de usuários
- **Clientes/Frotas**: Solicitar serviços, acompanhar cotações
- **Fornecedores/Oficinas**: Receber solicitações, enviar cotações
- **Integradores**: Gestão completa da plataforma

### 🔧 Gestão de Serviços
- Cadastro completo de tipos de serviço (manutenção, reparo, peças)
- Sistema de cotações multi-item
- Acompanhamento de status em tempo real
- Integração WhatsApp para comunicação

### 📱 Integração WhatsApp
- Envio de cotações via WhatsApp Web
- Formatação automática de telefones brasileiros
- Validação de números e DDDs

### 🏢 Gestão de Fornecedores
- Cadastro completo com validação CNPJ
- Seleção de áreas de atuação
- Sistema de avaliações
- Autocomplete de cidades

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Estado**: TanStack Query (React Query)
- **UI**: Shadcn/ui, Radix UI
- **Formulários**: React Hook Form + Zod
- **Testes**: Jest, React Testing Library

## 📊 Arquitetura do Banco

### Entidades Principais

```sql
-- Perfis de usuário
user_profiles (id, user_type, first_name, last_name, plan_id)

-- Perfis de fornecedores
provider_profiles (
  id, user_id, company_name, cnpj, address,
  city_id, service_types[], rating, total_services,
  phone_formatted, whatsapp_formatted
)

-- Tipos de serviço
service_types (id, name, category, description, active)

-- Cidades
cities (id, name, state, state_code, active)

-- Solicitações de serviço
fleet_requests (
  id, client_id, vehicle_id, description,
  service_type_id, location_city_id, status, priority
)

-- Cotações
quotes (id, request_id, provider_id, price, message, status)

-- Itens da cotação
quote_items (
  id, quote_id, service_type_id, description,
  quantity, unit_price, total_price
)
```

### RLS (Row Level Security)

Políticas de segurança implementadas:
- **Isolamento por usuário**: Cada perfil só acessa seus dados
- **Permissões por tipo**: Integradores têm acesso administrativo
- **Leitura pública**: Cidades e tipos de serviço são públicos

## 🚀 Configuração e Execução

### Pré-requisitos
- Node.js 18+
- Conta no Supabase

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd sistema-imovan

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Execute o projeto
npm run dev
```

### Configuração do Supabase

1. Crie um projeto no Supabase
2. Execute as migrações SQL (ver arquivo `migrations.sql`)
3. Configure as políticas RLS
4. Ative a autenticação por email

## 📋 Fluxos Principais

### 1. Cadastro de Fornecedor

```typescript
// Hook para atualizar perfil
const updateProfile = useUpdateProviderProfile();

// Dados do formulário
const profileData = {
  company_name: "Auto Service Ltda",
  cnpj: "12.345.678/0001-90",
  phone: "(11) 99999-9999",
  whatsapp: "(11) 99999-9999",
  email: "contato@autoservice.com",
  city_id: "city-uuid",
  service_types: ["service-type-uuid-1", "service-type-uuid-2"]
};

// Submissão com validação automática
await updateProfile.mutateAsync(profileData);
```

### 2. Criação de Cotação

```typescript
// Hook para criar item da cotação
const createQuoteItem = useCreateQuoteItem();

// Dados do item
const itemData = {
  quote_id: "quote-uuid",
  service_type_id: "service-type-uuid",
  description: "Troca de óleo completa",
  quantity: 1,
  unit_price: 80.00
};

// Criação automática do total_price via trigger
await createQuoteItem.mutateAsync(itemData);
```

### 3. Envio via WhatsApp

```typescript
import { sendQuoteViaWhatsApp } from '@/services/whatsappService';

// Enviar cotação
sendQuoteViaWhatsApp(clientPhone, {
  clientName: "João Silva",
  companyName: "Auto Service Ltda",
  totalValue: 350.00,
  items: [
    {
      description: "Troca de óleo",
      quantity: 1,
      unitPrice: 80.00,
      total: 80.00
    }
  ]
});
```

## 🧪 Testes

### Executar testes

```bash
# Todos os testes
npm test

# Testes específicos
npm test -- hooks
npm test -- integration

# Coverage
npm run test:coverage
```

### Estrutura de Testes

- **Unitários**: Hooks individuais (`src/hooks/__tests__/`)
- **Integração**: Fluxos completos (`src/hooks/__tests__/integration.test.ts`)
- **Componentes**: UI e interações

## 🔒 Segurança

### Validações Implementadas

- **CNPJ**: Algoritmo completo de validação
- **Telefone**: DDD e formato brasileiro
- **Email**: Regex de validação
- **RLS**: Isolamento de dados por usuário

### Tratamento de Erros

```typescript
import { handleApiError } from '@/utils/errorHandling';

try {
  await operation();
} catch (error) {
  handleApiError(error, 'Mensagem personalizada');
}
```

## 📱 Integração WhatsApp

### Funcionalidades

- **Validação**: Números brasileiros com DDD
- **Formatação**: Padrão +55 (DD) 9XXXX-XXXX
- **Envio**: Link direto para WhatsApp Web
- **Templates**: Mensagem estruturada de cotação

### Uso

```typescript
// Botão de envio
<WhatsAppQuoteButton
  clientName="João Silva"
  clientPhone="11999887766"
  companyName="Auto Service"
  quoteItems={items}
/>
```

## 🎯 Próximos Passos

### Melhorias Planejadas

- [ ] Notificações push em tempo real
- [ ] Dashboard analytics avançado
- [ ] Integração com sistemas ERP
- [ ] App mobile React Native
- [ ] API pública para integrações

### Otimizações

- [ ] Cache de consultas frequentes
- [ ] Lazy loading de componentes
- [ ] Compressão de imagens
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou suporte:
- Email: suporte@imovan.com.br
- WhatsApp: (11) 99999-9999
- Documentação: [docs.imovan.com.br](https://docs.imovan.com.br)

---

**Sistema Imovan** - Conectando o ecossistema automotivo brasileiro 🚗⚡
