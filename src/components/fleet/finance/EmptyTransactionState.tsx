
import { FileText } from "lucide-react";

interface EmptyTransactionStateProps {
  status: "pending" | "approved" | "rejected";
}

export function EmptyTransactionState({ status }: EmptyTransactionStateProps) {
  const messages = {
    pending: {
      title: "Nenhum pagamento pendente",
      description: "Todos os pagamentos foram processados."
    },
    approved: {
      title: "Nenhum pagamento aprovado encontrado",
      description: "Nenhum registro corresponde aos critérios de busca."
    },
    rejected: {
      title: "Nenhum pagamento rejeitado encontrado",
      description: "Nenhum registro corresponde aos critérios de busca."
    }
  };

  const { title, description } = messages[status];

  return (
    <div className="text-center py-8">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-2 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
