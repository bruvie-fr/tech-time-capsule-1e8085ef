import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-pattern">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Terminal-style intro */}
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 opacity-0 animate-fade-up">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-sm text-muted-foreground tracking-wider">
            SYSTEM.INITIALIZE_HISTORY()
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-normal mb-6 opacity-0 animate-fade-up stagger-1">
          <span className="text-gradient">The Dawn of</span>
          <br />
          <span className="text-foreground">Computing</span>
        </h1>

        {/* Subtitle with typewriter effect */}
        <p className="font-mono text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 opacity-0 animate-fade-up stagger-2">
          A journey through the machines that shaped our digital world
        </p>

        {/* Year range */}
        <div className="flex items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up stagger-3">
          <span className="font-display text-4xl md:text-5xl text-primary">1920</span>
          <div className="w-24 h-px bg-gradient-to-r from-primary via-accent to-primary" />
          <span className="font-display text-4xl md:text-5xl text-primary">1959</span>
        </div>

        {/* Terminal text */}
        <div className="glass rounded-lg p-4 max-w-md mx-auto mb-16 opacity-0 animate-fade-up stagger-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
          </div>
          <p className="font-mono text-sm text-left text-muted-foreground">
            <span className="text-accent">$</span> exploring 4 decades of innovation
            <span className={`inline-block w-2 h-4 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        </div>

        {/* Scroll indicator */}
        <a
          href="#timeline"
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors opacity-0 animate-fade-up stagger-5"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Begin Journey</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
