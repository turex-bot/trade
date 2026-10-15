/**
 * Business Constants
 * Fix Issue #10: Centralize magic numbers
 */

export const BUSINESS_CONSTANTS = {
  // Pricing
  TRADER_MARGIN_PER_M3: 15, // Rp15 per m³
  
  // Tax
  PPH_22_RATE: 0.0025, // 0.25%
  PPH_22_MULTIPLIER: 0.9975, // 1 - 0.0025
  
  // Volume
  MAX_UPLOAD_SIZE_MB: 5,
  MAX_UPLOAD_SIZE_BYTES: 5 * 1024 * 1024,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Session
  SESSION_TIMEOUT_MINUTES: 30,
  REMEMBER_ME_DAYS: 7,
  
  // Validation
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_ADDRESS_LENGTH: 500,
  MAX_NOTES_LENGTH: 1000,
  
  // Status
  ORDER_STATUS: {
    DRAFT: 'draft',
    CONFIRMED: 'confirmed',
    IN_DELIVERY: 'in_delivery',
    RECEIVED: 'received',
    INVOICED: 'invoiced',
    PAID: 'paid',
    CANCELLED: 'cancelled',
  } as const,
  
  PAYMENT_STATUS: {
    UNPAID: 'unpaid',
    PARTIAL: 'partial',
    PAID: 'paid',
  } as const,
  
  USER_ROLES: {
    ADMIN: 'admin',
    OPERATOR: 'operator',
    FINANCE: 'finance',
  } as const,
  
  RISK_RATINGS: {
    LOW: 'A',
    MEDIUM: 'B',
    HIGH: 'C',
  } as const,
  
  GRADES: {
    REGULER: 'Reguler',
    PREMIUM: 'Premium',
  } as const,
  
  STATUS: {
    ACTIVE: 'aktif',
    INACTIVE: 'nonaktif',
  } as const,
  
  PAYMENT_METHODS: {
    TRANSFER: 'transfer',
    CASH: 'cash',
    GIRO: 'giro',
    CEK: 'cek',
  } as const,
} as const;

// Export individual constants for convenience
export const {
  TRADER_MARGIN_PER_M3,
  PPH_22_RATE,
  PPH_22_MULTIPLIER,
  MAX_UPLOAD_SIZE_MB,
  MAX_UPLOAD_SIZE_BYTES,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  SESSION_TIMEOUT_MINUTES,
  REMEMBER_ME_DAYS,
  MIN_PASSWORD_LENGTH,
  MAX_NAME_LENGTH,
  MAX_ADDRESS_LENGTH,
  MAX_NOTES_LENGTH,
} = BUSINESS_CONSTANTS;
