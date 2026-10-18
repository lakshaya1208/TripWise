import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '48px 32px',
        textAlign: 'center',
        margin: '40px auto',
        maxWidth: '580px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        background: 'rgba(239, 68, 68, 0.05)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        <WifiOff size={28} color="#ef4444" />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
        Unable to Load Destination Data
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          maxWidth: '440px',
          margin: '0 auto 24px',
          lineHeight: 1.6,
        }}
      >
        {message ||
          'A network error occurred while contacting Wikimedia API services. Please verify your internet connection and try again.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(135deg, var(--blue-primary), var(--blue-dark))',
            color: '#ffffff',
            fontSize: '0.92rem',
            fontWeight: 600,
            border: 'none',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
        >
          <RefreshCw size={16} />
          <span>Retry Live Request</span>
        </button>
      )}
    </div>
  );
}
