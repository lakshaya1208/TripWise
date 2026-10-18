import React from 'react';

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '24px',
        margin: '20px 0 40px',
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '420px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* Skeleton Thumbnail */}
          <div className="skeleton" style={{ width: '100%', height: '220px' }} />

          {/* Skeleton Content */}
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <div>
              {/* Country tag skeleton */}
              <div
                className="skeleton"
                style={{ width: '35%', height: '14px', marginBottom: '12px' }}
              />

              {/* Title skeleton */}
              <div
                className="skeleton"
                style={{ width: '70%', height: '22px', marginBottom: '14px' }}
              />

              {/* Extract skeletons */}
              <div
                className="skeleton"
                style={{ width: '100%', height: '12px', marginBottom: '8px' }}
              />
              <div
                className="skeleton"
                style={{ width: '90%', height: '12px', marginBottom: '8px' }}
              />
              <div className="skeleton" style={{ width: '60%', height: '12px' }} />
            </div>

            {/* Skeleton Footer Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div className="skeleton" style={{ width: '60px', height: '16px' }} />
              <div
                className="skeleton"
                style={{ width: '100px', height: '32px', borderRadius: 'var(--radius-pill)' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
