import { Badge } from "@/components/ui/badge";
import { Book } from "@/types/Book";

interface StatusBadgeProps {
  status: Book['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return {
          variant: 'secondary' as const,
          className: 'bg-success text-success-foreground hover:bg-success/80',
          label: 'Available'
        };
      case 'issued':
        return {
          variant: 'secondary' as const,
          className: 'bg-warning text-warning-foreground hover:bg-warning/80',
          label: 'Issued'
        };
      case 'overdue':
        return {
          variant: 'destructive' as const,
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
          label: 'Overdue'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}