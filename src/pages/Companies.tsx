import { useState } from 'react';
import { Plus, Search, Edit2, MoreVertical, Building2, User, Phone, Shield } from 'lucide-react';
import { companies, Company, formatCurrency } from '../data/mockData';

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.picName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'B': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'C': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perusahaan Plywood</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data perusahaan plywood sebagai pembeli</p>
        </div>
        <button
          onClick={() => { setEditingCompany(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Perusahaan
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama perusahaan atau PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option value="">Semua Rating</option>
          <option value="A">Rating A</option>
          <option value="B">Rating B</option>
          <option value="C">Rating C</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-forest-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3" /> PIC: {company.picName}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === company.id ? null : company.id)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {activeMenu === company.id && (
                  <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button onClick={() => { setEditingCompany(company); setShowForm(true); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {company.picPhone}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-gray-400">TOP:</span>
                <span className="font-medium text-gray-700">{company.topDays} hari</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">Credit Limit</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(company.creditLimit)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskColor(company.riskRating)}`}>
                  Rating {company.riskRating}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                company.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {company.status === 'aktif' ? '● Aktif' : '○ Nonaktif'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCompany ? 'Edit Perusahaan' : 'Tambah Perusahaan Baru'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Perusahaan <span className="text-red-500">*</span></label>
                <input type="text" defaultValue={editingCompany?.name} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="PT. ..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama PIC <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue={editingCompany?.picName} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nama PIC" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">No. HP PIC <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue={editingCompany?.picPhone} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Pabrik <span className="text-red-500">*</span></label>
                <textarea defaultValue={editingCompany?.address} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[60px]" placeholder="Alamat lengkap" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">TOP (hari) <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue={editingCompany?.topDays} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Credit Limit <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue={editingCompany?.creditLimit} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="500000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating Risiko <span className="text-red-500">*</span></label>
                  <select defaultValue={editingCompany?.riskRating} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="A">A - Rendah</option>
                    <option value="B">B - Sedang</option>
                    <option value="C">C - Tinggi</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">NPWP</label>
                <input type="text" defaultValue={editingCompany?.npwp} className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="XX.XXX.XXX.X-XXX.XXX" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Batal
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white bg-forest-700 hover:bg-forest-800 rounded-lg">
                {editingCompany ? 'Simpan Perubahan' : 'Tambah Perusahaan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
