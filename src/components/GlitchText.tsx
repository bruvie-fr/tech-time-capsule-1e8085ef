import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const GlitchText = ({ text, className = "", glitchOnHover = true }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789";

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === " ") return " ";
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );

      iterations += text.length / maxIterations;

      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isGlitching, text]);

  // Random glitch effect
  useEffect(() => {
    const randomGlitch = () => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
    };

    const interval = setInterval(randomGlitch, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`${className} relative`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {displayText}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-red-500/50"
            style={{ transform: "translate(-2px, 0)" }}
            aria-hidden
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 text-cyan-500/50"
            style={{ transform: "translate(2px, 0)" }}
            aria-hidden
          >
            {displayText}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;