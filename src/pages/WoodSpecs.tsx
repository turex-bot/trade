import { useState } from 'react';
import { Plus, Search, Edit2, TreePine } from 'lucide-react';
import { WoodSpec } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency } from '../data/mockData';

export default function WoodSpecs() {
  const { woodSpecs, prices, addWoodSpec, updateWoodSpec } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSpec, setEditingSpec] = useState<WoodSpec | null>(null);

  const [formData, setFormData] = useState({
    woodType: '',
    diameterRange: '',
    diameterMin: 0,
    diameterMax: 0,
    avgDiameter: 0,
    standardLength: 4,
    volumePerLog: 0,
    grade: 'Reguler' as 'Reguler' | 'Premium',
    unit: 'm³',
    notes: ''
  });

  const filteredSpecs = woodSpecs.filter(s =>
    s.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.diameterRange.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'Premium': return <Badge variant="green">Premium</Badge>;
      case 'Reguler': return <Badge variant="blue">Reguler</Badge>;
      default: return <Badge variant="gray">{grade}</Badge>;
    }
  };

  // Auto-kalkulasi volume per batang berdasarkan diameter & panjang
  const calculateVolumePerLog = (avgDiameter: number, length: number) => {
    // Volume silinder = π/4 × d² × L (dalam m³)
    // d dalam cm, L dalam meter
    const radiusM = (avgDiameter / 100) / 2;
    return Math.PI * radiusM * radiusM * length;
  };

  const handleDiameterChange = (min: number, max: number) => {
    const avg = (min + max) / 2;
    const volume = calculateVolumePerLog(avg, formData.standardLength);
    setFormData({
      ...formData,
      diameterMin: min,
      diameterMax: max,
      avgDiameter: avg,
      diameterRange: `${min}–${max} cm`,
      volumePerLog: parseFloat(volume.toFixed(4))
    });
  };

  const handleLengthChange = (length: number) => {
    const volume = calculateVolumePerLog(formData.avgDiameter, length);
    setFormData({
      ...formData,
      standardLength: length,
      volumePerLog: parseFloat(volume.toFixed(4))
    });
  };

  const handleOpenAdd = () => {
    setEditingSpec(null);
    setFormData({
      woodType: '',
      diameterRange: '',
      diameterMin: 0,
      diameterMax: 0,
      avgDiameter: 0,
      standardLength: 4,
      volumePerLog: 0,
      grade: 'Reguler',
      unit: 'm³',
      notes: ''
    });
    setShowForm(true);
  };

  const handleEdit = (spec: WoodSpec) => {
    setEditingSpec(spec);
    setFormData({
      woodType: spec.woodType,
      diameterRange: spec.diameterRange,
      diameterMin: spec.diameterMin,
      diameterMax: spec.diameterMax,
      avgDiameter: spec.avgDiameter,
      standardLength: spec.standardLength,
      volumePerLog: spec.volumePerLog,
      grade: spec.grade,
      unit: spec.unit,
      notes: spec.notes
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSpec) {
      updateWoodSpec(editingSpec.id, formData);
      toast.success('Spesifikasi berhasil diupdate');
    } else {
      addWoodSpec(formData);
      toast.success('Spesifikasi berhasil ditambahkan');
    }
    
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Spesifikasi Kayu"
        subtitle="Kelola data jenis, diameter, dan grade kayu"
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Tambah Spesifikasi
          </button>
        }
      />

      {/* Search */}
      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari jenis kayu atau diameter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {filteredSpecs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSpecs.map((spec) => {
            const price = prices.find(p => p.woodSpecId === spec.id && p.isActive);
            return (
              <div key={spec.id} className="card hover:border-[#cbd5e1] transition-all">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <TreePine className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-[#0f172a]">{spec.woodType}</h3>
                        <p className="text-[12px] text-[#64748b]">{spec.diameterRange}</p>
                      </div>
                    </div>
                    {getGradeBadge(spec.grade)}
                  </div>

                  {spec.notes && (
                    <div className="bg-[#f8fafc] rounded-lg px-3 py-2 mb-3">
                      <p className="text-[12px] text-[#64748b]">{spec.notes}</p>
                    </div>
                  )}

                  {/* Info Volume per Batang */}
                  <div className="bg-[#f8fafc] rounded-lg p-3 mb-3 border border-[#f1f5f9]">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <p className="text-[#64748b]">Panjang Standar</p>
                        <p className="font-semibold text-[#0f172a]">{spec.standardLength} meter</p>
                      </div>
                      <div>
                        <p className="text-[#64748b]">Volume/Batang</p>
                        <p className="font-semibold text-[#166534]">{spec.volumePerLog.toFixed(3)} m³</p>
                      </div>
                    </div>
                  </div>

                  {price && (
                    <div className="pt-3 border-t border-[#f1f5f9] space-y-2">
                      <p className="text-[11px] font-semibold text-[#334155] mb-2">Harga per m³</p>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#64748b]">Harga Beli Depo</span>
                        <span className="font-medium text-[#334155]">{formatCurrency(price.buyPrice)}/m³</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#64748b]">Margin Trader</span>
                        <span className="font-semibold text-[#166534]">+{formatCurrency(price.traderMargin)}/m³</span>
                      </div>
                      <div className="flex justify-between text-[12px] pt-2 border-t border-dashed border-[#e2e8f0]">
                        <span className="text-[#334155] font-medium">Harga Jual</span>
                        <span className="font-bold text-[#166534] text-[13px]">{formatCurrency(price.sellPrice)}/m³</span>
                      </div>
                      
                      <p className="text-[11px] font-semibold text-[#334155] mt-3 mb-2 pt-2 border-t border-[#f1f5f9]">Harga per Batang</p>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#64748b]">Harga Beli</span>
                        <span className="font-medium text-[#334155]">{formatCurrency(price.buyPricePerLog)}/batang</span>
                      </div>
                      <div className="flex justify-between text-[12px] pt-2 border-t border-dashed border-[#e2e8f0]">
                        <span className="text-[#334155] font-medium">Harga Jual</span>
                        <span className="font-bold text-[#166534] text-[13px]">{formatCurrency(price.sellPricePerLog)}/batang</span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => handleEdit(spec)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#166534] bg-[#f0fdf4] rounded-lg hover:bg-[#dcfce7] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Spesifikasi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <TreePine className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada spesifikasi kayu</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Tambahkan spesifikasi kayu untuk memulai</p>
            <button onClick={handleOpenAdd} className="btn btn-primary mt-4">
              <Plus className="w-4 h-4" />
              Tambah Spesifikasi Pertama
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingSpec ? 'Edit Spesifikasi Kayu' : 'Tambah Spesifikasi Kayu'}
        subtitle="Tambahkan jenis kayu baru ke dalam sistem"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={handleSubmit} className="btn btn-primary">Simpan</button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Jenis Kayu" required hint="Contoh: Meranti, Keruing, Akasia">
            <input 
              type="text" 
              value={formData.woodType}
              onChange={(e) => setFormData({...formData, woodType: e.target.value})}
              className="input-field" 
              placeholder="Masukkan jenis kayu" 
              required
            />
          </FormField>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Diameter Min (cm)" required>
              <input 
                type="number" 
                value={formData.diameterMin || ''}
                onChange={(e) => handleDiameterChange(parseInt(e.target.value) || 0, formData.diameterMax)}
                className="input-field" 
                placeholder="20" 
                required
              />
            </FormField>
            <FormField label="Diameter Max (cm)" required>
              <input 
                type="number" 
                value={formData.diameterMax || ''}
                onChange={(e) => handleDiameterChange(formData.diameterMin, parseInt(e.target.value) || 0)}
                className="input-field" 
                placeholder="30" 
                required
              />
            </FormField>
          </div>

          <FormField label="Panjang Standar (meter)" required>
            <input 
              type="number" 
              step="0.1"
              value={formData.standardLength}
              onChange={(e) => handleLengthChange(parseFloat(e.target.value) || 4)}
              className="input-field" 
              placeholder="4" 
              required
            />
          </FormField>

          {/* Auto-kalkulasi preview */}
          {formData.volumePerLog > 0 && (
            <div className="bg-[#f0fdf4] rounded-lg p-3 border border-[#dcfce7]">
              <p className="text-[11px] text-[#166534] font-medium mb-1">Kalkulasi Otomatis</p>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div>
                  <p className="text-[#64748b]">Diameter Rata-rata</p>
                  <p className="font-semibold text-[#0f172a]">{formData.avgDiameter.toFixed(1)} cm</p>
                </div>
                <div>
                  <p className="text-[#64748b]">Volume per Batang</p>
                  <p className="font-bold text-[#166534]">{formData.volumePerLog.toFixed(4)} m³</p>
                </div>
              </div>
              <p className="text-[10px] text-[#16a34a] mt-2">
                Rumus: π/4 × ({formData.avgDiameter.toFixed(1)}/100)² × {formData.standardLength}m
              </p>
            </div>
          )}

          <FormField label="Grade" required>
            <select 
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: e.target.value as 'Reguler' | 'Premium'})}
              className="input-field"
              required
            >
              <option value="Premium">Premium - Kualitas Tinggi</option>
              <option value="Reguler">Reguler - Standar</option>
            </select>
          </FormField>
          <FormField label="Keterangan" hint="Opsional, informasi tambahan">
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="input-field min-h-[60px] resize-none" 
              placeholder="Catatan tambahan seperti: bebas kulit, kadar air, dll" 
            />
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
