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
  grade: 'A' | 'B' | 'C';
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
  volume: number;
  buyPrice: number;
  sellPrice: number;
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

// Mock Data
export const suppliers: Supplier[] = [
  { id: '1', name: 'Depo Kayu Makmur', ownerName: 'Pak Hartono', phone: '081234567890', email: 'makmur@email.com', address: 'Jl. Hutan Pinus No. 45, Samarinda', bankAccount: '1234567890', bankName: 'BCA', npwp: '01.234.567.8-901.000', status: 'aktif' },
  { id: '2', name: 'Depo Kayu Sejahtera', ownerName: 'Pak Budi', phone: '081234567891', email: 'sejahtera@email.com', address: 'Jl. Meranti Raya No. 12, Balikpapan', bankAccount: '2345678901', bankName: 'Mandiri', npwp: '02.345.678.9-012.000', status: 'aktif' },
  { id: '3', name: 'Depo Kayu Lestari', ownerName: 'Pak Agus', phone: '081234567892', email: 'lestari@email.com', address: 'Jl. Keruing Indah No. 8, Pontianak', bankAccount: '3456789012', bankName: 'BRI', npwp: '03.456.789.0-123.000', status: 'aktif' },
  { id: '4', name: 'Depo Kayu Prima', ownerName: 'Pak Surya', phone: '081234567893', email: 'prima@email.com', address: 'Jl. Akasia No. 22, Banjarmasin', bankAccount: '4567890123', bankName: 'BNI', npwp: '', status: 'nonaktif' },
];

export const companies: Company[] = [
  { id: '1', name: 'PT. Plywood Nusantara', picName: 'Ibu Sari', picPhone: '081111111111', address: 'Kawasan Industri Jababeka, Cikarang', npwp: '11.111.111.1-111.000', topDays: 30, creditLimit: 500000000, riskRating: 'A', status: 'aktif' },
  { id: '2', name: 'PT. Kayu Jaya Abadi', picName: 'Pak Dedi', picPhone: '081222222222', address: 'Jl. Industri No. 5, Surabaya', npwp: '22.222.222.2-222.000', topDays: 45, creditLimit: 350000000, riskRating: 'B', status: 'aktif' },
  { id: '3', name: 'PT. Multi Plywood Indonesia', picName: 'Pak Rudi', picPhone: '081333333333', address: 'Jl. Pelabuhan No. 10, Semarang', npwp: '33.333.333.3-333.000', topDays: 60, creditLimit: 750000000, riskRating: 'A', status: 'aktif' },
  { id: '4', name: 'PT. Timber Solutions', picName: 'Ibu Linda', picPhone: '081444444444', address: 'Jl. Kayu No. 33, Makassar', npwp: '44.444.444.4-444.000', topDays: 30, creditLimit: 200000000, riskRating: 'C', status: 'aktif' },
];

export const woodSpecs: WoodSpec[] = [
  { id: '1', woodType: 'Meranti', diameterRange: '20–30 cm', grade: 'A', unit: 'm³', notes: 'Bebas kulit, kadar air maks 15%' },
  { id: '2', woodType: 'Meranti', diameterRange: '30–40 cm', grade: 'A', unit: 'm³', notes: 'Kualitas premium, lurus' },
  { id: '3', woodType: 'Keruing', diameterRange: '20–30 cm', grade: 'B', unit: 'm³', notes: 'Untuk core plywood' },
  { id: '4', woodType: 'Akasia', diameterRange: '15–25 cm', grade: 'B', unit: 'm³', notes: 'Kadar air maks 20%' },
  { id: '5', woodType: 'Sengon', diameterRange: '20–30 cm', grade: 'C', unit: 'm³', notes: 'Untuk face & back' },
];

export const prices: Price[] = [
  { id: '1', woodSpecId: '1', woodSpecName: 'Meranti 20-30cm Grade A', buyPrice: 1200000, traderMargin: 15000, sellPrice: 1215000, effectiveDate: '2025-01-01', isActive: true },
  { id: '2', woodSpecId: '2', woodSpecName: 'Meranti 30-40cm Grade A', buyPrice: 1400000, traderMargin: 15000, sellPrice: 1415000, effectiveDate: '2025-01-01', isActive: true },
  { id: '3', woodSpecId: '3', woodSpecName: 'Keruing 20-30cm Grade B', buyPrice: 950000, traderMargin: 15000, sellPrice: 965000, effectiveDate: '2025-01-01', isActive: true },
  { id: '4', woodSpecId: '4', woodSpecName: 'Akasia 15-25cm Grade B', buyPrice: 800000, traderMargin: 15000, sellPrice: 815000, effectiveDate: '2025-01-01', isActive: true },
  { id: '5', woodSpecId: '5', woodSpecName: 'Sengon 20-30cm Grade C', buyPrice: 650000, traderMargin: 15000, sellPrice: 665000, effectiveDate: '2025-01-01', isActive: true },
];

