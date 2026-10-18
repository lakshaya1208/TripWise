import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Trash2,
  ArrowUp,
  ArrowDown,
  Info,
  Compass,
  FileDown,
  Sparkles,
  Edit3,
  Check,
  ExternalLink
} from 'lucide-react';
import DestinationModal from '../components/DestinationModal';
import EmptyState from '../components/EmptyState';
import { FALLBACK_IMAGE } from '../services/wikimediaApi';

export default function MyTripPage({
  savedItinerary,
  onRemoveFromTrip,
  onClearAll,
  onUpdateItinerary,
  onGoToExplore,
  showToast
}) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Reordering handlers
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...savedItinerary];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onUpdateItinerary(updated);
    showToast('info', 'Itinerary order updated');
  };

  const handleMoveDown = (index) => {
    if (index === savedItinerary.length - 1) return;
    const updated = [...savedItinerary];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onUpdateItinerary(updated);
    showToast('info', 'Itinerary order updated');
  };

  // Inline Note Editor
  const startEditNote = (item) => {
    setEditingNotesId(item.id);
    setNoteText(item.customNotes || '');
  };

  const saveNote = (itemId) => {
    const updated = savedItinerary.map((item) =>
      item.id === itemId ? { ...item, customNotes: noteText.trim() } : item
    );
    onUpdateItinerary(updated);
    setEditingNotesId(null);
    showToast('success', 'Trip notes saved to itinerary');
  };

  // Export trip summary
  const handleExport = () => {
    const textPlan = savedItinerary
      .map(
        (dest, idx) =>
          `Day ${idx + 1}: ${dest.title} (${dest.country || 'Global'})\n` +
          `Category: ${dest.category || 'Landmark'}\n` +
          `Notes: ${dest.customNotes || 'None'}\n` +
          `Wiki: ${dest.wikiUrl || 'N/A'}\n`
      )
      .join('\n----------------------------------------\n\n');

    const blob = new Blob(
      [
        `TRIPWISE ITINERARY PLAN\nGenerated on: ${new Date().toLocaleDateString()}\nTotal Stops: ${
          savedItinerary.length
        }\n\n` + textPlan
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TripWise_Itinerary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Itinerary exported as text file');
  };

  if (savedItinerary.length === 0) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 60px' }}>
        <EmptyState
          type="itinerary"
          onAction={onGoToExplore}
          actionLabel="Discover Destinations to Add"
        />
      </div>
    );
  }

  // Calculate unique countries
  const countriesCount = new Set(
    savedItinerary.map((d) => d.country).filter((c) => c && c !== 'Global' && c !== 'Worldwide')
  ).size;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 80px' }}>
      {/* Page Header (Design 5: Organized Trip Management) */}
      <div
        className="glass-panel"
        style={{
          padding: '32px',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(244, 63, 94, 0.05) 100%)',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: 'var(--pink-light)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            <Calendar size={14} />
            <span>Itinerary Management</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, marginBottom: '6px' }}>
            My Trip Itinerary
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Organize your planned journey, adjust sequence days, add personal notes, and sync seamlessly
            with browser storage.
          </p>
        </div>

        {/* Stats & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-light)' }}>
              {savedItinerary.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Planned Stops
            </div>
          </div>

          <div
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pink-light)' }}>
              {countriesCount || 1}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Countries
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: 'var(--blue-light)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <FileDown size={15} />
              <span>Export Plan</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire itinerary?')) {
                  onClearAll();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Itinerary Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {savedItinerary.map((dest, index) => {
          const isFirst = index === 0;
          const isLast = index === savedItinerary.length - 1;

          return (
            <div
              key={dest.id}
              className="glass-panel itinerary-card"
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'rgba(15, 23, 42, 0.8)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Day Badge & Reorder Controls Column */}
              <div
                className="itinerary-day-col"
                style={{
                  width: '90px',
                  background: 'rgba(7, 11, 18, 0.65)',
                  borderRight: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 8px',
                  flexShrink: 0,
                }}
              >
                {/* Reorder Up */}
                <button
                  disabled={isFirst}
                  onClick={() => handleMoveUp(index)}
                  style={{
                    color: isFirst ? 'var(--text-dim)' : '#ffffff',
                    opacity: isFirst ? 0.3 : 1,
                    cursor: isFirst ? 'not-allowed' : 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                  }}
                  title="Move destination earlier"
                >
                  <ArrowUp size={18} />
                </button>

                {/* Day Marker */}
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--pink-light)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Day
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Reorder Down */}
                <button
                  disabled={isLast}
                  onClick={() => handleMoveDown(index)}
                  style={{
                    color: isLast ? 'var(--text-dim)' : '#ffffff',
                    opacity: isLast ? 0.3 : 1,
                    cursor: isLast ? 'not-allowed' : 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                  }}
                  title="Move destination later"
                >
                  <ArrowDown size={18} />
                </button>
              </div>

              {/* Destination Image Preview */}
              <div
                style={{
                  width: '180px',
                  height: 'auto',
                  minHeight: '160px',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#090d16',
                }}
                className="itinerary-image-col"
              >
                <img
                  src={dest.image || FALLBACK_IMAGE}
                  alt={dest.title}
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
                      'linear-gradient(90deg, transparent 60%, rgba(15, 23, 42, 0.9) 100%)',
                  }}
                />
              </div>

              {/* Destination Main Content */}
              <div
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: 'var(--blue-light)',
                        }}
                      >
                        {dest.category || 'Landmark'}
                      </span>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <MapPin size={13} color="var(--blue-light)" />
                        <span>{dest.country || 'Global'}</span>
                      </div>
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={() => onRemoveFromTrip(dest.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        color: 'var(--text-dim)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                      title="Remove from itinerary"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    {dest.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {dest.extract || dest.description || 'Verified Wikimedia destination stop.'}
                  </p>

                  {/* Custom User Notes Section */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '10px',
                    }}
                  >
                    {editingNotesId === dest.id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="e.g. Visit at sunset, reserve museum tour..."
                          style={{
                            flex: 1,
                            background: '#0f172a',
                            border: '1px solid var(--border-focus)',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            fontSize: '0.82rem',
                            color: '#ffffff',
                            outline: 'none',
                          }}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveNote(dest.id);
                          }}
                        />
                        <button
                          onClick={() => saveNote(dest.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            background: 'var(--blue-primary)',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Check size={14} /> Save
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem',
                        }}
                      >
                        <div style={{ color: dest.customNotes ? '#e2e8f0' : 'var(--text-dim)', fontStyle: dest.customNotes ? 'normal' : 'italic' }}>
                          <strong>Notes:</strong> {dest.customNotes || 'Click pencil to add custom notes for this stop...'}
                        </div>
                        <button
                          onClick={() => startEditNote(dest)}
                          style={{
                            color: 'var(--blue-light)',
                            padding: '2px 6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.76rem',
                          }}
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer link to details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingTop: '8px',
                  }}
                >
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--blue-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Info size={14} />
                    <span>View Destination Details</span>
                  </button>

                  {dest.wikiUrl && (
                    <a
                      href={dest.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <ExternalLink size={12} />
                      <span>Wikipedia entry</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Destination Modal View */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isSaved={true}
          onClose={() => setSelectedDestination(null)}
          onAddToTrip={() => {}}
          onGoToTrip={() => {}}
        />
      )}
    </div>
  );
}
