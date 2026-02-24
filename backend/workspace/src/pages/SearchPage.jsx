import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { solarSystemBodies } from '../data/solarSystemData';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import BackButton from '../components/BackButton';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (query) {
        const filteredResults = solarSystemBodies.filter(
          (body) =>
            body.name.toLowerCase().includes(query.toLowerCase()) ||
            body.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-results-container">
      <div className="detail-header">
        <BackButton />
        <h2>Search Results for "{query}"</h2>
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {
            results.length > 0 ? (
              <div className="search-results-list">
                {
                  results.map((body) => (
                    <Card key={body.id} body={body} />
                  ))
                }
              </div>
            ) : (
              <p className="no-results">No results found for "{query}".</p>
            )
          }
        </>
      )}
    </div>
  );
}

export default SearchPage;
