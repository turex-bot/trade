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
  diameterMin: number; // cm
  diameterMax: number; // cm
  avgDiameter: number; // cm - diameter rata-rata untuk kalkulasi
  standardLength: number; // cm - panjang standar batang (PENTING: dalam cm, bukan meter!)
  volumePerLog: number; // m³ per batang (dihitung dari diameter & panjang)
  grade: 'Reguler' | 'Premium';
  unit: string;
  notes: string;
}

export interface Price {
  id: string;
  woodSpecId: string;
  woodSpecName: string;
  buyPrice: number; // harga beli per m³
  buyPricePerLog: number; // harga beli per batang (otomatis)
  traderMargin: number; // margin per m³
  sellPrice: number; // harga jual per m³
  sellPricePerLog: number; // harga jual per batang (otomatis)
  effectiveDate: string;
  isActive: boolean;
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
  notes: string;
}

export interface OrderItem {
  id: string;
  woodSpecName: string;
  woodSpecId: string;
  numberOfLogs: number; // jumlah batang (pcs)
  volume: number; // total kubikasi dalam m³ (input dari user)
  diameterRange: string; // range diameter dari master data (contoh: "19-24 cm")
  buyPrice: number; // harga beli per m³
  sellPrice: number; // harga jual per m³
  totalBuyValue: number; // volume × buyPrice
  totalSellValue: number; // volume × sellPrice
}

export interface Delivery {
  id: string;
  doNumber: string;
  orderId: string;
  orderNumber: string;
  deliveryDate: string;
  vehiclePlate: string;
  driverName: string;
  actualVolume: number;
  receiveDate: string | null;
  status: 'pending' | 'in_transit' | 'received' | 'rejected';
  receivedBy: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  deliveryId: string;
  companyId: string;
  companyName: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'unpaid' | 'partial' | 'paid';
  agingDays: number;
  agingCategory: string;
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

// Mock Data - Empty for testing
export const suppliers: Supplier[] = [];

export const companies: Company[] = [];

export const woodSpecs: WoodSpec[] = [];

export const prices: Price[] = [];

export const orders: Order[] = [];

export const deliveries: Delivery[] = [];

export const invoices: Invoice[] = [];

export const payments: Payment[] = [];

// Dashboard data - Empty for testing
export const dashboardSummary = {
  totalReceivable: 0,
  monthlyProfit: 0,
  totalVolume: 0,
  overdueInvoices: 0,
};

export const receivableByCompany: { name: string; amount: number; color: string }[] = [];

export const volumeProfitTrend: { month: string; volume: number; profit: number }[] = [];

export const agingSummary = [
  { category: 'Belum Jatuh Tempo', count: 0, amount: 0, color: '#22c55e' },
  { category: '1-30 hari', count: 0, amount: 0, color: '#eab308' },
  { category: '31-60 hari', count: 0, amount: 0, color: '#f97316' },
  { category: '>60 hari', count: 0, amount: 0, color: '#ef4444' },
];

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};
