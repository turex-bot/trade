import { useState } from 'react';
import { Plus, Search, Eye, AlertTriangle, FileText, Truck, Package, CheckCircle2, Calculator } from 'lucide-react';
import { orders, Order, woodSpecs, prices, formatCurrency, formatDate } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField, Tabs } from '../components/ui';

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      draft: { variant: 'gray', label: 'Draft' },
      confirmed: { variant: 'blue', label: 'Dikonfirmasi' },
      in_delivery: { variant: 'yellow', label: 'Dikirim' },
      received: { variant: 'purple', label: 'Diterima' },
      invoiced: { variant: 'orange', label: 'Diinvoice' },
      paid: { variant: 'green', label: 'Lunas' },
      cancelled: { variant: 'red', label: 'Dibatalkan' },
    };
    const { variant, label } = config[status] || config.draft;
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const tabs = [
    { key: 'all', label: 'Semua', count: orders.length },
    { key: 'draft', label: 'Draft', count: orders.filter(o => o.status === 'draft').length },
    { key: 'confirmed', label: 'Dikonfirmasi', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'in_delivery', label: 'Dikirim', count: orders.filter(o => o.status === 'in_delivery').length },
    { key: 'paid', label: 'Lunas', count: orders.filter(o => o.status === 'paid').length },
  ];

  const displayOrders = activeTab === 'all' ? filteredOrders : filteredOrders.filter(o => o.status === activeTab);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pesanan"
        subtitle="Kelola pesanan kayu dari perusahaan plywood"
        actions={
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Buat Pesanan
          </button>
        }
      />

      {/* Tabs */}
      <div className="card mb-4">
        <div className="px-4 pt-3">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-4 pt-3">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-sm">
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
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Order</th>
                <th>Tanggal</th>
                <th>Perusahaan</th>
                <th>Depo</th>
                <th className="text-right">Jumlah Batang</th>
                <th className="text-right">Volume</th>
                <th className="text-right">Nilai</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span>
                  </td>
                  <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                  <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                  <td className="text-[12px] text-[#64748b]">{order.supplierName}</td>
                  <td className="text-right text-[13px] font-semibold text-[#0f172a]">
                    {order.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} batang
                  </td>
                  <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.totalVolume.toFixed(2)} m³</td>
                  <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatCurrency(order.totalValue)}</td>
                  <td className="text-center">{getStatusBadge(order.status)}</td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-[12px] text-[#64748b]">
            Menampilkan <span className="font-semibold text-[#0f172a]">{displayOrders.length}</span> pesanan
          </p>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.orderNumber || ''}
        subtitle={selectedOrder ? formatDate(selectedOrder.orderDate) : ''}
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
                <p className="text-[11px] text-[#64748b] mb-1">Perusahaan Plywood</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{selectedOrder.companyName}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Depo / Supplier</p>
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
                      <th className="text-right">Volume/Batang</th>
                      <th className="text-right">Total Volume</th>
                      <th className="text-right">Harga/Batang</th>
                      <th className="text-right">Total Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map(item => (
                      <tr key={item.id}>
                        <td className="text-[12px] text-[#0f172a] font-medium">{item.woodSpecName}</td>
                        <td className="text-right text-[12px] font-semibold">{item.numberOfLogs} batang</td>
                        <td className="text-right text-[12px] text-[#64748b]">{item.volumePerLog.toFixed(3)} m³</td>
                        <td className="text-right text-[12px] font-medium">{item.volume.toFixed(2)} m³</td>
                        <td className="text-right text-[12px] text-[#166534]">{formatCurrency(item.sellPricePerLog)}</td>
                        <td className="text-right text-[12px] font-bold text-[#0f172a]">{formatCurrency(item.totalSellValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#f0fdf4] rounded-lg p-4 flex items-center justify-between border border-[#dcfce7]">
              <div>
                <p className="text-[11px] text-[#166534]">Total Volume</p>
                <p className="text-[15px] font-bold text-[#166534]">{selectedOrder.totalVolume} m³</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#166534]">Total Nilai</p>
                <p className="text-[18px] font-bold text-[#166534]">{formatCurrency(selectedOrder.totalValue)}</p>
              </div>
            </div>

            {selectedOrder.notes && (
              <div>
                <p className="text-[11px] text-[#64748b] mb-1">Catatan</p>
                <p className="text-[12px] text-[#334155] bg-[#f8fafc] rounded-lg p-3">{selectedOrder.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <CreateOrderModal open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}

// Create Order Modal Component dengan logika batang → kubikasi otomatis
function CreateOrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [numberOfLogs, setNumberOfLogs] = useState<number>(0);

  const selectedSpec = woodSpecs.find(s => s.id === selectedSpecId);
  const selectedPrice = prices.find(p => p.woodSpecId === selectedSpecId && p.isActive);

  // Auto-kalkulasi kubikasi
  const autoVolume = selectedSpec && numberOfLogs > 0 
    ? numberOfLogs * selectedSpec.volumePerLog 
    : 0;

  // Auto-kalkulasi harga
  const autoBuyValue = selectedPrice && numberOfLogs > 0
    ? numberOfLogs * selectedPrice.buyPricePerLog
    : 0;
  
  const autoSellValue = selectedPrice && numberOfLogs > 0
    ? numberOfLogs * selectedPrice.sellPricePerLog
    : 0;

  const handleReset = () => {
    setSelectedSpecId('');
    setNumberOfLogs(0);
  };

  return (
    <Modal
      open={open}
      onClose={() => { onClose(); handleReset(); }}
      title="Buat Pesanan Baru"
      subtitle="Input jumlah batang, kubikasi dihitung otomatis"
      size="lg"
      footer={
        <>
          <button onClick={() => { onClose(); handleReset(); }} className="btn btn-secondary">Batal</button>
          <button 
            onClick={() => { onClose(); handleReset(); }} 
            className="btn btn-primary"
            disabled={!selectedSpecId || numberOfLogs <= 0}
          >
            Buat Pesanan
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Perusahaan Plywood" required>
            <select className="input-field">
              <option value="">Pilih Perusahaan</option>
              <option>PT. Plywood Nusantara</option>
              <option>PT. Kayu Jaya Abadi</option>
              <option>PT. Multi Plywood Indonesia</option>
            </select>
          </FormField>
          <FormField label="Depo / Supplier" required>
            <select className="input-field">
              <option value="">Pilih Depo</option>
              <option>Depo Kayu Makmur</option>
              <option>Depo Kayu Sejahtera</option>
              <option>Depo Kayu Lestari</option>
            </select>
          </FormField>
        </div>
        
        <FormField label="Tanggal Order" required>
          <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
        </FormField>

        {/* Item Kayu dengan Logika Batang → Kubikasi */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-[#166534]" />
            <p className="text-[13px] font-semibold text-[#0f172a]">Item Kayu</p>
          </div>
          
          <div className="border border-[#e2e8f0] rounded-lg p-4 space-y-4 bg-[#f8fafc]">
            {/* Pilih Spesifikasi */}
            <FormField label="Spesifikasi Kayu" required hint="Pilih jenis dan diameter kayu">
              <select 
                className="input-field"
                value={selectedSpecId}
                onChange={(e) => {
                  setSelectedSpecId(e.target.value);
                  setNumberOfLogs(0);
                }}
              >
                <option value="">-- Pilih Spesifikasi --</option>
                {woodSpecs.map(spec => (
                  <option key={spec.id} value={spec.id}>
                    {spec.woodType} {spec.diameterRange} Grade {spec.grade}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Info Spesifikasi */}
            {selectedSpec && (
              <div className="bg-white rounded-lg p-3 border border-[#e2e8f0]">
                <div className="grid grid-cols-3 gap-3 text-[12px]">
                  <div>
                    <p className="text-[#64748b]">Diameter</p>
                    <p className="font-semibold text-[#0f172a]">{selectedSpec.diameterRange}</p>
                  </div>
                  <div>
                    <p className="text-[#64748b]">Panjang Standar</p>
                    <p className="font-semibold text-[#0f172a]">{selectedSpec.standardLength} meter</p>
                  </div>
                  <div>
                    <p className="text-[#64748b]">Volume/Batang</p>
                    <p className="font-semibold text-[#166534]">{selectedSpec.volumePerLog.toFixed(3)} m³</p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Jumlah Batang */}
            <FormField label="Jumlah Batang" required hint="Masukkan jumlah batang, kubikasi akan dihitung otomatis">
              <div className="relative">
                <input 
                  type="number" 
                  className="input-field pr-16"
                  placeholder="0"
                  min="0"
                  value={numberOfLogs || ''}
                  onChange={(e) => setNumberOfLogs(parseInt(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b] font-medium">batang</span>
              </div>
            </FormField>

            {/* Auto Kalkulasi */}
            {selectedSpec && numberOfLogs > 0 && (
              <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7] space-y-3">
                <p className="text-[12px] font-semibold text-[#166534] flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Kalkulasi Otomatis
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                    <p className="text-[11px] text-[#166534]">Total Kubikasi</p>
                    <p className="text-[16px] font-bold text-[#166534]">{autoVolume.toFixed(2)} m³</p>
                    <p className="text-[10px] text-[#16a34a] mt-0.5">
                      {numberOfLogs} batang × {selectedSpec.volumePerLog.toFixed(3)} m³
                    </p>
                  </div>
                  
                  {selectedPrice && (
                    <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                      <p className="text-[11px] text-[#166534]">Harga Jual/Batang</p>
                      <p className="text-[16px] font-bold text-[#166534]">{formatCurrency(selectedPrice.sellPricePerLog)}</p>
                      <p className="text-[10px] text-[#16a34a] mt-0.5">
                        {formatCurrency(selectedPrice.sellPrice)}/m³ × {selectedSpec.volumePerLog.toFixed(3)} m³
                      </p>
                    </div>
                  )}
                </div>

                {selectedPrice && (
                  <div className="pt-3 border-t border-[#dcfce7]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-[#166534]">Total Nilai Beli (ke Depo)</p>
                        <p className="text-[14px] font-semibold text-[#334155]">{formatCurrency(autoBuyValue)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-[#166534]">Total Nilai Jual (ke Perusahaan)</p>
                        <p className="text-[18px] font-bold text-[#166534]">{formatCurrency(autoSellValue)}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-[#16a34a] text-center">
                      Estimasi Profit: <strong>{formatCurrency(autoSellValue - autoBuyValue)}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handleReset}
              className="text-[12px] text-[#64748b] font-medium hover:text-[#166534] hover:underline"
            >
              + Tambah Item Lain
            </button>
          </div>
        </div>

        <div className="bg-[#fefce8] border border-[#fef08a] rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#a16207] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-medium text-[#713f12]">Perhatian Credit Limit</p>
            <p className="text-[11px] text-[#854d0e] mt-0.5">Pastikan total piutang + nilai pesanan tidak melebihi credit limit perusahaan.</p>
          </div>
        </div>

        <FormField label="Catatan">
          <textarea className="input-field min-h-[60px] resize-none" placeholder="Catatan tambahan..." />
        </FormField>
      </div>
    </Modal>
  );
}
