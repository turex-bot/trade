import { useState } from 'react';
import { Search, Eye, FileText, Download, CheckCircle2, Clock, AlertCircle, Upload } from 'lucide-react';
import { invoices, Invoice, formatCurrency, formatDate } from '../data/mockData';
import { PageHeader, Modal, Badge, FormField } from '../components/ui';
import { useToast } from '../components/Toast';

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
      case 'paid': return <Badge variant="green" dot>Lunas</Badge>;
      case 'partial': return <Badge variant="yellow" dot>Sebagian</Badge>;
      case 'unpaid': return <Badge variant="red" dot>Belum Bayar</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
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
        title="Invoice"
        subtitle="Kelola invoice dan status pembayaran"
        actions={
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Invoice</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{invoices.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#64748b]" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Total Nilai</p>
              <p className="text-[20px] font-bold text-[#0f172a] mt-1">{formatCurrency(invoices.reduce((sum, inv) => sum + inv.totalAmount, 0))}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#64748b]">Sudah Dibayar</p>
              <p className="text-[20px] font-bold text-[#166534] mt-1">{formatCurrency(invoices.reduce((sum, inv) => sum + inv.paidAmount, 0))}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari no. invoice atau perusahaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
          <div className="flex items-center gap-2">
            {['', 'unpaid', 'partial', 'paid'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                  statusFilter === status ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
                }`}
              >
                {status === '' ? 'Semua' : status === 'unpaid' ? 'Belum Bayar' : status === 'partial' ? 'Sebagian' : 'Lunas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Perusahaan</th>
                <th className="text-right">Total</th>
                <th className="text-right">Dibayar</th>
                <th className="text-right">Sisa</th>
                <th className="text-center">Jatuh Tempo</th>
                <th className="text-center">Aging</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className={inv.agingCategory === '>60 hari' ? 'bg-[#fef2f2]/30' : ''}>
                  <td>
                    <span className="font-semibold text-[#166534] text-[12px]">{inv.invoiceNumber}</span>
                  </td>
                  <td className="text-[13px] text-[#0f172a] font-medium">{inv.companyName}</td>
                  <td className="text-right text-[13px] font-medium text-[#0f172a]">{formatCurrency(inv.totalAmount)}</td>
                  <td className="text-right text-[13px] text-[#166534]">{formatCurrency(inv.paidAmount)}</td>
                  <td className="text-right text-[13px] font-bold text-[#dc2626]">{formatCurrency(inv.totalAmount - inv.paidAmount)}</td>
                  <td className="text-center text-[12px] text-[#64748b]">{formatDate(inv.dueDate)}</td>
                  <td className="text-center">{getAgingBadge(inv.agingCategory)}</td>
                  <td className="text-center">{getStatusBadge(inv.status)}</td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] hover:text-[#166534]"
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
      <Modal
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        title={selectedInvoice?.invoiceNumber || ''}
        subtitle={selectedInvoice?.companyName || ''}
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#64748b]">Status</span>
              {getStatusBadge(selectedInvoice.status)}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Tanggal Invoice</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{formatDate(selectedInvoice.invoiceDate)}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3.5">
                <p className="text-[11px] text-[#64748b] mb-1">Jatuh Tempo</p>
                <p className="text-[13px] font-semibold text-[#0f172a]">{formatDate(selectedInvoice.dueDate)}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-[#64748b]">Progress Pembayaran</span>
                <span className="text-[12px] font-bold text-[#0f172a]">
                  {Math.round((selectedInvoice.paidAmount / selectedInvoice.totalAmount) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill bg-[#166534]"
                  style={{ width: `${(selectedInvoice.paidAmount / selectedInvoice.totalAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[11px] text-[#64748b]">
                <span>Dibayar: {formatCurrency(selectedInvoice.paidAmount)}</span>
                <span>Sisa: {formatCurrency(selectedInvoice.totalAmount - selectedInvoice.paidAmount)}</span>
              </div>
            </div>

            <div className="bg-[#f0fdf4] rounded-lg p-4 flex items-center justify-between border border-[#dcfce7]">
              <span className="text-[12px] text-[#166534] font-medium">Total Invoice</span>
              <span className="text-[20px] font-bold text-[#166534]">{formatCurrency(selectedInvoice.totalAmount)}</span>
            </div>

            {selectedInvoice.status !== 'paid' && (
              <PaymentRecordingModal invoice={selectedInvoice} />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

// Payment Recording Modal Component
function PaymentRecordingModal({ invoice }: { invoice: Invoice }) {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const remainingAmount = invoice.totalAmount - invoice.paidAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pembayaran berhasil dicatat', `${invoice.invoiceNumber} telah diupdate`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 bg-[#166534] text-white rounded-lg text-[13px] font-medium hover:bg-[#14532d] transition-colors"
      >
        Catat Pembayaran
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Catat Pembayaran"
        subtitle={invoice.invoiceNumber}
        footer={
          <>
            <button onClick={() => setIsOpen(false)} className="btn btn-secondary">Batal</button>
            <button onClick={handleSubmit} className="btn btn-primary">Simpan Pembayaran</button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#dcfce7]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#166534] font-medium">Sisa Tagihan</span>
              <span className="text-[18px] font-bold text-[#166534]">{formatCurrency(remainingAmount)}</span>
            </div>
            <div className="text-[11px] text-[#16a34a]">
              Total: {formatCurrency(invoice.totalAmount)} | Sudah dibayar: {formatCurrency(invoice.paidAmount)}
            </div>
          </div>

          <FormField label="Tanggal Pembayaran" required>
            <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
          </FormField>

          <FormField label="Jumlah Pembayaran" required hint={`Maksimal: ${formatCurrency(remainingAmount)}`}>
            <input type="number" className="input-field" placeholder={remainingAmount.toString()} max={remainingAmount} />
          </FormField>

          <FormField label="Metode Pembayaran" required>
            <select className="input-field">
              <option value="">Pilih Metode</option>
              <option value="transfer">Transfer Bank</option>
              <option value="cash">Cash / Tunai</option>
              <option value="giro">Giro</option>
              <option value="cek">Cek</option>
            </select>
          </FormField>

          <FormField label="Nomor Referensi / Bukti" hint="Nomor transaksi atau bukti transfer">
            <input type="text" className="input-field" placeholder="TRF-BCA-001234" />
          </FormField>

          <FormField label="Upload Bukti Transfer" hint="Opsional, maks 5MB (JPG, PNG, PDF)">
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-4 text-center hover:border-[#166534] transition-colors cursor-pointer bg-[#f8fafc]">
              <Upload className="w-6 h-6 text-[#94a3b8] mx-auto mb-2" />
              <p className="text-[12px] text-[#64748b]">Klik untuk upload file</p>
            </div>
          </FormField>

          <FormField label="Catatan">
            <textarea className="input-field min-h-[60px] resize-none" placeholder="Catatan tambahan (opsional)" />
          </FormField>
        </form>
      </Modal>
    </>
  );
}
