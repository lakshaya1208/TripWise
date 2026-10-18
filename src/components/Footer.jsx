import React from 'react';
import { Compass, Heart, Globe, ExternalLink, Code2 } from 'lucide-react';

export default function Footer({ onGoToExplore, onGoToTrip }) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(7, 11, 18, 0.95)',
        padding: '40px 24px 32px',
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
          gap: '24px',
        }}
      >
        {/* Brand & Attribution */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Compass size={20} color="var(--blue-light)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800 }}>
              TripWise
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                padding: '2px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              VIT Chennai
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', maxWidth: '480px' }}>
            AWS Student Builder Group (SBG) Web Development Recruitment Task. Frontend-only travel
            planner integrating real-time Wikimedia & Wikipedia MediaWiki APIs.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={onGoToExplore}
            style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}
          >
            Explore
          </button>
          <button
            onClick={onGoToTrip}
            style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}
          >
            My Trip
          </button>
          <a
            href="https://www.mediawiki.org/wiki/API:Main_page"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.86rem',
              color: 'var(--blue-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>MediaWiki API</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '24px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
        }}
      >
        <div>© {new Date().getFullYear()} TripWise. Built with React, Vite & pure CSS.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Powered by authentic Wikimedia data</span>
        </div>
      </div>
    </footer>
  );
}
