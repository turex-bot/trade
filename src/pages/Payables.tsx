import { useState } from 'react';
import { Search, Eye, AlertTriangle, TrendingDown, Calendar, Filter } from 'lucide-react';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';

export default function Payables() {
  const { orders, suppliers } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  // Hitung total hutang
  const totalPayable = filteredOrders
    .filter(o => o.status !== 'paid')
    .reduce((sum, o) => sum + o.totalValue, 0);

  const totalPaid = filteredOrders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.totalValue, 0);

  const handleRecordPayment = (order: any) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Harus Bayar</p>
              <p className="text-[20px] font-bold text-[#dc2626] mt-1">{formatCurrency(totalPayable)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[#dc2626]" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Sudah Dibayar</p>
              <p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Pesanan</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{filteredOrders.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#64748b]" />
            </div>
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
                  <th>Perusahaan</th>
                  <th className="text-right">Total Batang</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">Harus Bayar</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span>
                    </td>
                    <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                    <td className="text-[13px] text-[#0f172a] font-medium">{order.supplierName}</td>
                    <td className="text-[12px] text-[#64748b]">{order.companyName}</td>
                    <td className="text-right text-[13px] font-semibold text-[#0f172a]">
                      {order.items.reduce((sum: number, item: any) => sum + item.numberOfLogs, 0)} batang
                    </td>
                    <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.totalVolume.toFixed(2)} m³</td>
                    <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(order.totalValue)}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <TrendingDown className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Tidak ada pembayaran ke supplier</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Semua pesanan sudah dibayar atau belum ada pesanan</p>
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

            <div className="bg-[#fef2f2] rounded-lg p-4 flex items-center justify-between border border-[#fecaca]">
              <div>
                <p className="text-[11px] text-[#dc2626]">Total Harus Bayar ke Supplier</p>
                <p className="text-[15px] font-bold text-[#dc2626]">{formatCurrency(selectedOrder.totalValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#dc2626]">Total Volume</p>
                <p className="text-[18px] font-bold text-[#dc2626]">{selectedOrder.totalVolume.toFixed(2)} m³</p>
              </div>
            </div>

            {selectedOrder.status !== 'paid' && (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-2.5 bg-[#dc2626] text-white rounded-lg text-[13px] font-medium hover:bg-[#b91c1c] transition-colors"
              >
                Catat Pembayaran ke Supplier
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
            <div className="bg-[#fef2f2] rounded-lg p-4 border border-[#fecaca]">
              <p className="text-[11px] text-[#dc2626] mb-1">Total Harus Bayar</p>
              <p className="text-[20px] font-bold text-[#dc2626]">{formatCurrency(selectedOrder.totalValue)}</p>
            </div>

            <FormField label="Tanggal Pembayaran" required>
              <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
            </FormField>

            <FormField label="Jumlah Pembayaran" required>
              <input 
                type="number" 
                className="input-field" 
                defaultValue={selectedOrder.totalValue}
                max={selectedOrder.totalValue}
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
                  toast.success('Pembayaran berhasil dicatat', `Pembayaran ke ${selectedOrder.supplierName} telah tercatat`);
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
