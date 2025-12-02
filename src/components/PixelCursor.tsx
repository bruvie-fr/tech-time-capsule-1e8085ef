import { useEffect, useState } from "react";

const PixelCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail particle
      setTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: trailId++ }
      ]);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Fade out trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] w-2 h-2 bg-primary/40 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
      
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none z-[10000] transition-transform duration-75 ${
          clicking ? "scale-75" : "scale-100"
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {/* Pixel cursor shape */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          className="drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]"
          style={{ marginLeft: -2, marginTop: -2 }}
        >
          <path
            d="M4 4 L4 20 L8 16 L12 22 L14 20 L10 14 L16 14 Z"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="1"
          />
        </svg>
      </div>
    </>
  );
};

export default PixelCursor;