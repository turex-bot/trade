import { useState } from 'react';
import { Plus, Search, Eye, AlertTriangle, Calculator, Trash2, X } from 'lucide-react';
import { Order, OrderItem } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField, Tabs } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency, formatDate } from '../data/mockData';
import { formatVolumeM3, formatNumberID, calculateLogVolumeM3 } from '../utils/logVolumeFormatter';

export default function Orders() {
  const { orders, companies, suppliers, woodSpecs, prices, addOrder, updateOrder, deleteOrder } = useData();
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
    { key: 'in_delivery', label: 'Dikirim', count: orders.filter(o => o.status === 'in_delivery').length },
    { key: 'paid', label: 'Lunas', count: orders.filter(o => o.status === 'paid').length },
  ];

  const handleDeleteOrder = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete.id);
      toast.success('Pesanan berhasil dihapus', `${orderToDelete.orderNumber} telah dihapus`);
      setOrderToDelete(null);
    }
  };

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
        {filteredOrders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No. Order</th>
                    <th>Tanggal</th>
                    <th>Perusahaan</th>
                    <th>Depo</th>
                    <th className="text-right">Jumlah Item</th>
                    <th className="text-right">Total Batang</th>
                    <th className="text-right">Volume</th>
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
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{order.items.length} item</td>
                      <td className="text-right text-[13px] font-semibold text-[#0f172a]">
                        {order.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} batang
                      </td>
                      <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatVolumeM3(order.totalVolume * 1000)} m³</td>
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
                            title="Hapus Pesanan"
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
                Menampilkan <span className="font-semibold text-[#0f172a]">{filteredOrders.length}</span> pesanan
              </p>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <Plus className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada pesanan</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Buat pesanan pertama Anda</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary mt-4">
              <Plus className="w-4 h-4" />
              Buat Pesanan
            </button>
          </div>
        )}
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
              <p className="text-[12px] font-semibold text-[#0f172a] mb-2">Item Pesanan ({selectedOrder.items.length} item)</p>
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
                        <td className="text-right text-[12px] font-semibold">{formatNumberID(item.numberOfLogs)} batang</td>
                        <td className="text-right text-[12px] text-[#64748b]">{formatVolumeM3((item.volumeDm3 / item.numberOfLogs))} m³</td>
                        <td className="text-right text-[12px] font-medium">{formatVolumeM3(item.volumeDm3)} m³</td>
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
                <p className="text-[15px] font-bold text-[#166534]">{formatVolumeM3(selectedOrder.totalVolume * 1000)} m³</p>
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
        title="Hapus Pesanan"
        subtitle="Konfirmasi penghapusan pesanan"
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
                    Anda akan menghapus pesanan <strong>{orderToDelete.orderNumber}</strong> dari {orderToDelete.companyName}.
                  </p>
                  <p className="text-[12px] text-[#7f1d1d] mt-2">
                    Total: {orderToDelete.items.reduce((sum, item) => sum + item.numberOfLogs, 0)} batang, {formatVolumeM3(orderToDelete.totalVolume * 1000)} m³, {formatCurrency(orderToDelete.totalValue)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[12px] text-[#64748b]">
              Tindakan ini tidak dapat dibatalkan. Semua data terkait pesanan ini akan dihapus permanen.
            </p>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <CreateOrderModal 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        companies={companies}
        suppliers={suppliers}
        woodSpecs={woodSpecs}
        prices={prices}
        addOrder={addOrder}
        toast={toast}
      />
    </div>
  );
}

// Create Order Modal - NEW: Dropdown jenis kayu, diameter + pcs sejajar, harga otomatis, 1 baris per item
interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  companies: any[];
  suppliers: any[];
  woodSpecs: any[];
  prices: any[];
  addOrder: (order: any) => void;
  toast: any;
}

