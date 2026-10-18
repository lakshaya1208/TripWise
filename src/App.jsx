import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ExplorePage from './pages/ExplorePage';
import MyTripPage from './pages/MyTripPage';
import { getSavedItinerary, saveItinerary, clearSavedItinerary } from './utils/storage';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [savedItinerary, setSavedItinerary] = useState(() => getSavedItinerary());
  const [toast, setToast] = useState(null);

  // Sync to localStorage whenever savedItinerary changes
  useEffect(() => {
    saveItinerary(savedItinerary);
  }, [savedItinerary]);

  // Show Toast notification helper
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((current) => (current && current.message === message ? null : current));
    }, 3800);
  };

  // Add Destination to Itinerary with duplicate check
  const handleAddToTrip = (destination) => {
    if (!destination) return;

    const exists = savedItinerary.some((item) => item.id === destination.id);
    if (exists) {
      showToast('info', `"${destination.title}" is already in your itinerary!`);
      return;
    }

    const newItem = {
      ...destination,
      addedAt: new Date().toISOString(),
      customNotes: '',
    };

    const updated = [...savedItinerary, newItem];
    setSavedItinerary(updated);
    showToast('success', `Added "${destination.title}" to your itinerary!`);
  };

  // Remove Destination from Itinerary
  const handleRemoveFromTrip = (destinationId) => {
    const item = savedItinerary.find((d) => d.id === destinationId);
    const updated = savedItinerary.filter((d) => d.id !== destinationId);
    setSavedItinerary(updated);
    showToast('info', `Removed "${item?.title || 'Destination'}" from itinerary.`);
  };

  // Clear entire itinerary
  const handleClearAll = () => {
    setSavedItinerary([]);
    clearSavedItinerary();
    showToast('info', 'Your trip itinerary has been cleared.');
  };

  // Reorder or update itinerary
  const handleUpdateItinerary = (updatedList) => {
    setSavedItinerary(updatedList);
  };

  return (
    <div className="app-root">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={savedItinerary.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'explore' ? (
          <ExplorePage
            savedItinerary={savedItinerary}
            onAddToTrip={handleAddToTrip}
            onGoToTrip={() => setActiveTab('mytrip')}
          />
        ) : (
          <MyTripPage
            savedItinerary={savedItinerary}
            onRemoveFromTrip={handleRemoveFromTrip}
            onClearAll={handleClearAll}
            onUpdateItinerary={handleUpdateItinerary}
            onGoToExplore={() => setActiveTab('explore')}
            showToast={showToast}
          />
        )}
      </main>

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <Footer
        onGoToExplore={() => {
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToTrip={() => {
          setActiveTab('mytrip');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
