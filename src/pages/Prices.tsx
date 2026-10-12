import { useState } from 'react';
import { Plus, Search, Edit2, TrendingUp } from 'lucide-react';
import { prices, formatCurrency, formatDate } from '../data/mockData';

export default function Prices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredPrices = prices.filter(p =>
    p.woodSpecName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Harga</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola harga beli, margin, dan harga jual kayu</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Harga
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari spesifikasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm outline-none flex-1"
        />
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Spesifikasi</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Harga Beli Depo</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Margin Trader</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Harga Jual</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Berlaku Sejak</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrices.map((price) => (
                <tr key={price.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{price.woodSpecName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-700">{formatCurrency(price.buyPrice)}</span>
                    <span className="text-xs text-gray-400">/m³</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-medium text-forest-700">+{formatCurrency(price.traderMargin)}</span>
                    <span className="text-xs text-gray-400">/m³</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(price.sellPrice)}</span>
                    <span className="text-xs text-gray-400">/m³</span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{formatDate(price.effectiveDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      price.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {price.isActive ? '● Aktif' : '○ Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Calculation Example */}
      <div className="bg-forest-50 border border-forest-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-forest-800 mb-2">💡 Contoh Perhitungan Margin</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white rounded-lg p-3 border border-forest-100">
            <p className="text-xs text-gray-500">Harga Beli Depo</p>
            <p className="font-bold text-gray-900">Rp1.200.000/m³</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-forest-100">
            <p className="text-xs text-gray-500">Margin Trader</p>
            <p className="font-bold text-forest-700">+Rp15.000/m³</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-forest-100">
            <p className="text-xs text-gray-500">Harga Jual</p>
            <p className="font-bold text-gray-900">Rp1.215.000/m³</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-forest-100">
            <p className="text-xs text-gray-500">Profit (50 m³)</p>
            <p className="font-bold text-green-600">Rp750.000</p>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Tambah Harga Baru</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Spesifikasi Kayu <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Pilih Spesifikasi</option>
                  <option>Meranti 20-30cm Grade A</option>
                  <option>Meranti 30-40cm Grade A</option>
                  <option>Keruing 20-30cm Grade B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Beli Depo (per m³) <span className="text-red-500">*</span></label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="1200000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Margin Trader (per m³)</label>
                <input type="number" defaultValue={15000} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Berlaku <span className="text-red-500">*</span></label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white bg-forest-700 hover:bg-forest-800 rounded-lg">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
