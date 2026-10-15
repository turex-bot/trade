// Base types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  full_name: string;
  role: 'admin' | 'operator' | 'finance';
  is_active: boolean;
}

// Supplier types
export interface Supplier extends BaseEntity {
  name: string;
  owner_name: string;
  phone: string;
  email?: string;
  address: string;
  bank_account: string;
  bank_name: string;
  npwp?: string;
  status: 'aktif' | 'nonaktif';
}

// Company types
export interface Company extends BaseEntity {
  name: string;
  pic_name: string;
  pic_phone: string;
  address: string;
  npwp?: string;
  top_days: number;
  credit_limit: number;
  risk_rating: 'A' | 'B' | 'C';
  status: 'aktif' | 'nonaktif';
}

// Wood Spec types
export interface WoodSpec extends BaseEntity {
  wood_type: string;
  diameter_range: string;
  diameter_min: number;
  diameter_max: number;
  avg_diameter: number;
  standard_length: number;
  volume_per_log: number;
  grade: 'Reguler' | 'Premium';
  unit: string;
  notes?: string;
}

// Price types
export interface Price extends BaseEntity {
  wood_spec_id: string;
  wood_spec_name: string;
  buy_price: number;
  trader_margin: number;
  sell_price: number;
  effective_date: string;
  is_active: boolean;
}

// Order types
export interface Order extends BaseEntity {
  order_number: string;
  no_kedatangan: string;
  no_kendaraan: string;
  order_date: string;
  company_id: string;
  company_name: string;
  supplier_id: string;
  supplier_name: string;
  status: 'draft' | 'confirmed' | 'in_delivery' | 'received' | 'invoiced' | 'paid' | 'cancelled';
  items: OrderItem[];
  total_volume: number;
  total_value: number;
  total_after_pph: number;
  notes?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  wood_spec_id: string;
  wood_spec_name: string;
  number_of_logs: number;
  volume: number;
  diameter_range: string;
  buy_price: number;
  sell_price: number;
  total_buy_value: number;
  total_sell_value: number;
  created_at: string;
}

// Payment types
export interface Payment {
  id: string;
  invoice_id?: string;
  invoice_number: string;
  payment_date: string;
  amount: number;
  method: 'transfer' | 'cash' | 'giro' | 'cek';
  reference?: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expires_at: string;
}
