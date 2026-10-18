# TripWise — Smart Travel Planner

[![AWS Student Builder Group](https://img.shields.io/badge/AWS%20SBG-VIT%20Chennai-0284c7.svg?style=flat-square)](https://vit.ac.in)
[![Track](https://img.shields.io/badge/Track-Frontend%20Development-f43f5e.svg?style=flat-square)]()
[![Framework](https://img.shields.io/badge/Framework-React%2019%20%2B%20Vite-38bdf8.svg?style=flat-square)](https://vitejs.dev)
[![API](https://img.shields.io/badge/API-Wikimedia%20MediaWiki%20API-10b981.svg?style=flat-square)](https://www.mediawiki.org/wiki/API:Main_page)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

**TripWise** is a modern, responsive single-page travel planning web application built for the **AWS Student Builder Group (SBG), VIT Chennai Web Development Recruitment Task**.

It empowers travelers to explore authentic destinations worldwide powered by real-time **Wikimedia & Wikipedia MediaWiki APIs**, search any place on Earth with instant feedback, curate day-by-day itineraries with notes, and persist their travel plans seamlessly in the browser.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Design Inspiration & Architecture](#design-inspiration--architecture)
- [Key Features](#key-features)
  - [1. Explore & Destination Discovery](#1-explore--destination-discovery)
  - [2. Destination Details Modal](#2-destination-details-modal)
  - [3. My Trip Itinerary Planner](#3-my-trip-itinerary-planner)
  - [4. Error, Loading & Edge Cases](#4-error-loading--edge-cases)
- [Technology Stack](#technology-stack)
- [External API Integration Details](#external-api-integration-details)
- [Project Structure](#project-structure)
- [Setup & Running Locally](#setup--running-locally)
- [Deployment Instructions](#deployment-instructions)
- [Recruitment Submission Deliverables](#recruitment-submission-deliverables)

---

## Project Overview

- **Applicant / Author:** Lakshaya B K (`lakshaya1208`)
- **Institution:** VIT Chennai
- **Track:** Frontend Development
- **Task Scope:** Build a frontend-only travel planning application with real public API integration, resilient storage, and a cohesive design system without any backend or mock data.

---

## Design Inspiration & Architecture

TripWise synthesizes four distinct reference design aesthetics into one unified, elegant system:

- **Design 6 (Discovery Layout):** Clean destination discovery hierarchy, prominent hero search bar, trending query pills, and category filters.
- **Design 10 (Atmospheric Photography & Dark Overlays):** Deep atmospheric dark backgrounds (`#070b12`, `#0f172a`), tailored card gradients, and immersive imagery.
- **Design 4 (Subtle Glassmorphism & Color Palette):** Frosted glass panels (`backdrop-filter: blur(16px)`), oceanic sky-blue accents (`#0284c7`, `#38bdf8`), and restrained rose-pink accents (`#f43f5e`, `#fb7185`).
- **Design 5 (Organized Trip Management):** Structured itinerary cards with chronological day sequencing (Day 1, Day 2...), inline notes, reordering controls, and clear metrics.

Typography leverages Google Fonts:
- **Headings & Display:** `Outfit` (geometric, modern, inviting)
- **Body & Controls:** `Inter` (neutral, legible, accessible contrast)

---

## Key Features

### 1. Explore & Destination Discovery
- **Hero Section:** Prominent search bar with trending query pills (*Kyoto, Santorini, Swiss Alps, Machu Picchu, Tokyo, Banff*).
- **Live Wikimedia Cards:** Each destination card features authentic photographs, geographic classification, coordinates, and synopsis.
- **Category Filtering:** Filter across *All Destinations, Iconic Cities, Nature & Wonders, Cultural & Heritage, Coastal & Islands*.
- **Working Multi-criteria Sorting:**
  - *Featured / Recommended* (Curated balance)
  - *Name (A to Z)*
  - *Name (Z to A)*
  - *Article Depth (Extract Length)*
  - *Latitude (North to South)*
- **Live Search Worldwide:** Direct search across the entire global Wikimedia encyclopedia with debounced queries.

### 2. Destination Details Modal
- Triggered by clicking any destination card or the "Details" button.
- Displays high-resolution imagery, exact coordinates, classification badge, data provenance, and Wikipedia article extract.
- Provides a direct link to the original Wikipedia article.
- Duplicate-safe **"Add to My Trip"** action: automatically indicates if the item is already saved and prevents redundant entries.

### 3. My Trip Itinerary Planner
- **Chronological Day Sequences:** Automatically assigns Day 1, Day 2, etc.
- **Reordering Controls:** Move destinations Up or Down to rearrange travel order.
- **Inline Custom Notes:** Add specific travel notes (e.g., *"Visit Kinkaku-ji at sunrise"*, *"Reserve bullet train"*) saved per stop.
- **Trip Metrics:** Displays total planned stops and unique countries covered.
- **Export Itinerary:** Export complete itinerary plan as a downloadable text file.
- **Safe Persistence:** Managed via `localStorage` with corrupted-data schema validation and automatic fallback protection.

### 4. Error, Loading & Edge Cases
- **Loading Skeletons:** Animated shimmering skeletons during initial data fetch and search operations.
- **Resilient Error State:** Clean error screen with a **Retry Live Request** button if the user is offline or the API encounters network constraints.
- **Empty State Views:** Dedicated empty states for unmatched search queries and empty itineraries with direct navigation actions.
- **Image Fallbacks:** Gracefully falls back to high-resolution architectural travel photography if a Wikipedia article lacks thumbnail images.

---

## Technology Stack

- **Framework:** React 19 + Vite 8
- **Language:** JavaScript (ESNext / JSX)
- **Styling:** Modern Vanilla CSS with CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, and Glassmorphism (no bulky UI frameworks)
- **Icons:** Lucide React
- **Storage:** Browser `localStorage` with fail-safe validation
- **Automation / Testing:** Puppeteer Core + Headless Google Chrome

---

## External API Integration Details

TripWise uses **100% genuine, live Wikimedia & Wikipedia public APIs**:

1. **Wikipedia REST API Summary Endpoint:**
   - **URL:** `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
   - **Purpose:** Fetches high-resolution images, descriptive extracts, coordinates, and canonical URLs for curated destinations.
   - **Authentication:** Public / No secret keys required.

2. **Wikimedia Action Search API:**
   - **URL:** `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={query}&gsrlimit=15&prop=pageimages|extracts|coordinates|info&piprop=thumbnail&pithumbsize=800&exintro=1&explaintext=1&exchars=260&inprop=url&format=json&origin=*`
   - **Purpose:** Powers real-time global destination search with CORS enabled via `origin=*`.

---

## Project Structure

```
AWS/
├── screenshots/                     # Verified submission screenshots
│   ├── 01_explore_view.png          # Explore page with live Wikimedia destinations
│   ├── 02_search_and_filter.png     # Search & category filter view
│   ├── 03_destination_details_modal.png # Destination details modal
│   ├── 04_my_trip_populated.png     # Populated itinerary with notes & reordering
│   ├── 05_my_trip_empty_state.png   # Itinerary empty state
│   └── 06_mobile_explore_view.png   # Mobile responsive view (iPhone viewport)
├── scripts/
│   └── capture_screenshots.js      # Headless Chrome automation & PDF generator
├── src/
│   ├── components/
│   │   ├── DestinationCard.jsx     # Card component with dark overlay & fallbacks
│   │   ├── DestinationModal.jsx    # Full modal with Wikipedia metadata
│   │   ├── EmptyState.jsx          # Contextual empty search/itinerary states
│   │   ├── ErrorState.jsx          # Network error screen with retry action
│   │   ├── Footer.jsx              # Footer with recruitment & API attribution
│   │   ├── Hero.jsx                # Prominent search & trending query tags
│   │   ├── LoadingSkeleton.jsx     # Shimmer skeleton loading cards
│   │   ├── Navbar.jsx              # Responsive header with live API status & badge
│   │   ├── SearchFilters.jsx       # Category pills & multi-criteria sort
│   │   └── Toast.jsx               # Floating toast notifications
│   ├── pages/
│   │   ├── ExplorePage.jsx         # Destination discovery page
│   │   └── MyTripPage.jsx          # Itinerary manager page
│   ├── services/
│   │   └── wikimediaApi.js         # Real Wikimedia REST & Action API client
│   ├── utils/
│   │   └── storage.js              # Safe localStorage manager with validation
│   ├── App.css                     # Responsive breakpoints & layout
│   ├── App.jsx                     # Root application state & navigation
│   ├── index.css                   # Coherent design system & tokens
│   └── main.jsx                    # React 19 entrypoint
├── index.html                      # HTML5 template with Google Fonts
├── package.json                    # Dependencies & build scripts
├── TripWise_Submission_Screenshots.pdf # Compiled submission screenshots PDF
└── vite.config.js                  # Vite configuration
```

---

## Setup & Running Locally

### Prerequisites
- Node.js `v18.0.0` or later (tested on `v24.20.0`)
- npm `v9.0.0` or later

### Installation

```bash
# 1. Clone repository
git clone https://github.com/<username>/TripWise.git
cd TripWise

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and import the repository.
3. Keep default settings (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
4. Click **Deploy**.

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/) and select **Import an existing project**.
2. Connect your GitHub repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy Site**.

---

## Recruitment Submission Deliverables

1. **Source Code:** Public GitHub repository.
2. **Screenshots PDF:** [`TripWise_Submission_Screenshots.pdf`](./TripWise_Submission_Screenshots.pdf) in the project root.
3. **High-Resolution Screenshots:** Located in [`screenshots/`](./screenshots/).
4. **Live Deployment:** Production build verified ready for instant hosting.
