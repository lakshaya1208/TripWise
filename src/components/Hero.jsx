import React from 'react';
import { Search, Sparkles, X, Globe, MapPin, Compass } from 'lucide-react';

export default function Hero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onQuickSearch
}) {
  const popularTags = ['Kyoto', 'Santorini', 'Swiss Alps', 'Machu Picchu', 'Tokyo', 'Banff'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        margin: '24px 0 36px',
        border: '1px solid var(--border-subtle)',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(7, 11, 18, 0.95) 100%)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Ambient background glow & atmospheric travel motif */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          padding: '48px 32px',
          maxWidth: '920px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Subtle pill tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            color: 'var(--blue-light)',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          <Sparkles size={15} />
          <span>AWS SBG Recruitment Task • Smart Travel Engineering</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-0.03em',
          }}
        >
          Curate Unforgettable Journeys with{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TripWise
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)',
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Explore verified global landmarks, natural wonders, and iconic cities powered by real-time
          Wikimedia geographic data. Build your dream itinerary with instant browser sync.
        </p>

        {/* Prominent Search Bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '20px',
                color: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <Search size={22} />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any destination worldwide (e.g. Kyoto, Banff, Rome)..."
              style={{
                width: '100%',
                padding: '18px 125px 18px 54px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
                color: '#ffffff',
                fontSize: '1.02rem',
                outline: 'none',
                transition: 'var(--transition-fast)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--blue-light)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(56, 189, 248, 0.3)')}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  if (onSearchSubmit) onSearchSubmit('');
                }}
                style={{
                  position: 'absolute',
                  right: '98px',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                }}
                aria-label="Clear search input"
              >
                <X size={18} />
              </button>
            )}

            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                padding: '12px 22px',
                borderRadius: 'var(--radius-pill)',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.92rem',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                transition: 'var(--transition-fast)',
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}
        >
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Trending queries:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onQuickSearch(tag)}
              style={{
                fontSize: '0.8rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
