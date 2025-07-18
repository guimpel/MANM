
export interface UserProfile {
  id: string;
  user_type: 'client' | 'provider' | 'integrator';
  first_name: string;
  last_name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  plan_id?: string;
}

// Integrator related interfaces
export interface IntegratorUser {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone?: string;
  role: IntegratorUserRole;
  active: boolean;
  createdAt: string;
  lastAccess?: string;
  password?: string;
}

export type IntegratorUserRole = 'admin' | 'financial' | 'fiscal' | 'accounts' | 'technical' | 'commercial' | 'support' | 'negotiator';

// Service related interfaces
export interface ServiceRequest {
  id: string;
  client_id: string;
  provider_id: string;
  clientName?: string;
  clientCnpj?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  request_date?: string;
  requestDate?: string;
  service_type: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'canceled';
  approved: boolean;
  approverName?: string;
  approval_date?: string;
  startDate?: string;
  endDate?: string;
  mileage?: string;
  warranty?: string;
  services: ServiceItem[] | ServiceItem;
  photos?: ServicePhoto[];
  created_at?: string;
  updated_at?: string;
  estimated_cost?: number;
  final_cost?: number;
  total_price?: number;
  completion_date?: string;
  user_profiles?: {
    first_name: string;
    last_name: string;
  };
  providerInfo?: {
    name: string;
    logo: string;
  };
}

export interface ServiceItem {
  name: string;
  price?: number;
}

export interface ServicePricing {
  name: string;
  price: string;
}

export interface ServicePhoto {
  step: 'before' | 'during' | 'after';
  url: string;
  description?: string;
}

// Client and Provider interfaces
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  phone: string;
  subscription: {
    plan: string;
    status: 'active' | 'trial' | 'inactive';
    startDate: string;
    endDate?: string;
  };
  creditLimit: number;
  creditStatus: 'approved' | 'pending' | 'rejected';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  createdAt: string;
  createdBy: string;
}

export interface Provider {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  phone: string;
  services: string[];
  location: {
    city: string;
    state: string;
    coverage: string[];
  };
  rating: number;
  completedServices: number;
  pendingServices: number;
  createdAt: string;
}

// Performance metrics
export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  target: number;
  unit: string;
  period: string;
}

// Vehicle
export interface Vehicle {
  id: string;
  model: string;
  plate: string;
  year: number;
  client_id: string;
  created_at?: string;
}

// Service
export interface Service {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
}

// Surface related interfaces
export interface SurfaceDevice {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastConnection?: string;
  metadata?: Record<string, any>;
}

export interface SurfaceMetric {
  deviceId: string;
  timestamp: string;
  metricType: string;
  value: number;
  unit: string;
}

export interface MotorData {
  id: string;
  serviceRequestId: string;
  timestamp: string;
  temperature: number;
  rpm: number;
  vibration: number;
  noise: number;
  status: 'normal' | 'warning' | 'critical';
  oilPressure: number;
  fuelLevel: number;
}
