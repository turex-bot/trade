/**
 * Seed Data untuk Testing
 * 
 * File ini berisi data contoh yang bisa digunakan untuk testing.
 * Untuk menggunakan, import fungsi seed yang sesuai dan panggil di komponen yang diperlukan.
 * 
 * Contoh penggunaan:
 * ```typescript
 * import { seedSuppliers, seedCompanies } from './seedData';
 * 
 * // Di dalam komponen atau useEffect
 * useEffect(() => {
 *   suppliers.push(...seedSuppliers());
 *   companies.push(...seedCompanies());
 * }, []);
 * ```
 */

import { Supplier, Company, WoodSpec, Price, Order, OrderItem, Delivery, Invoice, Payment } from './mockData';

// Helper function untuk membuat OrderItem dengan diameter aktual per batang
const createOrderItem = (
  id: string,
  woodSpecId: string,
  woodSpecName: string,
  logDiameters: number[], // diameter aktual per batang dalam cm
  logLengthCm: number, // panjang batang dalam cm (PENTING: dalam cm, bukan meter!)
  buyPricePerLog: number,
  sellPricePerLog: number,
  buyPricePerM3: number,
  sellPricePerM3: number
): OrderItem => {
  // Hitung volume per batang berdasarkan diameter aktual
  // PENTING: logLengthCm sudah dalam cm, tidak perlu dikali 100 lagi!
  const volumeM3 = logDiameters.reduce((total, diameter) => {
    const diameterM = diameter / 100;
    const lengthM = logLengthCm / 100;
    const volumePerLogM3 = (Math.PI / 4) * (diameterM * diameterM) * lengthM;
    return total + volumePerLogM3;
  }, 0);
  
  const volumeDm3 = volumeM3 * 1000; // konversi ke dm³
  
  return {
    id,
    woodSpecId,
    woodSpecName,
    numberOfLogs: logDiameters.length,
    logDiameters,
    logLength: logLengthCm,
    volumeDm3: Math.round(volumeDm3 * 100) / 100,
    volume: Math.round(volumeM3 * 1000) / 1000,
    buyPricePerLog,
    sellPricePerLog,
    buyPrice: buyPricePerM3,
    sellPrice: sellPricePerM3,
    totalBuyValue: logDiameters.length * buyPricePerLog,
    totalSellValue: logDiameters.length * sellPricePerLog,
  };
};

// Seed Suppliers
export function seedSuppliers(): Supplier[] {
  return [
    { 
      id: '1', 
      name: 'Depo Kayu Makmur', 
      ownerName: 'Pak Hartono', 
      phone: '081234567890', 
      email: 'makmur@email.com', 
      address: 'Jl. Hutan Pinus No. 45, Samarinda', 
      bankAccount: '1234567890', 
      bankName: 'BCA', 
      npwp: '01.234.567.8-901.000', 
      status: 'aktif' 
    },
    { 
      id: '2', 
      name: 'Depo Kayu Sejahtera', 
      ownerName: 'Pak Budi', 
      phone: '081234567891', 
      email: 'sejahtera@email.com', 
      address: 'Jl. Meranti Raya No. 12, Balikpapan', 
      bankAccount: '2345678901', 
      bankName: 'Mandiri', 
      npwp: '02.345.678.9-012.000', 
      status: 'aktif' 
    },
    { 
      id: '3', 
      name: 'Depo Kayu Lestari', 
      ownerName: 'Pak Agus', 
      phone: '081234567892', 
      email: 'lestari@email.com', 
      address: 'Jl. Keruing Indah No. 8, Pontianak', 
      bankAccount: '3456789012', 
      bankName: 'BRI', 
      npwp: '03.456.789.0-123.000', 
      status: 'aktif' 
    },
  ];
}