export const orders: Order[] = [
  { id: '1', orderNumber: 'ORD-202501-0001', orderDate: '2025-01-15', companyId: '1', companyName: 'PT. Plywood Nusantara', supplierId: '1', supplierName: 'Depo Kayu Makmur', status: 'paid', items: [{ id: '1', woodSpecName: 'Meranti 20-30cm Grade A', volume: 50, buyPrice: 1200000, sellPrice: 1215000 }], totalVolume: 50, totalValue: 60750000, notes: 'Pesanan rutin Januari' },
  { id: '2', orderNumber: 'ORD-202501-0002', orderDate: '2025-01-20', companyId: '2', companyName: 'PT. Kayu Jaya Abadi', supplierId: '2', supplierName: 'Depo Kayu Sejahtera', status: 'invoiced', items: [{ id: '2', woodSpecName: 'Keruing 20-30cm Grade B', volume: 35, buyPrice: 950000, sellPrice: 965000 }], totalVolume: 35, totalValue: 33775000, notes: '' },
  { id: '3', orderNumber: 'ORD-202502-0001', orderDate: '2025-02-05', companyId: '3', companyName: 'PT. Multi Plywood Indonesia', supplierId: '1', supplierName: 'Depo Kayu Makmur', status: 'in_delivery', items: [{ id: '3', woodSpecName: 'Meranti 30-40cm Grade A', volume: 80, buyPrice: 1400000, sellPrice: 1415000 }], totalVolume: 80, totalValue: 113200000, notes: 'Pesanan besar Q1' },
  { id: '4', orderNumber: 'ORD-202502-0002', orderDate: '2025-02-10', companyId: '1', companyName: 'PT. Plywood Nusantara', supplierId: '3', supplierName: 'Depo Kayu Lestari', status: 'confirmed', items: [{ id: '4', woodSpecName: 'Akasia 15-25cm Grade B', volume: 40, buyPrice: 800000, sellPrice: 815000 }], totalVolume: 40, totalValue: 32600000, notes: '' },
  { id: '5', orderNumber: 'ORD-202502-0003', orderDate: '2025-02-15', companyId: '4', companyName: 'PT. Timber Solutions', supplierId: '2', supplierName: 'Depo Kayu Sejahtera', status: 'draft', items: [{ id: '5', woodSpecName: 'Sengon 20-30cm Grade C', volume: 25, buyPrice: 650000, sellPrice: 665000 }], totalVolume: 25, totalValue: 16625000, notes: 'Menunggu approval' },
  { id: '6', orderNumber: 'ORD-202501-0003', orderDate: '2025-01-25', companyId: '3', companyName: 'PT. Multi Plywood Indonesia', supplierId: '1', supplierName: 'Depo Kayu Makmur', status: 'received', items: [{ id: '6', woodSpecName: 'Meranti 20-30cm Grade A', volume: 60, buyPrice: 1200000, sellPrice: 1215000 }], totalVolume: 60, totalValue: 72900000, notes: '' },
];

export const deliveries: Delivery[] = [
  { id: '1', doNumber: 'DO-202501-0001', orderId: '1', orderNumber: 'ORD-202501-0001', deliveryDate: '2025-01-17', vehiclePlate: 'KT 1234 AB', driverName: 'Pak Joko', actualVolume: 50, receiveDate: '2025-01-18', status: 'received', receivedBy: 'Ibu Sari' },
  { id: '2', doNumber: 'DO-202501-0002', orderId: '2', orderNumber: 'ORD-202501-0002', deliveryDate: '2025-01-22', vehiclePlate: 'L 5678 CD', driverName: 'Pak Tono', actualVolume: 35, receiveDate: '2025-01-23', status: 'received', receivedBy: 'Pak Dedi' },
  { id: '3', doNumber: 'DO-202502-0001', orderId: '3', orderNumber: 'ORD-202502-0001', deliveryDate: '2025-02-07', vehiclePlate: 'KT 9012 EF', driverName: 'Pak Wahyu', actualVolume: 80, receiveDate: null, status: 'in_transit', receivedBy: '' },
  { id: '4', doNumber: 'DO-202501-0003', orderId: '6', orderNumber: 'ORD-202501-0003', deliveryDate: '2025-01-27', vehiclePlate: 'KT 3456 GH', driverName: 'Pak Budi', actualVolume: 60, receiveDate: '2025-01-28', status: 'received', receivedBy: 'Pak Rudi' },
];

