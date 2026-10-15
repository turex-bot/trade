export interface Supplier {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  bankAccount: string;
  bankName: string;
  npwp: string;
  status: 'aktif' | 'nonaktif';
}

export interface Company {
  id: string;
  name: string;
  picName: string;
  picPhone: string;
  address: string;
  npwp: string;
  topDays: number;
  creditLimit: number;
  riskRating: 'A' | 'B' | 'C';
  status: 'aktif' | 'nonaktif';
}

export interface WoodSpec {
  id: string;
  woodType: string;
  diameterRange: string;
  diameterMin: number;
  diameterMax: number;
  avgDiameter: number;
  standardLength: number;
  volumePerLog: number;
  grade: 'Reguler' | 'Premium';
  unit: string;
  notes: string;
}

export interface Price {
  id: string;
  woodSpecId: string;
  woodSpecName: string;
  buyPrice: number;
  traderMargin: number;
  sellPrice: number;
  effectiveDate: string;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  woodSpecId: string;
  woodSpecName: string;
  numberOfLogs: number;
  volume: number;
  diameterRange: string;
  buyPrice: number;
  sellPrice: number;
  totalBuyValue: number;
  totalSellValue: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  companyId: string;
  companyName: string;
  supplierId: string;
  supplierName: string;
  status: 'draft' | 'confirmed' | 'in_delivery' | 'received' | 'invoiced' | 'paid' | 'cancelled';
  items: OrderItem[];
  totalVolume: number;
  totalValue: number;
  totalAfterPPH: number; // Total - PPH 22 (0.25%) - Total setelah dipotong pajak
  notes: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  paymentDate: string;
  amount: number;
  method: string;
  reference: string;
}

export const suppliers: Supplier[] = [];
export const companies: Company[] = [];
export const woodSpecs: WoodSpec[] = [];
export const prices: Price[] = [];
export const orders: Order[] = [];
export const payments: Payment[] = [];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};
