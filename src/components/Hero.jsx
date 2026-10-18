import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  MapPin,
  Compass,
  ArrowDown,
  Loader2,
  AlertCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { fetchAutocompleteSuggestions, FALLBACK_IMAGE } from '../services/wikimediaApi';

export default function Hero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onQuickSearch,
  onSelectDestination
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestionError, setSuggestionError] = useState(null);

  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const latestRequestId = useRef(0);
  const debounceTimerRef = useRef(null);

  const popularTags = ['Kyoto', 'Santorini', 'Swiss Alps', 'Machu Picchu', 'Tokyo', 'Banff'];

  // Breathtaking scenic travel hero background photograph
  const heroBackgroundUrl =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80';

  // Debounced autocomplete fetch
  const triggerAutocomplete = useCallback((text) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!text || text.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      setIsLoadingSuggestions(false);
      setSuggestionError(null);
      return;
    }

    const currentId = ++latestRequestId.current;
    setIsLoadingSuggestions(true);
    setSuggestionError(null);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await fetchAutocompleteSuggestions(text);
        // Prevent stale requests from overwriting newer results
        if (currentId === latestRequestId.current) {
          setSuggestions(results);
          setShowDropdown(true);
          setActiveIndex(-1);
        }
      } catch (err) {
        if (currentId === latestRequestId.current) {
          setSuggestionError('Unable to load suggestions. Click to retry.');
          setShowDropdown(true);
        }
      } finally {
        if (currentId === latestRequestId.current) {
          setIsLoadingSuggestions(false);
        }
      }
    }, 220);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    triggerAutocomplete(val);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setShowDropdown(false);
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
    scrollToDestinations();
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowDropdown(false);
    if (onSelectDestination) {
      onSelectDestination(suggestion);
    } else if (onSearchSubmit) {
      onSearchSubmit(suggestion.title);
    }
    scrollToDestinations();
  };

  // Keyboard Navigation: Arrow Down, Arrow Up, Enter, Escape
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[activeIndex]);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Highlight matching query in title
  const renderHighlightedTitle = (title, query) => {
    if (!query) return title;
    const lowerTitle = title.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerTitle.indexOf(lowerQuery);

    if (index === -1) return title;

    const before = title.slice(0, index);
    const match = title.slice(index, index + query.length);
    const after = title.slice(index + query.length);

    return (
      <>
        {before}
        <strong style={{ color: 'var(--blue-light)', textDecoration: 'underline' }}>{match}</strong>
        {after}
      </>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '520px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        margin: '16px 0 36px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. High-Quality Full-Width Scenic Photograph Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBackgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: 'scale(1.02)',
          filter: 'brightness(0.92)',
        }}
      />

      {/* 2. Carefully Tuned Translucent & Dark Overlay for Readable Contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(7, 11, 18, 0.45) 0%, rgba(7, 11, 18, 0.75) 60%, rgba(7, 11, 18, 0.95) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* 3. Hero Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '60px 24px',
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Subtle Pill Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(7, 11, 18, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: 'var(--blue-light)',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Sparkles size={14} color="var(--blue-light)" />
          <span>Curated Global Destination Discovery</span>
        </div>

        {/* Compelling Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)',
          }}
        >
          The world is closer than you think.
        </h1>

        {/* Short Travel-Focused Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#e2e8f0',
            maxWidth: '640px',
            margin: '0 auto 34px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Discover authentic landmarks, natural wonders, and cultural capitals powered by real-time
          Wikimedia geographic intelligence.
        </p>

        {/* Prominent Search Container with Real Autocomplete Dropdown */}
        <div
          ref={searchContainerRef}
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Search Icon */}
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
                {isLoadingSuggestions ? (
                  <Loader2 size={20} className="animate-spin" color="var(--blue-light)" />
                ) : (
                  <Search size={20} />
                )}
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showDropdown}
                aria-controls="autocomplete-dropdown-list"
                aria-label="Search destination"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) setShowDropdown(true);
                }}
                placeholder="Where do you want to travel? (e.g. Paris, Kyoto, Banff)..."
                style={{
                  width: '100%',
                  padding: '17px 120px 17px 52px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(7, 11, 18, 0.88)',
                  backdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 10px 35px rgba(0, 0, 0, 0.65)',
                  color: '#ffffff',
                  fontSize: '1.02rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocusCapture={(e) => {
                  e.target.style.borderColor = 'var(--blue-light)';
                  e.target.style.boxShadow =
                    '0 10px 35px rgba(0, 0, 0, 0.75), 0 0 20px rgba(56, 189, 248, 0.25)';
                }}
                onBlurCapture={(e) => {
                  e.target.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.target.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.65)';
                }}
              />

              {/* Clear Input Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                    setShowDropdown(false);
                    if (onSearchSubmit) onSearchSubmit('');
                  }}
                  style={{
                    position: 'absolute',
                    right: '100px',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px',
                  }}
                  aria-label="Clear destination search"
                >
                  <X size={18} />
                </button>
              )}

              {/* Submit Search Button */}
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '7px',
                  padding: '11px 22px',
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

          {/* REAL AUTOCOMPLETE DROPDOWN */}
          {showDropdown && (
            <div
              id="autocomplete-dropdown-list"
              role="listbox"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'rgba(15, 23, 42, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(2, 132, 199, 0.2)',
                overflow: 'hidden',
                textAlign: 'left',
                maxHeight: '340px',
                overflowY: 'auto',
                animation: 'fadeIn 0.18s ease-out',
              }}
            >
              {/* Header Info */}
              <div
                style={{
                  padding: '8px 16px',
                  background: 'rgba(7, 11, 18, 0.6)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <span>Live Wikimedia Suggestions</span>
                <span>Use ↑↓ to navigate • Enter to select</span>
              </div>

              {/* Error State with Retry */}
              {suggestionError ? (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#ef4444',
                      fontSize: '0.86rem',
                      marginBottom: '8px',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{suggestionError}</span>
                  </div>
                  <button
                    onClick={() => triggerAutocomplete(searchQuery)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>Retry Search</span>
                  </button>
                </div>
              ) : suggestions.length === 0 && !isLoadingSuggestions ? (
                /* No Results State */
                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                    No matching destinations found for{' '}
                    <strong style={{ color: 'var(--blue-light)' }}>"{searchQuery}"</strong>.
                  </p>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    Try searching for major cities, countries, or geographic landmarks.
                  </span>
                </div>
              ) : (
                /* Suggestions List */
                suggestions.map((item, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        background: isSelected
                          ? 'linear-gradient(90deg, rgba(2, 132, 199, 0.28) 0%, rgba(15, 23, 42, 0.6) 100%)'
                          : 'transparent',
                        borderLeft: isSelected
                          ? '3px solid var(--blue-light)'
                          : '3px solid transparent',
                      }}
                    >
                      {/* Small Thumbnail */}
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          background: '#090d16',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <Compass size={20} color="var(--blue-light)" />
                        )}
                      </div>

                      {/* Text info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: 600,
                            color: '#ffffff',
                            lineHeight: 1.3,
                          }}
                        >
                          {renderHighlightedTitle(item.title, searchQuery)}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '2px',
                          }}
                        >
                          {item.description || item.country || 'Global Destination'}
                        </div>
                      </div>

                      {/* Country / Category Pill */}
                      <div
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--blue-light)',
                          flexShrink: 0,
                          fontWeight: 500,
                        }}
                      >
                        {item.country || 'Explore'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Action Controls & Trending Pills */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Quick Trending Tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onQuickSearch(tag)}
                style={{
                  fontSize: '0.8rem',
                  padding: '5px 13px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(7, 11, 18, 0.65)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--blue-light)';
                  e.currentTarget.style.background = 'rgba(2, 132, 199, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.background = 'rgba(7, 11, 18, 0.65)';
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Clear "Explore Destinations" Action */}
          <button
            onClick={scrollToDestinations}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'var(--blue-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span>Explore Destinations</span>
            <ArrowDown size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
