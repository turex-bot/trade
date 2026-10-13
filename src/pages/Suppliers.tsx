import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Phone, MapPin, Filter, Download } from 'lucide-react';
import { suppliers, Supplier } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField, EmptyState } from '../components/ui';

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
    setActiveMenu(null);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Depo / Supplier"
        subtitle="Kelola data depo kayu sebagai supplier bahan baku"
        actions={
          <>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => { setEditingSupplier(null); setShowForm(true); }} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Tambah Depo
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari nama depo atau pemilik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                !statusFilter ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('aktif')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                statusFilter === 'aktif' ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setStatusFilter('nonaktif')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                statusFilter === 'nonaktif' ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Nonaktif
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {filteredSuppliers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nama Depo</th>
                    <th>Pemilik</th>
                    <th>Kontak</th>
                    <th>Bank</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#166534] font-bold text-[13px]">{supplier.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0f172a] text-[13px]">{supplier.name}</p>
                            <p className="text-[11px] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {supplier.address.split(',')[0]}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[13px] text-[#334155] font-medium">{supplier.ownerName}</p>
                      </td>
                      <td>
                        <p className="text-[12px] text-[#334155] flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#94a3b8]" />
                          {supplier.phone}
                        </p>
                        {supplier.email && (
                          <p className="text-[11px] text-[#94a3b8] mt-0.5">{supplier.email}</p>
                        )}
                      </td>
                      <td>
                        <p className="text-[12px] text-[#334155] font-medium">{supplier.bankName}</p>
                        <p className="text-[11px] text-[#94a3b8]">{supplier.bankAccount}</p>
                      </td>
                      <td className="text-center">
                        <Badge variant={supplier.status === 'aktif' ? 'green' : 'gray'} dot>
                          {supplier.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenu(activeMenu === supplier.id ? null : supplier.id)}
                            className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {activeMenu === supplier.id && (
                            <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-lg border border-[#e2e8f0] py-1 z-10 animate-scale-in">
                              <button onClick={() => handleEdit(supplier)} className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#334155] hover:bg-[#f8fafc]">
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#dc2626] hover:bg-[#fef2f2]">
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
            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9] flex items-center justify-between">
              <p className="text-[12px] text-[#64748b]">
                Menampilkan <span className="font-semibold text-[#0f172a]">{filteredSuppliers.length}</span> dari <span className="font-semibold text-[#0f172a]">{suppliers.length}</span> depo
              </p>
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Search className="w-6 h-6" />}
            title="Tidak ada data ditemukan"
            description="Coba ubah filter atau kata kunci pencarian Anda"
          />
        )}
      </div>

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingSupplier ? 'Edit Depo' : 'Tambah Depo Baru'}
        subtitle="Lengkapi informasi depo/supplier kayu"
        size="lg"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={() => setShowForm(false)} className="btn btn-primary">
              {editingSupplier ? 'Simpan Perubahan' : 'Tambah Depo'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Depo" required>
              <input type="text" defaultValue={editingSupplier?.name} className="input-field" placeholder="Masukkan nama depo" />
            </FormField>
            <FormField label="Nama Pemilik" required>
              <input type="text" defaultValue={editingSupplier?.ownerName} className="input-field" placeholder="Nama pemilik depo" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="No. HP" required>
              <input type="text" defaultValue={editingSupplier?.phone} className="input-field" placeholder="08xxxxxxxxxx" />
            </FormField>
            <FormField label="Email">
              <input type="email" defaultValue={editingSupplier?.email} className="input-field" placeholder="email@example.com" />
            </FormField>
          </div>
          <FormField label="Alamat" required>
            <textarea defaultValue={editingSupplier?.address} className="input-field min-h-[80px] resize-none" placeholder="Alamat lengkap depo" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Bank" required>
              <select defaultValue={editingSupplier?.bankName} className="input-field">
                <option value="">Pilih Bank</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
              </select>
            </FormField>
            <FormField label="No. Rekening" required>
              <input type="text" defaultValue={editingSupplier?.bankAccount} className="input-field" placeholder="No. rekening" />
            </FormField>
          </div>
          <FormField label="NPWP" hint="Opsional, untuk keperluan pajak">
            <input type="text" defaultValue={editingSupplier?.npwp} className="input-field" placeholder="XX.XXX.XXX.X-XXX.XXX" />
          </FormField>
          <FormField label="Status">
            <select defaultValue={editingSupplier?.status || 'aktif'} className="input-field">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
