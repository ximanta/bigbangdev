import { useRef, useEffect, useState } from 'react';
import { solarSystemBodies } from '../data/solarSystemData';
import { Search } from 'lucide-react';

const AU_SCALING_FACTOR = 15; // Pixels per AU, adjust for canvas size
const SUN_RADIUS = 20;
const PLANET_RADIUS = 5;

function InteractiveModelPage() {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const planets = solarSystemBodies.filter(
    (body) => body.type === 'planet' && body.orbitalPosition !== undefined
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions (responsive aspect ratio)
    const parent = canvas.parentElement;
    const size = Math.min(parent.clientWidth, 600); // Max 600px
    canvas.width = size;
    canvas.height = size;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Apply transformations
      ctx.translate(centerX + offsetX, centerY + offsetY);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);

      // Draw Sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, SUN_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'gold';
      ctx.fill();
      ctx.closePath();

      // Draw planets and orbits
      planets.forEach((planet) => {
        const orbitRadius = planet.orbitalPosition * AU_SCALING_FACTOR;

        // Draw orbit
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
        ctx.closePath();

        // Simulate planet position (simplified, just for visual)
        // A simple animation could be added here with requestAnimationFrame
        const angle = (Date.now() / 100000) * (1 / planet.orbitalPosition); // Slower for outer planets
        const planetX = centerX + orbitRadius * Math.cos(angle);
        const planetY = centerY + orbitRadius * Math.sin(angle);

        // Draw planet
        ctx.beginPath();
        ctx.arc(planetX, planetY, PLANET_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'lightblue'; // Placeholder color
        ctx.fill();
        ctx.closePath();
      });

      ctx.restore();
    };

    let animationFrameId;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scale, offsetX, offsetY, planets]);

  const handleZoom = (event) => {
    event.preventDefault();
    const newScale = event.deltaY < 0 ? scale * 1.1 : scale / 1.1;
    setScale(Math.max(0.1, Math.min(newScale, 5))); // Limit zoom levels
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setLastX(event.clientX);
    setLastY(event.clientY);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    setOffsetX(prev => prev + dx);
    setOffsetY(prev => prev + dy);
    setLastX(event.clientX);
    setLastY(event.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      setIsDragging(true);
      setLastX(event.touches[0].clientX);
      setLastY(event.touches[0].clientY);
    }
  };

  const handleTouchMove = (event) => {
    if (!isDragging || event.touches.length !== 1) return;
    const dx = event.touches[0].clientX - lastX;
    const dy = event.touches[0].clientY - lastY;
    setOffsetX(prev => prev + dx);
    setOffsetY(prev => prev + dy);
    setLastX(event.touches[0].clientX);
    setLastY(event.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="interactive-model-page">
      <h2>Solar System 2D Model</h2>
      <p>Drag to pan, scroll to zoom.</p>
      <canvas
        ref={canvasRef}
        className="model-canvas"
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // End drag if mouse leaves canvas
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="model-controls">
        <button onClick={() => setScale(prev => Math.max(0.1, prev / 1.2))} className="button">Zoom Out</button>
        <button onClick={() => setScale(prev => Math.min(5, prev * 1.2))} className="button">Zoom In</button>
        <button onClick={() => { setScale(1); setOffsetX(0); setOffsetY(0); }} className="button">Reset View</button>
      </div>
    </div>
  );
}

export default InteractiveModelPage;
