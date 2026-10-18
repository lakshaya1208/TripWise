import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import {
  fetchCategoryDestinations,
  searchWikimediaDestinations
} from '../services/wikimediaApi';

export default function ExplorePage({
  savedItinerary,
  onAddToTrip,
  onGoToTrip
}) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Selected destination for modal
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Load curated category destinations
  const loadCategoryData = useCallback(async (catId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategoryDestinations(catId);
      setDestinations(data);
    } catch (err) {
      setError(err.message || 'Failed to load destinations.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Perform search
  const performSearch = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setActiveSearchQuery('');
      loadCategoryData(activeCategory);
      return;
    }

    setLoading(true);
    setError(null);
    setActiveSearchQuery(query.trim());

    try {
      const searchResults = await searchWikimediaDestinations(query.trim());
      setDestinations(searchResults);
    } catch (err) {
      setError(err.message || 'Search request failed.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, loadCategoryData]);

  // Initial load
  useEffect(() => {
    loadCategoryData('all');
  }, [loadCategoryData]);

  // Handle category switch
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchQuery('');
    setActiveSearchQuery('');
    loadCategoryData(catId);
  };

  // Handle quick search pills from Hero
  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    performSearch(term);
  };

  // Handle search submit from Hero form
  const handleSearchSubmit = (term) => {
    performSearch(term);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveSearchQuery('');
    setActiveCategory('all');
    setSortBy('featured');
    loadCategoryData('all');
  };

  // Apply Sorting
  const sortedDestinations = useMemo(() => {
    const list = [...destinations];
    switch (sortBy) {
      case 'name-asc':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case 'depth':
        return list.sort((a, b) => (b.extract?.length || 0) - (a.extract?.length || 0));
      case 'lat-north':
        return list.sort(
          (a, b) => (b.coordinates?.lat || -90) - (a.coordinates?.lat || -90)
        );
      case 'featured':
      default:
        return list;
    }
  }, [destinations, sortBy]);

  // Quick lookup of saved IDs
  const savedIds = useMemo(() => {
    return new Set(savedItinerary.map((item) => item.id));
  }, [savedItinerary]);

  // Handle selecting a destination from Autocomplete
  const handleSelectDestination = async (suggestion) => {
    setSearchQuery(suggestion.title);
    performSearch(suggestion.title);
    try {
      // Fetch full summary so details modal is immediately rich and complete
      const full = await fetchWikipediaSummary(suggestion.rawTitle || suggestion.title);
      setSelectedDestination({
        ...full,
        category: suggestion.category || 'Global Destination',
        country: suggestion.country || 'Worldwide'
      });
    } catch {
      setSelectedDestination(suggestion);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px' }}>
      {/* Hero Header */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickSearch={handleQuickSearch}
        onSelectDestination={handleSelectDestination}
      />

      {/* Anchor for Explore Destinations button */}
      <div id="destinations-section" style={{ scrollMarginTop: '80px' }}>
        {/* Filters & Sorting Bar */}
        <SearchFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultsCount={sortedDestinations.length}
          isSearching={!!activeSearchQuery}
          activeSearchQuery={activeSearchQuery}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Content Rendering: Loading, Error, Empty, or Grid */}
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            if (activeSearchQuery) {
              performSearch(activeSearchQuery);
            } else {
              loadCategoryData(activeCategory);
            }
          }}
        />
      ) : sortedDestinations.length === 0 ? (
        <EmptyState
          type="search"
          query={activeSearchQuery}
          onAction={handleResetFilters}
          actionLabel="Reset Search & View All"
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px',
          }}
        >
          {sortedDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSaved={savedIds.has(dest.id)}
              onAddToTrip={onAddToTrip}
              onOpenDetails={setSelectedDestination}
            />
          ))}
        </div>
      )}

      {/* Destination Modal View */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isSaved={savedIds.has(selectedDestination.id)}
          onClose={() => setSelectedDestination(null)}
          onAddToTrip={onAddToTrip}
          onGoToTrip={onGoToTrip}
        />
      )}
    </div>
  );
}
