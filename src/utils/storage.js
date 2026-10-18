/**
 * TripWise LocalStorage Persistence Utility
 * Safely handles saving, loading, and validating trip itinerary data.
 */

const STORAGE_KEY = 'tripwise_saved_itinerary_v1';

/**
 * Validate that an item is a valid destination object
 */
function isValidDestination(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id !== 'undefined' &&
    typeof item.title === 'string' &&
    item.title.trim().length > 0
  );
}

/**
 * Get saved itinerary from localStorage with full corrupted data protection
 */
export function getSavedItinerary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('[TripWise Storage] Invalid itinerary format detected. Resetting to empty list.');
      return [];
    }

    // Filter out corrupted entries
    const validated = parsed.filter(isValidDestination);
    if (validated.length !== parsed.length) {
      console.warn('[TripWise Storage] Some corrupted items were removed during load.');
      saveItinerary(validated);
    }
    return validated;
  } catch (error) {
    console.error('[TripWise Storage] Error reading localStorage, safe fallback initialized:', error);
    return [];
  }
}

/**
 * Save itinerary to localStorage safely
 */
export function saveItinerary(itinerary) {
  try {
    if (!Array.isArray(itinerary)) {
      throw new Error('Itinerary must be an array');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
    return true;
  } catch (error) {
    console.error('[TripWise Storage] Error writing to localStorage:', error);
    return false;
  }
}

/**
 * Clear all saved items
 */
export function clearSavedItinerary() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[TripWise Storage] Failed to clear itinerary:', error);
    return false;
  }
}
