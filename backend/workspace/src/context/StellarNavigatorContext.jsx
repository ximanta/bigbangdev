import React, { createContext, useState, useContext, useEffect } from 'react';
import celestialBodiesData from '../data/celestialBodies';

const StellarNavigatorContext = createContext();

export const StellarNavigatorProvider = ({ children }) => {
  const [selectedBodyId, setSelectedBodyId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const localFavorites = localStorage.getItem('stellarNavigatorFavorites');
      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [timeWarpSpeed, setTimeWarpSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    try {
      const onboardingStatus = localStorage.getItem('stellarNavigatorOnboardingComplete');
      return onboardingStatus ? JSON.parse(onboardingStatus) : false;
    } catch (error) {
      console.error('Failed to parse onboarding status from localStorage', error);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('stellarNavigatorFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('stellarNavigatorOnboardingComplete', JSON.stringify(onboardingComplete));
  }, [onboardingComplete]);

  const selectedBody = celestialBodiesData.find(body => body.id === selectedBodyId);

  const toggleFavorite = (bodyId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(bodyId)) {
        return prevFavorites.filter(id => id !== bodyId);
      }
      return [...prevFavorites, bodyId];
    });
  };

  const isFavorite = (bodyId) => {
    return favorites.includes(bodyId);
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  const value = {
    selectedBodyId,
    setSelectedBodyId,
    selectedBody,
    favorites,
    toggleFavorite,
    isFavorite,
    searchQuery,
    setSearchQuery,
    timeWarpSpeed,
    setTimeWarpSpeed,
    loading,
    setLoading,
    onboardingComplete,
    completeOnboarding
  };

  return (
    <StellarNavigatorContext.Provider value={value}>
      {children}
    </StellarNavigatorContext.Provider>
  );
};

export const useStellarNavigator = () => {
  const context = useContext(StellarNavigatorContext);
  if (context === undefined) {
    throw new Error('useStellarNavigator must be used within a StellarNavigatorProvider');
  }
  return context;
};