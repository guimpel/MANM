
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DevicesList } from '@/components/surface/DevicesList';
import { MotorStatus } from '@/components/surface/MotorStatus';
import { Building2, Gauge, Settings, LogOut, Database } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const SurfaceDashboard = () => {
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  
  // Mock data para exemplo
  const recentServices = [
    { id: 'service1', clientName: 'Empresa ABC', vehicle: 'Toyota Corolla', date: '2025-05-08' },
    { id: 'service2', clientName: 'Transportes XYZ', vehicle: 'Ford Ranger', date: '2025-05-07' },
    { id: 'service3', clientName: 'Logística Rápida', vehicle: 'Fiat Ducato', date: '2025-05-06' },
  ];
  
  const selectService = (id: string) => {
    setServiceId(id);
    toast.info(`Monitorando serviço ${id}`);
  };
  
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Conteúdo da página aqui, sem Sidebar duplicado */}
      <Toaster />
    </div>
  );
};

export default SurfaceDashboard;
