import { useState } from 'react';
import { Plus, Search, Truck, CheckCircle2, Clock, XCircle, Package } from 'lucide-react';
import { deliveries, Delivery, formatDate } from '../data/mockData';

export default function Deliveries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredDeliveries = deliveries.filter(d =>
    d.doNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
      pending: { color: 'bg-gray-100 text-gray-600', icon: <Clock className="w-3 h-3" />, label: 'Pending' },
      in_transit: { color: 'bg-yellow-100 text-yellow-700', icon: <Truck className="w-3 h-3" />, label: 'Dalam Pengiriman' },
      received: { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3 h-3" />, label: 'Diterima' },
      rejected: { color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3 h-3" />, label: 'Ditolak' },
    };
    const { color, icon, label } = config[status] || config.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        {icon} {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengiriman / Surat Jalan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pengiriman dan bukti terima barang</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buat Surat Jalan
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg"><Clock className="w-5 h-5 text-gray-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliveries.filter(d => d.status === 'pending').length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg"><Truck className="w-5 h-5 text-yellow-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliveries.filter(d => d.status === 'in_transit').length}</p>
              <p className="text-xs text-gray-500">Dalam Pengiriman</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliveries.filter(d => d.status === 'received').length}</p>
              <p className="text-xs text-gray-500">Diterima</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-900">{deliveries.filter(d => d.status === 'rejected').length}</p>
              <p className="text-xs text-gray-500">Ditolak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari no. surat jalan atau order..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm outline-none flex-1"
        />
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Surat Jalan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Order</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tgl Kirim</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kendaraan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Supir</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Volume</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-forest-700">{delivery.doNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{delivery.orderNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(delivery.deliveryDate)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{delivery.vehiclePlate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{delivery.driverName}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                    <div className="flex items-center justify-end gap-1">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      {delivery.actualVolume} m³
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(delivery.status)}</td>
                  <td className="px-6 py-4 text-center">
                    {delivery.status === 'in_transit' && (
                      <button className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                        Tandai Diterima
                      </button>
                    )}
                    {delivery.status === 'received' && (
                      <span className="text-xs text-gray-500">
                        Diterima: {delivery.receiveDate ? formatDate(delivery.receiveDate) : '-'}
                      </span>
                    )}
                    {delivery.status === 'pending' && (
                      <button className="px-3 py-1.5 text-xs font-medium text-forest-700 bg-forest-50 rounded-lg hover:bg-forest-100">
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
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Buat Surat Jalan</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pilih Order <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Pilih Order yang sudah dikonfirmasi</option>
                  <option>ORD-202502-0002 - PT. Plywood Nusantara</option>
                  <option>ORD-202502-0003 - PT. Timber Solutions</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Kirim <span className="text-red-500">*</span></label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Polisi Kendaraan</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="KT 1234 AB" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Supir</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nama supir" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume Aktual (m³)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="50" />
              </div>

              {/* Upload area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bukti Foto (opsional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-forest-400 transition-colors cursor-pointer">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Klik atau drag file untuk upload</p>
                  <p className="text-xs text-gray-400 mt-1">Maks 5MB (JPG, PNG, PDF)</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white bg-forest-700 hover:bg-forest-800 rounded-lg">Buat Surat Jalan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
