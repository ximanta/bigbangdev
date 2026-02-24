import { Share2 } from 'lucide-react';

function ShareButton({ title, text, url }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || 'Solar System Explorer',
        text: text || 'Check out this celestial body!',
        url: url || window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      alert(`Share this link: ${url || window.location.href}
${text || ''}`);
      console.log('Web Share API not supported.');
    }
  };

  return (
    <button onClick={handleShare} className="button button-secondary">
      <Share2 size={20} />
      Share
    </button>
  );
}

export default ShareButton;
