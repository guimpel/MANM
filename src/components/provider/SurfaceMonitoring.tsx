
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotorStatus } from '@/components/surface/MotorStatus';
import { DevicesList } from '@/components/surface/DevicesList';
import { useParams } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

export const SurfaceMonitoring = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const { id: serviceRequestId } = useParams<{ id: string }>();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monitoramento Surface</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="devices" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="motor">Status do Motor</TabsTrigger>
          </TabsList>
          <TabsContent value="devices" className="mt-4">
            <DevicesList />
          </TabsContent>
          <TabsContent value="motor" className="mt-4">
            <MotorStatus serviceRequestId={serviceRequestId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SurfaceMonitoring;
