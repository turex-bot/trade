import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, TrendingUp, Calculator } from 'lucide-react';
import { Price } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import { formatCurrency } from '../data/mockData';

export default function Prices() {
  const { prices, woodSpecs, addPrice, updatePrice } = useData();
  const toast = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);

  const [formData, setFormData] = useState({
    woodSpecId: '',
    woodSpecName: '',
    buyPrice: 0,
    buyPricePerLog: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
    isActive: true
  });

  const filteredPrices = prices.filter(p =>
    p.woodSpecName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-kalkulasi harga per batang
  useEffect(() => {
    const spec = woodSpecs.find(s => s.id === formData.woodSpecId);
    if (spec && formData.buyPrice > 0) {
      const buyPricePerLog = formData.buyPrice * spec.volumePerLog;
      
      setFormData(prev => ({
        ...prev,
        buyPricePerLog: Math.round(buyPricePerLog),
        woodSpecName: `${spec.woodType} ${spec.diameterRange} ${spec.grade}`
      }));
    }
  }, [formData.buyPrice, formData.woodSpecId, woodSpecs]);

  const handleOpenAdd = () => {
    setEditingPrice(null);
    setFormData({
      woodSpecId: '',
      woodSpecName: '',
      buyPrice: 0,
      buyPricePerLog: 0,
      effectiveDate: new Date().toISOString().split('T')[0],
      isActive: true
    });
    setShowForm(true);
  };

  const handleEdit = (price: Price) => {
    setEditingPrice(price);
    setFormData({
      woodSpecId: price.woodSpecId,
      woodSpecName: price.woodSpecName,
      buyPrice: price.buyPrice,
      buyPricePerLog: price.buyPricePerLog,
      effectiveDate: price.effectiveDate,
      isActive: price.isActive
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tambahkan field margin dan harga jual dengan nilai default
    const priceData = {
      ...formData,
      traderMargin: 15000, // Default margin trader
      sellPrice: formData.buyPrice + 15000, // Harga jual = harga beli + margin
      sellPricePerLog: formData.buyPricePerLog + (15000 * (formData.buyPricePerLog / formData.buyPrice)) // Proporsional
    };
    
    if (editingPrice) {
      updatePrice(editingPrice.id, priceData);
      toast.success('Harga berhasil diupdate');
    } else {
      addPrice(priceData);
      toast.success('Harga berhasil ditambahkan');
    }
    
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Daftar Harga"
        subtitle="Kelola harga beli, margin trader, dan harga jual kayu"
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Tambah Harga
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
              placeholder="Cari spesifikasi kayu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
        </div>
      </div>

      {/* Price Table */}
      {filteredPrices.length > 0 ? (
        <div className="card mb-4">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Spesifikasi Kayu</th>
                  <th className="text-right">Harga Beli/m³</th>
                  <th className="text-right">Harga Beli/Batang</th>
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
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-semibold text-[#0f172a] text-[13px]">{price.woodSpecName}</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <span className="text-[13px] text-[#334155]">{formatCurrency(price.buyPrice)}</span>
                    </td>
                    <td className="text-right">
                      <span className="text-[13px] font-medium text-[#334155]">{formatCurrency(price.buyPricePerLog)}</span>
                    </td>
                    <td className="text-center text-[12px] text-[#64748b]">{new Date(price.effectiveDate).toLocaleDateString('id-ID')}</td>
                    <td className="text-center">
                      <Badge variant={price.isActive ? 'green' : 'gray'} dot>
                        {price.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <button 
                        onClick={() => handleEdit(price)}
                        className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
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
            <button onClick={handleOpenAdd} className="btn btn-primary mt-4">
              <Plus className="w-4 h-4" />
              Tambah Harga Pertama
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      {prices.length > 0 && (
        <div className="card">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-[#0f172a] mb-2">Informasi Margin Trader</h3>
                <p className="text-[13px] text-[#64748b] mb-3">
                  Margin trader <strong className="text-[#166534]">Rp15.000/m³</strong> dihitung otomatis di halaman <strong>Keuangan → Uang Keluar (ke Supplier)</strong> sebagai biaya tambahan dari harga beli.
                </p>
                <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#f1f5f9]">
                  <p className="text-[12px] text-[#64748b] mb-2">Contoh Perhitungan:</p>
                  <div className="space-y-1.5 text-[12px]">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Harga Beli:</span>
                      <span className="font-medium text-[#0f172a]">{formatCurrency(prices[0]?.buyPrice || 0)}/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">Margin Trader:</span>
                      <span className="font-medium text-[#f59e0b]">Rp15.000/m³</span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-[#e2e8f0]">
                      <span className="font-semibold text-[#0f172a]">Total Bayar ke Supplier:</span>
                      <span className="font-bold text-[#dc2626]">{formatCurrency((prices[0]?.buyPrice || 0) + 15000)}/m³</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingPrice ? 'Edit Harga' : 'Tambah Harga Baru'}
        subtitle="Atur harga beli dan margin untuk spesifikasi kayu"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={handleSubmit} className="btn btn-primary">Simpan</button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Spesifikasi Kayu" required>
            <select 
              value={formData.woodSpecId}
              onChange={(e) => setFormData({...formData, woodSpecId: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Pilih Spesifikasi</option>
              {woodSpecs.map(spec => (
                <option key={spec.id} value={spec.id}>
                  {spec.woodType} {spec.diameterRange} {spec.grade}
                </option>
              ))}
            </select>
          </FormField>
          
          <FormField label="Harga Beli Depo (per m³)" required>
            <input 
              type="number" 
              value={formData.buyPrice || ''}
              onChange={(e) => setFormData({...formData, buyPrice: parseInt(e.target.value) || 0})}
              className="input-field" 
              placeholder="1200000" 
              required
            />
          </FormField>

          {/* Auto-kalkulasi preview */}
          {formData.woodSpecId && formData.buyPrice > 0 && (
            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7]">
              <p className="text-[11px] text-[#166534] font-medium mb-2">Kalkulasi Otomatis</p>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <p className="text-[#64748b]">Harga Beli/m³</p>
                  <p className="font-bold text-[#0f172a]">{formatCurrency(formData.buyPrice)}</p>
                </div>
                <div>
                  <p className="text-[#64748b]">Harga Beli/Batang</p>
                  <p className="font-semibold text-[#0f172a]">{formatCurrency(formData.buyPricePerLog)}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#dcfce7]">
                <p className="text-[11px] text-[#64748b]">
                  💡 Margin trader Rp15.000/m³ akan dihitung otomatis di halaman <strong>Uang Keluar</strong>
                </p>
              </div>
            </div>
          )}

          <FormField label="Tanggal Berlaku" required>
            <input 
              type="date" 
              value={formData.effectiveDate}
              onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
              className="input-field" 
              required
            />
          </FormField>

          <FormField label="Status">
            <select 
              value={formData.isActive ? 'true' : 'false'}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
              className="input-field"
            >
              <option value="true">Aktif</option>
              <option value="false">Tidak Aktif</option>
            </select>
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
