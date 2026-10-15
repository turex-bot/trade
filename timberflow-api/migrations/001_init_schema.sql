-- TimberFlow Database Schema
-- PostgreSQL 15+

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'operator', 'finance')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  address TEXT NOT NULL,
  bank_account VARCHAR(100) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  npwp VARCHAR(50),
  status VARCHAR(50) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  pic_name VARCHAR(255) NOT NULL,
  pic_phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  npwp VARCHAR(50),
  top_days INT NOT NULL CHECK (top_days > 0),
  credit_limit DECIMAL(15,2) NOT NULL DEFAULT 0 CHECK (credit_limit >= 0),
  risk_rating VARCHAR(10) NOT NULL CHECK (risk_rating IN ('A', 'B', 'C')),
  status VARCHAR(50) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Wood specifications table
CREATE TABLE IF NOT EXISTS wood_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wood_type VARCHAR(255) NOT NULL,
  diameter_range VARCHAR(100) NOT NULL,
  diameter_min DECIMAL(5,2) NOT NULL CHECK (diameter_min >= 0),
  diameter_max DECIMAL(5,2) NOT NULL CHECK (diameter_max >= 0),
  avg_diameter DECIMAL(5,2) NOT NULL CHECK (avg_diameter >= 0),
  standard_length DECIMAL(5,2) NOT NULL CHECK (standard_length >= 0),
  volume_per_log DECIMAL(10,4) NOT NULL CHECK (volume_per_log >= 0),
  grade VARCHAR(50) NOT NULL CHECK (grade IN ('Reguler', 'Premium')),
  unit VARCHAR(50) DEFAULT 'm³',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Prices table
CREATE TABLE IF NOT EXISTS prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wood_spec_id UUID REFERENCES wood_specs(id) ON DELETE CASCADE,
  wood_spec_name VARCHAR(255) NOT NULL,
  buy_price DECIMAL(15,2) NOT NULL CHECK (buy_price >= 0),
  buy_price_per_log DECIMAL(15,2) NOT NULL CHECK (buy_price_per_log >= 0),
  trader_margin DECIMAL(15,2) DEFAULT 15000,
  sell_price DECIMAL(15,2) NOT NULL CHECK (sell_price >= 0),
  sell_price_per_log DECIMAL(15,2) NOT NULL CHECK (sell_price_per_log >= 0),
  effective_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(100) UNIQUE NOT NULL,
  order_date DATE NOT NULL,
  company_id UUID REFERENCES companies(id),
  company_name VARCHAR(255) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  supplier_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'in_delivery', 'received', 'invoiced', 'paid', 'cancelled')),
  total_volume DECIMAL(10,2) NOT NULL CHECK (total_volume >= 0),
  total_value DECIMAL(15,2) NOT NULL CHECK (total_value >= 0),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  wood_spec_id UUID REFERENCES wood_specs(id),
  wood_spec_name VARCHAR(255) NOT NULL,
  number_of_logs INT NOT NULL CHECK (number_of_logs > 0),
  log_diameters DECIMAL(5,2)[] NOT NULL,
  log_length DECIMAL(5,2) NOT NULL CHECK (log_length >= 0),
  volume_dm3 DECIMAL(10,2) NOT NULL CHECK (volume_dm3 >= 0),
  volume DECIMAL(10,2) NOT NULL CHECK (volume >= 0),
  buy_price_per_log DECIMAL(15,2) NOT NULL CHECK (buy_price_per_log >= 0),
  sell_price_per_log DECIMAL(15,2) NOT NULL CHECK (sell_price_per_log >= 0),
  buy_price DECIMAL(15,2) NOT NULL CHECK (buy_price >= 0),
  sell_price DECIMAL(15,2) NOT NULL CHECK (sell_price >= 0),
  total_buy_value DECIMAL(15,2) NOT NULL CHECK (total_buy_value >= 0),
  total_sell_value DECIMAL(15,2) NOT NULL CHECK (total_sell_value >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  do_number VARCHAR(100) UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id),
  order_number VARCHAR(100) NOT NULL,
  delivery_date DATE,
  vehicle_plate VARCHAR(50),
  driver_name VARCHAR(255),
  actual_volume DECIMAL(10,2),
  receive_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'received', 'rejected')),
  received_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  delivery_id UUID REFERENCES deliveries(id),
  order_id UUID REFERENCES orders(id),
  company_id UUID REFERENCES companies(id),
  company_name VARCHAR(255) NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL CHECK (total_amount >= 0),
  paid_amount DECIMAL(15,2) DEFAULT 0 CHECK (paid_amount >= 0),
  status VARCHAR(50) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'partial', 'paid')),
  aging_days INT DEFAULT 0,
  aging_category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id),
  invoice_number VARCHAR(100) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL CHECK (amount >= 0),
  method VARCHAR(50) CHECK (method IN ('transfer', 'cash', 'giro', 'cek')),
  reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fix Issue #15: Comprehensive indexes for performance optimization

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Suppliers indexes
CREATE INDEX IF NOT EXISTS idx_suppliers_name ON suppliers(name);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_deleted_at ON suppliers(deleted_at);

-- Companies indexes
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_risk_rating ON companies(risk_rating);
CREATE INDEX IF NOT EXISTS idx_companies_deleted_at ON companies(deleted_at);

-- Wood specs indexes
CREATE INDEX IF NOT EXISTS idx_wood_specs_wood_type ON wood_specs(wood_type);
CREATE INDEX IF NOT EXISTS idx_wood_specs_grade ON wood_specs(grade);
CREATE INDEX IF NOT EXISTS idx_wood_specs_deleted_at ON wood_specs(deleted_at);

-- Prices indexes
CREATE INDEX IF NOT EXISTS idx_prices_wood_spec_id ON prices(wood_spec_id);
CREATE INDEX IF NOT EXISTS idx_prices_effective_date ON prices(effective_date);
CREATE INDEX IF NOT EXISTS idx_prices_is_active ON prices(is_active);
CREATE INDEX IF NOT EXISTS idx_prices_deleted_at ON prices(deleted_at);

-- Orders indexes (critical for performance)
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_company_id ON orders(company_id);
CREATE INDEX IF NOT EXISTS idx_orders_supplier_id ON orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_deleted_at ON orders(deleted_at);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_company_status ON orders(company_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_supplier_status ON orders(supplier_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_date_status ON orders(order_date, status);

-- Order items indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_wood_spec_id ON order_items(wood_spec_id);

-- Deliveries indexes
CREATE INDEX IF NOT EXISTS idx_deliveries_do_number ON deliveries(do_number);
CREATE INDEX IF NOT EXISTS idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_status ON deliveries(status);
CREATE INDEX IF NOT EXISTS idx_deliveries_delivery_date ON deliveries(delivery_date);
CREATE INDEX IF NOT EXISTS idx_deliveries_deleted_at ON deliveries(deleted_at);

-- Invoices indexes
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_company_id ON invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_date ON invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_deleted_at ON invoices(deleted_at);

-- Composite indexes for invoice queries
CREATE INDEX IF NOT EXISTS idx_invoices_company_status ON invoices(company_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_status ON invoices(due_date, status);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_payments_method ON payments(method);

-- Seed Admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role, is_active)
VALUES (
  'admin@timberflow.id',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin User',
  'admin',
  true
) ON CONFLICT (email) DO NOTHING;
