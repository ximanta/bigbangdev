import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import CelestialBodyProfile from '../components/CelestialBodyProfile';
import NotFound from '../components/NotFound';
import { solarSystemBodies } from '../data/solarSystemData';

function DetailPage() {
  const { id } = useParams();
  const [body, setBody] = useState(null);

  useEffect(() => {
    const foundBody = solarSystemBodies.find(b => b.id === id);
    setBody(foundBody);
  }, [id]);

  if (!body) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <div className="detail-page">
        <div className="detail-header">
          <Link to="/" className="button">
            <ArrowLeft size={20} />
            Back to Solar System
          </Link>
          <h1>{body.name}</h1>
        </div>
        <CelestialBodyProfile body={body} />
      </div>
    </>
  );
}

export default DetailPage;