// Seed Companies
export function seedCompanies(): Company[] {
  return [
    { 
      id: '1', 
      name: 'PT. Plywood Nusantara', 
      picName: 'Ibu Sari', 
      picPhone: '081111111111', 
      address: 'Kawasan Industri Jababeka, Cikarang', 
      npwp: '11.111.111.1-111.000', 
      topDays: 30, 
      creditLimit: 500000000, 
      riskRating: 'A', 
      status: 'aktif' 
    },
    { 
      id: '2', 
      name: 'PT. Kayu Jaya Abadi', 
      picName: 'Pak Dedi', 
      picPhone: '081222222222', 
      address: 'Jl. Industri No. 5, Surabaya', 
      npwp: '22.222.222.2-222.000', 
      topDays: 45, 
      creditLimit: 350000000, 
      riskRating: 'B', 
      status: 'aktif' 
    },
    { 
      id: '3', 
      name: 'PT. Multi Plywood Indonesia', 
      picName: 'Pak Rudi', 
      picPhone: '081333333333', 
      address: 'Jl. Pelabuhan No. 10, Semarang', 
      npwp: '33.333.333.3-333.000', 
      topDays: 60, 
      creditLimit: 750000000, 
      riskRating: 'A', 
      status: 'aktif' 
    },
  ];
}

// Seed Wood Specs
export function seedWoodSpecs(): WoodSpec[] {
  return [
    { 
      id: '1', 
      woodType: 'Meranti', 
      diameterRange: '20–30 cm', 
      diameterMin: 20,
      diameterMax: 30,
      avgDiameter: 25,
      standardLength: 400, // PENTING: dalam cm (4 meter = 400 cm)
      volumePerLog: 0.196,
      grade: 'Premium', 
      unit: 'm³', 
      notes: 'Bebas kulit, kadar air maks 15%' 
    },
    { 
      id: '2', 
      woodType: 'Meranti', 
      diameterRange: '30–40 cm', 
      diameterMin: 30,
      diameterMax: 40,
      avgDiameter: 35,
      standardLength: 400, // PENTING: dalam cm
      volumePerLog: 0.385,
      grade: 'Premium', 
      unit: 'm³', 
      notes: 'Kualitas premium, lurus' 
    },
    { 
      id: '3', 
      woodType: 'Keruing', 
      diameterRange: '20–30 cm', 
      diameterMin: 20,
      diameterMax: 30,
      avgDiameter: 25,
      standardLength: 400, // PENTING: dalam cm
      volumePerLog: 0.196,
      grade: 'Reguler', 
      unit: 'm³', 
      notes: 'Untuk core plywood' 
    },
    { 
      id: '4', 
      woodType: 'Alba', 
      diameterRange: '19–24 cm', 
      diameterMin: 19,
      diameterMax: 24,
      avgDiameter: 21.5,
      standardLength: 130, // PENTING: dalam cm (1.3 meter = 130 cm)
      volumePerLog: 0.047, // (π/4) × 0.215² × 1.3 = 0.04719 m³
      grade: 'Reguler', 
      unit: 'm³', 
      notes: 'Kayu Alba untuk plywood' 
    },
  ];
}

// Seed Prices
export function seedPrices(): Price[] {
  return [
    { 
      id: '1', 
      woodSpecId: '1', 
      woodSpecName: 'Meranti 20-30cm Grade A', 
      buyPrice: 1200000,
      buyPricePerLog: 235200,
      traderMargin: 15000, 
      sellPrice: 1215000,
      sellPricePerLog: 238140,
      effectiveDate: '2025-01-01', 
      isActive: true 
    },
    { 
      id: '2', 
      woodSpecId: '2', 
      woodSpecName: 'Meranti 30-40cm Grade A', 
      buyPrice: 1400000,
      buyPricePerLog: 539000,
      traderMargin: 15000, 
      sellPrice: 1415000,
      sellPricePerLog: 544775,
      effectiveDate: '2025-01-01', 
      isActive: true 
    },
    { 
      id: '3', 
      woodSpecId: '3', 
      woodSpecName: 'Keruing 20-30cm Grade B', 
      buyPrice: 950000,
      buyPricePerLog: 186200,
      traderMargin: 15000, 
      sellPrice: 965000,
      sellPricePerLog: 189140,
      effectiveDate: '2025-01-01', 
      isActive: true 
    },
  ];
}

