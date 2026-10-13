import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, Building2, TreePine, ClipboardList, FileText, CreditCard, BarChart3, X, Settings, Shield } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: any;
  path: string;
  category: string;
}

const commands: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Ringkasan performa bisnis', icon: LayoutDashboard, path: '/', category: 'Menu' },
  { id: 'suppliers', label: 'Depo / Supplier', description: 'Kelola data depo kayu', icon: Building2, path: '/master/suppliers', category: 'Master Data' },
  { id: 'companies', label: 'Perusahaan Plywood', description: 'Kelola data perusahaan', icon: Building2, path: '/master/companies', category: 'Master Data' },
  { id: 'wood-specs', label: 'Spesifikasi Kayu', description: 'Kelola jenis dan grade kayu', icon: TreePine, path: '/master/wood-specs', category: 'Master Data' },
  { id: 'prices', label: 'Daftar Harga', description: 'Kelola harga beli dan jual', icon: FileText, path: '/master/prices', category: 'Master Data' },
  { id: 'orders', label: 'Pesanan', description: 'Kelola pesanan kayu', icon: ClipboardList, path: '/transactions/orders', category: 'Transaksi' },
  { id: 'deliveries', label: 'Surat Jalan', description: 'Kelola pengiriman', icon: FileText, path: '/transactions/deliveries', category: 'Transaksi' },
  { id: 'invoices', label: 'Invoice', description: 'Kelola invoice dan pembayaran', icon: FileText, path: '/finance/invoices', category: 'Keuangan' },
  { id: 'receivables', label: 'Piutang & Aging', description: 'Monitor piutang beredar', icon: CreditCard, path: '/finance/receivables', category: 'Keuangan' },
  { id: 'reports', label: 'Laporan', description: 'Analisis dan export laporan', icon: BarChart3, path: '/reports', category: 'Laporan' },
  { id: 'settings', label: 'Pengaturan', description: 'Konfigurasi sistem', icon: Settings, path: '/settings', category: 'Sistem' },
  { id: 'audit-log', label: 'Audit Log', description: 'Riwayat aktivitas sistem', icon: Shield, path: '/audit-log', category: 'Sistem' },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const handleSelect = (cmd: CommandItem) => {
    navigate(cmd.path);
    onClose();
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      handleSelect(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[600px] bg-white rounded-xl shadow-2xl border border-[#e2e8f0] overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f1f5f9]">
          <Search className="w-5 h-5 text-[#94a3b8] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari halaman, fitur, atau aksi..."
            className="flex-1 text-[14px] outline-none placeholder:text-[#94a3b8]"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-[#f1f5f9] text-[#94a3b8]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-[13px] text-[#64748b]">Tidak ada hasil untuk "{searchQuery}"</p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-2 bg-[#f8fafc] border-b border-[#f1f5f9]">
                  <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">{category}</p>
                </div>
                {items.map((cmd) => {
                  const Icon = cmd.icon;
                  const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isSelected ? 'bg-[#f0fdf4]' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-[#166534] text-white' : 'bg-[#f1f5f9] text-[#64748b]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-medium ${isSelected ? 'text-[#166534]' : 'text-[#0f172a]'}`}>
                          {cmd.label}
                        </p>
                        {cmd.description && (
                          <p className="text-[11px] text-[#94a3b8] truncate">{cmd.description}</p>
                        )}
                      </div>
                      {isSelected && (
                        <kbd className="text-[10px] text-[#64748b] bg-white border border-[#e2e8f0] rounded px-1.5 py-0.5 font-mono">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#f8fafc] border-t border-[#f1f5f9] flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-[#94a3b8]">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded font-mono">↑↓</kbd> Navigasi</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded font-mono">↵</kbd> Pilih</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-[#e2e8f0] rounded font-mono">esc</kbd> Tutup</span>
          </div>
          <p className="text-[11px] text-[#94a3b8]">{filteredCommands.length} hasil</p>
        </div>
      </div>
    </div>
  );
}
