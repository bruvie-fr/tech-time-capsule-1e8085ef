import { useEffect, useRef, useState } from "react";
import { ExternalLink, Calendar, User, Cpu } from "lucide-react";

interface TimelineCardProps {
  year: number;
  title: string;
  description: string;
  source: string;
  creator?: string;
  significance?: string;
  index: number;
}

const TimelineCard = ({
  year,
  title,
  description,
  source,
  creator,
  significance,
  index,
}: TimelineCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center ${isEven ? "justify-start" : "justify-end"} mb-16 md:mb-24`}
    >
      {/* Timeline center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full glow-primary z-10 hidden md:block" />
      
      {/* Connector line */}
      <div
        className={`absolute top-1/2 h-px bg-gradient-to-r ${
          isEven ? "from-primary/50 to-transparent left-1/2 w-[calc(50%-2rem)]" : "from-transparent to-primary/50 right-1/2 w-[calc(50%-2rem)]"
        } hidden md:block`}
      />

      {/* Card */}
      <div
        className={`w-full md:w-[calc(50%-3rem)] transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"} translate-y-8`
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <article className="glass-hover rounded-xl p-6 md:p-8 group">
          {/* Year badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Calendar className="w-3 h-3 text-primary" />
            <span className="font-mono text-sm text-primary font-bold">{year}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 group-hover:text-gradient transition-all">
            {title}
          </h3>

          {/* Creator */}
          {creator && (
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <User className="w-4 h-4" />
              <span className="font-mono text-sm">{creator}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>

          {/* Significance */}
          {significance && (
            <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg mb-4">
              <Cpu className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">{significance}</p>
            </div>
          )}

          {/* Source */}
          <div className="flex items-center gap-2 text-muted-foreground/60 text-xs font-mono">
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{source}</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TimelineCard;
