import React, { useEffect } from 'react';
import { X, Compass, Globe, Sparkles, ExternalLink, ShieldCheck, Layers, Heart } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(4, 7, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(15, 23, 42, 0.95)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: 'var(--shadow-lg), 0 0 50px rgba(2, 132, 199, 0.25)',
          padding: '36px 32px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close About dialog"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
            }}
          >
            <Compass size={26} color="#ffffff" strokeWidth={2.2} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              About TripWise
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--blue-light)', margin: 0 }}>
              Smart Travel Planner • Powered by Wikimedia
            </p>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '24px' }}>
          TripWise is a modern travel discovery and itinerary planning application designed to bring
          authentic global destinations directly to your fingertips. Built entirely frontend-first,
          it connects with live geographic knowledge bases to help you explore world landmarks,
          read encyclopedic descriptions, and assemble customized day-by-day travel journeys.
        </p>

        {/* Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Globe size={18} color="var(--blue-light)" />
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Live Wikimedia API</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Real-time Wikipedia REST & MediaWiki query endpoints with genuine thumbnails and extracts.
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} color="#10b981" />
              <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>Client-Side Sync</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Safe localStorage persistence with corrupted data detection and instant UI updates.
            </p>
          </div>
        </div>

        {/* Recruitment Attribution */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={16} color="var(--blue-light)" />
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>
              AWS Student Builder Group (SBG) Recruitment Task
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
            VIT Chennai • Frontend Development Track • Lakshaya B K (<a href="https://github.com/lakshaya1208/TripWise" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-light)', textDecoration: 'underline' }}>GitHub Repo</a>)
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(135deg, var(--blue-primary), var(--blue-dark))',
            color: '#ffffff',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Close & Continue Exploring
        </button>
      </div>
    </div>
  );
}
