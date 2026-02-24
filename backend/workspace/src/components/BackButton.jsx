import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      <ChevronLeft size={20} />
      Back
    </button>
  );
}

export default BackButton;
