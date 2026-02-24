import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

function HomePage() {
  const navigate = useNavigate();

  // Redirect to /planets as the default landing page
  useEffect(() => {
    navigate('/planets', { replace: true });
  }, [navigate]);

  return (
    <div className="text-center mt-1">
      <LoadingIndicator />
      <p>Redirecting to Planets...</p>
    </div>
  );
}

export default HomePage;