function CreateOrderModal({ open, onClose, companies, suppliers, woodSpecs, prices, addOrder, toast }: CreateOrderModalProps) {
  const [companyId, setCompanyId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  
  // Item state - simplified: 1 line per item
  const [orderItems, setOrderItems] = useState<Array<{
    woodSpecId: string;
    diameter: number; // diameter tunggal untuk semua batang di item ini
    numberOfLogs: number; // jumlah batang (pcs)
    lengthCm: number; // panjang dalam cm
  }>>([]);

  const selectedCompany = companies.find(c => c.id === companyId);
  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  // Calculate totals
  const totals = orderItems.reduce((acc, item) => {
    if (item.woodSpecId && item.numberOfLogs > 0 && item.lengthCm > 0) {
      const spec = woodSpecs.find(s => s.id === item.woodSpecId);
      const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive);
      
      if (spec && price) {
        // Calculate volume based on diameter and length
        const volumePerLog = calculateLogVolumeM3(item.diameter, item.lengthCm);
        const totalVolume = volumePerLog * item.numberOfLogs;
        const sellValue = totalVolume * price.sellPrice;
        const buyValue = totalVolume * price.buyPrice;

        return {
          totalLogs: acc.totalLogs + item.numberOfLogs,
          totalVolume: acc.totalVolume + totalVolume,
          totalSellValue: acc.totalSellValue + sellValue,
          totalBuyValue: acc.totalBuyValue + buyValue,
        };
      }
    }
    return acc;
  }, { totalLogs: 0, totalVolume: 0, totalSellValue: 0, totalBuyValue: 0 });

  const handleAddItem = () => {
    setOrderItems([...orderItems, { 
      woodSpecId: '', 
      diameter: 0, 
      numberOfLogs: 0, 
      lengthCm: 400 
    }]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...orderItems];
    (newItems[index] as any)[field] = value;
    
    // Auto-set length from spec when woodSpecId changes
    if (field === 'woodSpecId' && value) {
      const spec = woodSpecs.find(s => s.id === value);
      if (spec) {
        newItems[index].lengthCm = spec.standardLength;
        newItems[index].diameter = spec.avgDiameter;
      }
    }
    
    setOrderItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId || !supplierId) {
      toast.error('Lengkapi data perusahaan dan supplier');
      return;
    }

    if (orderItems.length === 0) {
      toast.error('Tambahkan minimal 1 item kayu');
      return;
    }

    // Validate all items
    const validItems = orderItems.filter(item => 
      item.woodSpecId && item.diameter > 0 && item.numberOfLogs > 0 && item.lengthCm > 0
    );
    
    if (validItems.length === 0) {
      toast.error('Lengkapi data item kayu');
      return;
    }

    // Build order items
    const items: OrderItem[] = validItems.map((item) => {
      const spec = woodSpecs.find(s => s.id === item.woodSpecId)!;
      const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive)!;
      
      // Generate diameters array (all same diameter for this item)
      const logDiameters = Array(item.numberOfLogs).fill(item.diameter);
      
      // Calculate volume
      const volumePerLog = calculateLogVolumeM3(item.diameter, item.lengthCm);
      const totalVolumeM3 = volumePerLog * item.numberOfLogs;
      const totalVolumeDm3 = totalVolumeM3 * 1000;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        woodSpecId: item.woodSpecId,
        woodSpecName: `${spec.woodType} ${item.diameter}cm ${spec.grade}`,
        numberOfLogs: item.numberOfLogs,
        logDiameters: logDiameters,
        logLength: item.lengthCm,
        volumeDm3: Math.round(totalVolumeDm3 * 100) / 100,
        volume: Math.round(totalVolumeM3 * 1000) / 1000,
        buyPricePerLog: price.buyPrice * volumePerLog,
        sellPricePerLog: price.sellPrice * volumePerLog,
        buyPrice: price.buyPrice,
        sellPrice: price.sellPrice,
        totalBuyValue: totalVolumeM3 * price.buyPrice,
        totalSellValue: totalVolumeM3 * price.sellPrice,
      };
    });

    addOrder({
      orderDate,
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

    toast.success('Pesanan berhasil dibuat', `${validItems.length} item kayu telah ditambahkan`);
    
    // Reset
    setCompanyId('');
    setSupplierId('');
    setNotes('');
    setOrderItems([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Buat Pesanan Baru"
      subtitle="Pilih jenis kayu, input diameter & jumlah batang"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary">Batal</button>
          <button 
            onClick={handleSubmit} 
            className="btn btn-primary"
            disabled={!companyId || !supplierId || orderItems.length === 0}
          >
            Buat Pesanan
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
          <FormField label="Tanggal" required>
            <input 
              type="date" 
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
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
              <p className="text-[13px] font-semibold text-[#0f172a]">Item Kayu ({orderItems.length})</p>
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
          
          {orderItems.length === 0 ? (
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-6 text-center bg-[#f8fafc]">
              <p className="text-[13px] text-[#64748b] mb-2">Belum ada item kayu</p>
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
                <div className="col-span-2">Diameter (cm)</div>
                <div className="col-span-2">Jumlah (pcs)</div>
                <div className="col-span-2">Panjang (cm)</div>
                <div className="col-span-2 text-right">Kubikasi</div>
                <div className="col-span-1 text-center">Aksi</div>
              </div>

              {/* Item Rows - 1 baris per item */}
              {orderItems.map((item, index) => {
                const spec = woodSpecs.find(s => s.id === item.woodSpecId);
                const price = prices.find(p => p.woodSpecId === item.woodSpecId && p.isActive);
                
                // Calculate volume for this item
                const volumePerLog = item.diameter > 0 && item.lengthCm > 0 
                  ? calculateLogVolumeM3(item.diameter, item.lengthCm) 
                  : 0;
                const totalVolume = volumePerLog * item.numberOfLogs;
                const totalValue = price ? totalVolume * price.sellPrice : 0;

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
                            {spec.woodType} {spec.diameterRange} {spec.grade}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Diameter */}
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field text-[12px]"
                        value={item.diameter || ''}
                        onChange={(e) => handleItemChange(index, 'diameter', parseFloat(e.target.value) || 0)}
                        placeholder="21"
                        step="0.1"
                        required
                      />
                    </div>

                    {/* Jumlah (pcs) */}
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

                    {/* Panjang */}
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field text-[12px]"
                        value={item.lengthCm}
                        onChange={(e) => handleItemChange(index, 'lengthCm', parseInt(e.target.value) || 0)}
                        placeholder="130"
                        required
                      />
                    </div>

                    {/* Kubikasi & Harga */}
                    <div className="col-span-2 text-right">
                      {item.numberOfLogs > 0 && item.diameter > 0 && (
                        <div className="text-[11px]">
                          <p className="font-bold text-[#166534]">{totalVolume.toFixed(3)} m³</p>
                          {price && (
                            <p className="text-[#64748b]">{formatCurrency(totalValue)}</p>
                          )}
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
        {orderItems.length > 0 && totals.totalVolume > 0 && (
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

        {selectedCompany && (
          <div className="bg-[#fefce8] border border-[#fef08a] rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#a16207] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[12px] font-medium text-[#713f12]">Credit Limit: {formatCurrency(selectedCompany.creditLimit)}</p>
              <p className="text-[11px] text-[#854d0e] mt-0.5">Pastikan total piutang + nilai pesanan tidak melebihi credit limit.</p>
            </div>
          </div>
        )}

        <FormField label="Catatan">
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field min-h-[60px] resize-none" 
            placeholder="Catatan tambahan..." 
          />
        </FormField>
      </form>
    </Modal>
  );
}
