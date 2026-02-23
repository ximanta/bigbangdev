import React, { useEffect } from 'react';
import ThreeDView from '../components/ThreeDView.jsx';
import InformationPanel from '../components/InformationPanel.jsx';
import TimeWarpSlider from '../components/TimeWarpSlider.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import TooltipOverlay from '../components/TooltipOverlay.jsx';
import { useStellarNavigator } from '../context/StellarNavigatorContext.jsx';

function HomePage() {
  const { loading, setLoading, onboardingComplete } = useStellarNavigator();

  useEffect(() => {
    // Simulate loading for the home page
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="page-container home-page">
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <ThreeDView />
          <InformationPanel />
          <TimeWarpSlider />
          {!onboardingComplete && <TooltipOverlay />}
        </>
      )}
    </div>
  );
}

export default HomePage;