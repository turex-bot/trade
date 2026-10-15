import { Badge } from '../ui';

interface StatusBadgeProps {
  status: string;
  type?: 'order' | 'payment' | 'supplier' | 'company';
}

export function StatusBadge({ status, type = 'order' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (type) {
      case 'order':
        return getOrderStatusConfig(status);
      case 'payment':
        return getPaymentStatusConfig(status);
      case 'supplier':
      case 'company':
        return getEntityStatusConfig(status);
      default:
        return { variant: 'gray' as const, label: status };
    }
  };

  const config = getStatusConfig();
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
}

function getOrderStatusConfig(status: string) {
  const configs: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
    draft: { variant: 'gray', label: 'Draft' },
    confirmed: { variant: 'blue', label: 'Dikonfirmasi' },
    in_delivery: { variant: 'yellow', label: 'Dalam Pengiriman' },
    received: { variant: 'purple', label: 'Diterima' },
    invoiced: { variant: 'orange', label: 'Ditagihkan' },
    paid: { variant: 'green', label: 'Lunas' },
    cancelled: { variant: 'red', label: 'Dibatalkan' },
  };
  return configs[status] || { variant: 'gray', label: status };
}

function getPaymentStatusConfig(status: string) {
  const configs: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
    unpaid: { variant: 'red', label: 'Belum Dibayar' },
    partial: { variant: 'yellow', label: 'Sebagian' },
    paid: { variant: 'green', label: 'Lunas' },
  };
  return configs[status] || { variant: 'gray', label: status };
}

function getEntityStatusConfig(status: string) {
  const configs: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
    aktif: { variant: 'green', label: 'Aktif' },
    nonaktif: { variant: 'gray', label: 'Nonaktif' },
  };
  return configs[status] || { variant: 'gray', label: status };
}
