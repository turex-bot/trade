import { useState } from 'react';
import { AlertTriangle, TrendingUp, Calendar, Search, Eye, Package, CheckCircle2 } from 'lucide-react';
import { PageHeader, Badge, Modal, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';
import { formatVolume } from '../utils/formatVolume';

export default function Receivables() {
  const { orders } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ paymentDate: new Date().toISOString().split('T')[0], amount: 0, method: '', reference: '', notes: '' });

  const TRADER_MARGIN_PER_M3 = 15;
  const receivableOrders = orders.filter(o => ['confirmed', 'invoiced', 'paid'].includes(o.status));
  const filteredOrders = receivableOrders.filter(o => o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || o.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

  const calculateTotalReceivable = (order: any) => {
    return order.totalWithPPH || (order.totalValue * 1.0025);
  };
  
  const totalReceivable = filteredOrders.filter(o => o.status === 'confirmed' || o.status === 'invoiced').reduce((sum, o) => sum + calculateTotalReceivable(o), 0);
  const totalReceived = filteredOrders.filter(o => o.status === 'paid').reduce((sum, o) => sum + calculateTotalReceivable(o), 0);
  const totalMargin = filteredOrders.reduce((sum, o) => sum + (o.totalVolume * TRADER_MARGIN_PER_M3), 0);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      confirmed: { variant: 'blue', label: 'Perlu Invoice' },
      invoiced: { variant: 'orange', label: 'Sudah Ditagih' },
      paid: { variant: 'green', label: 'Sudah Dibayar' },
    };
    const { variant, label } = config[status] || { variant: 'gray', label: status };
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const handleRecordPayment = (order: any) => {
    setSelectedOrder(order);
    setPaymentData({ paymentDate: new Date().toISOString().split('T')[0], amount: calculateTotalReceivable(order), method: '', reference: '', notes: '' });
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
      <PageHeader title="Uang Masuk (dari Perusahaan)" subtitle="Kelola pembayaran dari perusahaan" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card border-l-4 border-l-[#166534]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">UTANG PERUSAHAAN KE SAYA</p><p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalReceivable)}</p></div><div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#166534]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#166534]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">SUDAH DIBAYAR PERUSAHAAN</p><p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalReceived)}</p></div><div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#166534]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#f59e0b]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">PROFIT TRADER</p><p className="text-[20px] font-bold text-[#f59e0b] mt-1">{formatCurrency(totalMargin)}</p></div><div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#f59e0b]" /></div></div></div>
        <div className="stat-card border-l-4 border-l-[#2563eb]"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#64748b] font-medium">TOTAL INVOICE</p><p className="text-[20px] font-bold text-[#2563eb] mt-1">{filteredOrders.length}</p></div><div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center"><Package className="w-5 h-5 text-[#2563eb]" /></div></div></div>
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
                  const totalPrice = calculateTotalReceivable(order);
                  const margin = order.totalVolume * TRADER_MARGIN_PER_M3;
                  return (
                    <tr key={order.id}>
                      <td><span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span><p className="text-[10px] text-[#94a3b8]">{order.companyName}</p></td>
                      <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                      <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatVolume(order.totalVolume)} m³</td>
                      <td className="text-right text-[13px] font-bold text-[#166534]">{formatCurrency(totalPrice)}</td>
                      <td className="text-right text-[12px] text-[#f59e0b] font-semibold">{formatCurrency(margin)}</td>
                      <td className="text-center">{getStatusBadge(order.status)}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setSelectedOrder(order)} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]" title="Lihat Detail"><Eye className="w-4 h-4" /></button>
                          {order.status !== 'paid' && (<button onClick={() => handleRecordPayment(order)} className="p-1.5 rounded-lg hover:bg-[#f0fdf4] text-[#94a3b8] hover:text-[#166534]" title="Input Pembayaran"><TrendingUp className="w-4 h-4" /></button>)}
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
            <p className="text-[13px] text-[#64748b] mt-1">Konfirmasi pesanan di halaman Hasil Cek</p>
          </div>
        )}
      </div>

      <Modal open={!!selectedOrder && !showPaymentModal} onClose={() => setSelectedOrder(null)} title={selectedOrder?.orderNumber || ''} subtitle={selectedOrder ? `Penagihan ke ${selectedOrder?.companyName}` : ''} size="lg">
        {selectedOrder && (
          <div className="space-y-5">
            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7] space-y-3">
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Total Volume</p><p className="text-[13px] font-semibold text-[#0f172a]">{formatVolume(selectedOrder.totalVolume)} m³</p></div>
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Total + PPH 22 (Tagihan)</p><p className="text-[13px] font-medium text-[#0f172a]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</p></div>
              <div className="flex items-center justify-between"><p className="text-[11px] text-[#64748b]">Profit Anda (Margin = {formatVolume(selectedOrder.totalVolume)} m³ × Rp15)</p><p className="text-[13px] font-medium text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</p></div>
              <div className="pt-3 border-t border-[#dcfce7] flex items-center justify-between"><p className="text-[12px] font-semibold text-[#166534]">Total Diterima dari Perusahaan</p><p className="text-[18px] font-bold text-[#166534]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</p></div>
            </div>
            {selectedOrder.status !== 'paid' && (<button onClick={() => setShowPaymentModal(true)} className="w-full py-2.5 bg-[#166534] text-white rounded-lg text-[13px] font-medium hover:bg-[#14532d]">💰 Input Pembayaran dari Perusahaan</button>)}
          </div>
        )}
      </Modal>

      <Modal open={showPaymentModal} onClose={() => { setShowPaymentModal(false); setSelectedOrder(null); }} title="Input Pembayaran dari Perusahaan" subtitle={selectedOrder ? `${selectedOrder.orderNumber} - ${selectedOrder.companyName}` : ''} size="md">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7] space-y-2">
              <div className="flex items-center justify-between text-[12px]"><span className="text-[#64748b]">Total + PPH 22:</span><span className="text-[#0f172a]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</span></div>
              <div className="flex items-center justify-between text-[12px]"><span className="text-[#64748b]">Profit Anda:</span><span className="text-[#f59e0b]">{formatCurrency(selectedOrder.totalVolume * TRADER_MARGIN_PER_M3)}</span></div>
              <div className="pt-2 border-t border-[#dcfce7] flex items-center justify-between"><span className="text-[13px] font-semibold text-[#166534]">Diterima dari Perusahaan:</span><span className="text-[20px] font-bold text-[#166534]">{formatCurrency(calculateTotalReceivable(selectedOrder))}</span></div>
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
            <FormField label="Referensi"><input type="text" className="input-field" value={paymentData.reference} onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})} placeholder="TRF-MDR-005678" /></FormField>
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
