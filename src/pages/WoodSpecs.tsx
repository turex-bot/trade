import { useState } from 'react';
import { Plus, Search, Edit2, TreePine } from 'lucide-react';
import { WoodSpec } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';

export default function WoodSpecs() {
  const { woodSpecs, addWoodSpec } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ woodType: '', diameterRange: '', diameterMin: 0, diameterMax: 0, avgDiameter: 0, standardLength: 400, volumePerLog: 0, grade: 'Reguler' as 'Reguler' | 'Premium', unit: 'm³', notes: '' });

  const filteredSpecs = woodSpecs.filter(s => s.woodType.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWoodSpec(formData);
    toast.success('Spesifikasi berhasil ditambahkan');
    setShowForm(false);
    setFormData({ woodType: '', diameterRange: '', diameterMin: 0, diameterMax: 0, avgDiameter: 0, standardLength: 400, volumePerLog: 0, grade: 'Reguler', unit: 'm³', notes: '' });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Spesifikasi Kayu" subtitle="Kelola data jenis kayu" actions={<button onClick={() => setShowForm(true)} className="btn btn-primary"><Plus className="w-4 h-4" />Tambah Spesifikasi</button>} />

      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input type="text" placeholder="Cari spesifikasi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-[13px] outline-none flex-1" />
          </div>
        </div>
      </div>

      {filteredSpecs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSpecs.map((spec) => (
            <div key={spec.id} className="card hover:border-[#cbd5e1] transition-all">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center"><TreePine className="w-5 h-5 text-amber-600" /></div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0f172a]">{spec.woodType}</h3>
                      <p className="text-[12px] text-[#64748b]">{spec.diameterRange}</p>
                    </div>
                  </div>
                  <Badge variant={spec.grade === 'Premium' ? 'green' : 'blue'}>{spec.grade}</Badge>
                </div>
                <div className="bg-[#f8fafc] rounded-lg p-3 mb-3 border border-[#f1f5f9]">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div><p className="text-[#64748b]">Panjang</p><p className="font-semibold text-[#0f172a]">{spec.standardLength} cm</p></div>
                    <div><p className="text-[#64748b]">Volume/Batang</p><p className="font-semibold text-[#166534]">{spec.volumePerLog.toFixed(3)} m³</p></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <TreePine className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada spesifikasi</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Tambahkan spesifikasi kayu pertama</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary mt-4"><Plus className="w-4 h-4" />Tambah Spesifikasi</button>
          </div>
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Tambah Spesifikasi" size="lg" footer={<><button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button><button onClick={handleSubmit} className="btn btn-primary">Tambah</button></>}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Jenis Kayu" required><input type="text" value={formData.woodType} onChange={(e) => setFormData({...formData, woodType: e.target.value})} className="input-field" required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Diameter Min (cm)" required><input type="number" value={formData.diameterMin} onChange={(e) => setFormData({...formData, diameterMin: parseFloat(e.target.value) || 0})} className="input-field" required /></FormField>
            <FormField label="Diameter Max (cm)" required><input type="number" value={formData.diameterMax} onChange={(e) => setFormData({...formData, diameterMax: parseFloat(e.target.value) || 0})} className="input-field" required /></FormField>
          </div>
          <FormField label="Panjang Standar (cm)" required><input type="number" value={formData.standardLength} onChange={(e) => setFormData({...formData, standardLength: parseFloat(e.target.value) || 0})} className="input-field" required /></FormField>
          <FormField label="Grade" required>
            <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value as 'Reguler' | 'Premium'})} className="input-field" required>
              <option value="Premium">Premium</option>
              <option value="Reguler">Reguler</option>
            </select>
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
