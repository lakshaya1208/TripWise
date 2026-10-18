import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';

export default function Footer({ onGoToExplore, onGoToTrip, onOpenAbout }) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(7, 11, 18, 0.98)',
        padding: '36px 24px 28px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Compass size={18} color="var(--blue-light)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800 }}>
              TripWise
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', maxWidth: '440px', margin: 0 }}>
            Curate unforgettable journeys with real-time geographic data. Built with React & Vite.
          </p>
        </div>

        {/* Navigation & API links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={onGoToExplore}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            Explore
          </button>
          <button
            onClick={onGoToTrip}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            My Trip
          </button>
          <button
            onClick={onOpenAbout}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            About
          </button>
          <a
            href="https://www.mediawiki.org/wiki/API:Main_page"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.85rem',
              color: 'var(--blue-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>MediaWiki API</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Sub-footer with subtle project attribution */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '20px auto 0',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.76rem',
          color: 'var(--text-dim)',
        }}
      >
        <div>© {new Date().getFullYear()} TripWise. All rights reserved.</div>
        <div>
          AWS Student Builder Group, VIT Chennai • Web Development Recruitment Task
        </div>
      </div>
    </footer>
  );
}
