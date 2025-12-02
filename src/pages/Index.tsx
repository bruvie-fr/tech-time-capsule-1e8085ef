import { useState } from "react";
import Hero from "@/components/Hero";
import DecadeNav from "@/components/DecadeNav";
import DecadeSection from "@/components/DecadeSection";
import TimelineCard from "@/components/TimelineCard";
import Footer from "@/components/Footer";
import RetroTerminal from "@/components/RetroTerminal";
import EasterEggs from "@/components/EasterEggs";
import PixelCursor from "@/components/PixelCursor";

const timelineData = {
  "1920s": [
    {
      year: 1927,
      title: "The Differential Analyzer",
      description:
        "The first analog computer ever created, designed to solve complex ballistic calculations using integration. This revolutionary machine used glass discs and metal wheels to perform mathematical operations, producing outputs by drawing answers on paper.",
      creator: "Vannevar Bush",
      significance:
        "This was the very first computer ever made, paving the way for all future computing machines. It used punch cards for data input/output and consisted of shafts, gears, and wheels.",
      source: "Britannica & MIT",
    },
  ],
  "1930s": [
    {
      year: 1939,
      title: "Elektro: The First Robot",
      description:
        "A groundbreaking humanoid robot that responded to voice commands through rhythm recognition. Elektro could move its head and arms, deliver pre-recorded jokes on 78 rpm records, and even 'smoke' cigarettes for entertainment.",
      creator: "Westinghouse Electric",
      significance:
        "Demonstrated at the World's Fair, this was the first major use of computing technology for entertainment purposes, showcasing the potential of intelligent machines.",
      source: "Computer History Museum",
    },
    {
      year: 1939,
      title: "Hewlett-Packard Founded",
      description:
        "The birth of one of the greatest tech companies began with the HP 200A Audio Oscillator. This precision piece of test equipment rapidly gained popularity among engineers for its accuracy and reliability.",
      creator: "Bill Hewlett & Dave Packard",
      significance:
        "Walt Disney ordered 8 units to test recording equipment and speaker systems for Fantasia. This marked the beginning of HP's journey to becoming a tech giant.",
      source: "Computer History Museum",
    },
  ],
  "1940s": [
    {
      year: 1940,
      title: "Complex Number Calculator",
      description:
        "Bell Telephone Laboratories created a revolutionary device capable of calculating complex mathematical problems remotely using telephone lines. It was demonstrated at an American Mathematical Society conference at Dartmouth College.",
      creator: "George Stibitz",
      significance:
        "This was the first device to be operated remotely, introducing the foundational concepts of remote access and server architecture that power our internet today.",
      source: "Computer History Museum",
    },
    {
      year: 1944,
      title: "Harvard Mark I",
      description:
        "A massive relay-based calculator spanning an entire room, featuring a fifty-foot long camshaft that synchronized thousands of mechanical components. The crankshaft ran the length of the machine to keep all parts in perfect sync.",
      creator: "IBM & Harvard University",
      significance:
        "The first automatic calculator ever built. While it mainly produced mathematical tables, it represented a quantum leap in computational capability before being superseded by electronic stored-program computers.",
      source: "Computer History Museum",
    },
  ],
  "1950s": [
    {
      year: 1950,
      title: "ERA 1101 Computer",
      description:
        "Built by Remington-Rand for high-speed computing applications, this machine could store 1 million bits of data (approximately 0.125 MB by today's standards). Its first customer was the US Navy.",
      creator: "Remington-Rand",
      significance:
        "Represented a major advancement in storage capacity and processing speed, demonstrating that computers could handle serious military and scientific applications.",
      source: "Computer History Museum",
    },
    {
      year: 1959,
      title: "The Birth of Hyperlinks",
      description:
        "Visionaries Ted Nelson and Douglas Engelbart independently proposed computerizing the concept of cross-references—what we now call hyperlinks. This laid the foundation for how we navigate information today.",
      creator: "Ted Nelson & Douglas Engelbart",
      significance:
        "This concept became the backbone of the World Wide Web. Without links, the internet as we know it simply wouldn't exist. Every click you make traces back to this fundamental idea.",
      source: "Computer History Museum",
    },
  ],
};

const Index = () => {
  const [pixelCursor, setPixelCursor] = useState(false);

  return (
    <main className={`min-h-screen bg-background scanline ${pixelCursor ? 'pixel-cursor-active' : ''}`}>
      <EasterEggs />
      {pixelCursor && <PixelCursor />}
      
      {/* Retro cursor toggle */}
      <button
        onClick={() => setPixelCursor(!pixelCursor)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 glass rounded-lg font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
        title="Toggle retro cursor"
      >
        {pixelCursor ? "🖱️ Normal" : "👾 Retro"}
      </button>
      
      <Hero />
      <DecadeNav />

      <div id="timeline" className="relative">
        <DecadeSection
          id="1920s"
          decade="1920s"
          subtitle="The Mechanical Pioneers"
        >
          {timelineData["1920s"].map((item, index) => (
            <TimelineCard key={item.year} {...item} index={index} />
          ))}
        </DecadeSection>

        <DecadeSection
          id="1930s"
          decade="1930s"
          subtitle="Innovation Takes Shape"
        >
          {timelineData["1930s"].map((item, index) => (
            <TimelineCard key={item.year + item.title} {...item} index={index} />
          ))}
        </DecadeSection>

        <DecadeSection
          id="1940s"
          decade="1940s"
          subtitle="The War-Time Revolution"
        >
          {timelineData["1940s"].map((item, index) => (
            <TimelineCard key={item.year + item.title} {...item} index={index} />
          ))}
        </DecadeSection>

        <DecadeSection
          id="1950s"
          decade="1950s"
          subtitle="Dawn of the Digital Age"
        >
          {timelineData["1950s"].map((item, index) => (
            <TimelineCard key={item.year + item.title} {...item} index={index} />
          ))}
        </DecadeSection>
      </div>

      <RetroTerminal />
      
      <Footer />
    </main>
  );
};

export default Index;
