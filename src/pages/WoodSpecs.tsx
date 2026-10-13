import { useState } from 'react';
import { Plus, Search, Edit2, TreePine, DollarSign } from 'lucide-react';
import { woodSpecs, prices, formatCurrency } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';

export default function WoodSpecs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredSpecs = woodSpecs.filter(s =>
    s.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.diameterRange.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A': return <Badge variant="green">Grade A</Badge>;
      case 'B': return <Badge variant="blue">Grade B</Badge>;
      case 'C': return <Badge variant="orange">Grade C</Badge>;
      default: return <Badge variant="gray">{grade}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Spesifikasi Kayu"
        subtitle="Kelola data jenis, diameter, dan grade kayu"
        actions={
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
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
                  <div className="bg-[#f8fafc] rounded-lg px-3 py-2 mb-4">
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

                <button className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#166534] bg-[#f0fdf4] rounded-lg hover:bg-[#dcfce7] transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit Spesifikasi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Tambah Spesifikasi Kayu"
        subtitle="Tambahkan jenis kayu baru ke dalam sistem"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={() => setShowForm(false)} className="btn btn-primary">Simpan</button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Jenis Kayu" required hint="Contoh: Meranti, Keruing, Akasia">
            <input type="text" className="input-field" placeholder="Masukkan jenis kayu" />
          </FormField>
          <FormField label="Range Diameter" required hint="Contoh: 20-30 cm, >40 cm">
            <input type="text" className="input-field" placeholder="20-30 cm" />
          </FormField>
          <FormField label="Grade" required>
            <select className="input-field">
              <option value="A">Grade A - Premium</option>
              <option value="B">Grade B - Standar</option>
              <option value="C">Grade C - Ekonomis</option>
            </select>
          </FormField>
          <FormField label="Keterangan" hint="Opsional, informasi tambahan">
            <textarea className="input-field min-h-[60px] resize-none" placeholder="Catatan tambahan seperti: bebas kulit, kadar air, dll" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
