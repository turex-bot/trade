import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { PageHeader, Badge } from '../components/ui';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../data/mockData';

export default function Receivables() {
  const { invoices } = useData();
  
  const outstandingInvoices = invoices.filter(inv => inv.status !== 'paid');
  const totalOutstanding = outstandingInvoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0);

  const agingSummary = [
    { category: 'Belum Jatuh Tempo', count: invoices.filter(i => i.agingCategory === 'Belum Jatuh Tempo').length, amount: invoices.filter(i => i.agingCategory === 'Belum Jatuh Tempo').reduce((sum, i) => sum + (i.totalAmount - i.paidAmount), 0) },
    { category: '1-30 hari', count: invoices.filter(i => i.agingCategory === '1-30 hari').length, amount: invoices.filter(i => i.agingCategory === '1-30 hari').reduce((sum, i) => sum + (i.totalAmount - i.paidAmount), 0) },
    { category: '31-60 hari', count: invoices.filter(i => i.agingCategory === '31-60 hari').length, amount: invoices.filter(i => i.agingCategory === '31-60 hari').reduce((sum, i) => sum + (i.totalAmount - i.paidAmount), 0) },
    { category: '>60 hari', count: invoices.filter(i => i.agingCategory === '>60 hari').length, amount: invoices.filter(i => i.agingCategory === '>60 hari').reduce((sum, i) => sum + (i.totalAmount - i.paidAmount), 0) },
  ];

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
        title="Piutang & Aging Schedule"
        subtitle="Monitor piutang beredar dan umur piutang per perusahaan"
      />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#2563eb]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Total Piutang</p>
              <p className="text-[16px] font-bold text-[#0f172a]">{formatCurrency(totalOutstanding)}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Belum Jatuh Tempo</p>
              <p className="text-[16px] font-bold text-[#166534]">{formatCurrency(agingSummary[0].amount)}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff7ed] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#c2410c]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Lewat Jatuh Tempo</p>
              <p className="text-[16px] font-bold text-[#c2410c]">{formatCurrency(agingSummary[2].amount + agingSummary[3].amount)}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#dc2626]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748b]">Kritis (&gt;60 hari)</p>
              <p className="text-[16px] font-bold text-[#dc2626]">{formatCurrency(agingSummary[3].amount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aging Visualization */}
      {totalOutstanding > 0 && (
        <div className="card mb-6">
          <div className="card-header">
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Distribusi Aging Piutang</h3>
            <p className="text-[12px] text-[#64748b] mt-0.5">Visualisasi umur piutang berdasarkan kategori</p>
          </div>
          <div className="card-body space-y-4">
            {agingSummary.map((item, index) => {
              const percentage = totalOutstanding > 0 ? (item.amount / totalOutstanding) * 100 : 0;
              const colors = ['bg-[#166534]', 'bg-[#eab308]', 'bg-[#f97316]', 'bg-[#dc2626]'];
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-[12px] text-[#334155] font-medium">{item.category}</div>
                  <div className="flex-1">
                    <div className="w-full bg-[#f1f5f9] rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors[index]} flex items-center justify-end pr-2 transition-all`}
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      >
                        {percentage > 10 && (
                          <span className="text-[11px] text-white font-medium">{percentage.toFixed(0)}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-40 text-right">
                    <p className="text-[13px] font-semibold text-[#0f172a]">{formatCurrency(item.amount)}</p>
                    <p className="text-[11px] text-[#94a3b8]">{item.count} invoice</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Outstanding Invoices Detail */}
      <div className="card mb-6">
        <div className="card-header">
          <h3 className="text-[14px] font-semibold text-[#0f172a]">Detail Piutang Beredar</h3>
          <p className="text-[12px] text-[#64748b] mt-0.5">Daftar invoice yang belum lunas</p>
        </div>
        {outstandingInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Perusahaan</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Sisa</th>
                  <th className="text-center">Jatuh Tempo</th>
                  <th className="text-center">Umur</th>
                  <th className="text-center">Kategori</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {outstandingInvoices.map((inv) => (
                  <tr key={inv.id} className={inv.agingCategory === '>60 hari' ? 'bg-[#fef2f2]/30' : ''}>
                    <td>
                      <span className="font-semibold text-[#166534] text-[12px]">{inv.invoiceNumber}</span>
                    </td>
                    <td className="text-[13px] text-[#0f172a] font-medium">{inv.companyName}</td>
                    <td className="text-right text-[12px] text-[#64748b]">{formatCurrency(inv.totalAmount)}</td>
                    <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(inv.totalAmount - inv.paidAmount)}</td>
                    <td className="text-center text-[12px] text-[#64748b]">
                      {new Date(inv.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold ${
                        inv.agingDays > 60 ? 'bg-[#fef2f2] text-[#dc2626]' :
                        inv.agingDays > 30 ? 'bg-[#fff7ed] text-[#c2410c]' :
                        inv.agingDays > 0 ? 'bg-[#fefce8] text-[#a16207]' :
                        'bg-[#f0fdf4] text-[#166534]'
                      }`}>
                        {inv.agingDays}
                      </span>
                    </td>
                    <td className="text-center">{getAgingBadge(inv.agingCategory)}</td>
                    <td className="text-center">
                      <button className="px-3 py-1.5 text-[11px] font-medium text-[#166534] bg-[#f0fdf4] rounded-lg hover:bg-[#dcfce7] transition-colors">
                        Catat Bayar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <TrendingUp className="w-12 h-12 text-[#94a3b8] mb-3" />
            <h3 className="text-[14px] font-semibold text-[#0f172a]">Tidak ada piutang beredar</h3>
            <p className="text-[13px] text-[#64748b] mt-1">Semua invoice sudah lunas</p>
          </div>
        )}
      </div>

      {/* Credit Limit Warning */}
      {agingSummary[3].count > 0 && (
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[13px] font-semibold text-[#991b1b]">Peringatan Credit Limit</h4>
              <p className="text-[12px] text-[#7f1d1d] mt-1">
                Terdapat {agingSummary[3].count} invoice dengan piutang kritis &gt;60 hari sebesar <strong>{formatCurrency(agingSummary[3].amount)}</strong>.
                Segera lakukan penagihan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
