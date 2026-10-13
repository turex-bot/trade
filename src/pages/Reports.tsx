import { useState } from 'react';
import { Download, FileText, BarChart3, Filter } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { PageHeader, Tabs } from '../components/ui';
import { useData } from '../context/DataContext';
import { formatCurrency, formatDate } from '../data/mockData';

export default function Reports() {
  const { orders, invoices } = useData();
  
  const [activeTab, setActiveTab] = useState('transactions');
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-12-31');

  const tabs = [
    { key: 'transactions', label: 'Transaksi' },
    { key: 'profitability', label: 'Profitabilitas' },
    { key: 'receivables', label: 'Piutang' },
  ];

  // Calculate profitability data from orders
  const profitByCompany = orders.reduce((acc, order) => {
    const existing = acc.find(item => item.name === order.companyName);
    const orderProfit = order.items.reduce((sum, item) => {
      return sum + (item.sellPrice - item.buyPrice) * item.volume;
    }, 0);

    if (existing) {
      existing.profit += orderProfit;
      existing.volume += order.totalVolume;
    } else {
      acc.push({
        name: order.companyName,
        profit: orderProfit,
        volume: order.totalVolume
      });
    }
    return acc;
  }, [] as { name: string; profit: number; volume: number }[]);

  const volumeBySpec = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      const existing = acc.find(spec => spec.name === item.woodSpecName);
      if (existing) {
        existing.value += item.volume;
      } else {
        acc.push({
          name: item.woodSpecName,
          value: item.volume,
          color: '#166534'
        });
      }
    });
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  // Assign colors to volumeBySpec
  const colors = ['#166534', '#16a34a', '#22c55e', '#4ade80', '#86efac'];
  volumeBySpec.forEach((item, index) => {
    item.color = colors[index % colors.length];
  });

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Laporan"
        subtitle="Analisis dan export laporan bisnis"
        actions={
          <button className="btn btn-primary">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      {/* Date Filter */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#94a3b8]" />
            <span className="text-[13px] font-medium text-[#334155]">Periode:</span>
          </div>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="input-field w-auto"
          />
          <span className="text-[#94a3b8]">—</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="input-field w-auto"
          />
          <button className="btn btn-secondary">
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-4">
        <div className="px-4 pt-3">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="stat-card">
              <p className="text-[11px] text-[#64748b]">Total Transaksi</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{orders.length}</p>
              <p className="text-[11px] text-[#94a3b8] mt-1">periode {formatDate(dateFrom)} - {formatDate(dateTo)}</p>
            </div>
            <div className="stat-card">
              <p className="text-[11px] text-[#64748b]">Total Volume</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{orders.reduce((sum, o) => sum + o.totalVolume, 0).toFixed(2)} m³</p>
            </div>
            <div className="stat-card">
              <p className="text-[11px] text-[#64748b]">Total Nilai Transaksi</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{formatCurrency(orders.reduce((sum, o) => sum + o.totalValue, 0))}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Daftar Transaksi</h3>
            </div>
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>No. Order</th>
                      <th>Tanggal</th>
                      <th>Perusahaan</th>
                      <th>Depo</th>
                      <th className="text-right">Volume (m³)</th>
                      <th className="text-right">Nilai</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="text-[12px] font-semibold text-[#166534]">{order.orderNumber}</td>
                        <td className="text-[12px] text-[#64748b]">{formatDate(order.orderDate)}</td>
                        <td className="text-[13px] text-[#0f172a] font-medium">{order.companyName}</td>
                        <td className="text-[12px] text-[#64748b]">{order.supplierName}</td>
                        <td className="text-right text-[13px] font-medium">{order.totalVolume.toFixed(2)}</td>
                        <td className="text-right text-[13px] font-medium">{formatCurrency(order.totalValue)}</td>
                        <td className="text-center">
                          <span className="badge badge-gray capitalize">{order.status.replace('_', ' ')}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <FileText className="w-12 h-12 text-[#94a3b8] mb-3" />
                <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada transaksi</h3>
                <p className="text-[13px] text-[#64748b] mt-1">Transaksi akan muncul setelah Anda membuat pesanan</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'profitability' && (
        <div className="space-y-4">
          {profitByCompany.length > 0 ? (
            <>
              <div className="card">
                <div className="card-header">
                  <h3 className="text-[14px] font-semibold text-[#0f172a]">Profit per Perusahaan</h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={profitByCompany}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                      <Bar dataKey="profit" fill="#166534" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-[14px] font-semibold text-[#0f172a]">Distribusi Volume per Jenis Kayu</h3>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={volumeBySpec}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {volumeBySpec.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)} m³`} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                      {volumeBySpec.map((item) => (
                        <div key={item.name} className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[11px] text-[#64748b]">{item.name} ({item.value.toFixed(2)} m³)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="text-[14px] font-semibold text-[#0f172a]">Ringkasan Profitabilitas</h3>
                  </div>
                  <div className="card-body space-y-3">
                    {profitByCompany.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
                        <div>
                          <p className="text-[13px] font-medium text-[#0f172a]">{item.name}</p>
                          <p className="text-[11px] text-[#94a3b8]">Volume: {item.volume.toFixed(2)} m³</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-bold text-[#166534]">{formatCurrency(item.profit)}</p>
                          <p className="text-[11px] text-[#94a3b8]">{formatCurrency(item.volume > 0 ? item.profit / item.volume : 0)}/m³</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                      <p className="text-[13px] font-semibold text-[#0f172a]">Total Profit</p>
                      <p className="text-[18px] font-bold text-[#166534]">
                        {formatCurrency(profitByCompany.reduce((sum, item) => sum + item.profit, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card">
              <div className="empty-state">
                <BarChart3 className="w-12 h-12 text-[#94a3b8] mb-3" />
                <h3 className="text-[14px] font-semibold text-[#0f172a]">Belum ada data profitabilitas</h3>
                <p className="text-[13px] text-[#64748b] mt-1">Data akan muncul setelah ada pesanan yang lunas</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'receivables' && (
        <div className="card">
          <div className="card-body">
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-[#94a3b8] mb-3" />
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Laporan Piutang</h3>
              <p className="text-[13px] text-[#64748b] mt-1">Laporan piutang lengkap tersedia di halaman <strong>Piutang & Aging</strong></p>
              <a href="/finance/receivables" className="mt-4 btn btn-secondary inline-flex">
                Lihat Piutang & Aging →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
