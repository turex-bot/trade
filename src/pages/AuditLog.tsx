import { useState } from 'react';
import { FileText, Clock, User, Download, Search } from 'lucide-react';
import { PageHeader, Badge } from '../components/ui';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  details: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'payment';
}

const auditLogs: AuditLog[] = [
  { id: '1', timestamp: '2025-02-20 14:32:15', user: 'Finance 1', action: 'Catat Pembayaran', entity: 'INV-202501-0003', details: 'Pembayaran Rp30.000.000 via transfer', type: 'payment' },
  { id: '2', timestamp: '2025-02-20 10:15:42', user: 'Admin User', action: 'Update Harga', entity: 'Meranti 20-30cm Grade A', details: 'Harga jual diubah dari Rp1.200.000 ke Rp1.215.000', type: 'update' },
  { id: '3', timestamp: '2025-02-19 16:45:30', user: 'Operator 1', action: 'Buat Surat Jalan', entity: 'DO-202502-0001', details: 'Surat jalan untuk order ORD-202502-0001', type: 'create' },
  { id: '4', timestamp: '2025-02-19 14:20:18', user: 'Admin User', action: 'Konfirmasi Pesanan', entity: 'ORD-202502-0002', details: 'Status diubah dari draft ke confirmed', type: 'update' },
  { id: '5', timestamp: '2025-02-19 09:05:55', user: 'Operator 1', action: 'Buat Pesanan', entity: 'ORD-202502-0003', details: 'Pesanan baru dari PT. Timber Solutions', type: 'create' },
  { id: '6', timestamp: '2025-02-18 15:30:22', user: 'Finance 1', action: 'Catat Pembayaran', entity: 'INV-202501-0001', details: 'Pembayaran lunas Rp60.750.000', type: 'payment' },
  { id: '7', timestamp: '2025-02-18 11:12:08', user: 'Admin User', action: 'Login', entity: 'Sistem', details: 'Login berhasil dari IP 192.168.1.100', type: 'login' },
  { id: '8', timestamp: '2025-02-17 16:55:44', user: 'Admin User', action: 'Tambah Supplier', entity: 'Depo Kayu Lestari', details: 'Supplier baru ditambahkan ke sistem', type: 'create' },
  { id: '9', timestamp: '2025-02-17 10:30:15', user: 'Operator 1', action: 'Update Pengiriman', entity: 'DO-202501-0002', details: 'Status diubah menjadi received', type: 'update' },
  { id: '10', timestamp: '2025-02-16 14:22:33', user: 'Finance 1', action: 'Generate Invoice', entity: 'INV-202501-0004', details: 'Invoice otomatis dari DO-202501-0003', type: 'create' },
];

export default function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'create': return <Badge variant="green">Create</Badge>;
      case 'update': return <Badge variant="blue">Update</Badge>;
      case 'delete': return <Badge variant="red">Delete</Badge>;
      case 'login': return <Badge variant="gray">Login</Badge>;
      case 'payment': return <Badge variant="purple">Payment</Badge>;
      default: return <Badge variant="gray">{type}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Audit Log"
        subtitle="Riwayat aktivitas dan perubahan dalam sistem"
        actions={
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        }
      />

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Cari aktivitas, user, atau entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypeFilter('')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                !typeFilter ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setTypeFilter('create')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                typeFilter === 'create' ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Create
            </button>
            <button
              onClick={() => setTypeFilter('update')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                typeFilter === 'update' ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Update
            </button>
            <button
              onClick={() => setTypeFilter('payment')}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                typeFilter === 'payment' ? 'border-[#166534] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]'
              }`}
            >
              Payment
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>User</th>
                <th>Aksi</th>
                <th>Entity</th>
                <th>Detail</th>
                <th className="text-center">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <span className="text-[12px] text-[#64748b]">{log.timestamp}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#166534] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{log.user.charAt(0)}</span>
                      </div>
                      <span className="text-[12px] font-medium text-[#0f172a]">{log.user}</span>
                    </div>
                  </td>
                  <td className="text-[12px] text-[#334155] font-medium">{log.action}</td>
                  <td>
                    <span className="text-[12px] text-[#166534] font-semibold">{log.entity}</span>
                  </td>
                  <td className="text-[12px] text-[#64748b] max-w-[300px] truncate">{log.details}</td>
                  <td className="text-center">{getTypeBadge(log.type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-[12px] text-[#64748b]">
            Menampilkan <span className="font-semibold text-[#0f172a]">{filteredLogs.length}</span> dari <span className="font-semibold text-[#0f172a]">{auditLogs.length}</span> log
          </p>
        </div>
      </div>
    </div>
  );
}
