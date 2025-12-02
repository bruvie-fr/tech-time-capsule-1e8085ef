import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

const SECRETS = [
  { code: "matrix", message: "🟢 You've entered the Matrix!" },
  { code: "1927", message: "⚙️ The year computing began!" },
  { code: "ada", message: "👩‍💻 Ada Lovelace - First programmer!" },
  { code: "bug", message: "🪲 The first bug was a real moth!" },
];

const EasterEggs = () => {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [matrixMode, setMatrixMode] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  const [secretsFound, setSecretsFound] = useState<string[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; char: string }>>([]);

  // Konami code detector
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    // Check konami code
    if (key === KONAMI_CODE[konamiProgress]) {
      const newProgress = konamiProgress + 1;
      setKonamiProgress(newProgress);
      
      if (newProgress === KONAMI_CODE.length) {
        setMatrixMode(true);
        toast.success("🎮 KONAMI CODE ACTIVATED!", {
          description: "You've unlocked Matrix Mode!",
          duration: 5000,
        });
        setKonamiProgress(0);
        
        // Auto disable after 10 seconds
        setTimeout(() => setMatrixMode(false), 10000);
      }
    } else {
      setKonamiProgress(key === KONAMI_CODE[0] ? 1 : 0);
    }

    // Secret word detector
    if (key.length === 1) {
      const newTyped = (typedKeys + key.toLowerCase()).slice(-10);
      setTypedKeys(newTyped);
      
      SECRETS.forEach(secret => {
        if (newTyped.includes(secret.code) && !secretsFound.includes(secret.code)) {
          setSecretsFound(prev => [...prev, secret.code]);
          toast.success(secret.message, { duration: 3000 });
        }
      });
    }
  }, [konamiProgress, typedKeys, secretsFound]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Matrix effect
  useEffect(() => {
    if (!matrixMode) {
      setParticles([]);
      return;
    }

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    let id = 0;

    const interval = setInterval(() => {
      const newParticle = {
        id: id++,
        x: Math.random() * 100,
        y: -10,
        char: chars[Math.floor(Math.random() * chars.length)],
      };
      
      setParticles(prev => [...prev.slice(-100), newParticle]);
    }, 50);

    return () => clearInterval(interval);
  }, [matrixMode]);

  // Animate particles
  useEffect(() => {
    if (!matrixMode || particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, y: p.y + 2 }))
          .filter(p => p.y < 110)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [matrixMode, particles.length]);

  // Secret click counter on logo
  useEffect(() => {
    let clicks = 0;
    let timer: NodeJS.Timeout;

    const handleSecretClick = () => {
      clicks++;
      clearTimeout(timer);
      
      if (clicks === 7) {
        toast.success("🔓 Secret Developer Mode", {
          description: "You found a hidden feature! Try typing 'matrix' or 'ada'",
          duration: 5000,
        });
        clicks = 0;
      } else {
        timer = setTimeout(() => { clicks = 0; }, 2000);
      }
    };

    const heroTitle = document.querySelector("h1");
    heroTitle?.addEventListener("click", handleSecretClick);
    
    return () => heroTitle?.removeEventListener("click", handleSecretClick);
  }, []);

  if (!matrixMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/80">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute text-green-400 font-mono text-lg animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            textShadow: "0 0 10px #00ff00",
          }}
        >
          {p.char}
        </span>
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-green-400 font-mono text-2xl mb-4 animate-pulse">
          MATRIX MODE ACTIVATED
        </p>
        <p className="text-green-400/60 font-mono text-sm">
          Auto-deactivating in 10 seconds...
        </p>
      </div>
    </div>
  );
};

export default EasterEggs;