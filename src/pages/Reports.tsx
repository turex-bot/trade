import { useState } from 'react';
import { Download, FileText, BarChart3, Filter } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { orders, formatCurrency, formatDate } from '../data/mockData';

const profitByCompany = [
  { name: 'PT. Plywood Nusantara', profit: 1350000, volume: 90 },
  { name: 'PT. Kayu Jaya Abadi', profit: 525000, volume: 35 },
  { name: 'PT. Multi Plywood Indonesia', profit: 2100000, volume: 140 },
  { name: 'PT. Timber Solutions', profit: 375000, volume: 25 },
];

const volumeBySpec = [
  { name: 'Meranti', value: 190, color: '#166534' },
  { name: 'Keruing', value: 35, color: '#16a34a' },
  { name: 'Akasia', value: 40, color: '#22c55e' },
  { name: 'Sengon', value: 25, color: '#4ade80' },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'profitability' | 'receivables'>('transactions');
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-02-28');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
          <p className="text-sm text-gray-500 mt-1">Analisis dan export laporan bisnis</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Periode:</span>
          </div>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <span className="text-gray-400">—</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button className="px-4 py-2 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium hover:bg-forest-100 transition-colors">
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[
          { key: 'transactions', label: 'Transaksi', icon: FileText },
          { key: 'profitability', label: 'Profitabilitas', icon: BarChart3 },
          { key: 'receivables', label: 'Piutang', icon: FileText },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-white text-forest-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
              <p className="text-xs text-gray-400 mt-1">periode {formatDate(dateFrom)} - {formatDate(dateTo)}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{orders.reduce((sum, o) => sum + o.totalVolume, 0)} m³</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Total Nilai Transaksi</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(orders.reduce((sum, o) => sum + o.totalValue, 0))}</p>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Daftar Transaksi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Order</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Depo</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Volume (m³)</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nilai</th>
                    <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id} className="table-row-hover">
                      <td className="px-6 py-3 text-sm font-medium text-forest-700">{order.orderNumber}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{order.companyName}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{order.supplierName}</td>
                      <td className="px-6 py-3 text-sm text-right font-medium">{order.totalVolume}</td>
                      <td className="px-6 py-3 text-sm text-right font-medium">{formatCurrency(order.totalValue)}</td>
                      <td className="px-6 py-3 text-center">
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profitability' && (
        <div className="space-y-6">
          {/* Profit by Company Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Profit per Perusahaan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitByCompany}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} fontSize={12} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="profit" fill="#166534" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Volume by Spec Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Distribusi Volume per Jenis Kayu</h3>
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
                  <Tooltip formatter={(value: number) => `${value} m³`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {volumeBySpec.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name} ({item.value} m³)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Ringkasan Profitabilitas</h3>
              <div className="space-y-4">
                {profitByCompany.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Volume: {item.volume} m³</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-forest-700">{formatCurrency(item.profit)}</p>
                      <p className="text-xs text-gray-500">Margin: {formatCurrency(item.profit / item.volume)}/m³</p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Total Profit</p>
                  <p className="text-lg font-bold text-forest-700">
                    {formatCurrency(profitByCompany.reduce((sum, item) => sum + item.profit, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'receivables' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Laporan Piutang</h3>
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-sm">Laporan piutang lengkap tersedia di halaman <strong>Piutang & Aging</strong></p>
            <button className="mt-3 px-4 py-2 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium hover:bg-forest-100">
              Lihat Piutang & Aging →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
