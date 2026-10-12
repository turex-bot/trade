import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, TreePine, DollarSign,
  ClipboardList, Truck, FileText, CreditCard, BarChart3,
  Menu, X, LogOut, ChevronDown, Bell, Search, User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  {
    label: 'Master Data', icon: Database, path: '/master',
    children: [
      { label: 'Depo / Supplier', path: '/master/suppliers' },
      { label: 'Perusahaan Plywood', path: '/master/companies' },
      { label: 'Spesifikasi Kayu', path: '/master/wood-specs' },
      { label: 'Harga', path: '/master/prices' },
    ]
  },
  {
    label: 'Transaksi', icon: ClipboardList, path: '/transactions',
    children: [
      { label: 'Pesanan', path: '/transactions/orders' },
      { label: 'Pengiriman', path: '/transactions/deliveries' },
    ]
  },
  {
    label: 'Keuangan', icon: CreditCard, path: '/finance',
    children: [
      { label: 'Invoice', path: '/finance/invoices' },
      { label: 'Piutang & Aging', path: '/finance/receivables' },
    ]
  },
  { label: 'Laporan', icon: BarChart3, path: '/reports' },
];

function Database({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Master Data', 'Transaksi', 'Keuangan']);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: typeof menuItems[0]) => {
    if ('children' in item && item.children) {
      return item.children.some(child => location.pathname.startsWith(child.path));
    }
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden flex-shrink-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-forest-700 rounded-lg flex items-center justify-center">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-forest-800 text-lg leading-tight">TimberFlow</h1>
                <p className="text-[10px] text-gray-400 leading-tight">Plywood Trader System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = 'children' in item && item.children;
            const isExpanded = expandedMenus.includes(item.label);
            const parentActive = isParentActive(item);

            if (hasChildren && item.children) {
              return (
                <div key={item.label} className="mb-1">
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`sidebar-item w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium ${parentActive ? 'text-forest-700' : 'text-gray-600 hover:text-forest-700'}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                  {sidebarOpen && isExpanded && (
                    <div className="ml-4 border-l border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`sidebar-item block px-4 py-2 text-sm ${isActive(child.path) ? 'text-forest-700 font-semibold bg-forest-50 border-r-2 border-forest-700' : 'text-gray-500 hover:text-forest-700'}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path!}
                className={`sidebar-item flex items-center gap-3 px-4 py-2.5 text-sm font-medium mb-1 ${isActive(item.path!) ? 'text-forest-700 bg-forest-50 border-r-2 border-forest-700' : 'text-gray-600 hover:text-forest-700'}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-forest-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@timberflow.id</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari transaksi, perusahaan..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-dot"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                    <User className="w-4 h-4" /> Profil
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
