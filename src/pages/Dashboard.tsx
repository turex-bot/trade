import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import {
  TrendingUp, DollarSign, Package, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2
} from 'lucide-react';
import {
  dashboardSummary, receivableByCompany, volumeProfitTrend,
  invoices, formatCurrency, formatDate
} from '../data/mockData';

export default function Dashboard() {
  const upcomingInvoices = invoices.filter(inv => inv.status !== 'paid').slice(0, 5);

  const getAgingColor = (category: string) => {
    switch (category) {
      case 'Belum Jatuh Tempo': return 'bg-green-100 text-green-700';
      case '1-30 hari': return 'bg-yellow-100 text-yellow-700';
      case '31-60 hari': return 'bg-orange-100 text-orange-700';
      case '>60 hari': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      case 'unpaid': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan kinerja bisnis trading kayu lapis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Piutang Beredar"
          value={formatCurrency(dashboardSummary.totalReceivable)}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+12.5%"
          trendUp={true}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Profit Bulan Ini"
          value={formatCurrency(dashboardSummary.monthlyProfit)}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="+8.2%"
          trendUp={true}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          title="Volume Terkirim"
          value={`${dashboardSummary.totalVolume} m³`}
          icon={<Package className="w-5 h-5" />}
          trend="+15.3%"
          trendUp={true}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Invoice Overdue"
          value={String(dashboardSummary.overdueInvoices)}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="-2 dari bulan lalu"
          trendUp={false}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivable by Company */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Piutang per Perusahaan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={receivableByCompany} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} fontSize={12} />
              <YAxis type="category" dataKey="name" fontSize={11} width={140} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="amount" fill="#166534" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Volume & Profit Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Tren Volume & Profit (6 Bulan)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={volumeProfitTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis yAxisId="left" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                formatter={(value: number, name: string) => {
                  if (name === 'profit') return [formatCurrency(value), 'Profit'];
                  return [`${value} m³`, 'Volume'];
                }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#166534" strokeWidth={2} dot={{ r: 4 }} name="Volume (m³)" />
              <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Profit (Rp)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Invoice Aktif</h3>
            <p className="text-sm text-gray-500 mt-0.5">Invoice yang belum lunas dan mendekati jatuh tempo</p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-forest-700 font-medium">
            <Clock className="w-4 h-4" />
            {upcomingInvoices.length} invoice aktif
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Invoice</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dibayar</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Jatuh Tempo</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aging</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {upcomingInvoices.map((inv) => (
                <tr key={inv.id} className="table-row-hover">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inv.companyName}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{formatCurrency(inv.totalAmount)}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-600">{formatCurrency(inv.paidAmount)}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">{formatDate(inv.dueDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getAgingColor(inv.agingCategory)}`}>
                      {inv.agingCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>
                      {inv.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                      {inv.status === 'paid' ? 'Lunas' : inv.status === 'partial' ? 'Sebagian' : 'Belum Bayar'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: string;
}

function StatCard({ title, value, icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="stat-card bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {trendUp ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-xs text-gray-400 ml-1">vs bulan lalu</span>
      </div>
    </div>
  );
}
