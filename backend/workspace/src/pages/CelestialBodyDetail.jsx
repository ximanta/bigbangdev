import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { solarSystemBodies } from '../data/solarSystemData';
import ImageCarousel from '../components/ImageCarousel';
import FactTable from '../components/FactTable';
import ExpandableSection from '../components/ExpandableSection';
import LoadingIndicator from '../components/LoadingIndicator';
import BackButton from '../components/BackButton';
import ShareButton from '../components/ShareButton';

function CelestialBodyDetail() {
  const { id } = useParams();
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundBody = solarSystemBodies.find((b) => b.id === id);
      setBody(foundBody);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (!body) {
    return <div className="text-center">Celestial body not found.</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-header">
        <BackButton />
        <h2>{body.name}</h2>
      </div>

      <ImageCarousel images={body.images} altText={body.name} />

      <ExpandableSection title="Description" defaultExpanded={true}>
        <p>{body.description}</p>
      </ExpandableSection>

      <FactTable facts={body.facts} />

      <div className="detail-actions">
        <ShareButton
          title={`Solar System Explorer - ${body.name}`}
          text={`Learn about ${body.name} in the Solar System Explorer app!`}
          url={window.location.href}
        />
      </div>
    </div>
  );
}

export default CelestialBodyDetail;
