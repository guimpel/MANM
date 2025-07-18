
import { PlanManager } from "@/components/integrator/plans/PlanManager";
import { IntegratorLayout } from "@/components/integrator/IntegratorLayout";

export default function IntegratorPlans() {
  return (
    <IntegratorLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Planos</h1>
        <p className="text-muted-foreground">
          Crie e gerencie planos para clientes e fornecedores
        </p>
        
        <div className="mt-8">
          <PlanManager />
        </div>
      </div>
    </IntegratorLayout>
  );
}
