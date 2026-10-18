import React from 'react';
import { SearchX, Compass, MapPin, Sparkles } from 'lucide-react';

export default function EmptyState({
  type = 'search', // 'search' | 'itinerary'
  query = '',
  onAction,
  actionLabel
}) {
  if (type === 'itinerary') {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '64px 32px',
          textAlign: 'center',
          maxWidth: '620px',
          margin: '40px auto',
          border: '1px dashed rgba(244, 63, 94, 0.3)',
          background: 'rgba(15, 23, 42, 0.5)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: '1px solid rgba(244, 63, 94, 0.3)',
          }}
        >
          <MapPin size={30} color="var(--pink-accent)" />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
          Your Itinerary is Empty
        </h3>

        <p
          style={{
            fontSize: '0.94rem',
            color: 'var(--text-muted)',
            maxWidth: '440px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
          }}
        >
          You haven't added any destinations yet. Browse world-renowned landmarks on the Explore page
          and click <strong>"Add to Trip"</strong> to construct your itinerary.
        </p>

        {onAction && (
          <button
            onClick={onAction}
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
              boxShadow: '0 4px 16px rgba(2, 132, 199, 0.35)',
              cursor: 'pointer',
            }}
          >
            <Compass size={18} />
            <span>{actionLabel || 'Explore Destinations'}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: '56px 32px',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '40px auto',
        border: '1px dashed var(--border-subtle)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
        }}
      >
        <SearchX size={26} color="var(--blue-light)" />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
        No Destinations Found
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          maxWidth: '420px',
          margin: '0 auto 24px',
          lineHeight: 1.6,
        }}
      >
        We couldn't find matching places for{' '}
        <strong style={{ color: 'var(--blue-light)' }}>"{query}"</strong> on Wikimedia. Try checking
        spelling or search for major cities, countries, or geographic landmarks.
      </p>

      {onAction && (
        <button
          onClick={onAction}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: '#ffffff',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <span>{actionLabel || 'Clear Search & Show All'}</span>
        </button>
      )}
    </div>
  );
}
