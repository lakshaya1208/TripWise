import React, { useState } from 'react';
import { MapPin, Plus, Check, Info, ExternalLink, ImageOff } from 'lucide-react';
import { FALLBACK_IMAGE } from '../services/wikimediaApi';

export default function DestinationCard({
  destination,
  isSaved,
  onAddToTrip,
  onOpenDetails
}) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const displayImage = imgError || !destination.image ? FALLBACK_IMAGE : destination.image;

  return (
    <div
      className="destination-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
      onClick={() => onOpenDetails(destination)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.35)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg), 0 0 24px rgba(56, 189, 248, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Media Container with Atmospheric Dark Overlay (Design 10) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          overflow: 'hidden',
          backgroundColor: '#090d16',
        }}
      >
        {!imgLoaded && (
          <div
            className="skeleton"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        )}

        <img
          src={displayImage}
          alt={destination.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: imgLoaded ? 1 : 0,
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
        />

        {/* Sophisticated dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(4, 7, 14, 0.15) 0%, rgba(4, 7, 14, 0.3) 50%, rgba(15, 23, 42, 0.95) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Category Pill Tag */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(7, 11, 18, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: 'var(--blue-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{destination.category || 'Destination'}</span>
        </div>

        {/* Live Wikimedia badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '3px 8px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(16, 185, 129, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            fontSize: '0.68rem',
            color: '#34d399',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
          <span>Live API</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div
        style={{
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Country / Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--blue-light)',
              fontWeight: 500,
              marginBottom: '6px',
            }}
          >
            <MapPin size={14} color="var(--blue-light)" />
            <span>{destination.country || 'Global Destination'}</span>
            {destination.coordinates && (
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                {destination.coordinates.lat?.toFixed(1)}°, {destination.coordinates.lon?.toFixed(1)}°
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {destination.title}
          </h3>

          {/* Extract / Description preview */}
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginBottom: '18px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {destination.description || destination.extract || 'Explore details for this destination on Wikimedia.'}
          </p>
        </div>

        {/* Card Actions Footer */}
        <div
          style={{
            paddingTop: '14px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent card modal when clicking buttons
        >
          <button
            onClick={() => onOpenDetails(destination)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Info size={15} />
            <span>Details</span>
          </button>

          {/* Add to Trip / Saved Button */}
          <button
            onClick={() => onAddToTrip(destination)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.84rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              color: '#ffffff',
              background: isSaved
                ? 'rgba(16, 185, 129, 0.2)'
                : 'linear-gradient(135deg, var(--blue-primary), var(--blue-dark))',
              border: isSaved
                ? '1px solid rgba(16, 185, 129, 0.5)'
                : '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: isSaved ? 'none' : '0 2px 10px rgba(2, 132, 199, 0.3)',
            }}
          >
            {isSaved ? (
              <>
                <Check size={15} color="#34d399" />
                <span style={{ color: '#34d399' }}>In Itinerary</span>
              </>
            ) : (
              <>
                <Plus size={15} />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
