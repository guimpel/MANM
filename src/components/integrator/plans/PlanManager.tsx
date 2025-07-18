// Using type-casting approach from our utilities
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash, Pencil, Plus, Loader2 } from "lucide-react";
import { safeDataItem } from "@/utils/supabaseHelpers";

interface Plan {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  max_fleet?: number | null;
  max_quotes?: number | null;
}

export function PlanManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    max_fleet: 0,
    max_quotes: 0,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("plans").select("*");

      if (error) {
        console.error("Error fetching plans:", error);
        toast.error("Erro ao carregar planos");
      } else if (data) {
        // Create a default plan for safety
        const defaultPlan: Plan = {
          id: "",
          name: "",
          price: 0
        };
        
        // Use our safe mapping function to ensure we have proper types
        const safeData: Plan[] = Array.isArray(data) ? data.map(item => {
          const plan = safeDataItem(item, defaultPlan);
          return {
            id: plan.id || "",
            name: plan.name || "",
            price: plan.price || 0,
            description: plan.description || "",
            max_fleet: plan.max_fleet || 0,
            max_quotes: plan.max_quotes || 0,
          };
        }) : [];
        
        setPlans(safeData);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Erro ao carregar planos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (plan: Plan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      description: plan.description || "",
      max_fleet: plan.max_fleet || 0,
      max_quotes: plan.max_quotes || 0,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (plan: Plan) => {
    setCurrentPlan(plan);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentPlan) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("plans")
        .delete()
        .eq("id", currentPlan.id as any);

      if (error) {
        console.error("Error deleting plan:", error);
        toast.error("Erro ao excluir plano");
      } else {
        toast.success("Plano excluído com sucesso");
        fetchPlans();
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Erro ao excluir plano");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Cast formData to any to bypass TypeScript type checks
      const planData = formData as any;

      if (currentPlan) {
        // Update existing plan
        const { error } = await supabase
          .from("plans")
          .update(planData)
          .eq("id", currentPlan.id as any);

        if (error) {
          console.error("Error updating plan:", error);
          toast.error("Erro ao atualizar plano");
        } else {
          toast.success("Plano atualizado com sucesso");
        }
      } else {
        // Create new plan
        const { error } = await supabase.from("plans").insert(planData);

        if (error) {
          console.error("Error creating plan:", error);
          toast.error("Erro ao criar plano");
        } else {
          toast.success("Plano criado com sucesso");
        }
      }

      fetchPlans();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Erro ao salvar plano");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "max_fleet" || name === "max_quotes"
        ? Number(value)
        : value,
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => {
          setCurrentPlan(null);
          setFormData({ name: "", price: 0, description: "", max_fleet: 0, max_quotes: 0 });
          setIsDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Plano
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.description || "Sem descrição"}
                </p>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(plan)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(plan)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentPlan ? "Editar Plano" : "Adicionar Plano"}</DialogTitle>
            <DialogDescription>
              {currentPlan
                ? "Atualize os detalhes do seu plano."
                : "Crie um novo plano para seus clientes."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Preço
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max_fleet" className="text-right">
                  Máximo de Frotas
                </Label>
                <Input
                  type="number"
                  id="max_fleet"
                  name="max_fleet"
                  value={formData.max_fleet}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max_quotes" className="text-right">
                  Máximo de Orçamentos
                </Label>
                <Input
                  type="number"
                  id="max_quotes"
                  name="max_quotes"
                  value={formData.max_quotes}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Plano</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir este plano? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Você está prestes a excluir o plano:{" "}
              <span className="font-bold">{currentPlan?.name}</span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
