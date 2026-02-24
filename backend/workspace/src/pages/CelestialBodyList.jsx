import { useState, useEffect } from 'react';
import { solarSystemBodies } from '../data/solarSystemData';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';

function CelestialBodyList({ type, title }) {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      const filteredBodies = solarSystemBodies.filter(
        (body) => body.type === type || (type === 'planets' && body.type === 'planet')
      );
      setBodies(filteredBodies);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [type]);

  return (
    <div className="celestial-body-list-page">
      <h2>{title}</h2>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="celestial-body-list">
          {
            bodies.map((body) => (
              <Card key={body.id} body={body} />
            ))
          }
        </div>
      )}
      {
        !loading && bodies.length === 0 && (
          <p className="text-center">No {title.toLowerCase()} found.</p>
        )
      }
    </div>
  );
}

export default CelestialBodyList;
