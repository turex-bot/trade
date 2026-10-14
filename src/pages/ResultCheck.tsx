import { useState } from 'react';
import { Plus, Search, Eye, AlertTriangle, Calculator, Trash2, FileCheck } from 'lucide-react';
import { Order, OrderItem, woodSpecs, prices } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField, Tabs } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';
import { formatVolumeM3, formatNumberID } from '../utils/logVolumeFormatter';

export default function ResultCheck() {
  const { orders, companies, suppliers, addOrder, updateOrder, deleteOrder } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !activeTab || activeTab === 'all' || o.status === activeTab;
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
    { key: 'paid', label: 'Lunas', count: orders.filter(o => o.status === 'paid').length },
  ];

  const handleDeleteOrder = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete.id);
      toast.success('Hasil cek berhasil dihapus', `${orderToDelete.orderNumber} telah dihapus`);
      setOrderToDelete(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Hasil Cek"
        subtitle="Catat hasil pengecekan fisik kayu (jumlah batang & kubikasi)"
        actions={
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Input Hasil Cek
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
              placeholder="Cari no. hasil cek atau perusahaan..."
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
          <>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No. Hasil Cek</th>
                    <th>Tanggal</th>
                    <th>Perusahaan</th>
                    <th>Supplier</th>
                    <th className="text-right">Total Batang</th>
                    <th className="text-right">Total Kubikasi</th>
                    <th className="text-right">Nilai</th>
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
                      <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                      <td className="text-[12px] text-[#64748b]">{order.supplierName}</td>
                      <td className="text-right text-[13px] font-semibold text-[#0f172a]">
                        {order.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} pcs
                      </td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.totalVolume.toFixed(3)} m³</td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatCurrency(order.totalValue)}</td>
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
                          <button
                            onClick={() => setOrderToDelete(order)}
                            className="p-1.5 rounded-lg hover:bg-[#fef2f2] text-[#94a3b8] hover:text-[#dc2626]"
                            title="Hapus Hasil Cek"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
              <p className="text-[12px] text-[#64748b]">
                Menampilkan <span className="font-semibold text-[#0f172a]">{filteredOrders.length}</span> hasil cek
              </p>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <FileCheck className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada hasil cek</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Input hasil pengecekan fisik kayu pertama Anda</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary mt-4">
              <Plus className="w-4 h-4" />
              Input Hasil Cek
            </button>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.orderNumber || ''}
        subtitle={selectedOrder ? `Hasil Cek - ${formatDate(selectedOrder.orderDate)}` : ''}
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
              <p className="text-[12px] font-semibold text-[#0f172a] mb-2">Detail Hasil Cek ({selectedOrder.items.length} item)</p>
              <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Jenis Kayu</th>
                      <th>Range Diameter</th>
                      <th className="text-right">Jumlah Batang</th>
                      <th className="text-right">Kubikasi</th>
                      <th className="text-right">Harga/m³</th>
                      <th className="text-right">Total Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map(item => (
                      <tr key={item.id}>
                        <td className="text-[12px] text-[#0f172a] font-medium">{item.woodSpecName}</td>
                        <td className="text-[12px] text-[#64748b]">{item.diameterRange}</td>
                        <td className="text-right text-[12px] font-semibold">{item.numberOfLogs} pcs</td>
                        <td className="text-right text-[12px] font-medium">{item.volume.toFixed(3)} m³</td>
                        <td className="text-right text-[12px] text-[#166534]">{formatCurrency(item.sellPrice)}/m³</td>
                        <td className="text-right text-[12px] font-bold text-[#0f172a]">{formatCurrency(item.totalSellValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#f0fdf4] rounded-lg p-4 flex items-center justify-between border border-[#dcfce7]">
              <div>
                <p className="text-[11px] text-[#166534]">Total Batang</p>
                <p className="text-[15px] font-bold text-[#166534]">{selectedOrder.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} pcs</p>
              </div>
              <div>
                <p className="text-[11px] text-[#166534]">Total Kubikasi</p>
                <p className="text-[15px] font-bold text-[#166534]">{selectedOrder.totalVolume.toFixed(3)} m³</p>
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

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        title="Hapus Hasil Cek"
        subtitle="Konfirmasi penghapusan hasil cek"
        footer={
          <>
            <button onClick={() => setOrderToDelete(null)} className="btn btn-secondary">Batal</button>
            <button onClick={handleDeleteOrder} className="btn btn-danger">
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </>
        }
      >
        {orderToDelete && (
          <div className="space-y-4">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[#991b1b]">Peringatan</p>
                  <p className="text-[12px] text-[#7f1d1d] mt-1">
                    Anda akan menghapus hasil cek <strong>{orderToDelete.orderNumber}</strong> dari {orderToDelete.companyName}.
                  </p>
                  <p className="text-[12px] text-[#7f1d1d] mt-2">
                    Total: {orderToDelete.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} pcs, {orderToDelete.totalVolume.toFixed(3)} m³, {formatCurrency(orderToDelete.totalValue)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[12px] text-[#64748b]">
              Tindakan ini tidak dapat dibatalkan. Semua data terkait hasil cek ini akan dihapus permanen.
            </p>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <ResultCheckModal 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        companies={companies}
        suppliers={suppliers}
        addOrder={addOrder}
        toast={toast}
      />
    </div>
  );
}

// Result Check Modal - NEW LOGIC: Input Batang + Kubikasi, Harga Otomatis
interface ResultCheckModalProps {
  open: boolean;
  onClose: () => void;
  companies: any[];
  suppliers: any[];
  addOrder: (order: any) => void;
  toast: any;
}

function ResultCheckModal({ open, onClose, companies, suppliers, addOrder, toast }: ResultCheckModalProps) {
  const [companyId, setCompanyId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [checkDate, setCheckDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  
  // Multi-item state - NEW LOGIC
  const [checkItems, setCheckItems] = useState<Array<{
    woodSpecId: string;
    numberOfLogs: number; // jumlah batang (pcs)
    volume: number; // kubikasi total (m³) - INPUT DARI USER
  }>>([]);

  const selectedCompany = companies.find(c => c.id === companyId);
  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  // Calculate totals - harga otomatis dari kubikasi
  const totals = checkItems.reduce((acc, item) => {
    if (item.woodSpecId && item.numberOfLogs > 0 && item.volume > 0) {
      const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive);
      
      if (price) {
        // Harga otomatis: kubikasi × harga per m³
        const buyValue = item.volume * price.buyPrice;
        const sellValue = item.volume * price.sellPrice;

        return {
          totalLogs: acc.totalLogs + item.numberOfLogs,
          totalVolume: acc.totalVolume + item.volume,
          totalSellValue: acc.totalSellValue + sellValue,
          totalBuyValue: acc.totalBuyValue + buyValue,
        };
      }
    }
    return acc;
  }, { totalLogs: 0, totalVolume: 0, totalSellValue: 0, totalBuyValue: 0 });

  const handleAddItem = () => {
    setCheckItems([...checkItems, { 
      woodSpecId: '', 
      numberOfLogs: 0, 
      volume: 0 
    }]);
  };

  const handleRemoveItem = (index: number) => {
    setCheckItems(checkItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...checkItems];
    (newItems[index] as any)[field] = value;
    setCheckItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId || !supplierId) {
      toast.error('Lengkapi data perusahaan dan supplier');
      return;
    }

    if (checkItems.length === 0) {
      toast.error('Tambahkan minimal 1 item hasil cek');
      return;
    }

    // Validate all items
    const validItems = checkItems.filter(item => 
      item.woodSpecId && item.numberOfLogs > 0 && item.volume > 0
    );
    
    if (validItems.length === 0) {
      toast.error('Lengkapi data hasil cek (jumlah batang & kubikasi)');
      return;
    }

    // Build order items - harga otomatis dari kubikasi
    const items: OrderItem[] = validItems.map((item) => {
      const spec = woodSpecs.find(s => s.id === item.woodSpecId)!;
      const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive)!;
      
      // Harga otomatis: kubikasi × harga per m³
      const totalBuyValue = item.volume * price.buyPrice;
      const totalSellValue = item.volume * price.sellPrice;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        woodSpecId: item.woodSpecId,
        woodSpecName: `${spec.woodType} ${spec.grade}`,
        numberOfLogs: item.numberOfLogs,
        volume: item.volume,
        diameterRange: spec.diameterRange,
        buyPrice: price.buyPrice,
        sellPrice: price.sellPrice,
        totalBuyValue: totalBuyValue,
        totalSellValue: totalSellValue,
      };
    });

    addOrder({
      orderDate: checkDate,
      companyId,
      companyName: selectedCompany?.name || '',
      supplierId,
      supplierName: selectedSupplier?.name || '',
      status: 'draft',
      items,
      totalVolume: totals.totalVolume,
      totalValue: totals.totalSellValue,
      notes,
    });

    toast.success('Hasil cek berhasil disimpan', `${validItems.length} item telah dicatat`);
    
    // Reset
    setCompanyId('');
    setSupplierId('');
    setNotes('');
    setCheckItems([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Input Hasil Cek"
      subtitle="Catat jumlah batang dan kubikasi hasil pengecekan fisik"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary">Batal</button>
          <button 
            onClick={handleSubmit} 
            className="btn btn-primary"
            disabled={!companyId || !supplierId || checkItems.length === 0}
          >
            Simpan Hasil Cek
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header Info - 1 baris */}
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Perusahaan" required>
            <select 
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Pilih Perusahaan</option>
              {companies.filter(c => c.status === 'aktif').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Supplier" required>
            <select 
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Pilih Supplier</option>
              {suppliers.filter(s => s.status === 'aktif').map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Tanggal Cek" required>
            <input 
              type="date" 
              value={checkDate}
              onChange={(e) => setCheckDate(e.target.value)}
              className="input-field" 
              required
            />
          </FormField>
        </div>

        {/* Items Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#166534]" />
              <p className="text-[13px] font-semibold text-[#0f172a]">Item Hasil Cek ({checkItems.length})</p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="btn btn-secondary text-[12px]"
            >
              <Plus className="w-3.5 h-3.5" />
              Tambah Item
            </button>
          </div>
          
          {checkItems.length === 0 ? (
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-6 text-center bg-[#f8fafc]">
              <p className="text-[13px] text-[#64748b] mb-2">Belum ada item hasil cek</p>
              <button
                type="button"
                onClick={handleAddItem}
                className="btn btn-primary text-[12px]"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Item Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 px-2 py-1.5 bg-[#f8fafc] rounded-lg text-[11px] font-semibold text-[#64748b]">
                <div className="col-span-3">Jenis Kayu</div>
                <div className="col-span-2">Range Diameter</div>
                <div className="col-span-2">Jumlah Batang</div>
                <div className="col-span-2">Kubikasi (m³)</div>
                <div className="col-span-2 text-right">Total Nilai</div>
                <div className="col-span-1 text-center">Aksi</div>
              </div>

              {/* Item Rows - 1 baris per item */}
              {checkItems.map((item, index) => {
                const spec = woodSpecs.find(s => s.id === item.woodSpecId);
                const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive);
                
                // Harga otomatis: kubikasi × harga per m³
                const totalValue = price && item.volume > 0 ? item.volume * price.sellPrice : 0;

                return (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end py-2 border-b border-[#f1f5f9] last:border-0">
                    {/* Jenis Kayu - Dropdown */}
                    <div className="col-span-3">
                      <select 
                        className="input-field text-[12px]"
                        value={item.woodSpecId}
                        onChange={(e) => handleItemChange(index, 'woodSpecId', e.target.value)}
                        required
                      >
                        <option value="">Pilih Jenis</option>
                        {woodSpecs.map(spec => (
                          <option key={spec.id} value={spec.id}>
                            {spec.woodType} {spec.grade}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Range Diameter - Auto dari Master Data */}
                    <div className="col-span-2">
                      {spec ? (
                        <div className="input-field text-[12px] bg-[#f8fafc] text-[#64748b] flex items-center">
                          {spec.diameterRange}
                        </div>
                      ) : (
                        <div className="input-field text-[12px] bg-[#f8fafc] text-[#94a3b8] flex items-center">
                          -
                        </div>
                      )}
                    </div>

                    {/* Jumlah Batang (pcs) */}
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field text-[12px]"
                        value={item.numberOfLogs || ''}
                        onChange={(e) => handleItemChange(index, 'numberOfLogs', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>

                    {/* Kubikasi (m³) - INPUT DARI USER */}
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field text-[12px]"
                        value={item.volume || ''}
                        onChange={(e) => handleItemChange(index, 'volume', parseFloat(e.target.value) || 0)}
                        placeholder="0.000"
                        step="0.001"
                        min="0"
                        required
                      />
                    </div>

                    {/* Total Nilai - Otomatis */}
                    <div className="col-span-2 text-right">
                      {item.volume > 0 && price && (
                        <div className="text-[11px]">
                          <p className="font-bold text-[#166534]">{formatCurrency(totalValue)}</p>
                          <p className="text-[#64748b]">{formatCurrency(price.sellPrice)}/m³</p>
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-1.5 rounded-lg hover:bg-[#fef2f2] text-[#94a3b8] hover:text-[#dc2626]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Grand Total */}
        {checkItems.length > 0 && totals.totalVolume > 0 && (
          <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7]">
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                <p className="text-[11px] text-[#64748b]">Total Batang</p>
                <p className="text-[16px] font-bold text-[#166534]">{totals.totalLogs} pcs</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                <p className="text-[11px] text-[#64748b]">Total Kubikasi</p>
                <p className="text-[16px] font-bold text-[#166534]">{totals.totalVolume.toFixed(3)} m³</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                <p className="text-[11px] text-[#64748b]">Total Nilai Jual</p>
                <p className="text-[16px] font-bold text-[#166534]">{formatCurrency(totals.totalSellValue)}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-[#dcfce7]">
                <p className="text-[11px] text-[#64748b]">Estimasi Profit</p>
                <p className="text-[16px] font-bold text-[#166534]">{formatCurrency(totals.totalSellValue - totals.totalBuyValue)}</p>
              </div>
            </div>
          </div>
        )}

        <FormField label="Catatan">
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field min-h-[60px] resize-none" 
            placeholder="Catatan hasil pengecekan..." 
          />
        </FormField>
      </form>
    </Modal>
  );
}