export const invoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-202501-0001', deliveryId: '1', companyId: '1', companyName: 'PT. Plywood Nusantara', invoiceDate: '2025-01-18', dueDate: '2025-02-17', totalAmount: 60750000, paidAmount: 60750000, status: 'paid', agingDays: 0, agingCategory: 'Lunas' },
  { id: '2', invoiceNumber: 'INV-202501-0002', deliveryId: '2', companyId: '2', companyName: 'PT. Kayu Jaya Abadi', invoiceDate: '2025-01-23', dueDate: '2025-03-09', totalAmount: 33775000, paidAmount: 0, status: 'unpaid', agingDays: 15, agingCategory: 'Belum Jatuh Tempo' },
  { id: '3', invoiceNumber: 'INV-202501-0003', deliveryId: '4', companyId: '3', companyName: 'PT. Multi Plywood Indonesia', invoiceDate: '2025-01-28', dueDate: '2025-03-29', totalAmount: 72900000, paidAmount: 30000000, status: 'partial', agingDays: 5, agingCategory: 'Belum Jatuh Tempo' },
  { id: '4', invoiceNumber: 'INV-202412-0001', deliveryId: '5', companyId: '4', companyName: 'PT. Timber Solutions', invoiceDate: '2024-12-15', dueDate: '2025-01-14', totalAmount: 25000000, paidAmount: 0, status: 'unpaid', agingDays: 62, agingCategory: '>60 hari' },
  { id: '5', invoiceNumber: 'INV-202501-0004', deliveryId: '6', companyId: '1', companyName: 'PT. Plywood Nusantara', invoiceDate: '2025-01-10', dueDate: '2025-02-09', totalAmount: 45000000, paidAmount: 0, status: 'unpaid', agingDays: 35, agingCategory: '31-60 hari' },
];

export const payments: Payment[] = [
  { id: '1', invoiceId: '1', invoiceNumber: 'INV-202501-0001', paymentDate: '2025-02-15', amount: 60750000, method: 'transfer', reference: 'TRF-BCA-001234' },
  { id: '2', invoiceId: '3', invoiceNumber: 'INV-202501-0003', paymentDate: '2025-02-20', amount: 30000000, method: 'transfer', reference: 'TRF-MDR-005678' },
];

// Dashboard data
export const dashboardSummary = {
  totalReceivable: 176675000,
  monthlyProfit: 1950000,
  totalVolume: 290,
  overdueInvoices: 2,
};

export const receivableByCompany = [
  { name: 'PT. Plywood Nusantara', amount: 45000000, color: '#166534' },
  { name: 'PT. Kayu Jaya Abadi', amount: 33775000, color: '#16a34a' },
  { name: 'PT. Multi Plywood', amount: 42900000, color: '#22c55e' },
  { name: 'PT. Timber Solutions', amount: 25000000, color: '#ef4444' },
];

export const volumeProfitTrend = [
  { month: 'Sep', volume: 180, profit: 2700000 },
  { month: 'Oct', volume: 220, profit: 3300000 },
  { month: 'Nov', volume: 195, profit: 2925000 },
  { month: 'Dec', volume: 250, profit: 3750000 },
  { month: 'Jan', volume: 210, profit: 3150000 },
  { month: 'Feb', volume: 290, profit: 1950000 },
];

export const agingSummary = [
  { category: 'Belum Jatuh Tempo', count: 2, amount: 76675000, color: '#22c55e' },
  { category: '1-30 hari', count: 0, amount: 0, color: '#eab308' },
  { category: '31-60 hari', count: 1, amount: 45000000, color: '#f97316' },
  { category: '>60 hari', count: 1, amount: 25000000, color: '#ef4444' },
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
