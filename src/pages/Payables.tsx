import { useState } from 'react';
import { Search, Eye, TrendingDown, Calendar, Package, CheckCircle2 } from 'lucide-react';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';
import { formatVolume } from '../utils/formatVolume';

export default function Payables() {
  const { orders, suppliers } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ paymentDate: new Date().toISOString().split('T')[0], amount: 0, method: '', reference: '', notes: '' });

  const TRADER_MARGIN_PER_M3 = 15;
  const payableOrders = orders.filter(o => ['confirmed', 'in_delivery', 'received', 'invoiced', 'paid'].includes(o.status));
  const filteredOrders = payableOrders.filter(o => o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || o.supplierName.toLowerCase().includes(searchQuery.toLowerCase()));

  const calculateTotalPayable = (order: any) => {
    // Harga Beli = Total - PPH 22 (PPH dipotong dari total)
    const hargaBeli = order.totalAfterPPH || (order.totalValue * 0.9975);
    const margin = order.totalVolume * TRADER_MARGIN_PER_M3;
    return hargaBeli - margin;
  };
  
  const calculateHargaBeli = (order: any) => order.totalAfterPPH || (order.totalValue * 0.9975);
  
  const totalPayable = filteredOrders.filter(o => o.status !== 'paid').reduce((sum, o) => sum + calculateTotalPayable(o), 0);
  const totalPaid = filteredOrders.filter(o => o.status === 'paid').reduce((sum, o) => sum + calculateTotalPayable(o), 0);
  const totalMargin = filteredOrders.reduce((sum, o) => sum + (o.totalVolume * TRADER_MARGIN_PER_M3), 0);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      confirmed: { variant: 'blue', label: 'Harus Bayar' },
      paid: { variant: 'green', label: 'Sudah Dibayar' },
    };
    const { variant, label } = config[status] || { variant: 'gray', label: status };
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const handleRecordPayment = (order: any) => {
    setSelectedOrder(order);
    setPaymentData({ paymentDate: new Date().toISOString().split('T')[0], amount: calculateTotalPayable(order), method: '', reference: '', notes: '' });
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    if (!selectedOrder) return;
    if (!paymentData.method) { toast.error('Lengkapi data pembayaran'); return; }
    toast.success('Pembayaran berhasil dicatat');
    setShowPaymentModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Uang Keluar (ke Supplier)" subtitle="Kelola pembayaran ke supplier" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card border-l-4 border-l-[#dc2626]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">UTANG KE SUPPLIER</p><p className="text-[20px] font-bold text-[#dc2626] mt-1">{formatCurrency(totalPayable)}</p></div><div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center"><TrendingDown className="w-5 h-5 text-[#dc2626]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#166534]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">SUDAH SAYA BAYAR</p><p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalPaid)}</p></div><div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#166534]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#f59e0b]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">MARGIN TRADER</p><p className="text-[20px] font-bold text-[#f59e0b] mt-1">{formatCurrency(totalMargin)}</p></div><div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center"><TrendingDown className="w-5 h-5 text-[#f59e0b]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#2563eb]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">TOTAL PESANAN</p><p className="text-[20px] font-bold text-[#2563eb] mt-1">{filteredOrders.length}</p></div><div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center"><Package className="w-5 h-5 text-[#2563eb]" /></div></div></div>
      </div>

      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input type="text" placeholder="Cari..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-[13px] outline-none flex-1" />
          </div>
        </div>
      </div>

      <div className="card">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Kedatangan</th>
                  <th>No. Kendaraan</th>
                  <th>Tanggal</th>
                  <th>Supplier</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Harga Jual</th>
                  <th className="text-right">Margin</th>
                  <th className="text-right">Bayar ke Supplier</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const hargaBeli = calculateHargaBeli(order);
                  const margin = order.totalVolume * TRADER_MARGIN_PER_M3;
                  const totalPayable = hargaBeli - margin;
                  return (
                    <tr key={order.id}>
                      <td><span className="font-semibold text-[#166534] text-[12px]">{order.noKedatangan}</span></td>
                      <td><span className="text-[12px] text-[#0f172a]">{order.noKendaraan}</span></td>
                      <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                      <td className="text-[13px] text-[#0f172a] font-medium">{order.supplierName}</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatVolume(order.totalVolume)} m³</td>
                      <td className="text-right text-[12px] text-[#64748b]">{formatCurrency(hargaBeli)}</td>
                      <td className="text-right text-[12px] text-[#f59e0b] font-medium">{formatCurrency(margin)}</td>
                      <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(totalPayable)}</td>
                      <td className="text-center">{getStatusBadge(order.status)}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setSelectedOrder(order)} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]" title="Lihat Detail"><Eye className="w-4 h-4" /></button>
                          {order.status !== 'paid' && (<button onClick={() => handleRecordPayment(order)} className="p-1.5 rounded-lg hover:bg-[#f0fdf4] text-[#94a3b8] hover:text-[#166534]" title="Input Pembayaran"><TrendingDown className="w-4 h-4" /></button>)}
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
            <p className="text-[13px] text-[#64748b] mt-1">Konfirmasi pesanan di halaman Hasil Cek</p>
          </div>
        )}
      </div>

      <Modal open={!!selectedOrder && !showPaymentModal} onClose={() => setSelectedOrder(null)} title={selectedOrder?.noKedatangan || ''} subtitle={selectedOrder ? `No. Kendaraan: ${selectedOrder.noKendaraan} - Pembayaran ke ${selectedOrder?.supplierName}` : ''} size="lg">
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-3.5"><p className="text-[11px] text-[#64748b] mb-1">No. Kedatangan</p><p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.noKedatangan}</p></div>
              <div className="bg-[#f8fafc] rounded-lg p-3.5"><p className="text-[11px] text-[#64748b] mb-1">No. Kendaraan</p><p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.noKendaraan}</p></div>
            </div>
            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca] space-y-3">
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Total Volume</p><p className="text-[13px] font-semibold text-[#0f172a]">{formatVolume(selectedOrder.totalVolume)} m³</p></div>
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Total - PPH 22 (Harga Jual)</p><p className="text-[13px] font-medium text-[#0f172a]">{formatCurrency(calculateHargaBeli(selectedOrder))}</p></div>
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Margin Trader ({formatVolume(selectedOrder.totalVolume)} m³ × Rp15)</p><p className="text-[13px] font-medium text-[#f59e0b]">- {formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</p></div>
              <div className="pt-3 border-t border-[#fecaca] flex items-center justify-between"><p className="text-[12px] font-semibold text-[#dc2626]">Total Bayar ke Supplier</p><p className="text-[18px] font-bold text-[#dc2626]">{formatCurrency(calculateTotalPayable(selectedOrder))}</p></div>
            </div>
            {selectedOrder.status !== 'paid' && (<button onClick={() => setShowPaymentModal(true)} className="w-full py-2.5 bg-[#dc2626] text-white rounded-lg text-[13px] font-medium hover:bg-[#b91c1c]">💸 Input Pembayaran ke Supplier</button>)}
          </div>
        )}
      </Modal>

      <Modal open={showPaymentModal} onClose={() => { setShowPaymentModal(false); setSelectedOrder(null); }} title="Input Pembayaran ke Supplier" subtitle={selectedOrder ? `${selectedOrder.noKedatangan} - ${selectedOrder.supplierName}` : ''} size="md">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca] space-y-2">
              <div className="flex items-center justify-between text-[12px]"><span className="text-[#64748b]">Total - PPH 22 (Harga Jual):</span><span className="text-[#0f172a]">{formatCurrency(calculateHargaBeli(selectedOrder))}</span></div>
              <div className="flex items-center justify-between text-[12px]"><span className="text-[#64748b]">Margin Trader:</span><span className="text-[#f59e0b]">- {formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</span></div>
              <div className="pt-2 border-t border-[#fecaca] flex items-center justify-between"><span className="text-[13px] font-semibold text-[#dc2626]">Bayar ke Supplier:</span><span className="text-[20px] font-bold text-[#dc2626]">{formatCurrency(calculateTotalPayable(selectedOrder))}</span></div>
            </div>
            <FormField label="Tanggal" required><input type="date" className="input-field" value={paymentData.paymentDate} onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})} /></FormField>
            <FormField label="Jumlah" required><input type="number" className="input-field" value={paymentData.amount} onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})} /></FormField>
            <FormField label="Metode" required>
              <select className="input-field" value={paymentData.method} onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}>
                <option value="">Pilih</option>
                <option value="transfer">Transfer</option>
                <option value="cash">Cash</option>
                <option value="giro">Giro</option>
              </select>
            </FormField>
            <FormField label="Referensi"><input type="text" className="input-field" value={paymentData.reference} onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})} placeholder="TRF-BCA-001234" /></FormField>
            <FormField label="Bukti Pembayaran" required>
              <input type="file" accept="image/*,.pdf" className="input-field" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPaymentData({...paymentData, notes: `Bukti: ${file.name}`});
                }
              }} />
              <p className="text-[11px] text-[#94a3b8] mt-1">Upload gambar atau PDF bukti transfer</p>
            </FormField>
            <div className="flex gap-2 pt-4">
              <button onClick={() => setShowPaymentModal(false)} className="btn btn-secondary flex-1">Batal</button>
              <button onClick={handleSavePayment} className="btn btn-primary flex-1">💾 Simpan</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
