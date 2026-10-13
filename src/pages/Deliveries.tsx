import { useState } from 'react';
import { Plus, Search, Truck, CheckCircle2, Clock, XCircle, Package } from 'lucide-react';
import { Delivery } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatDate } from '../data/mockData';

export default function Deliveries() {
  const { deliveries, orders, companies, addDelivery, updateDelivery, updateOrder, addInvoice } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    orderId: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    vehiclePlate: '',
    driverName: '',
    actualVolume: 0,
    receiveDate: null as string | null,
    status: 'pending' as 'pending' | 'in_transit' | 'received' | 'rejected',
    receivedBy: ''
  });

  const filteredDeliveries = deliveries.filter(d =>
    d.doNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray'; label: string }> = {
      pending: { variant: 'gray', label: 'Pending' },
      in_transit: { variant: 'yellow', label: 'Dalam Pengiriman' },
      received: { variant: 'green', label: 'Diterima' },
      rejected: { variant: 'red', label: 'Ditolak' },
    };
    const { variant, label } = config[status] || config.pending;
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const handleOpenAdd = () => {
    setFormData({
      orderId: '',
      deliveryDate: new Date().toISOString().split('T')[0],
      vehiclePlate: '',
      driverName: '',
      actualVolume: 0,
      receiveDate: null,
      status: 'pending',
      receivedBy: ''
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = orders.find(o => o.id === formData.orderId);
    if (!order) {
      toast.error('Order tidak ditemukan');
      return;
    }

    addDelivery({
      orderId: formData.orderId,
      orderNumber: order.orderNumber,
      deliveryDate: formData.deliveryDate,
      vehiclePlate: formData.vehiclePlate,
      driverName: formData.driverName,
      actualVolume: formData.actualVolume || order.totalVolume,
      receiveDate: null,
      status: 'in_transit',
      receivedBy: ''
    });

    // Update order status
    updateOrder(order.id, { status: 'in_delivery' });

    toast.success('Surat jalan berhasil dibuat');
    setShowForm(false);
  };

  const handleMarkReceived = (delivery: Delivery) => {
    const receiveDate = new Date().toISOString().split('T')[0];
    updateDelivery(delivery.id, { 
      status: 'received', 
      receiveDate,
      receivedBy: 'Penerima'
    });

    // Auto-generate invoice
    const order = orders.find(o => o.id === delivery.orderId);
    if (order) {
      const company = companies.find(c => c.id === order.companyId);
      if (company) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + company.topDays);
        
        addInvoice({
          deliveryId: delivery.id,
          companyId: order.companyId,
          companyName: order.companyName,
          invoiceDate: receiveDate,
          dueDate: dueDate.toISOString().split('T')[0],
          totalAmount: order.totalValue,
          paidAmount: 0,
          status: 'unpaid',
          agingDays: 0,
          agingCategory: 'Belum Jatuh Tempo'
        });
      }
    }

    toast.success('Pengiriman diterima', 'Invoice otomatis ter-generate');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Surat Jalan"
        subtitle="Kelola pengiriman dan bukti terima barang"
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Buat Surat Jalan
          </button>
        }
      />

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#64748b]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Pending</p>
              <p className="text-[18px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#fefce8] flex items-center justify-center">
              <Truck className="w-4 h-4 text-[#a16207]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Dalam Pengiriman</p>
              <p className="text-[18px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'in_transit').length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Diterima</p>
              <p className="text-[18px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'received').length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#fef2f2] flex items-center justify-center">
              <XCircle className="w-4 h-4 text-[#dc2626]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Ditolak</p>
              <p className="text-[18px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'rejected').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari no. surat jalan atau order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="card">
        {filteredDeliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Surat Jalan</th>
                  <th>No. Order</th>
                  <th>Tgl Kirim</th>
                  <th>Kendaraan</th>
                  <th>Supir</th>
                  <th className="text-right">Volume</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>
                      <span className="font-semibold text-[#166534] text-[12px]">{delivery.doNumber}</span>
                    </td>
                    <td className="text-[12px] text-[#64748b]">{delivery.orderNumber}</td>
                    <td className="text-[12px] text-[#64748b]">{formatDate(delivery.deliveryDate)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-[#94a3b8]" />
                        <span className="text-[12px] text-[#0f172a] font-medium">{delivery.vehiclePlate}</span>
                      </div>
                    </td>
                    <td className="text-[12px] text-[#64748b]">{delivery.driverName}</td>
                    <td className="text-right text-[13px] font-medium text-[#0f172a]">{delivery.actualVolume} m³</td>
                    <td className="text-center">{getStatusBadge(delivery.status)}</td>
                    <td className="text-center">
                      {delivery.status === 'in_transit' && (
                        <button 
                          onClick={() => handleMarkReceived(delivery)}
                          className="px-3 py-1.5 text-[11px] font-medium text-white bg-[#166534] rounded-lg hover:bg-[#14532d]"
                        >
                          Tandai Diterima
                        </button>
                      )}
                      {delivery.status === 'received' && (
                        <span className="text-[11px] text-[#64748b]">
                          {delivery.receiveDate ? formatDate(delivery.receiveDate) : '-'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <Truck className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada surat jalan</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Buat surat jalan dari pesanan yang sudah dikonfirmasi</p>
            <button onClick={handleOpenAdd} className="btn btn-primary mt-4">
              <Plus className="w-4 h-4" />
              Buat Surat Jalan
            </button>
          </div>
        )}
      </div>

      {/* Create DO Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Buat Surat Jalan"
        subtitle="Buat surat jalan dari order yang sudah dikonfirmasi"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={handleSubmit} className="btn btn-primary">Buat Surat Jalan</button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Pilih Order" required hint="Hanya menampilkan order yang sudah dikonfirmasi">
            <select 
              value={formData.orderId}
              onChange={(e) => setFormData({...formData, orderId: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Pilih Order</option>
              {orders.filter(o => o.status === 'confirmed').map(o => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} - {o.companyName}
                </option>
              ))}
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tanggal Kirim" required>
              <input 
                type="date" 
                value={formData.deliveryDate}
                onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                className="input-field" 
                required
              />
            </FormField>
            <FormField label="No. Polisi Kendaraan">
              <input 
                type="text" 
                value={formData.vehiclePlate}
                onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})}
                className="input-field" 
                placeholder="KT 1234 AB" 
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Supir">
              <input 
                type="text" 
                value={formData.driverName}
                onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                className="input-field" 
                placeholder="Nama supir" 
              />
            </FormField>
            <FormField label="Volume Aktual (m³)">
              <input 
                type="number" 
                step="0.01"
                value={formData.actualVolume || ''}
                onChange={(e) => setFormData({...formData, actualVolume: parseFloat(e.target.value) || 0})}
                className="input-field" 
                placeholder="50" 
              />
            </FormField>
          </div>
        </form>
      </Modal>
    </div>
  );
}
