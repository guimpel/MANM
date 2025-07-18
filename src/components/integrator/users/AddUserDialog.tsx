
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { IntegratorUser, IntegratorUserRole } from "@/types/serviceRequest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: Partial<IntegratorUser>) => void;
  roleLabels: Record<string, string>;
  roleDescriptions: Record<string, string>;
};

export const AddUserDialog = ({
  open,
  onOpenChange,
  onAddUser,
  roleLabels,
  roleDescriptions,
}: AddUserDialogProps) => {
  const [newUser, setNewUser] = useState<Partial<IntegratorUser>>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    role: "technical",
    active: true,
  });

  const formatCpf = (cpf: string) => {
    if (!cpf) return "";
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleAddUser = () => {
    onAddUser(newUser);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Complete as informações para criar um novo usuário no sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Nome do usuário"
                value={newUser.name || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={formatCpf(newUser.cpf || "")}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    cpf: e.target.value.replace(/\D/g, ""),
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={newUser.email || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                value={newUser.phone || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="role">Função</Label>
            <Select
              value={newUser.role as string}
              onValueChange={(value) =>
                setNewUser({ ...newUser, role: value as IntegratorUserRole })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {newUser.role && roleDescriptions[newUser.role as IntegratorUserRole]}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={newUser.active}
              onCheckedChange={(checked) =>
                setNewUser({ ...newUser, active: checked })
              }
            />
            <Label htmlFor="active">Usuário Ativo</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddUser}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
