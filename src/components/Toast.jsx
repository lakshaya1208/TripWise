import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type = 'info', message, duration = 3500 } = toast;

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    info: <Info size={18} color="#38bdf8" />
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `4px solid ${
          type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : 'var(--blue-light)'
        }`,
        boxShadow: 'var(--shadow-lg)',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-main)',
        fontSize: '0.92rem',
        maxWidth: '420px',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div style={{ flexShrink: 0 }}>{icons[type] || icons.info}</div>
      <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
      <button
        onClick={onClose}
        style={{
          color: 'var(--text-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px',
          borderRadius: '4px'
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
