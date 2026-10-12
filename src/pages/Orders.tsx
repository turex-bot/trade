import { useState } from 'react';
import { Plus, Search, Eye, AlertTriangle, CheckCircle2, Truck, Package, FileText } from 'lucide-react';
import { orders, Order, formatCurrency, formatDate } from '../data/mockData';

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
      draft: { color: 'bg-gray-100 text-gray-600', icon: <FileText className="w-3 h-3" /> },
      confirmed: { color: 'bg-blue-100 text-blue-700', icon: <CheckCircle2 className="w-3 h-3" /> },
      in_delivery: { color: 'bg-yellow-100 text-yellow-700', icon: <Truck className="w-3 h-3" /> },
      received: { color: 'bg-purple-100 text-purple-700', icon: <Package className="w-3 h-3" /> },
      invoiced: { color: 'bg-orange-100 text-orange-700', icon: <FileText className="w-3 h-3" /> },
      paid: { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3 h-3" /> },
      cancelled: { color: 'bg-red-100 text-red-700', icon: <AlertTriangle className="w-3 h-3" /> },
    };
    const { color, icon } = config[status] || config.draft;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        {icon}
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pesanan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola pesanan kayu dari perusahaan plywood</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buat Pesanan
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {['draft', 'confirmed', 'in_delivery', 'received', 'invoiced', 'paid'].map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
              className={`p-3 rounded-lg border text-center transition-all ${
                statusFilter === status ? 'border-forest-700 bg-forest-50' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500 capitalize">{status.replace('_', ' ')}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari no. order atau perusahaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm outline-none flex-1"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Order</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Depo</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Volume</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nilai</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-forest-700">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.companyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.supplierName}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{order.totalVolume} m³</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{formatCurrency(order.totalValue)}</td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-forest-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-500">{formatDate(selectedOrder.orderDate)}</p>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>

            <div className="p-6 space-y-6">
              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Perusahaan Plywood</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOrder.companyName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Depo / Supplier</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOrder.supplierName}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Item Pesanan</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Spesifikasi</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">Volume</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">Harga Beli</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">Harga Jual</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.woodSpecName}</td>
                          <td className="px-4 py-3 text-sm text-right">{item.volume} m³</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">{formatCurrency(item.buyPrice)}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-forest-700">{formatCurrency(item.sellPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-forest-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-forest-600">Total Volume: <span className="font-bold">{selectedOrder.totalVolume} m³</span></p>
                </div>
                <div>
                  <p className="text-xs text-forest-600">Total Nilai</p>
                  <p className="text-lg font-bold text-forest-800">{formatCurrency(selectedOrder.totalValue)}</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Catatan</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Buat Pesanan Baru</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Perusahaan Plywood <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">Pilih Perusahaan</option>
                    <option>PT. Plywood Nusantara</option>
                    <option>PT. Kayu Jaya Abadi</option>
                    <option>PT. Multi Plywood Indonesia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Depo / Supplier <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">Pilih Depo</option>
                    <option>Depo Kayu Makmur</option>
                    <option>Depo Kayu Sejahtera</option>
                    <option>Depo Kayu Lestari</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Order <span className="text-red-500">*</span></label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>

              {/* Items */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Kayu</label>
                <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <select className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option value="">Pilih Spesifikasi</option>
                      <option>Meranti 20-30cm Grade A</option>
                      <option>Keruing 20-30cm Grade B</option>
                    </select>
                    <input type="number" placeholder="Volume (m³)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <button className="text-sm text-forest-700 font-medium hover:underline">+ Tambah Item</button>
                </div>
              </div>

              {/* Credit Limit Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Perhatian Credit Limit</p>
                  <p className="text-xs text-yellow-700 mt-0.5">Pastikan total piutang + nilai pesanan tidak melebihi credit limit perusahaan.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Catatan tambahan..." />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white bg-forest-700 hover:bg-forest-800 rounded-lg">Buat Pesanan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
