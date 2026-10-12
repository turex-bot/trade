import { useState } from 'react';
import { Search, Eye, FileText, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { invoices, Invoice, formatCurrency, formatDate } from '../data/mockData';

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3" /> Lunas</span>;
      case 'partial': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3" /> Sebagian</span>;
      case 'unpaid': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><AlertCircle className="w-3 h-3" /> Belum Bayar</span>;
      default: return null;
    }
  };

  const getAgingBadge = (category: string) => {
    switch (category) {
      case 'Belum Jatuh Tempo': return 'bg-green-100 text-green-700';
      case '1-30 hari': return 'bg-yellow-100 text-yellow-700';
      case '31-60 hari': return 'bg-orange-100 text-orange-700';
      case '>60 hari': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola invoice dan status pembayaran</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Invoice</p>
              <p className="text-xl font-bold text-gray-900">{invoices.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Nilai</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(invoices.reduce((sum, inv) => sum + inv.totalAmount, 0))}</p>
            </div>
            <FileText className="w-8 h-8 text-forest-300" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Sudah Dibayar</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(invoices.reduce((sum, inv) => sum + inv.paidAmount, 0))}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-300" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari no. invoice atau perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          {['', 'unpaid', 'partial', 'paid'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                statusFilter === status ? 'border-forest-700 bg-forest-50 text-forest-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {status === '' ? 'Semua' : status === 'unpaid' ? 'Belum Bayar' : status === 'partial' ? 'Sebagian' : 'Lunas'}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No. Invoice</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dibayar</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Sisa</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Jatuh Tempo</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aging</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-forest-700">{inv.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{inv.companyName}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{formatCurrency(inv.totalAmount)}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600">{formatCurrency(inv.paidAmount)}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-red-600">{formatCurrency(inv.totalAmount - inv.paidAmount)}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-600">{formatDate(inv.dueDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getAgingBadge(inv.agingCategory)}`}>
                      {inv.agingCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(inv.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-forest-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedInvoice.invoiceNumber}</h2>
                  <p className="text-sm text-gray-500">{selectedInvoice.companyName}</p>
                </div>
                {getStatusBadge(selectedInvoice.status)}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Tanggal Invoice</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(selectedInvoice.invoiceDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Jatuh Tempo</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              {/* Payment Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress Pembayaran</span>
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round((selectedInvoice.paidAmount / selectedInvoice.totalAmount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-forest-600 h-3 rounded-full transition-all"
                    style={{ width: `${(selectedInvoice.paidAmount / selectedInvoice.totalAmount) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Dibayar: {formatCurrency(selectedInvoice.paidAmount)}</span>
                  <span>Sisa: {formatCurrency(selectedInvoice.totalAmount - selectedInvoice.paidAmount)}</span>
                </div>
              </div>

              <div className="bg-forest-50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-forest-700">Total Invoice</span>
                <span className="text-xl font-bold text-forest-800">{formatCurrency(selectedInvoice.totalAmount)}</span>
              </div>

              {selectedInvoice.status !== 'paid' && (
                <button className="w-full py-2.5 bg-forest-700 text-white rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors">
                  Catat Pembayaran
                </button>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setSelectedInvoice(null)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
