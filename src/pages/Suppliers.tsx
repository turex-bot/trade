import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Phone, MapPin } from 'lucide-react';
import { Supplier } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';

export default function Suppliers() {
  const { suppliers, addSupplier, updateSupplier } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({ name: '', ownerName: '', phone: '', email: '', address: '', bankAccount: '', bankName: '', npwp: '', status: 'aktif' as 'aktif' | 'nonaktif' });

  const filteredSuppliers = suppliers.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingSupplier(null);
    setFormData({ name: '', ownerName: '', phone: '', email: '', address: '', bankAccount: '', bankName: '', npwp: '', status: 'aktif' });
    setShowForm(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({ name: supplier.name, ownerName: supplier.ownerName, phone: supplier.phone, email: supplier.email, address: supplier.address, bankAccount: supplier.bankAccount, bankName: supplier.bankName, npwp: supplier.npwp, status: supplier.status });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, formData);
      toast.success('Supplier berhasil diupdate');
    } else {
      addSupplier(formData);
      toast.success('Supplier berhasil ditambahkan');
    }
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Depo / Supplier" subtitle="Kelola data depo kayu sebagai supplier" actions={<button onClick={handleOpenAdd} className="btn btn-primary"><Plus className="w-4 h-4" />Tambah Supplier</button>} />

      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input type="text" placeholder="Cari supplier..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-[13px] outline-none flex-1" />
          </div>
        </div>
      </div>

      <div className="card">
        {filteredSuppliers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama Supplier</th>
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
                        <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                          <span className="text-[#166534] font-bold text-[13px]">{supplier.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#0f172a] text-[13px]">{supplier.name}</p>
                          <p className="text-[11px] text-[#94a3b8]">{supplier.address.split(',')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[13px] text-[#334155]">{supplier.ownerName}</td>
                    <td>
                      <p className="text-[12px] text-[#334155] flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#94a3b8]" />{supplier.phone}</p>
                    </td>
                    <td>
                      <p className="text-[12px] text-[#334155]">{supplier.bankName}</p>
                      <p className="text-[11px] text-[#94a3b8]">{supplier.bankAccount}</p>
                    </td>
                    <td className="text-center"><Badge variant={supplier.status === 'aktif' ? 'green' : 'gray'} dot>{supplier.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</Badge></td>
                    <td className="text-center">
                      <button onClick={() => handleEdit(supplier)} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]"><Edit2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <Search className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada supplier</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Tambahkan supplier pertama Anda</p>
            <button onClick={handleOpenAdd} className="btn btn-primary mt-4"><Plus className="w-4 h-4" />Tambah Supplier</button>
          </div>
        )}
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editingSupplier ? 'Edit Supplier' : 'Tambah Supplier'} size="lg" footer={<><button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button><button onClick={handleSubmit} className="btn btn-primary">{editingSupplier ? 'Update' : 'Tambah'}</button></>}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Supplier" required><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field" required /></FormField>
            <FormField label="Nama Pemilik" required><input type="text" value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} className="input-field" required /></FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="No. HP" required><input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-field" required /></FormField>
            <FormField label="Email"><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-field" /></FormField>
          </div>
          <FormField label="Alamat" required><textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="input-field min-h-[80px] resize-none" required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Bank" required>
              <select value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} className="input-field" required>
                <option value="">Pilih Bank</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
              </select>
            </FormField>
            <FormField label="No. Rekening" required><input type="text" value={formData.bankAccount} onChange={(e) => setFormData({...formData, bankAccount: e.target.value})} className="input-field" required /></FormField>
          </div>
          <FormField label="Status">
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'aktif' | 'nonaktif'})} className="input-field">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
