import { Terminal, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Terminal-style message */}
        <div className="glass rounded-lg p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-primary">END_OF_TIMELINE</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            The journey continues beyond 1959...
            <br />
            <span className="text-accent">The digital revolution is just beginning.</span>
          </p>
        </div>

        {/* Credits */}
        <p className="font-mono text-xs text-muted-foreground/60 flex items-center justify-center gap-2">
          Made with <Heart className="w-3 h-3 text-destructive" /> for the history of computing
        </p>

        <p className="font-mono text-xs text-muted-foreground/40 mt-4">
          Sources: Britannica, MIT, Computer History Museum
        </p>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
