import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Price } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency } from '../data/mockData';

export default function Prices() {
  const { prices, woodSpecs, addPrice, updatePrice, deletePrice } = useData();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [priceToDelete, setPriceToDelete] = useState<Price | null>(null);
  const [formData, setFormData] = useState({ woodSpecId: '', woodSpecName: '', buyPrice: 0, effectiveDate: new Date().toISOString().split('T')[0], isActive: true });

  const filteredPrices = prices.filter(p => p.woodSpecName.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const spec = woodSpecs.find(s => s.id === formData.woodSpecId);
    if (spec) {
      setFormData(prev => ({ ...prev, woodSpecName: `${spec.woodType} ${spec.diameterRange} ${spec.grade}` }));
    }
  }, [formData.woodSpecId, woodSpecs]);

  const handleOpenAdd = () => {
    setEditingPrice(null);
    setFormData({ woodSpecId: '', woodSpecName: '', buyPrice: 0, effectiveDate: new Date().toISOString().split('T')[0], isActive: true });
    setShowForm(true);
  };

  const handleEdit = (price: Price) => {
    setEditingPrice(price);
    setFormData({ woodSpecId: price.woodSpecId, woodSpecName: price.woodSpecName, buyPrice: price.buyPrice, effectiveDate: price.effectiveDate, isActive: price.isActive });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrice) {
      const existingPrice = prices.find(p => p.woodSpecId === formData.woodSpecId);
      if (existingPrice) {
        toast.error('Harga sudah ada', `Spesifikasi "${existingPrice.woodSpecName}" sudah memiliki harga`);
        return;
      }
    }
    const priceData = { ...formData, traderMargin: 15000, sellPrice: formData.buyPrice };
    if (editingPrice) {
      updatePrice(editingPrice.id, priceData);
      toast.success('Harga berhasil diupdate');
    } else {
      addPrice(priceData);
      toast.success('Harga berhasil ditambahkan');
    }
    setShowForm(false);
  };

  const handleDeletePrice = () => {
    if (priceToDelete) {
      deletePrice(priceToDelete.id);
      toast.success('Harga berhasil dihapus');
      setPriceToDelete(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Daftar Harga" subtitle="Kelola harga beli kayu" actions={<button onClick={handleOpenAdd} className="btn btn-primary"><Plus className="w-4 h-4" />Tambah Harga</button>} />

      <div className="card mb-4">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input type="text" placeholder="Cari spesifikasi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-[13px] outline-none flex-1" />
          </div>
        </div>
      </div>

      {filteredPrices.length > 0 ? (
        <div className="card mb-4">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Spesifikasi Kayu</th>
                  <th className="text-right">Harga Beli/m³</th>
                  <th className="text-center">Berlaku</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((price) => (
                  <tr key={price.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-amber-600" /></div>
                        <span className="font-semibold text-[#0f172a] text-[13px]">{price.woodSpecName}</span>
                      </div>
                    </td>
                    <td className="text-right"><span className="text-[13px] text-[#334155]">{formatCurrency(price.buyPrice)}</span></td>
                    <td className="text-center text-[12px] text-[#64748b]">{new Date(price.effectiveDate).toLocaleDateString('id-ID')}</td>
                    <td className="text-center"><Badge variant={price.isActive ? 'green' : 'gray'} dot>{price.isActive ? 'Aktif' : 'Tidak Aktif'}</Badge></td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleEdit(price)} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setPriceToDelete(price)} className="p-1.5 rounded-lg hover:bg-[#fef2f2] text-[#94a3b8] hover:text-[#dc2626]" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card mb-4">
          <div className="empty-state">
            <TrendingUp className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada daftar harga</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Tambahkan harga untuk spesifikasi kayu</p>
            <button onClick={handleOpenAdd} className="btn btn-primary mt-4"><Plus className="w-4 h-4" />Tambah Harga</button>
          </div>
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editingPrice ? 'Edit Harga' : 'Tambah Harga'} footer={<><button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button><button onClick={handleSubmit} className="btn btn-primary">Simpan</button></>}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Spesifikasi Kayu" required>
            <select value={formData.woodSpecId} onChange={(e) => setFormData({...formData, woodSpecId: e.target.value})} className="input-field" required>
              <option value="">Pilih Spesifikasi</option>
              {woodSpecs.map(spec => (<option key={spec.id} value={spec.id}>{spec.woodType} {spec.diameterRange} {spec.grade}</option>))}
            </select>
          </FormField>
          <FormField label="Harga Beli Depo (per m³)" required><input type="number" value={formData.buyPrice || ''} onChange={(e) => setFormData({...formData, buyPrice: parseInt(e.target.value) || 0})} className="input-field" placeholder="1200000" required /></FormField>
          <FormField label="Tanggal Berlaku" required><input type="date" value={formData.effectiveDate} onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})} className="input-field" required /></FormField>
        </form>
      </Modal>

      <Modal open={!!priceToDelete} onClose={() => setPriceToDelete(null)} title="Hapus Harga" footer={<><button onClick={() => setPriceToDelete(null)} className="btn btn-secondary">Batal</button><button onClick={handleDeletePrice} className="btn btn-danger"><Trash2 className="w-4 h-4" />Hapus</button></>}>
        {priceToDelete && (
          <div className="space-y-4">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-[#991b1b]">Peringatan</p>
                  <p className="text-[12px] text-[#7f1d1d] mt-1">Anda akan menghapus harga untuk <strong>{priceToDelete.woodSpecName}</strong>.</p>
                  <div className="mt-3 space-y-1 text-[12px] text-[#7f1d1d]">
                    <p>Harga Beli: <strong>{formatCurrency(priceToDelete.buyPrice)}/m³</strong></p>
                    <p>Berlaku sejak: <strong>{new Date(priceToDelete.effectiveDate).toLocaleDateString('id-ID')}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