// Seed Orders
export function seedOrders(): Order[] {
  // Generate sample diameters for testing
  const generateDiameters = (count: number, min: number, max: number): number[] => {
    const diameters: number[] = [];
    for (let i = 0; i < count; i++) {
      diameters.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return diameters;
  };

  return [
    { 
      id: '1', 
      orderNumber: 'ORD-202501-0001', 
      orderDate: '2025-01-15', 
      companyId: '1', 
      companyName: 'PT. Plywood Nusantara', 
      supplierId: '1', 
      supplierName: 'Depo Kayu Makmur', 
      status: 'paid', 
      // PENTING: Panjang 400 cm = 4 meter
      items: [createOrderItem('1', '1', 'Meranti 20-30cm Premium', generateDiameters(255, 20, 30), 400, 235200, 238140, 1200000, 1215000)],
      totalVolume: 50, 
      totalValue: 60750000, 
      notes: 'Pesanan rutin Januari' 
    },
    { 
      id: '2', 
      orderNumber: 'ORD-202501-0002', 
      orderDate: '2025-01-20', 
      companyId: '2', 
      companyName: 'PT. Kayu Jaya Abadi', 
      supplierId: '2', 
      supplierName: 'Depo Kayu Sejahtera', 
      status: 'invoiced', 
      // PENTING: Panjang 400 cm = 4 meter
      items: [createOrderItem('2', '3', 'Keruing 20-30cm Reguler', generateDiameters(179, 20, 30), 400, 186200, 189140, 950000, 965000)],
      totalVolume: 35, 
      totalValue: 33775000, 
      notes: '' 
    },
  ];
}

// Seed Deliveries
export function seedDeliveries(): Delivery[] {
  return [
    { 
      id: '1', 
      doNumber: 'DO-202501-0001', 
      orderId: '1', 
      orderNumber: 'ORD-202501-0001', 
      deliveryDate: '2025-01-17', 
      vehiclePlate: 'KT 1234 AB', 
      driverName: 'Pak Joko', 
      actualVolume: 50, 
      receiveDate: '2025-01-18', 
      status: 'received', 
      receivedBy: 'Ibu Sari' 
    },
    { 
      id: '2', 
      doNumber: 'DO-202501-0002', 
      orderId: '2', 
      orderNumber: 'ORD-202501-0002', 
      deliveryDate: '2025-01-22', 
      vehiclePlate: 'L 5678 CD', 
      driverName: 'Pak Tono', 
      actualVolume: 35, 
      receiveDate: '2025-01-23', 
      status: 'received', 
      receivedBy: 'Pak Dedi' 
    },
  ];
}

// Seed Invoices
export function seedInvoices(): Invoice[] {
  return [
    { 
      id: '1', 
      invoiceNumber: 'INV-202501-0001', 
      deliveryId: '1', 
      companyId: '1', 
      companyName: 'PT. Plywood Nusantara', 
      invoiceDate: '2025-01-18', 
      dueDate: '2025-02-17', 
      totalAmount: 60750000, 
      paidAmount: 60750000, 
      status: 'paid', 
      agingDays: 0, 
      agingCategory: 'Lunas' 
    },
    { 
      id: '2', 
      invoiceNumber: 'INV-202501-0002', 
      deliveryId: '2', 
      companyId: '2', 
      companyName: 'PT. Kayu Jaya Abadi', 
      invoiceDate: '2025-01-23', 
      dueDate: '2025-03-09', 
      totalAmount: 33775000, 
      paidAmount: 0, 
      status: 'unpaid', 
      agingDays: 15, 
      agingCategory: 'Belum Jatuh Tempo' 
    },
  ];
}

// Seed Payments
export function seedPayments(): Payment[] {
  return [
    { 
      id: '1', 
      invoiceId: '1', 
      invoiceNumber: 'INV-202501-0001', 
      paymentDate: '2025-02-15', 
      amount: 60750000, 
      method: 'transfer', 
      reference: 'TRF-BCA-001234' 
    },
  ];
}

// Seed All Data
export function seedAllData() {
  return {
    suppliers: seedSuppliers(),
    companies: seedCompanies(),
    woodSpecs: seedWoodSpecs(),
    prices: seedPrices(),
    orders: seedOrders(),
    deliveries: seedDeliveries(),
    invoices: seedInvoices(),
    payments: seedPayments(),
  };
}
