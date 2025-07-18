
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRealTimeMotorData } from '@/hooks/useSurfaceData';
import { Gauge, AlertTriangle, CheckCircle, Power } from 'lucide-react';

interface MotorStatusProps {
  serviceRequestId?: string;
}

export const MotorStatus = ({ serviceRequestId }: MotorStatusProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const { 
    latestData, 
    isLoading, 
    error, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring 
  } = useRealTimeMotorData(serviceRequestId || '');
  
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'normal': 
        return <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>;
      case 'warning': 
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Atenção</Badge>;
      case 'critical': 
        return <Badge className="bg-red-500 hover:bg-red-600">Crítico</Badge>;
      default: 
        return <Badge className="bg-gray-500">Desconhecido</Badge>;
    }
  };
  
  if (!serviceRequestId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status do Motor</CardTitle>
          <CardDescription>Nenhum serviço selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center p-6">
            <p className="text-gray-500">Selecione um serviço para monitorar o motor</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status do Motor</CardTitle>
          <CardDescription>Erro ao carregar dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center p-4 space-y-2">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <p className="text-red-500">Falha na conexão com o dispositivo</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => startMonitoring()}>Tentar novamente</Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Status do Motor</CardTitle>
            <CardDescription>
              {isMonitoring ? 'Monitorando em tempo real' : 'Monitoramento pausado'}
            </CardDescription>
          </div>
          {latestData && getStatusBadge(latestData.status)}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && !latestData ? (
          <div className="flex justify-center items-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : latestData ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Gauge className="h-8 w-8 mr-2 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">RPM</p>
                  <p className="text-2xl font-bold">{latestData.rpm}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(latestData.status)} mr-2`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Temperatura</p>
                  <p className="text-2xl font-bold">{latestData.temperature}°C</p>
                </div>
              </div>
            </div>
            
            {showDetails && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Pressão do óleo</p>
                  <p className="font-medium">{latestData.oilPressure} psi</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Nível de combustível</p>
                  <p className="font-medium">{latestData.fuelLevel}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md col-span-2">
                  <p className="text-sm text-gray-500">Última atualização</p>
                  <p className="font-medium">
                    {new Date(latestData.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-4 space-y-2">
            <Power className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Inicie o monitoramento</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowDetails(!showDetails)}
          disabled={!latestData}
        >
          {showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        </Button>
        {isMonitoring ? (
          <Button onClick={stopMonitoring} variant="destructive">
            Parar monitoramento
          </Button>
        ) : (
          <Button onClick={startMonitoring}>
            Iniciar monitoramento
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
