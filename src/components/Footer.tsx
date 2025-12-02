import { Terminal, Heart, Cpu, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-20 border-t border-border/30">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Terminal-style message */}
        <div className="glass rounded-xl p-8 mb-12 max-w-lg mx-auto relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <Code className="w-16 h-16 text-primary" />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-mono text-sm text-primary tracking-wider">END_OF_TIMELINE</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            The journey continues beyond 1959...
          </p>
          <p className="font-mono text-sm text-accent mt-2">
            The digital revolution is just beginning.
          </p>
          
          {/* Blinking cursor */}
          <div className="mt-4 flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground/50">
            <span>_</span>
            <span className="w-2 h-4 bg-primary/50 animate-pulse" />
          </div>
        </div>

        {/* Stats/Features row */}
        <div className="flex items-center justify-center gap-8 mb-12 text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary/60" />
            <span className="font-mono text-xs">4 Decades</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent/60" />
            <span className="font-mono text-xs">7 Milestones</span>
          </div>
        </div>

        {/* Credits */}
        <p className="font-mono text-xs text-muted-foreground/50 flex items-center justify-center gap-2 mb-4">
          Made with <Heart className="w-3 h-3 text-destructive/70 animate-pulse" /> for the history of computing
        </p>

        <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider uppercase">
          Sources: Britannica • MIT • Computer History Museum
        </p>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-32 bg-accent/5 blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
