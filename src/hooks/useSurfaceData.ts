
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SurfaceDevice, SurfaceMetric, MotorData } from '@/types/serviceRequest';
import { fetchDevices, fetchDeviceMetrics, fetchMotorData } from '@/services/surfaceService';

// Hook para buscar todos os dispositivos
export const useSurfaceDevices = () => {
  return useQuery({
    queryKey: ['surfaceDevices'],
    queryFn: fetchDevices,
    staleTime: 60000, // 1 minute
  });
};

// Hook para buscar métricas de um dispositivo específico
export const useDeviceMetrics = (deviceId: string) => {
  return useQuery({
    queryKey: ['deviceMetrics', deviceId],
    queryFn: () => fetchDeviceMetrics(deviceId),
    staleTime: 30000, // 30 seconds
    enabled: !!deviceId, // Só executa se tiver um deviceId
  });
};

// Hook para buscar dados do motor para uma requisição de serviço
export const useMotorData = (serviceRequestId: string) => {
  return useQuery({
    queryKey: ['motorData', serviceRequestId],
    queryFn: () => fetchMotorData(serviceRequestId),
    staleTime: 15000, // 15 seconds
    enabled: !!serviceRequestId,
  });
};

// Hook para monitorar dados do motor em tempo real com polling
export const useRealTimeMotorData = (serviceRequestId: string) => {
  const [latestData, setLatestData] = useState<MotorData | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['motorData', serviceRequestId],
    queryFn: () => fetchMotorData(serviceRequestId),
    enabled: isMonitoring && !!serviceRequestId,
    refetchInterval: isMonitoring ? 5000 : false, // Polling a cada 5 segundos se monitoramento ativo
  });
  
  useEffect(() => {
    if (data && data.length > 0) {
      // Ordenar por timestamp (mais recente primeiro)
      const sortedData = [...data].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setLatestData(sortedData[0]);
    }
  }, [data]);
  
  // Iniciar monitoramento
  const startMonitoring = () => {
    setIsMonitoring(true);
    refetch();
  };
  
  // Parar monitoramento
  const stopMonitoring = () => {
    setIsMonitoring(false);
  };
  
  return { latestData, isLoading, error, isMonitoring, startMonitoring, stopMonitoring };
};
