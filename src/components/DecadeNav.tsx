import { useState, useEffect } from "react";

const decades = [
  { id: "1920s", label: "1920s", year: 1920 },
  { id: "1930s", label: "1930s", year: 1930 },
  { id: "1940s", label: "1940s", year: 1940 },
  { id: "1950s", label: "1950s", year: 1950 },
];

const DecadeNav = () => {
  const [activeDecade, setActiveDecade] = useState("1920s");

  useEffect(() => {
    const handleScroll = () => {
      const sections = decades.map((d) => document.getElementById(d.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveDecade(decades[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop navigation - right side */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          {decades.map((decade) => (
            <a
              key={decade.id}
              href={`#${decade.id}`}
              className="group relative flex items-center"
            >
              {/* Tooltip */}
              <span className="absolute right-full mr-4 px-3 py-1 font-mono text-sm glass rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {decade.label}
              </span>
              
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeDecade === decade.id
                    ? "bg-primary border-primary glow-primary scale-125"
                    : "bg-transparent border-muted-foreground/50 hover:border-primary"
                }`}
              />
            </a>
          ))}
          
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 w-px bg-border/50 -z-10" style={{ left: "calc(50% - 0.5px)" }} />
        </div>
      </nav>

      {/* Mobile navigation - bottom bar */}
      <nav className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div className="flex items-center gap-1 glass rounded-full px-2 py-2">
          {decades.map((decade) => (
            <a
              key={decade.id}
              href={`#${decade.id}`}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-300 ${
                activeDecade === decade.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {decade.label.slice(0, 4)}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default DecadeNav;
