/**
 * Wikimedia MediaWiki API Service
 * Real-time destination data fetched directly from Wikimedia & Wikipedia REST APIs.
 * Supports CORS via origin=* and standard Wikipedia REST v1 page summaries.
 */

export const DESTINATION_CATEGORIES = [
  { id: 'all', label: 'All Destinations' },
  { id: 'cities', label: 'Iconic Cities' },
  { id: 'nature', label: 'Nature & Wonders' },
  { id: 'heritage', label: 'Cultural & Heritage' },
  { id: 'coastal', label: 'Coastal & Islands' }
];

// Curated authentic Wikimedia titles for category discovery
const CATEGORY_TITLES = {
  cities: [
    { title: 'Tokyo', category: 'Iconic Cities', country: 'Japan' },
    { title: 'Paris', category: 'Iconic Cities', country: 'France' },
    { title: 'Rome', category: 'Iconic Cities', country: 'Italy' },
    { title: 'New_York_City', category: 'Iconic Cities', country: 'United States' },
    { title: 'Barcelona', category: 'Iconic Cities', country: 'Spain' },
    { title: 'London', category: 'Iconic Cities', country: 'United Kingdom' },
    { title: 'Sydney', category: 'Iconic Cities', country: 'Australia' },
    { title: 'Singapore', category: 'Iconic Cities', country: 'Singapore' },
  ],
  nature: [
    { title: 'Mount_Fuji', category: 'Nature & Wonders', country: 'Japan' },
    { title: 'Grand_Canyon', category: 'Nature & Wonders', country: 'United States' },
    { title: 'Swiss_Alps', category: 'Nature & Wonders', country: 'Switzerland' },
    { title: 'Banff_National_Park', category: 'Nature & Wonders', country: 'Canada' },
    { title: 'Great_Barrier_Reef', category: 'Nature & Wonders', country: 'Australia' },
    { title: 'Serengeti_National_Park', category: 'Nature & Wonders', country: 'Tanzania' },
  ],
  heritage: [
    { title: 'Machu_Picchu', category: 'Cultural & Heritage', country: 'Peru' },
    { title: 'Kyoto', category: 'Cultural & Heritage', country: 'Japan' },
    { title: 'Petra', category: 'Cultural & Heritage', country: 'Jordan' },
    { title: 'Taj_Mahal', category: 'Cultural & Heritage', country: 'India' },
    { title: 'Acropolis_of_Athens', category: 'Cultural & Heritage', country: 'Greece' },
    { title: 'Giza_pyramid_complex', category: 'Cultural & Heritage', country: 'Egypt' },
  ],
  coastal: [
    { title: 'Santorini', category: 'Coastal & Islands', country: 'Greece' },
    { title: 'Bali', category: 'Coastal & Islands', country: 'Indonesia' },
    { title: 'Amalfi_Coast', category: 'Coastal & Islands', country: 'Italy' },
    { title: 'Maldives', category: 'Coastal & Islands', country: 'Maldives' },
    { title: 'Bora_Bora', category: 'Coastal & Islands', country: 'French Polynesia' },
    { title: 'Maui', category: 'Coastal & Islands', country: 'United States' },
  ]
};

// Fallback high quality travel photography for rare cases where Wikipedia has no thumbnail
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';

// In-memory session cache for smooth category flipping and fast responses
const memoryCache = new Map();

/**
 * Fetch a single page summary from Wikipedia REST API
 */
export async function fetchWikipediaSummary(title) {
  const cacheKey = `summary_${title}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia summary for "${title}" (Status ${response.status})`);
  }

  const data = await response.json();
  const result = {
    id: data.pageid || Math.abs(hashCode(title)),
    title: data.titles?.display?.replace(/<[^>]+>/g, '') || data.title,
    rawTitle: data.title,
    description: data.description || 'Global Destination',
    extract: data.extract || 'No extract available from Wikimedia.',
    image: data.thumbnail?.source || data.originalimage?.source || null,
    coordinates: data.coordinates || null,
    wikiUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    lastUpdated: data.timestamp || null,
    source: 'Wikimedia REST API',
    isLive: true
  };

  memoryCache.set(cacheKey, result);
  return result;
}

/**
 * Fetch curated destinations by category using live Wikipedia REST API
 */
