import { useState } from 'react';
import { Plus, Search, Edit2, TrendingUp, Calculator } from 'lucide-react';
import { prices, formatCurrency, formatDate } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';

export default function Prices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredPrices = prices.filter(p =>
    p.woodSpecName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Daftar Harga"
        subtitle="Kelola harga beli, margin trader, dan harga jual kayu"
        actions={
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
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
      <div className="card mb-4">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Spesifikasi Kayu</th>
                <th className="text-right">Harga Beli Depo</th>
                <th className="text-right">Margin Trader</th>
                <th className="text-right">Harga Jual</th>
                <th className="text-center">Berlaku Sejak</th>
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
                    <span className="text-[11px] text-[#94a3b8]">/m³</span>
                  </td>
                  <td className="text-right">
                    <span className="text-[13px] font-semibold text-[#166534]">+{formatCurrency(price.traderMargin)}</span>
                    <span className="text-[11px] text-[#94a3b8]">/m³</span>
                  </td>
                  <td className="text-right">
                    <span className="text-[13px] font-bold text-[#0f172a]">{formatCurrency(price.sellPrice)}</span>
                    <span className="text-[11px] text-[#94a3b8]">/m³</span>
                  </td>
                  <td className="text-center text-[12px] text-[#64748b]">{formatDate(price.effectiveDate)}</td>
                  <td className="text-center">
                    <Badge variant={price.isActive ? 'green' : 'gray'} dot>
                      {price.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <button className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Calculation Example */}
      <div className="card">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-[#166534]" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Contoh Perhitungan Margin</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#f1f5f9]">
              <p className="text-[11px] text-[#64748b] mb-1">Harga Beli Depo</p>
              <p className="text-[15px] font-bold text-[#0f172a]">Rp1.200.000</p>
              <p className="text-[11px] text-[#94a3b8]">per m³</p>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#f1f5f9]">
              <p className="text-[11px] text-[#64748b] mb-1">Margin Trader</p>
              <p className="text-[15px] font-bold text-[#166534]">+Rp15.000</p>
              <p className="text-[11px] text-[#94a3b8]">per m³</p>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#f1f5f9]">
              <p className="text-[11px] text-[#64748b] mb-1">Harga Jual</p>
              <p className="text-[15px] font-bold text-[#0f172a]">Rp1.215.000</p>
              <p className="text-[11px] text-[#94a3b8]">per m³</p>
            </div>
            <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7]">
              <p className="text-[11px] text-[#166534] mb-1 font-medium">Profit (50 m³)</p>
              <p className="text-[15px] font-bold text-[#166534]">Rp750.000</p>
              <p className="text-[11px] text-[#16a34a]">50 × Rp15.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Tambah Harga Baru"
        subtitle="Atur harga beli dan margin untuk spesifikasi kayu"
        footer={
          <>
            <button onClick={() => setShowForm(false)} className="btn btn-secondary">Batal</button>
            <button onClick={() => setShowForm(false)} className="btn btn-primary">Simpan</button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Spesifikasi Kayu" required>
            <select className="input-field">
              <option value="">Pilih Spesifikasi</option>
              <option>Meranti 20-30cm Grade A</option>
              <option>Meranti 30-40cm Grade A</option>
              <option>Keruing 20-30cm Grade B</option>
              <option>Akasia 15-25cm Grade B</option>
              <option>Sengon 20-30cm Grade C</option>
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Harga Beli Depo (per m³)" required>
              <input type="number" className="input-field" placeholder="1200000" />
            </FormField>
            <FormField label="Margin Trader (per m³)" hint="Default: Rp15.000">
              <input type="number" defaultValue={15000} className="input-field" />
            </FormField>
          </div>
          <FormField label="Tanggal Berlaku" required>
            <input type="date" className="input-field" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
