import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }: ModalProps) {
  if (!open) return null;
  const sizeClasses = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${sizeClasses[size]}`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
          <div>
            <h2 className="text-[16px] font-semibold text-[#0f172a]">{title}</h2>
            {subtitle && <p className="text-[12px] text-[#64748b] mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-[#f1f5f9] flex items-center justify-end gap-2 bg-[#f8fafc] rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Badge({ children, variant = 'gray', dot }: { children: ReactNode; variant?: 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'gray' | 'purple'; dot?: boolean }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-60`} />}
      {children}
    </span>
  );
}

export function FormField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-[#334155] mb-1.5">
        {label}
        {required && <span className="text-[#dc2626] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: { tabs: { key: string; label: string; count?: number }[]; active: string; onChange: (key: string) => void }) {
  return (
    <div className="flex items-center gap-0 border-b border-[#e2e8f0]">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`tab-item ${active === tab.key ? 'active' : ''}`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
              active === tab.key ? 'bg-[#f0fdf4] text-[#166534]' : 'bg-[#f1f5f9] text-[#64748b]'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
