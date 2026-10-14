// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  SUPPLIERS: '/suppliers',
  COMPANIES: '/companies',
  WOOD_SPECS: '/wood-specs',
  PRICES: '/prices',
  ORDERS: '/orders',
  DELIVERIES: '/deliveries',
  INVOICES: '/invoices',
  PAYMENTS: '/payments',
} as const;

// App Routes
export const APP_ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  SUPPLIERS: '/master/suppliers',
  COMPANIES: '/master/companies',
  WOOD_SPECS: '/master/wood-specs',
  PRICES: '/master/prices',
  ORDERS: '/transactions/orders',
  DELIVERIES: '/transactions/deliveries',
  PAYABLES: '/finance/payables',
  RECEIVABLES: '/finance/receivables',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  AUDIT_LOG: '/audit-log',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  FINANCE: 'finance',
} as const;

// Order Status
export const ORDER_STATUS = {
  DRAFT: 'draft',
  CONFIRMED: 'confirmed',
  IN_DELIVERY: 'in_delivery',
  RECEIVED: 'received',
  INVOICED: 'invoiced',
  PAID: 'paid',
  CANCELLED: 'cancelled',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  TRANSFER: 'transfer',
  CASH: 'cash',
  GIRO: 'giro',
  CEK: 'cek',
} as const;

// Trader Margin
export const TRADER_MARGIN_PER_M3 = 15000; // Rp15.000 per m³

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
} as const;
