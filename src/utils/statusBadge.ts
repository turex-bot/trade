/**
 * Status Badge Utility
 * Fix Issue #9: Centralize status badge logic
 */

export type BadgeVariant = 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple';

export interface StatusConfig {
  variant: BadgeVariant;
  label: string;
}

/**
 * Order status configuration
 */
export const ORDER_STATUS_CONFIG: Record<string, StatusConfig> = {
  draft: { variant: 'gray', label: 'Draft' },
  confirmed: { variant: 'blue', label: 'Dikonfirmasi' },
  in_delivery: { variant: 'yellow', label: 'Dalam Pengiriman' },
  received: { variant: 'purple', label: 'Diterima' },
  invoiced: { variant: 'orange', label: 'Ditagihkan' },
  paid: { variant: 'green', label: 'Lunas' },
  cancelled: { variant: 'red', label: 'Dibatalkan' },
};

/**
 * Payment status configuration
 */
export const PAYMENT_STATUS_CONFIG: Record<string, StatusConfig> = {
  unpaid: { variant: 'red', label: 'Belum Dibayar' },
  partial: { variant: 'yellow', label: 'Sebagian' },
  paid: { variant: 'green', label: 'Lunas' },
};

/**
 * Payables status configuration (Uang Keluar)
 */
export const PAYABLES_STATUS_CONFIG: Record<string, StatusConfig> = {
  draft: { variant: 'gray', label: 'Draft' },
  confirmed: { variant: 'blue', label: 'Harus Bayar' },
  in_delivery: { variant: 'yellow', label: 'Dalam Pengiriman' },
  received: { variant: 'purple', label: 'Barang Diterima' },
  paid: { variant: 'green', label: 'Sudah Dibayar' },
};

/**
 * Receivables status configuration (Uang Masuk)
 */
export const RECEIVABLES_STATUS_CONFIG: Record<string, StatusConfig> = {
  confirmed: { variant: 'blue', label: 'Perlu Invoice' },
  invoiced: { variant: 'orange', label: 'Sudah Ditagih' },
  paid: { variant: 'green', label: 'Sudah Dibayar' },
};

/**
 * Result Check status configuration
 */
export const RESULT_CHECK_STATUS_CONFIG: Record<string, StatusConfig> = {
  confirmed: { variant: 'blue', label: 'Dikonfirmasi' },
  paid: { variant: 'green', label: 'Lunas' },
};

/**
 * Delivery status configuration
 */
export const DELIVERY_STATUS_CONFIG: Record<string, StatusConfig> = {
  pending: { variant: 'gray', label: 'Pending' },
  in_transit: { variant: 'yellow', label: 'Dalam Pengiriman' },
  received: { variant: 'green', label: 'Diterima' },
  rejected: { variant: 'red', label: 'Ditolak' },
};

/**
 * Supplier/Company status configuration
 */
export const ENTITY_STATUS_CONFIG: Record<string, StatusConfig> = {
  aktif: { variant: 'green', label: 'Aktif' },
  nonaktif: { variant: 'gray', label: 'Nonaktif' },
};

/**
 * Price status configuration
 */
export const PRICE_STATUS_CONFIG: Record<string, StatusConfig> = {
  true: { variant: 'green', label: 'Aktif' },
  false: { variant: 'gray', label: 'Tidak Aktif' },
};

/**
 * Risk rating configuration
 */
export const RISK_RATING_CONFIG: Record<string, StatusConfig> = {
  A: { variant: 'green', label: 'Risiko Rendah' },
  B: { variant: 'yellow', label: 'Risiko Sedang' },
  C: { variant: 'red', label: 'Risiko Tinggi' },
};

/**
 * Grade configuration
 */
export const GRADE_CONFIG: Record<string, StatusConfig> = {
  Reguler: { variant: 'blue', label: 'Reguler' },
  Premium: { variant: 'green', label: 'Premium' },
};

/**
 * Get status config with fallback
 */
export const getStatusConfig = (
  status: string,
  configMap: Record<string, StatusConfig>
): StatusConfig => {
  return configMap[status] || { variant: 'gray', label: status };
};

/**
 * Aging category configuration
 */
export const AGING_CATEGORY_CONFIG: Record<string, StatusConfig> = {
  'Belum Jatuh Tempo': { variant: 'green', label: 'Belum Jatuh Tempo' },
  '1-30 hari': { variant: 'yellow', label: '1-30 hari' },
  '31-60 hari': { variant: 'orange', label: '31-60 hari' },
  '>60 hari': { variant: 'red', label: '>60 hari' },
};
