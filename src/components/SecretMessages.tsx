import { useState } from "react";
import { toast } from "sonner";

interface SecretMessageProps {
  children: React.ReactNode;
  secret: string;
  clicksRequired?: number;
}

const SecretMessage = ({ children, secret, clicksRequired = 3 }: SecretMessageProps) => {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks >= clicksRequired && !revealed) {
      setRevealed(true);
      toast.success(`🔍 Secret Found: ${secret}`, { duration: 4000 });
      
      // Reset after showing
      setTimeout(() => {
        setClicks(0);
        setRevealed(false);
      }, 5000);
    } else if (newClicks > 0 && newClicks < clicksRequired) {
      // Reset if no click for 2 seconds
      setTimeout(() => setClicks(0), 2000);
    }
  };

  return (
    <span 
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-300 ${
        revealed ? "text-primary animate-pulse" : ""
      }`}
    >
      {children}
    </span>
  );
};

export default SecretMessage;