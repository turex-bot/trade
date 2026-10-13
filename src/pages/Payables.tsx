import { useState } from 'react';
import { Search, Eye, AlertTriangle, TrendingDown, TrendingUp, Calendar, Filter, Package, CheckCircle2 } from 'lucide-react';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';

export default function Payables() {
  const { orders, suppliers, updateOrder, addPayment } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Payment form state
  const [paymentData, setPaymentData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    amount: 0,
    method: '',
    reference: '',
    notes: ''
  });

  // Filter orders yang sudah dikonfirmasi atau lebih (sudah harus bayar ke supplier)
  const payableOrders = orders.filter(o => 
    ['confirmed', 'in_delivery', 'received', 'invoiced', 'paid'].includes(o.status)
  );

  const filteredOrders = payableOrders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      confirmed: { variant: 'blue', label: 'Harus Bayar' },
      in_delivery: { variant: 'yellow', label: 'Dalam Pengiriman' },
      received: { variant: 'purple', label: 'Barang Diterima' },
      invoiced: { variant: 'orange', label: 'Sudah Ditagih' },
      paid: { variant: 'green', label: 'Sudah Dibayar' },
    };
    const { variant, label } = config[status] || { variant: 'gray', label: status };
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const getAgingBadge = (days: number) => {
    if (days <= 0) return <Badge variant="green">Belum Jatuh Tempo</Badge>;
    if (days <= 30) return <Badge variant="yellow">{days} hari lewat</Badge>;
    if (days <= 60) return <Badge variant="orange">{days} hari lewat</Badge>;
    return <Badge variant="red">{days} hari lewat</Badge>;
  };

  // Konstanta margin trader
  const TRADER_MARGIN_PER_M3 = 15000; // Rp15.000 per m³

  // Fungsi hitung total pembayaran ke supplier
  // LOGIKA: Trader bayar ke supplier = Total Harga - Margin
  // Karena margin adalah keuntungan trader, bukan biaya ke supplier
  const calculateTotalPayable = (order: any) => {
    const totalPrice = order.totalValue; // Total harga pesanan
    const margin = order.totalVolume * TRADER_MARGIN_PER_M3; // Margin trader
    return totalPrice - margin; // Yang dibayar ke supplier
  };

  // Hitung total hutang ke supplier
  const totalPayable = filteredOrders
    .filter(o => o.status !== 'paid')
    .reduce((sum, o) => sum + calculateTotalPayable(o), 0);

  const totalPaid = filteredOrders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + calculateTotalPayable(o), 0);

  // Hitung total margin (profit trader)
  const totalMargin = filteredOrders
    .reduce((sum, o) => sum + (o.totalVolume * TRADER_MARGIN_PER_M3), 0);

  // Hitung total harga pokok (yang diterima dari perusahaan)
  const totalBasePrice = filteredOrders
    .reduce((sum, o) => sum + o.totalValue, 0);

  const handleRecordPayment = (order: any) => {
    setSelectedOrder(order);
    // Reset form dengan data default
    setPaymentData({
      paymentDate: new Date().toISOString().split('T')[0],
      amount: calculateTotalPayable(order),
      method: '',
      reference: '',
      notes: ''
    });
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    if (!selectedOrder) return;
    
    // Validasi
    if (!paymentData.method) {
      toast.error('Lengkapi data pembayaran', 'Pilih metode pembayaran');
      return;
    }
    
    if (paymentData.amount <= 0) {
      toast.error('Jumlah tidak valid', 'Masukkan jumlah pembayaran yang benar');
      return;
    }

    // 1. Simpan data pembayaran
    addPayment({
      invoiceId: selectedOrder.id,
      invoiceNumber: selectedOrder.orderNumber,
      paymentDate: paymentData.paymentDate,
      amount: paymentData.amount,
      method: paymentData.method,
      reference: paymentData.reference
    });

    // 2. Update status order menjadi 'paid'
    updateOrder(selectedOrder.id, { status: 'paid' });

    // 3. Tampilkan notifikasi sukses
    toast.success(
      'Pembayaran berhasil dicatat', 
      `Pembayaran ke ${selectedOrder.supplierName} sebesar ${formatCurrency(paymentData.amount)} telah tercatat`
    );

    // 4. Tutup modal dan reset
    setShowPaymentModal(false);
    setSelectedOrder(null);
  };

  const tabs = [
    { key: '', label: 'Semua', count: filteredOrders.length },
    { key: 'confirmed', label: 'Harus Bayar', count: filteredOrders.filter(o => o.status === 'confirmed').length },
    { key: 'received', label: 'Barang Diterima', count: filteredOrders.filter(o => o.status === 'received').length },
    { key: 'paid', label: 'Sudah Dibayar', count: filteredOrders.filter(o => o.status === 'paid').length },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Uang Keluar (ke Supplier)"
        subtitle="Kelola pembayaran ke depo/supplier kayu"
      />

      {/* KPI Cards - Utang & Profit */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card border-l-4 border-l-[#dc2626]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">💸 UTANG KE SUPPLIER</p>
              <p className="text-[20px] font-bold text-[#dc2626] mt-1">{formatCurrency(totalPayable)}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Yang harus dibayar ke supplier</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[#dc2626]" />
            </div>
          </div>
        </div>
        <div className="stat-card border-l-4 border-l-[#166534]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">✅ SUDAH SAYA BAYAR</p>
              <p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalPaid)}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Saya sudah bayar ke supplier</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
        <div className="stat-card border-l-4 border-l-[#f59e0b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">💰 MARGIN TRADER</p>
              <p className="text-[20px] font-bold text-[#f59e0b] mt-1">{formatCurrency(totalMargin)}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Rp15.000 × total m³</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
            </div>
          </div>
        </div>
        <div className="stat-card border-l-4 border-l-[#2563eb]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">📦 TOTAL PESANAN</p>
              <p className="text-[20px] font-bold text-[#2563eb] mt-1">{filteredOrders.length}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">{filteredOrders.filter(o => o.status !== 'paid').length} belum lunas</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#2563eb]" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box - Penjelasan Logika */}
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#dc2626] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#991b1b] mb-1">Logika Pembayaran ke Supplier</p>
            <p className="text-[12px] text-[#7f1d1d]">
              Total yang harus dibayar ke supplier = <strong>Total Harga Pesanan - Margin Trader</strong>
              <br />
              <span className="text-[11px]">Contoh: Total Rp60.000.000 - (50 m³ × Rp15.000) = Rp59.250.000</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari no. order atau supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Order</th>
                  <th>Tanggal</th>
                  <th>Supplier</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Total Harga</th>
                  <th className="text-right">Margin</th>
                  <th className="text-right">Bayar ke Supplier</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const totalPrice = order.totalValue; // Total harga pesanan
                  const margin = order.totalVolume * TRADER_MARGIN_PER_M3; // Margin trader
                  const payableToSupplier = totalPrice - margin; // Yang dibayar ke supplier
                  
                  return (
                    <tr key={order.id}>
                      <td>
                        <span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span>
                        <p className="text-[10px] text-[#94a3b8]">{order.supplierName}</p>
                      </td>
                      <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                      <td className="text-[13px] text-[#0f172a] font-medium">{order.supplierName}</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.totalVolume.toFixed(2)} m³</td>
                      <td className="text-right text-[12px] text-[#64748b]">{formatCurrency(totalPrice)}</td>
                      <td className="text-right text-[12px] text-[#f59e0b] font-medium">{formatCurrency(margin)}</td>
                      <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(payableToSupplier)}</td>
                      <td className="text-center">{getStatusBadge(order.status)}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.status !== 'paid' && (
                            <button
                              onClick={() => handleRecordPayment(order)}
                              className="p-1.5 rounded-lg hover:bg-[#f0fdf4] text-[#94a3b8] hover:text-[#166534]"
                              title="Catat Pembayaran"
                            >
                              <TrendingDown className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <TrendingDown className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada utang ke supplier</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Konfirmasi pesanan di halaman Transaksi → Pesanan untuk memulai</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal
        open={!!selectedOrder && !showPaymentModal}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.orderNumber || ''}
        subtitle={selectedOrder ? `Pembayaran ke ${selectedOrder?.supplierName}` : ''}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#64748b]">Status</span>
              {getStatusBadge(selectedOrder.status)}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Supplier</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.supplierName}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Perusahaan Pembeli</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.companyName}</p>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-2">Item Pesanan</p>
              <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Spesifikasi</th>
                      <th className="text-right">Jumlah Batang</th>
                      <th className="text-right">Volume</th>
                      <th className="text-right">Harga Beli</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="text-[12px] text-[#0f172a] font-medium">{item.woodSpecName}</td>
                        <td className="text-right text-[12px] font-semibold">{item.numberOfLogs} batang</td>
                        <td className="text-right text-[12px] text-[#64748b]">{item.volume.toFixed(2)} m³</td>
                        <td className="text-right text-[12px] text-[#166534]">{formatCurrency(item.buyPrice)}/m³</td>
                        <td className="text-right text-[12px] font-bold text-[#0f172a]">{formatCurrency(item.totalBuyValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca] space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Total Volume</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.totalVolume.toFixed(2)} m³</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Total Harga Pesanan</p>
                <p className="text-[13px] font-medium text-[#0f172a]">{formatCurrency(selectedOrder.totalValue)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Margin Trader ({selectedOrder.totalVolume.toFixed(2)} m³ × Rp15.000)</p>
                <p className="text-[13px] font-medium text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</p>
              </div>
              <div className="pt-3 border-t border-[#fecaca] flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#dc2626]">Total Bayar ke Supplier</p>
                <p className="text-[18px] font-bold text-[#dc2626]">{formatCurrency(calculateTotalPayable(selectedOrder))}</p>
              </div>
              <div className="bg-[#fef3c7] rounded p-2 mt-2">
                <p className="text-[11px] text-[#92400e] text-center">
                  💡 Profit Anda: <strong>{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</strong>
                </p>
              </div>
            </div>

            {selectedOrder.status !== 'paid' && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-2.5 bg-[#dc2626] text-white rounded-lg text-[13px] font-medium hover:bg-[#b91c1c] transition-colors"
              >
                💸 Input Pembayaran ke Supplier
              </button>
            )}
          </div>
        )}
      </Modal>

      {/* Payment Modal */}
      <Modal
        open={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedOrder(null);
        }}
        title="Catat Pembayaran ke Supplier"
        subtitle={selectedOrder ? `${selectedOrder.orderNumber} - ${selectedOrder.supplierName}` : ''}
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca] space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#64748b]">Total Harga Pesanan:</span>
                <span className="text-[#0f172a]">{formatCurrency(selectedOrder.totalValue)}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#64748b]">Margin Trader ({selectedOrder.totalVolume.toFixed(2)} m³ × Rp15.000):</span>
                <span className="text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</span>
              </div>
              <div className="pt-2 border-t border-[#fecaca] flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#dc2626]">Bayar ke Supplier:</span>
                <span className="text-[20px] font-bold text-[#dc2626]">{formatCurrency(calculateTotalPayable(selectedOrder))}</span>
              </div>
              <div className="bg-[#fef3c7] rounded p-2 mt-2">
                <p className="text-[11px] text-[#92400e] text-center">
                  💡 Profit Anda: <strong>{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</strong>
                </p>
              </div>
            </div>

            <FormField label="Tanggal Pembayaran" required>
              <input 
                type="date" 
                className="input-field" 
                value={paymentData.paymentDate}
                onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
              />
            </FormField>

            <FormField label="Jumlah Pembayaran" required>
              <input 
                type="number" 
                className="input-field" 
                value={paymentData.amount}
                onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})}
                max={calculateTotalPayable(selectedOrder)}
              />
            </FormField>

            <FormField label="Metode Pembayaran" required>
              <select 
                className="input-field"
                value={paymentData.method}
                onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
              >
                <option value="">Pilih Metode</option>
                <option value="transfer">Transfer Bank</option>
                <option value="cash">Cash / Tunai</option>
                <option value="giro">Giro</option>
                <option value="cek">Cek</option>
              </select>
            </FormField>

            <FormField label="Nomor Referensi" hint="Nomor transaksi atau bukti transfer">
              <input 
                type="text" 
                className="input-field" 
                placeholder="TRF-BCA-001234"
                value={paymentData.reference}
                onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})}
              />
            </FormField>

            <FormField label="Catatan">
              <textarea 
                className="input-field min-h-[60px] resize-none" 
                placeholder="Catatan tambahan (opsional)"
                value={paymentData.notes}
                onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
              />
            </FormField>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-secondary flex-1"
              >
                Batal
              </button>
              <button
                onClick={handleSavePayment}
                className="btn btn-primary flex-1"
              >
                💾 Simpan Pembayaran
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
