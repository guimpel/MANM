
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function CreateTestUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const setupTestUsers = async () => {
    setIsLoading(true);
    try {
      // Get the current session token to use for authorization
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        toast.error("Você precisa estar logado para criar usuários de teste");
        return;
      }

      const response = await fetch('https://obhewylgtyxuuhrmwzvn.supabase.co/functions/v1/setup-test-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Usuários de teste criados com sucesso!`);
        console.log('Test users created:', data);
      } else {
        toast.error(`Falha ao criar usuários de teste: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating test users:', error);
      toast.error(`Erro ao criar usuários de teste: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={setupTestUsers} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Criando usuários...
        </>
      ) : (
        'Criar usuários de teste'
      )}
    </Button>
  );
}
