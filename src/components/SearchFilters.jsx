import React from 'react';
import { ArrowUpDown, SlidersHorizontal, Layers, RotateCcw } from 'lucide-react';
import { DESTINATION_CATEGORIES } from '../services/wikimediaApi';

export default function SearchFilters({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultsCount,
  isSearching,
  activeSearchQuery,
  onResetFilters
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        margin: '0 0 28px',
        padding: '16px 20px',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginRight: '4px',
          }}
        >
          <Layers size={15} /> Categories:
        </span>

        {DESTINATION_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id && !isSearching;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                padding: '7px 15px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.86rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                background: isActive
                  ? 'linear-gradient(135deg, var(--blue-primary), var(--blue-dark))'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isActive
                  ? '1px solid rgba(56, 189, 248, 0.5)'
                  : '1px solid var(--border-subtle)',
                transition: 'var(--transition-fast)',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sorting & Status controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}
      >
        {/* Results Counter */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSearching ? (
            <span>
              Results for <strong style={{ color: 'var(--blue-light)' }}>"{activeSearchQuery}"</strong> ({resultsCount})
            </span>
          ) : (
            <span>
              <strong style={{ color: '#ffffff' }}>{resultsCount}</strong> destinations available
            </span>
          )}
        </div>

        {/* Sort Dropdown */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 10px',
          }}
        >
          <ArrowUpDown size={15} color="var(--blue-light)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 500 }}>
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="featured" style={{ background: '#0f172a' }}>
              Featured / Recommended
            </option>
            <option value="name-asc" style={{ background: '#0f172a' }}>
              Name (A to Z)
            </option>
            <option value="name-desc" style={{ background: '#0f172a' }}>
              Name (Z to A)
            </option>
            <option value="depth" style={{ background: '#0f172a' }}>
              Article Depth (Extract Length)
            </option>
            <option value="lat-north" style={{ background: '#0f172a' }}>
              Latitude (North to South)
            </option>
          </select>
        </div>

        {/* Reset / Clear Button */}
        {(isSearching || activeCategory !== 'all' || sortBy !== 'featured') && (
          <button
            onClick={onResetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: 'var(--pink-light)',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
            title="Reset filters and return to default view"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