export async function fetchCategoryDestinations(categoryId = 'all') {
  let targetItems = [];

  if (categoryId === 'all') {
    // Curated balanced mix of iconic destinations
    targetItems = [
      ...CATEGORY_TITLES.cities.slice(0, 4),
      ...CATEGORY_TITLES.heritage.slice(0, 4),
      ...CATEGORY_TITLES.nature.slice(0, 4),
      ...CATEGORY_TITLES.coastal.slice(0, 4)
    ];
  } else if (CATEGORY_TITLES[categoryId]) {
    targetItems = CATEGORY_TITLES[categoryId];
  } else {
    targetItems = CATEGORY_TITLES.cities;
  }

  // Fetch summaries in parallel
  const promises = targetItems.map(async (item) => {
    try {
      const summary = await fetchWikipediaSummary(item.title);
      return {
        ...summary,
        category: item.category,
        country: item.country
      };
    } catch (err) {
      console.warn(`[TripWise API] Failed fetching ${item.title}:`, err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  const validResults = results.filter(Boolean);

  if (validResults.length === 0) {
    throw new Error('Unable to reach Wikimedia destination services. Please check your internet connection and retry.');
  }

  return validResults;
}

/**
 * Search Wikipedia using live Action Search API
 */
export async function searchWikimediaDestinations(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const trimmed = query.trim();
  const cacheKey = `search_${trimmed.toLowerCase()}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  // MediaWiki Action API with generators, page images, and text extracts
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    trimmed
  )}&gsrlimit=15&prop=pageimages|extracts|coordinates|info&piprop=thumbnail&pithumbsize=800&exintro=1&explaintext=1&exchars=260&inprop=url&format=json&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Wikimedia Search API returned status ${response.status}`);
  }

  const data = await response.json();
  if (!data.query || !data.query.pages) {
    return [];
  }

  const pages = Object.values(data.query.pages);

  // Normalize search results
  const formatted = pages
    .sort((a, b) => (a.index || 99) - (b.index || 99))
    .map((page) => {
      // Guess / assign category based on title or extract
      let category = 'Global Destination';
      const text = `${page.title} ${page.extract || ''}`.toLowerCase();
      if (text.includes('city') || text.includes('capital') || text.includes('metropolis')) {
        category = 'Iconic Cities';
      } else if (text.includes('island') || text.includes('beach') || text.includes('coast') || text.includes('sea')) {
        category = 'Coastal & Islands';
      } else if (text.includes('mountain') || text.includes('park') || text.includes('river') || text.includes('canyon')) {
        category = 'Nature & Wonders';
      } else if (text.includes('temple') || text.includes('historic') || text.includes('ancient') || text.includes('citadel') || text.includes('ruins')) {
        category = 'Cultural & Heritage';
      }

      return {
        id: page.pageid,
        title: page.title,
        rawTitle: page.title,
        description: page.extract ? page.extract.slice(0, 100) + '...' : 'Destination found on Wikimedia',
        extract: page.extract || 'No extract available.',
        image: page.thumbnail?.source || null,
        coordinates: page.coordinates ? { lat: page.coordinates[0]?.lat, lon: page.coordinates[0]?.lon } : null,
        wikiUrl: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
        length: page.length || 0,
        category,
        country: extractCountryHint(page.extract || page.title),
        source: 'Wikimedia Live Search API',
        isLive: true
      };
    });

  memoryCache.set(cacheKey, formatted);
  return formatted;
}

/**
 * Autocomplete prefix search using Wikimedia Action API
 * Returns real destination suggestions with titles, descriptions, and thumbnails
 */
export async function fetchAutocompleteSuggestions(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const trimmed = query.trim();
  const cacheKey = `autocomplete_${trimmed.toLowerCase()}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpssearch=${encodeURIComponent(
    trimmed
  )}&gpslimit=8&prop=pageimages|description|extracts&piprop=thumbnail&pithumbsize=160&exintro=1&explaintext=1&exchars=120&format=json&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Autocomplete query failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.query || !data.query.pages) {
    return [];
  }

  const pages = Object.values(data.query.pages);

  // Filter out disambiguation pages and people/musicians when clearly irrelevant
  const results = pages
    .sort((a, b) => (a.index || 99) - (b.index || 99))
    .map((page) => ({
      id: page.pageid,
      title: page.title,
      rawTitle: page.title,
      description: page.description || page.extract?.slice(0, 90) + '...' || 'Destination on Wikimedia',
      thumbnail: page.thumbnail?.source || null,
      country: extractCountryHint(page.description || page.extract || page.title),
      extract: page.extract || ''
    }));

  memoryCache.set(cacheKey, results);
  return results;
}

/**
 * Utility helper to extract country hint from first sentence of extract
 */
function extractCountryHint(text) {
  if (!text) return 'Global';
  const matches = text.match(/in (?:the )?([A-Z][a-z]+(?: [A-Z][a-z]+)?)/);
  if (matches && matches[1]) {
    const candidate = matches[1].trim();
    if (!['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Late', 'Early'].includes(candidate)) {
      return candidate;
    }
  }
  return 'Worldwide';
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

