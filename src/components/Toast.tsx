import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<Toast, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { ...options, id };
    setToasts(prev => [...prev, toast]);

    const duration = options.duration || 4000;
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const toastApi: ToastContextType = {
    toast: addToast,
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message, duration: 5000 }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-[#166534]" />;
      case 'error': return <XCircle className="w-4 h-4 text-[#dc2626]" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-[#a16207]" />;
      case 'info': return <Info className="w-4 h-4 text-[#2563eb]" />;
    }
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success': return 'bg-[#f0fdf4] border-[#dcfce7]';
      case 'error': return 'bg-[#fef2f2] border-[#fecaca]';
      case 'warning': return 'bg-[#fefce8] border-[#fef08a]';
      case 'info': return 'bg-[#eff6ff] border-[#bfdbfe]';
    }
  };

  return (
    <ToastContext.Provider value={toastApi}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getBgColor(toast.type)} border rounded-lg p-3 shadow-lg animate-slide-in flex items-start gap-2.5`}
          >
            <div className="mt-0.5 flex-shrink-0">{getIcon(toast.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#0f172a]">{toast.title}</p>
              {toast.message && (
                <p className="text-[12px] text-[#64748b] mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 rounded hover:bg-black/5 text-[#94a3b8] flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
