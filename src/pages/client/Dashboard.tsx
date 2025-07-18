
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

const FrotistaDashboard: React.FC = () => {
  const { userProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard do Frotista</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo, {userProfile?.first_name || "Frotista"}!</h2>
        <p className="text-gray-600">
          Este é o seu dashboard como frotista na plataforma IMOVAN. Aqui você pode gerenciar sua frota,
          solicitar serviços e acompanhar o status das suas solicitações.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Veículos</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500">Veículos cadastrados</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Serviços</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500">Solicitações em andamento</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Manutenções</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500">Manutenções realizadas</p>
        </div>
      </div>
    </div>
  );
};

export default FrotistaDashboard;
