import { ReactNode, useEffect, useRef, useState } from "react";

interface DecadeSectionProps {
  id: string;
  decade: string;
  subtitle: string;
  children: ReactNode;
}

const DecadeSection = ({ id, decade, subtitle, children }: DecadeSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="relative py-24 md:py-32">
      {/* Decade header */}
      <div
        className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Large background decade number */}
        <div className="absolute left-1/2 -translate-x-1/2 font-display text-[12rem] md:text-[20rem] text-primary/5 pointer-events-none select-none leading-none -top-8">
          {decade.slice(0, 2)}
        </div>

        <h2 className="relative font-display text-5xl md:text-7xl text-gradient mb-4">
          {decade}
        </h2>
        <p className="relative font-mono text-muted-foreground tracking-wider uppercase text-sm">
          {subtitle}
        </p>

        {/* Decorative line */}
        <div className="relative w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
      </div>

      {/* Timeline content */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Center timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

        {children}
      </div>
    </section>
  );
};

export default DecadeSection;
