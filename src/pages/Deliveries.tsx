import { useState } from 'react';
import { Plus, Search, Truck, CheckCircle2, Clock, XCircle, Package } from 'lucide-react';
import { deliveries, Delivery, formatDate } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';

export default function Deliveries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Surat Jalan"
        subtitle="Kelola pengiriman dan bukti terima barang"
        actions={
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
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
                      <button className="px-3 py-1.5 text-[11px] font-medium text-white bg-[#166534] rounded-lg hover:bg-[#14532d]">
                        Tandai Diterima
                      </button>
                    )}
                    {delivery.status === 'received' && (
                      <span className="text-[11px] text-[#64748b]">
                        {delivery.receiveDate ? formatDate(delivery.receiveDate) : '-'}
                      </span>
                    )}
                    {delivery.status === 'pending' && (
                      <button className="px-3 py-1.5 text-[11px] font-medium text-[#166534] bg-[#f0fdf4] rounded-lg hover:bg-[#dcfce7]">
                        Kirim
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <button onClick={() => setShowForm(false)} className="btn btn-primary">Buat Surat Jalan</button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Pilih Order" required hint="Hanya menampilkan order yang sudah dikonfirmasi">
            <select className="input-field">
              <option value="">Pilih Order</option>
              <option>ORD-202502-0002 - PT. Plywood Nusantara</option>
              <option>ORD-202502-0003 - PT. Timber Solutions</option>
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tanggal Kirim" required>
              <input type="date" className="input-field" />
            </FormField>
            <FormField label="No. Polisi Kendaraan">
              <input type="text" className="input-field" placeholder="KT 1234 AB" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Supir">
              <input type="text" className="input-field" placeholder="Nama supir" />
            </FormField>
            <FormField label="Volume Aktual (m³)">
              <input type="number" className="input-field" placeholder="50" />
            </FormField>
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#334155] mb-1.5">Bukti Foto (opsional)</p>
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-6 text-center hover:border-[#166534] transition-colors cursor-pointer bg-[#f8fafc]">
              <Package className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
              <p className="text-[12px] text-[#64748b]">Klik atau drag file untuk upload</p>
              <p className="text-[11px] text-[#94a3b8] mt-1">Maks 5MB (JPG, PNG, PDF)</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
