import { useState } from 'react';
import { Bell, X, AlertTriangle, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { invoices, orders, formatCurrency, formatDate } from '../data/mockData';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  action?: { label: string; path: string };
  read: boolean;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);

  // Generate notifications from data
  const notifications: Notification[] = [
    // Overdue invoices
    ...invoices.filter(inv => inv.agingCategory === '>60 hari').map(inv => ({
      id: `overdue-${inv.id}`,
      type: 'critical' as const,
      title: 'Invoice Overdue Kritis',
      message: `${inv.invoiceNumber} - ${inv.companyName} sudah ${inv.agingDays} hari lewat jatuh tempo (${formatCurrency(inv.totalAmount - inv.paidAmount)})`,
      timestamp: '2 jam lalu',
      action: { label: 'Lihat Detail', path: '/finance/invoices' },
      read: false,
    })),
    // Invoices approaching due date
    ...invoices.filter(inv => inv.agingDays > 0 && inv.agingDays <= 7 && inv.status !== 'paid').map(inv => ({
      id: `approaching-${inv.id}`,
      type: 'warning' as const,
      title: 'Invoice Mendekati Jatuh Tempo',
      message: `${inv.invoiceNumber} akan jatuh tempo dalam ${7 - inv.agingDays} hari`,
      timestamp: '5 jam lalu',
      action: { label: 'Lihat Invoice', path: '/finance/invoices' },
      read: false,
    })),
    // Orders pending approval
    ...orders.filter(o => o.status === 'draft').map(order => ({
      id: `draft-${order.id}`,
      type: 'info' as const,
      title: 'Pesanan Menunggu Approval',
      message: `${order.orderNumber} dari ${order.companyName} menunggu konfirmasi`,
      timestamp: '1 hari lalu',
      action: { label: 'Review Pesanan', path: '/transactions/orders' },
      read: true,
    })),
    // Monthly profit milestone
    {
      id: 'profit-milestone',
      type: 'success' as const,
      title: 'Profit Bulan Ini',
      message: `Profit bulan ini mencapai ${formatCurrency(1950000)} (+8.2% dari bulan lalu)`,
      timestamp: '1 hari lalu',
      action: { label: 'Lihat Laporan', path: '/reports' },
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-[#dc2626]" />;
      case 'warning': return <Clock className="w-4 h-4 text-[#a16207]" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-[#166534]" />;
      case 'info': return <TrendingUp className="w-4 h-4 text-[#2563eb]" />;
      default: return <Bell className="w-4 h-4 text-[#64748b]" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-[#fef2f2]';
      case 'warning': return 'bg-[#fefce8]';
      case 'success': return 'bg-[#f0fdf4]';
      case 'info': return 'bg-[#eff6ff]';
      default: return 'bg-[#f8fafc]';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[#f1f5f9] text-[#64748b]"
      >
        <Bell className="w-[18px] h-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#dc2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-[400px] bg-white rounded-xl shadow-2xl border border-[#e2e8f0] z-50 animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#f1f5f9] flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-[#0f172a]">Notifikasi</h3>
                <p className="text-[11px] text-[#94a3b8]">{unreadCount} belum dibaca</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-[#f1f5f9] text-[#94a3b8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-8 h-8 mx-auto text-[#cbd5e1] mb-2" />
                  <p className="text-[13px] text-[#64748b]">Tidak ada notifikasi</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors ${
                      !notif.read ? getBgColor(notif.type) : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">{getIcon(notif.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#0f172a]">{notif.title}</p>
                        <p className="text-[12px] text-[#64748b] mt-0.5">{notif.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] text-[#94a3b8]">{notif.timestamp}</span>
                          {notif.action && (
                            <button className="text-[11px] text-[#166534] font-medium hover:underline">
                              {notif.action.label} →
                            </button>
                          )}
                        </div>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-[#166534] rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-[#f1f5f9] text-center">
              <button className="text-[12px] text-[#166534] font-medium hover:underline">
                Tandai semua sudah dibaca
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
