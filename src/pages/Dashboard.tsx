import { useData } from '../context/DataContext';
import { PageHeader } from '../components/ui';
import { TrendingUp, DollarSign, Package, FileText } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

export default function Dashboard() {
  const { orders, suppliers, companies } = useData();

  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
  const totalVolume = orders.reduce((sum, o) => sum + o.totalVolume, 0);
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Dashboard" subtitle="Ringkasan performa bisnis trading kayu lapis" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Hasil Cek</p>
              <p className="text-[22px] font-bold text-[#0f172a] mt-1">{totalOrders}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Sudah Dikonfirmasi</p>
              <p className="text-[22px] font-bold text-[#0f172a] mt-1">{confirmedOrders}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Volume</p>
              <p className="text-[22px] font-bold text-[#0f172a] mt-1">{totalVolume.toFixed(2)} m³</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Nilai</p>
              <p className="text-[22px] font-bold text-[#0f172a] mt-1">{formatCurrency(totalValue)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-[14px] font-semibold text-[#0f172a]">Selamat Datang di TimberFlow</h3>
        </div>
        <div className="card-body">
          <p className="text-[13px] text-[#64748b] mb-4">
            Mulai dengan menambahkan data master dan input hasil cek kayu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a href="/master/suppliers" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors">
              <p className="text-[13px] font-semibold text-[#0f172a]">1. Tambah Supplier</p>
              <p className="text-[12px] text-[#64748b] mt-1">Kelola depo kayu</p>
            </a>
            <a href="/master/companies" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors">
              <p className="text-[13px] font-semibold text-[#0f172a]">2. Tambah Perusahaan</p>
              <p className="text-[12px] text-[#64748b] mt-1">Kelola pembeli plywood</p>
            </a>
            <a href="/transactions/result-check" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors">
              <p className="text-[13px] font-semibold text-[#0f172a]">3. Input Hasil Cek</p>
              <p className="text-[12px] text-[#64748b] mt-1">Catat hasil pengecekan</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
