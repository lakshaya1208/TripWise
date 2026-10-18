import React, { useState } from 'react';
import { Compass, MapPin, Calendar, Menu, X, Sparkles, Globe } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, tripCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <div
          onClick={() => handleNav('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            }}
          >
            <Compass size={24} color="#ffffff" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                TripWise
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  color: 'var(--blue-light)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                AWS SBG
              </span>
            </div>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.01em',
              }}
            >
              Smart Travel Planner • Powered by Wikimedia
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={() => handleNav('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'var(--transition-fast)',
              color: activeTab === 'explore' ? '#ffffff' : 'var(--text-muted)',
              background:
                activeTab === 'explore'
                  ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.35), rgba(3, 105, 161, 0.2))'
                  : 'transparent',
              border:
                activeTab === 'explore'
                  ? '1px solid rgba(56, 189, 248, 0.4)'
                  : '1px solid transparent',
            }}
          >
            <Compass size={18} color={activeTab === 'explore' ? 'var(--blue-light)' : 'currentColor'} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => handleNav('mytrip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.92rem',
              fontWeight: 600,
              transition: 'var(--transition-fast)',
              color: activeTab === 'mytrip' ? '#ffffff' : 'var(--text-muted)',
              background:
                activeTab === 'mytrip'
                  ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.35), rgba(225, 29, 72, 0.2))'
                  : 'transparent',
              border:
                activeTab === 'mytrip'
                  ? '1px solid rgba(244, 63, 94, 0.45)'
                  : '1px solid transparent',
            }}
          >
            <Calendar size={18} color={activeTab === 'mytrip' ? 'var(--pink-light)' : 'currentColor'} />
            <span>My Trip</span>
            <span
              style={{
                marginLeft: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                background:
                  tripCount > 0 ? 'var(--pink-accent)' : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                transition: 'var(--transition-fast)',
              }}
            >
              {tripCount}
            </span>
          </button>

          {/* Live API Badge */}
          <div
            style={{
              marginLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.75rem',
              color: '#34d399',
              fontWeight: 500,
            }}
            title="Connected to Wikimedia MediaWiki REST & Action API"
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span>Wikimedia Live</span>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            color: 'var(--text-main)',
            padding: '8px',
            borderRadius: '8px',
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 24px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(7, 11, 18, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <button
            onClick={() => handleNav('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'explore' ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
              color: activeTab === 'explore' ? 'var(--blue-light)' : 'var(--text-main)',
              fontSize: '1rem',
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Compass size={20} />
            <span>Explore Destinations</span>
          </button>

          <button
            onClick={() => handleNav('mytrip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'mytrip' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: activeTab === 'mytrip' ? 'var(--pink-light)' : 'var(--text-main)',
              fontSize: '1rem',
              fontWeight: 600,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={20} />
              <span>My Trip Planner</span>
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: '12px',
                background: 'var(--pink-accent)',
                color: '#ffffff',
              }}
            >
              {tripCount} saved
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
