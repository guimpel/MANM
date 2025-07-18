
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSurfaceDevices } from '@/hooks/useSurfaceData';
import { testSurfaceConnection, updateDeviceStatus } from '@/services/surfaceService';
import { SurfaceDevice } from '@/types/serviceRequest';
import { toast } from 'sonner';
import { RefreshCw, Wifi, WifiOff, Settings, Monitor } from 'lucide-react';

export const DevicesList = () => {
  const { data: devices, isLoading, error, refetch } = useSurfaceDevices();
  const [updating, setUpdating] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  
  const handleStatusChange = async (deviceId: string, newStatus: 'online' | 'offline' | 'maintenance') => {
    setUpdating(deviceId);
    try {
      const success = await updateDeviceStatus(deviceId, newStatus);
      if (success) {
        toast.success(`Status do dispositivo atualizado para ${newStatus}`);
        refetch();
      } else {
        toast.error('Falha ao atualizar status do dispositivo');
      }
    } catch (error) {
      toast.error('Erro ao comunicar com o servidor');
      console.error(error);
    } finally {
      setUpdating(null);
    }
  };
  
  const handleTestConnection = async () => {
    setTesting(true);
    try {
      const connected = await testSurfaceConnection();
      if (connected) {
        toast.success('Conexão com Surface API estabelecida com sucesso');
      } else {
        toast.error('Não foi possível conectar ao Surface API');
      }
    } catch (error) {
      toast.error('Erro ao testar conexão');
      console.error(error);
    } finally {
      setTesting(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': 
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline': 
        return <Badge className="bg-red-500">Offline</Badge>;
      case 'maintenance': 
        return <Badge className="bg-yellow-500">Manutenção</Badge>;
      default: 
        return <Badge className="bg-gray-500">Desconhecido</Badge>;
    }
  };
  
  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sensor':
        return <Monitor className="h-5 w-5 text-blue-500" />;
      case 'motor':
        return <Settings className="h-5 w-5 text-green-500" />;
      default:
        return <Wifi className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Dispositivos Surface</CardTitle>
            <CardDescription>Lista de dispositivos conectados</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetch()} 
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center p-6 text-center">
            <WifiOff className="h-12 w-12 text-red-500 mb-2" />
            <p className="text-red-500 font-medium">Erro ao carregar dispositivos</p>
            <p className="text-gray-500 mt-2">
              Não foi possível conectar ao servidor Surface. Verifique sua conexão.
            </p>
          </div>
        ) : devices && devices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Conexão</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device: SurfaceDevice) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {getDeviceIcon(device.type)}
                    {device.name}
                  </TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{getStatusBadge(device.status)}</TableCell>
                  <TableCell>
                    {device.lastConnection 
                      ? new Date(device.lastConnection).toLocaleString('pt-BR') 
                      : 'Nunca'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={updating === device.id || device.status === 'online'}
                        onClick={() => handleStatusChange(device.id, 'online')}
                      >
                        Ativar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={updating === device.id || device.status === 'maintenance'}
                        onClick={() => handleStatusChange(device.id, 'maintenance')}
                      >
                        Manutenção
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center p-6 text-center">
            <p className="text-gray-500">
              Nenhum dispositivo encontrado.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-gray-500">
          {devices ? `${devices.length} dispositivos encontrados` : '0 dispositivos'}
        </span>
        <Button 
          onClick={handleTestConnection} 
          disabled={testing}
        >
          {testing ? 'Testando...' : 'Testar conexão'}
        </Button>
      </CardFooter>
    </Card>
  );
};
