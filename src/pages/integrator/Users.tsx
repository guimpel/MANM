
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { mockIntegratorUsers } from "@/mocks/integratorData";
import { IntegratorUser, IntegratorUserRole } from "@/types/serviceRequest";
import { toast } from "sonner";
import { UserTable } from "@/components/integrator/users/UserTable";
import { AddUserDialog } from "@/components/integrator/users/AddUserDialog";
import { EditUserDialog } from "@/components/integrator/users/EditUserDialog";
import { DeleteUserDialog } from "@/components/integrator/users/DeleteUserDialog";

export default function IntegratorUsers() {
  const [users, setUsers] = useState<IntegratorUser[]>(mockIntegratorUsers);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IntegratorUser | null>(null);
  const [newUser, setNewUser] = useState<Partial<IntegratorUser>>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    role: "technical",
    active: true,
  });

  const roleLabels: Record<IntegratorUserRole, string> = {
    admin: "Administrador",
    financial: "Financeiro",
    fiscal: "Fiscal",
    accounts: "Contas a Pagar",
    technical: "Técnico",
    commercial: "Comercial",
    support: "Suporte",
    negotiator: "Negociador",
  };

  const roleDescriptions: Record<IntegratorUserRole, string> = {
    admin: "Acesso total ao sistema",
    financial: "Gerencia cobranças, inadimplência e crédito de clientes",
    fiscal: "Gerencia área contábil e fiscal de NFEs",
    accounts: "Controla pagamentos a fornecedores",
    technical: "Acessa chamados de suporte técnico",
    commercial: "Realiza captação e cadastro de clientes",
    support: "Suporte ao cliente",
    negotiator: "Negociação com clientes e fornecedores",
  };

  const handleOpenAddDialog = () => {
    setNewUser({
      name: "",
      cpf: "",
      email: "",
      phone: "",
      role: "technical",
      active: true,
    });
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (user: IntegratorUser) => {
    setSelectedUser(user);
    setNewUser({ ...user });
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (user: IntegratorUser) => {
    setSelectedUser(user);
    setDeleteConfirmOpen(true);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.cpf || !newUser.email || !newUser.role) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newId = `USR-${String(users.length + 1).padStart(3, "0")}`;
    const userToAdd = {
      ...newUser,
      id: newId,
      createdAt: new Date().toISOString(),
      active: true,
    } as IntegratorUser;

    setUsers([...users, userToAdd]);
    setOpenAddDialog(false);
    toast.success("Usuário adicionado com sucesso!");
  };

  const handleUpdateUser = () => {
    if (!selectedUser || !newUser.name || !newUser.email || !newUser.role) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...newUser } : user
    );

    setUsers(updatedUsers);
    setOpenEditDialog(false);
    toast.success("Usuário atualizado com sucesso!");
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setDeleteConfirmOpen(false);
    toast.success("Usuário removido com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie os usuários da plataforma.
          </p>
        </div>
        <Button onClick={handleOpenAddDialog}>
          <UserPlus className="mr-2 h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários da Plataforma</CardTitle>
          <CardDescription>
            Total de {users.length} usuários cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable 
            users={users} 
            onEdit={handleOpenEditDialog} 
            onDelete={handleOpenDeleteDialog}
            roleLabels={roleLabels}
          />
        </CardContent>
      </Card>

      {/* Dialog para adicionar usuário */}
      <AddUserDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onAddUser={handleAddUser}
        roleLabels={roleLabels}
        roleDescriptions={roleDescriptions}
      />

      {/* Dialog para editar usuário */}
      <EditUserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onUpdateUser={handleUpdateUser}
        selectedUser={selectedUser}
        newUser={newUser}
        setNewUser={setNewUser}
        roleLabels={roleLabels}
        roleDescriptions={roleDescriptions}
      />

      {/* Dialog de confirmação para excluir usuário */}
      <DeleteUserDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onDeleteUser={handleDeleteUser}
        selectedUser={selectedUser}
      />
    </div>
  );
}
