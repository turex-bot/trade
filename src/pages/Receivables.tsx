import { useState } from 'react';
import { AlertTriangle, Clock, TrendingUp, Calendar, Search, Eye, Package, CheckCircle2 } from 'lucide-react';
import { PageHeader, Badge, Modal, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';

export default function Receivables() {
  const { orders } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Filter orders yang sudah confirmed, invoiced, atau paid (sudah harus ditagih ke perusahaan)
  const receivableOrders = orders.filter(o => 
    ['confirmed', 'invoiced', 'paid'].includes(o.status)
  );

  const filteredOrders = receivableOrders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      confirmed: { variant: 'blue', label: 'Perlu Invoice' },
      invoiced: { variant: 'orange', label: 'Sudah Ditagih' },
      paid: { variant: 'green', label: 'Sudah Dibayar' },
    };
    const { variant, label } = config[status] || { variant: 'gray', label: status };
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  // Konstanta margin trader
  const TRADER_MARGIN_PER_M3 = 15000; // Rp15.000 per m³

  // Fungsi hitung total tagihan ke perusahaan
  // LOGIKA: Perusahaan bayar TOTAL HARGA (tidak ada pengurangan margin)
  // Margin adalah keuntungan trader yang sudah termasuk dalam harga jual
  const calculateTotalReceivable = (order: any) => {
    return order.totalValue; // Total harga pesanan (perusahaan bayar penuh)
  };

  // Hitung total piutang dari perusahaan
  const totalReceivable = filteredOrders
    .filter(o => o.status === 'invoiced')
    .reduce((sum, o) => sum + calculateTotalReceivable(o), 0);

  const totalReceived = filteredOrders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + calculateTotalReceivable(o), 0);

  // Hitung total margin (profit trader)
  const totalMargin = filteredOrders
    .reduce((sum, o) => sum + (o.totalVolume * TRADER_MARGIN_PER_M3), 0);

  const handleRecordPayment = (order: any) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Uang Masuk (dari Perusahaan)"
        subtitle="Kelola pembayaran dari perusahaan plywood"
      />

      {/* KPI Cards - Piutang & Profit */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card border-l-4 border-l-[#166534]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">💰 UTANG PERUSAHAAN KE SAYA</p>
              <p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalReceivable)}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Yang harus dibayar perusahaan ke saya</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
        <div className="stat-card border-l-4 border-l-[#166534]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">✅ SUDAH DIBAYAR PERUSAHAAN</p>
              <p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalReceived)}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Perusahaan sudah bayar ke saya</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
        <div className="stat-card border-l-4 border-l-[#f59e0b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b] font-medium">💎 PROFIT TRADER</p>
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
              <p className="text-[11px] text-[#64748b] font-medium">📄 TOTAL INVOICE</p>
              <p className="text-[20px] font-bold text-[#2563eb] mt-1">{filteredOrders.length}</p>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">{filteredOrders.filter(o => o.status === 'invoiced').length} belum dibayar</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#2563eb]" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box - Penjelasan Logika */}
      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#1e40af] mb-1">Logika Pembayaran dari Perusahaan</p>
            <p className="text-[12px] text-[#1e3a8a]">
              Perusahaan membayar <strong>TOTAL HARGA PESANAN</strong> (harga pokok + margin sudah termasuk)
              <br />
              <span className="text-[11px]">Contoh: Total Rp60.000.000 (sudah termasuk margin Rp750.000)</span>
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
              placeholder="Cari no. order atau perusahaan..."
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
                  <th>Perusahaan</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Total Tagih</th>
                  <th className="text-right">Profit</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const totalPrice = order.totalValue; // Total harga (perusahaan bayar penuh)
                  const margin = order.totalVolume * TRADER_MARGIN_PER_M3; // Profit trader
                  
                  return (
                    <tr key={order.id}>
                      <td>
                        <span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span>
                        <p className="text-[10px] text-[#94a3b8]">{order.companyName}</p>
                      </td>
                      <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                      <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.totalVolume.toFixed(2)} m³</td>
                      <td className="text-right text-[13px] font-bold text-[#166534]">{formatCurrency(totalPrice)}</td>
                      <td className="text-right text-[12px] text-[#f59e0b] font-semibold">{formatCurrency(margin)}</td>
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
                              title="Input Pembayaran dari Perusahaan"
                            >
                              <TrendingUp className="w-4 h-4" />
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
            <TrendingUp className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada utang perusahaan</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Konfirmasi pesanan di halaman Transaksi → Pesanan untuk memulai</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal
        open={!!selectedOrder && !showPaymentModal}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.orderNumber || ''}
        subtitle={selectedOrder ? `Penagihan ke ${selectedOrder?.companyName}` : ''}
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
                <p className="text-[11px] text-[#64748b] mb-1">Perusahaan</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.companyName}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Supplier</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.supplierName}</p>
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
                      <th className="text-right">Harga Jual</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="text-[12px] text-[#0f172a] font-medium">{item.woodSpecName}</td>
                        <td className="text-right text-[12px] font-semibold">{item.numberOfLogs} batang</td>
                        <td className="text-right text-[12px] text-[#64748b]">{item.volume.toFixed(2)} m³</td>
                        <td className="text-right text-[12px] text-[#166534]">{formatCurrency(item.sellPrice)}/m³</td>
                        <td className="text-right text-[12px] font-bold text-[#0f172a]">{formatCurrency(item.totalSellValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7] space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Total Volume</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.totalVolume.toFixed(2)} m³</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Total Tagihan ke Perusahaan</p>
                <p className="text-[13px] font-medium text-[#0f172a]">{formatCurrency(selectedOrder.totalValue)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#64748b]">Profit Anda (Margin)</p>
                <p className="text-[13px] font-medium text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</p>
              </div>
              <div className="pt-3 border-t border-[#dcfce7] flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#166534]">Total Diterima dari Perusahaan</p>
                <p className="text-[18px] font-bold text-[#166534]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</p>
              </div>
              <div className="bg-[#fef3c7] rounded p-2 mt-2">
                <p className="text-[11px] text-[#92400e] text-center">
                  💡 Perusahaan membayar total harga, profit Anda sudah termasuk
                </p>
              </div>
            </div>

            {selectedOrder.status !== 'paid' && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-2.5 bg-[#166534] text-white rounded-lg text-[13px] font-medium hover:bg-[#14532d] transition-colors"
              >
                💰 Input Pembayaran dari Perusahaan
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
        title="Catat Pembayaran dari Perusahaan"
        subtitle={selectedOrder ? `${selectedOrder.orderNumber} - ${selectedOrder.companyName}` : ''}
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7] space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#64748b]">Total Tagihan:</span>
                <span className="text-[#0f172a]">{formatCurrency(selectedOrder.totalValue)}</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#64748b]">Profit Anda:</span>
                <span className="text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</span>
              </div>
              <div className="pt-2 border-t border-[#dcfce7] flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#166534]">Diterima dari Perusahaan:</span>
                <span className="text-[20px] font-bold text-[#166534]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</span>
              </div>
              <div className="bg-[#fef3c7] rounded p-2 mt-2">
                <p className="text-[11px] text-[#92400e] text-center">
                  💡 Perusahaan membayar total harga, profit Anda sudah termasuk
                </p>
              </div>
            </div>

            <FormField label="Tanggal Pembayaran" required>
              <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
            </FormField>

            <FormField label="Jumlah Pembayaran" required>
              <input 
                type="number" 
                className="input-field" 
                defaultValue={calculateTotalReceivable(selectedOrder)}
                max={calculateTotalReceivable(selectedOrder)}
              />
            </FormField>

            <FormField label="Metode Pembayaran" required>
              <select className="input-field">
                <option value="">Pilih Metode</option>
                <option value="transfer">Transfer Bank</option>
                <option value="cash">Cash / Tunai</option>
                <option value="giro">Giro</option>
                <option value="cek">Cek</option>
              </select>
            </FormField>

            <FormField label="Nomor Referensi" hint="Nomor transaksi atau bukti transfer">
              <input type="text" className="input-field" placeholder="TRF-BCA-001234" />
            </FormField>

            <FormField label="Catatan">
              <textarea className="input-field min-h-[60px] resize-none" placeholder="Catatan tambahan (opsional)" />
            </FormField>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-secondary flex-1"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  toast.success('Pembayaran berhasil dicatat', `Pembayaran dari ${selectedOrder.companyName} telah tercatat`);
                  setShowPaymentModal(false);
                  setSelectedOrder(null);
                }}
                className="btn btn-primary flex-1"
              >
                Simpan Pembayaran
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
