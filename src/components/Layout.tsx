import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, TreePine, ClipboardList,
  FileText, CreditCard, BarChart3, Menu, X, LogOut,
  ChevronRight, Bell, Search, User, Settings, Package,
  Truck, Receipt, AlertCircle, TrendingDown, TrendingUp, FileCheck
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  {
    label: 'Transaksi', icon: ClipboardList,
    children: [
      { label: 'Hasil Cek', path: '/transactions/result-check', icon: FileCheck },
    ]
  },
  {
    label: 'Keuangan', icon: CreditCard,
    children: [
      { label: 'Uang Keluar', path: '/finance/payables', icon: TrendingDown },
      { label: 'Uang Masuk', path: '/finance/receivables', icon: TrendingUp },
    ]
  },
  { label: 'Laporan', icon: BarChart3, path: '/reports' },
  {
    label: 'Master Data', icon: Package,
    children: [
      { label: 'Supplier', path: '/master/suppliers', icon: Building2 },
      { label: 'Perusahaan', path: '/master/companies', icon: Building2 },
      { label: 'Spesifikasi', path: '/master/wood-specs', icon: TreePine },
      { label: 'Harga', path: '/master/prices', icon: Receipt },
    ]
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <aside className={`${sidebarCollapsed ? 'w-[68px]' : 'w-[248px]'} bg-white border-r border-[#e2e8f0] flex flex-col transition-all duration-200 flex-shrink-0`}>
        <div className="h-[56px] flex items-center px-4 border-b border-[#f1f5f9] flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#166534] flex items-center justify-center flex-shrink-0">
              <TreePine className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <h1 className="font-bold text-[#334155] text-[15px] leading-tight tracking-tight">TimberFlow</h1>
                <p className="text-[10px] text-[#94a3b8] leading-tight font-medium">Plywood Trading</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              return (
                <div key={item.label} className="mb-1">
                  {!sidebarCollapsed && (
                    <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider px-3 py-2 mt-2">
                      {item.label}
                    </p>
                  )}
                  {!sidebarCollapsed && (
                    <div className="space-y-0.5 animate-fade-in">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const isActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`nav-item relative ${isActive ? 'active' : ''}`}
                          >
                            <ChildIcon className="w-[16px] h-[16px] flex-shrink-0" />
                            <span className="truncate">{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path!}
                className={`nav-item relative mb-0.5 ${isActive ? 'active' : ''} ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[56px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#64748b]">
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-5 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
