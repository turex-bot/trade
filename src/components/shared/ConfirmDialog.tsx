import { Modal } from '../ui';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Hapus',
  cancelText = 'Batal',
  variant = 'danger',
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: {
      icon: 'text-[#dc2626]',
      bg: 'bg-[#fef2f2]',
      border: 'border-[#fecaca]',
      text: 'text-[#991b1b]',
      button: 'bg-[#dc2626] hover:bg-[#b91c1c]',
    },
    warning: {
      icon: 'text-[#f59e0b]',
      bg: 'bg-[#fef3c7]',
      border: 'border-[#fde68a]',
      text: 'text-[#92400e]',
      button: 'bg-[#f59e0b] hover:bg-[#d97706]',
    },
    info: {
      icon: 'text-[#2563eb]',
      bg: 'bg-[#dbeafe]',
      border: 'border-[#bfdbfe]',
      text: 'text-[#1e40af]',
      button: 'bg-[#2563eb] hover:bg-[#1d4ed8]',
    },
  };

  const styles = variantStyles[variant];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button onClick={onClose} className="btn btn-secondary">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`btn ${styles.button} text-white`}>
            {variant === 'danger' && <Trash2 className="w-4 h-4" />}
            {confirmText}
          </button>
        </>
      }
    >
      <div className={`${styles.bg} border ${styles.border} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className={`w-5 h-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
          <div>
            <p className={`text-[13px] font-semibold ${styles.text}`}>Peringatan</p>
            <p className={`text-[12px] ${styles.text} mt-1`}>{message}</p>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-[#64748b] mt-4">
        Tindakan ini tidak dapat dibatalkan.
      </p>
    </Modal>
  );
}
