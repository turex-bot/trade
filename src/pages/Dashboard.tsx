import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  TrendingUp, DollarSign, Package, AlertTriangle,
  Clock, CheckCircle2, Truck, FileText
} from 'lucide-react';
import {
  orders, deliveries, invoices, formatCurrency, formatDate
} from '../data/mockData';
import { PageHeader, StatCard, Badge } from '../components/ui';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  const { suppliers, companies, woodSpecs, prices, orders, deliveries, invoices } = useData();

  // Calculate dashboard data from context
  const totalReceivable = invoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0);
  
  const monthlyProfit = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => {
      return sum + o.items.reduce((itemSum, item) => {
        return itemSum + (item.sellPrice - item.buyPrice) * item.volume;
      }, 0);
    }, 0);

  const totalVolume = orders.reduce((sum, o) => sum + o.totalVolume, 0);
  const overdueInvoices = invoices.filter(inv => inv.agingDays > 0).length;

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

  // Empty state check
  const isEmpty = orders.length === 0 && invoices.length === 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan performa bisnis trading kayu lapis Anda"
      />

      {isEmpty ? (
        <div className="card">
          <div className="empty-state py-16">
            <Package className="w-16 h-16 text-[#94a3b8] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#0f172a] mb-2">Selamat Datang di TimberFlow</h3>
            <p className="text-[14px] text-[#64748b] max-w-md mb-6">
              Mulai dengan menambahkan data master (Depo, Perusahaan, Spesifikasi Kayu) lalu buat pesanan pertama Anda.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl">
              <a href="/master/suppliers" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors text-left">
                <p className="text-[13px] font-semibold text-[#0f172a]">1. Tambah Depo</p>
                <p className="text-[12px] text-[#64748b] mt-1">Kelola supplier kayu</p>
              </a>
              <a href="/master/companies" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors text-left">
                <p className="text-[13px] font-semibold text-[#0f172a]">2. Tambah Perusahaan</p>
                <p className="text-[12px] text-[#64748b] mt-1">Kelola pembeli plywood</p>
              </a>
              <a href="/transactions/orders" className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[#166534] transition-colors text-left">
                <p className="text-[13px] font-semibold text-[#0f172a]">3. Buat Pesanan</p>
                <p className="text-[12px] text-[#64748b] mt-1">Mulai transaksi pertama</p>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Total Piutang Beredar"
              value={formatCurrency(totalReceivable)}
              icon={<DollarSign className="w-5 h-5" />}
              accentColor="#2563eb"
            />
            <StatCard
              label="Profit Bulan Ini"
              value={formatCurrency(monthlyProfit)}
              icon={<TrendingUp className="w-5 h-5" />}
              accentColor="#166534"
            />
            <StatCard
              label="Volume Terkirim"
              value={`${totalVolume.toFixed(2)} m³`}
              icon={<Package className="w-5 h-5" />}
              accentColor="#7c3aed"
            />
            <StatCard
              label="Invoice Overdue"
              value={String(overdueInvoices)}
              icon={<AlertTriangle className="w-5 h-5" />}
              accentColor="#dc2626"
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Orders */}
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[#0f172a]">Pesanan Terbaru</h3>
                <span className="text-[11px] text-[#64748b] font-medium">{orders.length} total</span>
              </div>
              {recentOrders.length > 0 ? (
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
                          <td className="text-[12px] font-medium">{order.totalVolume.toFixed(2)} m³</td>
                          <td>{getOrderStatusBadge(order.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-[#94a3b8] text-[13px]">
                  Belum ada pesanan
                </div>
              )}
            </div>

            {/* Upcoming Invoices */}
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[#0f172a]">Invoice Aktif</h3>
                <span className="text-[11px] text-[#64748b] font-medium">{upcomingInvoices.length} belum lunas</span>
              </div>
              {upcomingInvoices.length > 0 ? (
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
              ) : (
                <div className="p-8 text-center text-[#94a3b8] text-[13px]">
                  Tidak ada invoice aktif
                </div>
              )}
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
                <p className="text-[11px] text-[#64748b]">Diterima</p>
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
        </>
      )}
    </div>
  );
}
