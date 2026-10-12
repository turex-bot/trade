import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Phone, Mail, MapPin } from 'lucide-react';
import { suppliers, Supplier, formatDate } from '../data/mockData';

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Depo / Supplier</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data depo kayu sebagai supplier</p>
        </div>
        <button
          onClick={() => { setEditingSupplier(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Depo
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama depo atau pemilik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nama Depo</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Pemilik</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kontak</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Bank</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center">
                        <span className="text-forest-700 font-bold text-sm">{supplier.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {supplier.address.split(',')[0]}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{supplier.ownerName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {supplier.phone}
                      </p>
                      {supplier.email && (
                        <p className="text-xs text-gray-500 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {supplier.email}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{supplier.bankName}</p>
                    <p className="text-xs text-gray-500">{supplier.bankAccount}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      supplier.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {supplier.status === 'aktif' ? '● Aktif' : '○ Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === supplier.id ? null : supplier.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeMenu === supplier.id && (
                        <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button onClick={() => handleEdit(supplier)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" /> Nonaktifkan
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Menampilkan {filteredSuppliers.length} dari {suppliers.length} depo</p>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingSupplier ? 'Edit Depo' : 'Tambah Depo Baru'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <FormField label="Nama Depo" required>
                <input type="text" defaultValue={editingSupplier?.name} className="form-input" placeholder="Masukkan nama depo" />
              </FormField>
              <FormField label="Nama Pemilik" required>
                <input type="text" defaultValue={editingSupplier?.ownerName} className="form-input" placeholder="Nama pemilik depo" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="No. HP" required>
                  <input type="text" defaultValue={editingSupplier?.phone} className="form-input" placeholder="08xxxxxxxxxx" />
                </FormField>
                <FormField label="Email">
                  <input type="email" defaultValue={editingSupplier?.email} className="form-input" placeholder="email@example.com" />
                </FormField>
              </div>
              <FormField label="Alamat" required>
                <textarea defaultValue={editingSupplier?.address} className="form-input min-h-[80px]" placeholder="Alamat lengkap depo" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Bank" required>
                  <select defaultValue={editingSupplier?.bankName} className="form-input">
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                  </select>
                </FormField>
                <FormField label="No. Rekening" required>
                  <input type="text" defaultValue={editingSupplier?.bankAccount} className="form-input" placeholder="No. rekening" />
                </FormField>
              </div>
              <FormField label="NPWP">
                <input type="text" defaultValue={editingSupplier?.npwp} className="form-input" placeholder="XX.XXX.XXX.X-XXX.XXX" />
              </FormField>
              <FormField label="Status">
                <select defaultValue={editingSupplier?.status || 'aktif'} className="form-input">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </FormField>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Batal
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-white bg-forest-700 hover:bg-forest-800 rounded-lg">
                {editingSupplier ? 'Simpan Perubahan' : 'Tambah Depo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
