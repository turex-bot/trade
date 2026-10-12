import { AlertTriangle, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { invoices, agingSummary, formatCurrency } from '../data/mockData';

export default function Receivables() {
  const outstandingInvoices = invoices.filter(inv => inv.status !== 'paid');
  const totalOutstanding = outstandingInvoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0);

  const getAgingColor = (category: string) => {
    switch (category) {
      case 'Belum Jatuh Tempo': return 'bg-green-500';
      case '1-30 hari': return 'bg-yellow-500';
      case '31-60 hari': return 'bg-orange-500';
      case '>60 hari': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAgingBadgeColor = (category: string) => {
    switch (category) {
      case 'Belum Jatuh Tempo': return 'bg-green-100 text-green-700 border-green-200';
      case '1-30 hari': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '31-60 hari': return 'bg-orange-100 text-orange-700 border-orange-200';
      case '>60 hari': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Piutang & Aging Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor piutang beredar dan umur piutang per perusahaan</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Piutang</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(totalOutstanding)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Belum Jatuh Tempo</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(agingSummary[0].amount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Lewat Jatuh Tempo</p>
              <p className="text-lg font-bold text-orange-600">{formatCurrency(agingSummary[2].amount + agingSummary[3].amount)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Kritis (&gt;60 hari)</p>
              <p className="text-lg font-bold text-red-600">{formatCurrency(agingSummary[3].amount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aging Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Distribusi Aging Piutang</h3>
        <div className="space-y-4">
          {agingSummary.map((item, index) => {
            const percentage = totalOutstanding > 0 ? (item.amount / totalOutstanding) * 100 : 0;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600 font-medium">{item.category}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getAgingColor(item.category)} flex items-center justify-end pr-2 transition-all`}
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    >
                      {percentage > 10 && (
                        <span className="text-xs text-white font-medium">{percentage.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-40 text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</p>
                  <p className="text-xs text-gray-500">{item.count} invoice</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outstanding Invoices Detail */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Detail Piutang Beredar</h3>
          <p className="text-sm text-gray-500 mt-0.5">Daftar invoice yang belum lunas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Sisa</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Jatuh Tempo</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Umur (hari)</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {outstandingInvoices.map((inv) => (
                <tr key={inv.id} className={`table-row-hover ${inv.agingCategory === '>60 hari' ? 'bg-red-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-forest-700">{inv.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inv.companyName}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{formatCurrency(inv.totalAmount)}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-red-600">{formatCurrency(inv.totalAmount - inv.paidAmount)}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">
                    {new Date(inv.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                      inv.agingDays > 60 ? 'bg-red-100 text-red-700' :
                      inv.agingDays > 30 ? 'bg-orange-100 text-orange-700' :
                      inv.agingDays > 0 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {inv.agingDays}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getAgingBadgeColor(inv.agingCategory)}`}>
                      {inv.agingCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1.5 text-xs font-medium text-forest-700 bg-forest-50 rounded-lg hover:bg-forest-100 transition-colors">
                      Catat Bayar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Limit Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-800">Peringatan Credit Limit</h4>
            <p className="text-sm text-red-700 mt-1">
              PT. Timber Solutions memiliki piutang kritis &gt;60 hari sebesar <strong>{formatCurrency(25000000)}</strong>.
              Segera lakukan penagihan atau pertimbangkan pemblokiran pesanan baru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
