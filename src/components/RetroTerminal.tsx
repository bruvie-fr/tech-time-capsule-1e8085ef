import { useState, useRef, useEffect } from "react";
import { Power, Volume2, VolumeX } from "lucide-react";

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  HELP     - Show this message
  DATE     - Display current date
  TIME     - Display current time
  CLS      - Clear screen
  VER      - Show version
  DIR      - List files
  RUN      - Run a program
  HISTORY  - Computing history facts
  ABOUT    - About this system
  BEEP     - System beep
  COLOR    - Change text color`,
  date: () => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  time: () => new Date().toLocaleTimeString(),
  ver: "RetroOS Version 1.0.1927 [Computing History Terminal]\n(C) 1927-1959 Historical Computing Initiative",
  dir: `Volume in drive C is HISTORY
 Directory of C:\\COMPUTING\\

 1927     DIR    The Differential Analyzer
 1939     DIR    Elektro Robot
 1939     DIR    Hewlett-Packard
 1940     DIR    Complex Number Calculator
 1944     DIR    Harvard Mark I
 1950     DIR    ERA 1101
 1959     DIR    Hyperlinks
        7 File(s)      1,024 bytes free`,
  about: `╔══════════════════════════════════════╗
║   COMPUTING HISTORY TERMINAL v1.0    ║
║                                      ║
║   Experience computing as it was     ║
║   in the early days of technology.   ║
║                                      ║
║   Type HELP for available commands   ║
╚══════════════════════════════════════╝`,
  run: "ERROR: Please specify a program to run.\nUsage: RUN <program_name>",
  history: () => {
    const facts = [
      "The first computer bug was an actual moth found in the Harvard Mark II in 1947.",
      "ENIAC could perform 5,000 additions per second - your phone does billions.",
      "The first hard drive (1956) held 5MB and weighed over 2,000 pounds.",
      "Alan Turing proposed the concept of AI in 1950 with his famous 'Turing Test'.",
      "The first mouse was made of wood by Douglas Engelbart in 1964.",
      "Grace Hopper invented the first compiler and popularized the term 'debugging'.",
      "The first computer programmer was Ada Lovelace in the 1840s.",
      "Early computers used punch cards that dated back to the 1800s textile industry.",
    ];
    return `COMPUTING FACT:\n\n${facts[Math.floor(Math.random() * facts.length)]}`;
  },
  cls: "CLEAR",
  beep: "BEEP",
  color: "Text color options: GREEN, AMBER, WHITE\nUsage: COLOR <color>",
};

const RetroTerminal = () => {
  const [isOn, setIsOn] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(false);
  const [textColor, setTextColor] = useState<"green" | "amber" | "white">("green");
  const [soundOn, setSoundOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const colorClasses = {
    green: "text-green-400",
    amber: "text-amber-400",
    white: "text-gray-100",
  };

  const glowClasses = {
    green: "shadow-[0_0_10px_rgba(74,222,128,0.5)]",
    amber: "shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    white: "shadow-[0_0_10px_rgba(255,255,255,0.3)]",
  };

  const playBeep = () => {
    if (!soundOn) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "square";
    gainNode.gain.value = 0.1;
    oscillator.start();
    setTimeout(() => oscillator.stop(), 100);
  };

  const bootUp = () => {
    setIsBooting(true);
    const bootMessages = [
      "BIOS Version 1.0",
      "Memory Test: 640K OK",
      "Checking system integrity...",
      "Loading RetroOS...",
      "Initializing display adapter...",
      "Loading computing history database...",
      "",
      "RetroOS Version 1.0.1927",
      "(C) Historical Computing Initiative",
      "",
      "Type HELP for available commands.",
      "",
    ];

    setBootSequence([]);
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setBootSequence((prev) => [...prev, msg]);
        if (i === bootMessages.length - 1) {
          setIsBooting(false);
        }
      }, i * 200);
    });
  };

  const handlePowerToggle = () => {
    if (!isOn) {
      setIsOn(true);
      playBeep();
      bootUp();
    } else {
      setIsOn(false);
      setHistory([]);
      setBootSequence([]);
    }
  };

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();
    const [mainCmd, ...args] = normalizedCmd.split(" ");

    playBeep();

    if (mainCmd === "cls") {
      setHistory([]);
      return;
    }

    if (mainCmd === "beep") {
      if (soundOn) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 440;
        oscillator.type = "square";
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 500);
      }
      setHistory((prev) => [...prev, { command: cmd, output: "BEEP!" }]);
      return;
    }

    if (mainCmd === "color" && args[0]) {
      const color = args[0] as "green" | "amber" | "white";
      if (["green", "amber", "white"].includes(color)) {
        setTextColor(color);
        setHistory((prev) => [...prev, { command: cmd, output: `Text color changed to ${color.toUpperCase()}` }]);
        return;
      }
    }

    if (mainCmd === "run" && args[0]) {
      const programs: Record<string, string> = {
        game: "Loading COMPUTING QUIZ...\n\nQ: What year was the first computer bug discovered?\n   (Hint: It was a real moth!)\n\n   Answer: 1947 in Harvard Mark II",
        matrix: "INITIATING MATRIX MODE...\n\n01001000 01100101 01101100 01101100 01101111\n\nDecoded: Hello, human.",
        fortune: `Your computing fortune:\n\n"${[
          "A bug in the code is worth two in the documentation.",
          "To err is human; to really foul things up requires a computer.",
          "There are only 10 types of people: those who understand binary and those who don't.",
          "Hardware: The parts of a computer that can be kicked.",
        ][Math.floor(Math.random() * 4)]}"`,
      };
      const output = programs[args[0]] || `Program '${args[0].toUpperCase()}' not found.\nAvailable: GAME, MATRIX, FORTUNE`;
      setHistory((prev) => [...prev, { command: cmd, output }]);
      return;
    }

    const commandHandler = COMMANDS[mainCmd];
    let output: string;

    if (commandHandler) {
      output = typeof commandHandler === "function" ? commandHandler() : commandHandler;
    } else {
      output = `Bad command or file name: '${mainCmd}'\nType HELP for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, bootSequence]);

  useEffect(() => {
    if (isOn && !isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOn, isBooting]);

  return (
    <section className="py-24 md:py-32 px-4 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center mb-16 relative">
        <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">Interactive Experience</span>
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
          Experience the <span className="text-gradient">Past</span>
        </h2>
        <p className="font-mono text-muted-foreground max-w-lg mx-auto">
          Interact with a simulated retro terminal from the early computing era. Type <span className="text-primary">HELP</span> to begin.
        </p>
      </div>

      {/* CRT Monitor Frame */}
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#2a2520] rounded-[40px] p-8 shadow-2xl">
          {/* Monitor bezel */}
          <div className="absolute inset-4 rounded-[30px] bg-gradient-to-b from-[#3d3830] to-[#1f1b17]" />
          
          {/* Screen area */}
          <div className="relative">
            <div
              className={`relative bg-[#0a0a0a] rounded-lg overflow-hidden transition-all duration-500 ${
                isOn ? glowClasses[textColor] : ""
              }`}
              style={{
                minHeight: "400px",
              }}
            >
              {/* CRT effects */}
              {isOn && (
                <>
                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        rgba(0,0,0,0.15),
                        rgba(0,0,0,0.15) 1px,
                        transparent 1px,
                        transparent 2px
                      )`,
                    }}
                  />
                  {/* Screen curvature glow */}
                  <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-radial from-transparent via-transparent to-black/30 rounded-lg" />
                  {/* Flicker effect */}
                  <div className="absolute inset-0 pointer-events-none z-10 animate-[flicker_0.15s_infinite]" style={{ opacity: 0.03 }} />
                </>
              )}

              {/* Terminal content */}
              <div
                ref={terminalRef}
                className={`p-6 font-mono text-sm h-[400px] overflow-y-auto relative z-0 ${colorClasses[textColor]}`}
                onClick={() => inputRef.current?.focus()}
              >
                {!isOn ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-600">[ POWER OFF ]</span>
                  </div>
                ) : (
                  <>
                    {/* Boot sequence */}
                    {bootSequence.map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line}
                      </div>
                    ))}

                    {/* Command history */}
                    {history.map((item, i) => (
                      <div key={i} className="mb-2">
                        <div>C:\&gt; {item.command}</div>
                        <div className="whitespace-pre-wrap opacity-90">{item.output}</div>
                      </div>
                    ))}

                    {/* Input line */}
                    {!isBooting && (
                      <form onSubmit={handleSubmit} className="flex items-center">
                        <span>C:\&gt; </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value.toUpperCase())}
                          className={`flex-1 bg-transparent outline-none border-none ${colorClasses[textColor]} caret-current`}
                          autoFocus
                          disabled={isBooting}
                        />
                        <span className="animate-[blink_1s_infinite] w-2 h-4 bg-current" />
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Monitor brand */}
            <div className="text-center mt-4">
              <span className="font-mono text-xs text-[#4a4540] tracking-widest">RETRO-VISION</span>
            </div>
          </div>

          {/* Control panel */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Power button */}
            <button
              onClick={handlePowerToggle}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isOn
                  ? "bg-green-900/50 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Power className={`w-5 h-5 ${isOn ? "text-green-400" : "text-gray-500"}`} />
            </button>

            {/* Power LED */}
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                isOn ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" : "bg-gray-700"
              }`}
            />

            {/* Sound toggle */}
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-gray-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="flex justify-center">
          <div className="w-32 h-8 bg-gradient-to-b from-[#3d3830] to-[#2a2520] rounded-b-lg" />
        </div>
        <div className="flex justify-center">
          <div className="w-48 h-3 bg-gradient-to-b from-[#2a2520] to-[#1f1b17] rounded-b-lg" />
        </div>
      </div>
    </section>
  );
};

export default RetroTerminal;