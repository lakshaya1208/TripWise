import React, { useState } from 'react';
import { Compass, Calendar, Menu, X, Info } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, tripCount, onOpenAbout }) {
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
          padding: '14px 24px',
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
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            }}
          >
            <Compass size={22} color="#ffffff" strokeWidth={2.2} />
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TripWise
            </span>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              Smart Travel Planner
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links: Explore, My Trip, About */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {/* Explore */}
          <button
            onClick={() => handleNav('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
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
            <Compass size={17} color={activeTab === 'explore' ? 'var(--blue-light)' : 'currentColor'} />
            <span>Explore</span>
          </button>

          {/* My Trip */}
          <button
            onClick={() => handleNav('mytrip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
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
            <Calendar size={17} color={activeTab === 'mytrip' ? 'var(--pink-light)' : 'currentColor'} />
            <span>My Trip</span>
            <span
              style={{
                marginLeft: '4px',
                fontSize: '0.74rem',
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

          {/* About */}
          <button
            onClick={onOpenAbout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              background: 'transparent',
              border: '1px solid transparent',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Info size={16} />
            <span>About</span>
          </button>

          {/* Live API Status Dot */}
          <div
            style={{
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.74rem',
              color: '#34d399',
              fontWeight: 500,
            }}
            title="Connected to Wikimedia MediaWiki APIs"
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981',
              }}
            />
            <span>Wikimedia Live</span>
          </div>
        </nav>

        {/* Mobile Toggle Button */}
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
            padding: '16px 20px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(7, 11, 18, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
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
              fontSize: '0.98rem',
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Compass size={18} />
            <span>Explore</span>
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
              fontSize: '0.98rem',
              fontWeight: 600,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} />
              <span>My Trip</span>
            </div>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                background: 'var(--pink-accent)',
                color: '#ffffff',
              }}
            >
              {tripCount} saved
            </span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '0.98rem',
              fontWeight: 500,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Info size={18} />
            <span>About TripWise</span>
          </button>
        </div>
      )}
    </header>
  );
}
