
import { Badge } from "@/components/ui/badge";

type Status = 'pending' | 'in-progress' | 'completed' | 'rejected' | 'canceled' | string;

interface ServiceRequestStatusBadgeProps {
  status: Status;
}

export function ServiceRequestStatusBadge({ status }: ServiceRequestStatusBadgeProps) {
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendente',
          variant: 'warning' as const
        };
      case 'in-progress':
        return {
          label: 'Em Andamento',
          variant: 'info' as const
        };
      case 'completed':
        return {
          label: 'Concluído',
          variant: 'success' as const
        };
      case 'rejected':
        return {
          label: 'Rejeitado',
          variant: 'destructive' as const
        };
      case 'canceled':
        return {
          label: 'Cancelado',
          variant: 'destructive' as const
        };
      default:
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          variant: 'default' as const
        };
    }
  };

  const { label, variant } = getStatusConfig(status);

  return (
    <Badge variant={variant}>{label}</Badge>
  );
}
