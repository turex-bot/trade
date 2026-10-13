import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, TreePine, ClipboardList,
  FileText, CreditCard, BarChart3, Menu, X, LogOut,
  ChevronRight, Bell, Search, User, Settings, Package,
  Truck, Receipt, AlertCircle, TrendingDown, TrendingUp
} from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: any;
  path?: string;
  children?: { label: string; path: string; icon: any }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  {
    label: 'Transaksi', icon: ClipboardList,
    children: [
      { label: 'Pesanan', path: '/transactions/orders', icon: ClipboardList },
    ]
  },
  {
    label: 'Keuangan', icon: CreditCard,
    children: [
      { label: 'Uang Keluar (ke Supplier)', path: '/finance/payables', icon: TrendingDown },
      { label: 'Uang Masuk (dari Perusahaan)', path: '/finance/receivables', icon: TrendingUp },
    ]
  },
  { label: 'Laporan', icon: BarChart3, path: '/reports' },
  { label: 'Audit Log', icon: FileText, path: '/audit-log' },
  {
    label: 'Master Data', icon: Package,
    children: [
      { label: 'Depo / Supplier', path: '/master/suppliers', icon: Building2 },
      { label: 'Perusahaan Plywood', path: '/master/companies', icon: Building2 },
      { label: 'Spesifikasi Kayu', path: '/master/wood-specs', icon: TreePine },
      { label: 'Daftar Harga', path: '/master/prices', icon: Receipt },
    ]
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Transaksi', 'Keuangan', 'Master Data']);

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: NavItem) =>
    item.children?.some(child => location.pathname.startsWith(child.path));

  // Breadcrumb
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return [{ label: 'Dashboard', path: '/' }];
    const parts = path.split('/').filter(Boolean);
    const crumbs: { label: string; path: string }[] = [{ label: 'Dashboard', path: '/' }];
    let currentPath = '';
    parts.forEach(part => {
      currentPath += `/${part}`;
      const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      crumbs.push({ label, path: currentPath });
    });
    return crumbs;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? 'w-[68px]' : 'w-[248px]'} bg-white border-r border-[#e2e8f0] flex flex-col transition-all duration-200 ease-in-out flex-shrink-0`}
      >
        {/* Logo Area */}
        <div className="h-[56px] flex items-center px-4 border-b border-[#f1f5f9] flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#166534] flex items-center justify-center flex-shrink-0">
              <TreePine className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <h1 className="font-bold text-[#0f172a] text-[15px] leading-tight tracking-tight">TimberFlow</h1>
                <p className="text-[10px] text-[#94a3b8] leading-tight font-medium">Plywood Trading</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedGroups.includes(item.label);
            const groupActive = isGroupActive(item);

            if (hasChildren) {
              return (
                <div key={item.label} className="mb-1">
                  {!sidebarCollapsed && (
                    <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider px-3 py-2 mt-2">
                      {item.label}
                    </p>
                  )}
                  {sidebarCollapsed ? (
                    <button className="nav-item w-full justify-center my-0.5" title={item.label}>
                      <Icon className="w-[18px] h-[18px]" />
                    </button>
                  ) : (
                    <div className="space-y-0.5 animate-fade-in">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`nav-item relative ${isActive(child.path) ? 'active' : ''}`}
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

            return (
              <Link
                key={item.path}
                to={item.path!}
                className={`nav-item relative mb-0.5 ${isActive(item.path!) ? 'active' : ''} ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-[#f1f5f9] flex-shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="w-8 h-8 rounded-full bg-[#166534] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#0f172a] truncate">Admin User</p>
                <p className="text-[11px] text-[#94a3b8] truncate">Administrator</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button className="nav-item w-full justify-center">
              <div className="w-7 h-7 rounded-full bg-[#166534] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">A</span>
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-[56px] bg-white border-b border-[#e2e8f0] flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#64748b]"
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>

            {/* Breadcrumb */}
            <nav className="breadcrumb hidden md:flex">
              {getBreadcrumbs().map((crumb, i) => (
                <span key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  {i === getBreadcrumbs().length - 1 ? (
                    <span className="text-[#0f172a] font-medium">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path}>{crumb.label}</Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-1.5 w-56">
              <Search className="w-3.5 h-3.5 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Cari..."
                className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-[#94a3b8]"
              />
              <kbd className="text-[10px] text-[#94a3b8] bg-white border border-[#e2e8f0] rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
            </div>

            {/* Notifications */}
            <NotificationCenter />

            {/* Settings */}
            <Link to="/settings" className="p-2 rounded-lg hover:bg-[#f1f5f9] text-[#64748b]">
              <Settings className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-5 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
