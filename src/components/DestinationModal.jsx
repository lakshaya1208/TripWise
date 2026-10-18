import React, { useEffect, useState } from 'react';
import { X, MapPin, Plus, Check, ExternalLink, Calendar, Compass, Share2 } from 'lucide-react';
import { FALLBACK_IMAGE } from '../services/wikimediaApi';

export default function DestinationModal({
  destination,
  isSaved,
  onClose,
  onAddToTrip,
  onGoToTrip
}) {
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!destination) return null;

  const displayImage = imgError || !destination.image ? FALLBACK_IMAGE : destination.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
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
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(15, 23, 42, 0.95)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: 'var(--shadow-lg), 0 0 40px rgba(2, 132, 199, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(7, 11, 18, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Hero Image Header */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            backgroundColor: '#070b12',
          }}
        >
          <img
            src={displayImage}
            alt={destination.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(7, 11, 18, 0.2) 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 1) 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: 'var(--blue-light)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              <span>{destination.category || 'Travel Destination'}</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              {destination.title}
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '6px',
                flexWrap: 'wrap',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={16} color="var(--pink-accent)" />
                <span style={{ color: '#ffffff', fontWeight: 500 }}>
                  {destination.country || 'Global'}
                </span>
              </div>
              {destination.coordinates && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Lat {destination.coordinates.lat?.toFixed(3)}°, Lon {destination.coordinates.lon?.toFixed(3)}°
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px 32px' }}>
          {/* Metadata Highlights Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                API Data Source
              </span>
              <p style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 600, margin: 0 }}>
                Wikimedia REST API
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Classification
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--blue-light)', fontWeight: 600, margin: 0 }}>
                {destination.category || 'Global Landmark'}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Itinerary Status
              </span>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: isSaved ? 'var(--pink-light)' : 'var(--text-muted)',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {isSaved ? 'Saved in My Trip' : 'Not Added Yet'}
              </p>
            </div>
          </div>

          {/* Extract / About Section */}
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              About Destination
            </h4>
            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: '#cbd5e1',
                margin: 0,
              }}
            >
              {destination.extract || destination.description || 'No detailed extract recorded on Wikimedia.'}
            </p>
          </div>

          {/* External Wikimedia Link */}
          {destination.wikiUrl && (
            <div style={{ marginBottom: '32px' }}>
              <a
                href={destination.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.86rem',
                  color: 'var(--blue-light)',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  transition: 'var(--transition-fast)',
                }}
              >
                <span>Read original encyclopedia entry on Wikipedia</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Action Buttons Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '20px',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Return to Explore
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isSaved ? (
                <button
                  onClick={() => {
                    onClose();
                    if (onGoToTrip) onGoToTrip();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'linear-gradient(135deg, var(--pink-accent), #e11d48)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(244, 63, 94, 0.35)',
                    cursor: 'pointer',
                  }}
                >
                  <Calendar size={18} />
                  <span>View in My Trip</span>
                </button>
              ) : (
                <button
                  onClick={() => onAddToTrip(destination)}
                  style={{
                    display: 'flex',
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
                  <Plus size={18} />
                  <span>Add to My Trip</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
