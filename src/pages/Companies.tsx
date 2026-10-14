import React, { useState } from 'react';
import { Plus, Search, Edit2, Building2, User, Phone } from 'lucide-react';
import { Company } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency } from '../data/mockData';

export default function Companies() {
  const { companies, addCompany } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', picName: '', picPhone: '', address: '', npwp: '', topDays: 30, creditLimit: 0, riskRating: 'A' as 'A' | 'B' | 'C', status: 'aktif' as 'aktif' | 'nonaktif' });

  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCompany(formData);
    toast.success('Perusahaan berhasil ditambahkan');
    setShowForm(false);
    setFormData({ name: '', picName: '', picPhone: '', address: '', npwp: '', topDays: 30, creditLimit: 0, riskRating: 'A', status: 'aktif' });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Perusahaan Plywood" subtitle="Kelola data perusahaan plywood" actions={<button onClick={() => setShowForm(true)} className="btn btn-primary"><Plus className="w-4 h-4" />Tambah Perusahaan</button>} />

      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input type="text" placeholder="Cari perusahaan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-[13px] outline-none flex-1" />
          </div>
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="card hover:border-[#cbd5e1] transition-all">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center"><Building2 className="w-5 h-5 text-[#166534]" /></div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0f172a]">{company.name}</h3>
                      <p className="text-[12px] text-[#64748b] flex items-center gap-1 mt-0.5"><User className="w-3 h-3" />PIC: {company.picName}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[12px] text-[#334155]"><Phone className="w-3.5 h-3.5 text-[#94a3b8]" />{company.picPhone}</div>
                  <div className="flex items-center justify-between text-[12px]"><span className="text-[#64748b]">TOP</span><span className="font-semibold text-[#0f172a]">{company.topDays} hari</span></div>
                </div>
                <div className="pt-4 border-t border-[#f1f5f9] space-y-3">
                  <div>
                    <p className="text-[11px] text-[#64748b] mb-1">Credit Limit</p>
                    <p className="text-[15px] font-bold text-[#0f172a]">{formatCurrency(company.creditLimit)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={company.riskRating === 'A' ? 'green' : company.riskRating === 'B' ? 'yellow' : 'red'}>Rating {company.riskRating}</Badge>
                    <Badge variant={company.status === 'aktif' ? 'green' : 'gray'} dot>{company.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <Building2 className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada perusahaan</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Tambahkan perusahaan pertama Anda</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary mt-4"><Plus className="w-4 h-4" />Tambah Perusahaan</button>
          </div>
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Tambah Perusahaan" size="lg" footer={<><button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button><button onClick={handleSubmit} className="btn btn-primary">Tambah</button></>}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nama Perusahaan" required><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field" required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama PIC" required><input type="text" value={formData.picName} onChange={(e) => setFormData({...formData, picName: e.target.value})} className="input-field" required /></FormField>
            <FormField label="No. HP PIC" required><input type="text" value={formData.picPhone} onChange={(e) => setFormData({...formData, picPhone: e.target.value})} className="input-field" required /></FormField>
          </div>
          <FormField label="Alamat" required><textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="input-field min-h-[60px] resize-none" required /></FormField>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="TOP (hari)" required><input type="number" value={formData.topDays} onChange={(e) => setFormData({...formData, topDays: parseInt(e.target.value) || 0})} className="input-field" required /></FormField>
            <FormField label="Credit Limit" required><input type="number" value={formData.creditLimit} onChange={(e) => setFormData({...formData, creditLimit: parseInt(e.target.value) || 0})} className="input-field" required /></FormField>
            <FormField label="Rating Risiko" required>
              <select value={formData.riskRating} onChange={(e) => setFormData({...formData, riskRating: e.target.value as 'A' | 'B' | 'C'})} className="input-field" required>
                <option value="A">A - Rendah</option>
                <option value="B">B - Sedang</option>
                <option value="C">C - Tinggi</option>
              </select>
            </FormField>
          </div>
        </form>
      </Modal>
    </div>
  );
}
