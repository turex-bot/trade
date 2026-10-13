import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import {
  TrendingUp, DollarSign, Package, AlertTriangle,
  ArrowUpRight, FileText, Clock, CheckCircle2, Truck
} from 'lucide-react';
import {
  dashboardSummary, receivableByCompany, volumeProfitTrend,
  invoices, orders, deliveries, formatCurrency, formatDate
} from '../data/mockData';
import { PageHeader, StatCard, Badge } from '../components/ui';

export default function Dashboard() {
  const recentOrders = orders.slice(0, 5);
  const upcomingInvoices = invoices.filter(inv => inv.status !== 'paid').slice(0, 5);

  const getOrderStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; label: string }> = {
      draft: { variant: 'gray', label: 'Draft' },
      confirmed: { variant: 'blue', label: 'Dikonfirmasi' },
      in_delivery: { variant: 'yellow', label: 'Dikirim' },
      received: { variant: 'purple', label: 'Diterima' },
      invoiced: { variant: 'orange', label: 'Diinvoice' },
      paid: { variant: 'green', label: 'Lunas' },
    };
    const { variant, label } = config[status] || config.draft;
    return <Badge variant={variant} dot>{label}</Badge>;
  };

  const getAgingBadge = (category: string) => {
    switch (category) {
      case 'Belum Jatuh Tempo': return <Badge variant="green">{category}</Badge>;
      case '1-30 hari': return <Badge variant="yellow">{category}</Badge>;
      case '31-60 hari': return <Badge variant="orange">{category}</Badge>;
      case '>60 hari': return <Badge variant="red">{category}</Badge>;
      default: return <Badge variant="gray">{category}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan performa bisnis trading kayu lapis Anda"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Piutang Beredar"
          value={formatCurrency(dashboardSummary.totalReceivable)}
          icon={<DollarSign className="w-5 h-5" />}
          trend={{ value: '12.5%', positive: true }}
          accentColor="#2563eb"
        />
        <StatCard
          label="Profit Bulan Ini"
          value={formatCurrency(dashboardSummary.monthlyProfit)}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: '8.2%', positive: true }}
          accentColor="#166534"
        />
        <StatCard
          label="Volume Terkirim"
          value={`${dashboardSummary.totalVolume} m³`}
          icon={<Package className="w-5 h-5" />}
          trend={{ value: '15.3%', positive: true }}
          accentColor="#7c3aed"
        />
        <StatCard
          label="Invoice Overdue"
          value={String(dashboardSummary.overdueInvoices)}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: '2 invoice', positive: false }}
          accentColor="#dc2626"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Receivable by Company */}
        <div className="lg:col-span-3 card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-[#0f172a]">Piutang per Perusahaan</h3>
              <p className="text-[12px] text-[#64748b]">Distribusi piutang berdasarkan perusahaan plywood</p>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={receivableByCompany} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" fontSize={11} width={130} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#166534" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume & Profit Trend */}
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Tren Profit</h3>
            <p className="text-[12px] text-[#64748b]">6 bulan terakhir</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={volumeProfitTrend}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#166534" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="profit" stroke="#166534" strokeWidth={2} fill="url(#profitGradient)" dot={{ r: 3, fill: '#166534' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Pesanan Terbaru</h3>
            <span className="text-[11px] text-[#64748b] font-medium">{orders.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Order</th>
                  <th>Perusahaan</th>
                  <th>Volume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span className="font-semibold text-[#166534] text-[12px]">{order.orderNumber}</span>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">{formatDate(order.orderDate)}</p>
                    </td>
                    <td className="text-[12px] text-[#334155]">{order.companyName}</td>
                    <td className="text-[12px] font-medium">{order.totalVolume} m³</td>
                    <td>{getOrderStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Invoices */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Invoice Aktif</h3>
            <span className="text-[11px] text-[#64748b] font-medium">{upcomingInvoices.length} belum lunas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Perusahaan</th>
                  <th>Sisa</th>
                  <th>Aging</th>
                </tr>
              </thead>
              <tbody>
                {upcomingInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td>
                      <span className="font-semibold text-[#166534] text-[12px]">{inv.invoiceNumber}</span>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">Jatuh tempo: {formatDate(inv.dueDate)}</p>
                    </td>
                    <td className="text-[12px] text-[#334155]">{inv.companyName}</td>
                    <td className="text-[12px] font-semibold text-[#dc2626]">{formatCurrency(inv.totalAmount - inv.paidAmount)}</td>
                    <td>{getAgingBadge(inv.agingCategory)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <div className="flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b]">Pesanan Aktif</p>
            <p className="text-[15px] font-bold text-[#0f172a]">{orders.filter(o => !['paid', 'cancelled'].includes(o.status)).length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
            <Truck className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b]">Dalam Pengiriman</p>
            <p className="text-[15px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'in_transit').length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b]">Diterima Hari Ini</p>
            <p className="text-[15px] font-bold text-[#0f172a]">{deliveries.filter(d => d.status === 'received').length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b]">Menunggu Approve</p>
            <p className="text-[15px] font-bold text-[#0f172a]">{orders.filter(o => o.status === 'draft').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
