import { useState } from 'react';
import { Plus, Search, Edit2, TreePine } from 'lucide-react';
import { woodSpecs, prices, formatCurrency } from '../data/mockData';

export default function WoodSpecs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredSpecs = woodSpecs.filter(s =>
    s.woodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Spesifikasi Kayu</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data jenis dan spesifikasi kayu</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Spesifikasi
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari jenis kayu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm outline-none flex-1"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpecs.map((spec) => {
          const price = prices.find(p => p.woodSpecId === spec.id && p.isActive);
          return (
            <div key={spec.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{spec.woodType}</h3>
                    <p className="text-xs text-gray-500">{spec.diameterRange}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(spec.grade)}`}>
                  Grade {spec.grade}
                </span>
              </div>

              {spec.notes && (
                <p className="text-xs text-gray-500 mb-3 bg-gray-50 rounded-lg px-3 py-2">{spec.notes}</p>
              )}

              {price && (
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Harga Beli</span>
                    <span className="font-medium text-gray-700">{formatCurrency(price.buyPrice)}/m³</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Margin</span>
                    <span className="font-medium text-forest-700">+{formatCurrency(price.traderMargin)}/m³</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1.5 border-t border-dashed border-gray-200">
                    <span className="text-gray-700 font-medium">Harga Jual</span>
                    <span className="font-bold text-forest-700">{formatCurrency(price.sellPrice)}/m³</span>
                  </div>
                </div>
              )}

              <button className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-forest-700 bg-forest-50 rounded-lg hover:bg-forest-100 transition-colors">
                <Edit2 className="w-3 h-3" /> Edit Spesifikasi
              </button>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Tambah Spesifikasi Kayu</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis Kayu <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Meranti, Keruing, dll" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Range Diameter <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="20-30 cm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Grade <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Keterangan</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Catatan tambahan" />
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
