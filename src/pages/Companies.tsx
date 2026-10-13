import { useState } from 'react';
import { Plus, Search, Edit2, MoreVertical, Building2, User, Phone, Shield, AlertTriangle } from 'lucide-react';
import { companies, Company, formatCurrency } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState('');

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.picName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = !ratingFilter || c.riskRating === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const getRiskBadge = (rating: string) => {
    switch (rating) {
      case 'A': return <Badge variant="green">Rating A - Rendah</Badge>;
      case 'B': return <Badge variant="yellow">Rating B - Sedang</Badge>;
      case 'C': return <Badge variant="red">Rating C - Tinggi</Badge>;
      default: return <Badge variant="gray">N/A</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Perusahaan Plywood"
        subtitle="Kelola data perusahaan plywood sebagai pembeli"
        actions={
          <button onClick={() => { setEditingCompany(null); setShowForm(true); }} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Tambah Perusahaan
          </button>
        }
      />

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari nama perusahaan atau PIC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRatingFilter('')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                !ratingFilter ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Semua Rating
            </button>
            {['A', 'B', 'C'].map(rating => (
              <button
                key={rating}
                onClick={() => setRatingFilter(rating)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                  ratingFilter === rating ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
                }`}
              >
                Rating {rating}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="card hover:border-[#cbd5e1] transition-all">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#166534]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold text-[#0f172a] truncate">{company.name}</h3>
                    <p className="text-[12px] text-[#64748b] flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3" /> PIC: {company.picName}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === company.id ? null : company.id)}
                    className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {activeMenu === company.id && (
                    <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-lg border border-[#e2e8f0] py-1 z-10 animate-scale-in">
                      <button onClick={() => { setEditingCompany(company); setShowForm(true); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#334155] hover:bg-[#f8fafc]">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[12px] text-[#334155]">
                  <Phone className="w-3.5 h-3.5 text-[#94a3b8]" />
                  {company.picPhone}
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#64748b]">Terms of Payment</span>
                  <span className="font-semibold text-[#0f172a]">{company.topDays} hari</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f1f5f9] space-y-3">
                <div>
                  <p className="text-[11px] text-[#64748b] mb-1">Credit Limit</p>
                  <p className="text-[15px] font-bold text-[#0f172a]">{formatCurrency(company.creditLimit)}</p>
                </div>
                <div className="flex items-center justify-between">
                  {getRiskBadge(company.riskRating)}
                  <Badge variant={company.status === 'aktif' ? 'green' : 'gray'} dot>
                    {company.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingCompany ? 'Edit Perusahaan' : 'Tambah Perusahaan Baru'}
        subtitle="Lengkapi informasi perusahaan plywood"
        size="lg"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={() => setShowForm(false)} className="btn btn-primary">
              {editingCompany ? 'Simpan Perubahan' : 'Tambah Perusahaan'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Nama Perusahaan" required>
            <input type="text" defaultValue={editingCompany?.name} className="input-field" placeholder="PT. ..." />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama PIC" required>
              <input type="text" defaultValue={editingCompany?.picName} className="input-field" placeholder="Nama PIC" />
            </FormField>
            <FormField label="No. HP PIC" required>
              <input type="text" defaultValue={editingCompany?.picPhone} className="input-field" placeholder="08xxxxxxxxxx" />
            </FormField>
          </div>
          <FormField label="Alamat Pabrik" required>
            <textarea defaultValue={editingCompany?.address} className="input-field min-h-[60px] resize-none" placeholder="Alamat lengkap" />
          </FormField>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="TOP (hari)" required hint="Terms of Payment">
              <input type="number" defaultValue={editingCompany?.topDays} className="input-field" placeholder="30" />
            </FormField>
            <FormField label="Credit Limit" required hint="Batas piutang maksimal">
              <input type="number" defaultValue={editingCompany?.creditLimit} className="input-field" placeholder="500000000" />
            </FormField>
            <FormField label="Rating Risiko" required>
              <select defaultValue={editingCompany?.riskRating} className="input-field">
                <option value="A">A - Rendah</option>
                <option value="B">B - Sedang</option>
                <option value="C">C - Tinggi</option>
              </select>
            </FormField>
          </div>
          <FormField label="NPWP" hint="Opsional, untuk keperluan pajak">
            <input type="text" defaultValue={editingCompany?.npwp} className="input-field" placeholder="XX.XXX.XXX.X-XXX.XXX" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
