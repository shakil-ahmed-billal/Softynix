import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const MobileCountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 43,
    seconds: 5,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-secondary/80 rounded-xl w-14 h-14 flex items-center justify-center border border-border/50">
        <span className="text-xl font-bold text-foreground">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground mt-1">{label}</span>
    </div>
  );

  return (
    <section className="px-4 py-6">
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl p-5 border border-primary/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">বিশেষ ছাড়!</span>
          </div>
          
          <h3 className="text-lg font-bold text-foreground mb-4">
            সীমিত সময়ের অফার
          </h3>
          
          <div className="flex items-center justify-center gap-3 mb-5">
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <span className="text-xl font-bold text-primary mt-[-20px]">:</span>
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <span className="text-xl font-bold text-primary mt-[-20px]">:</span>
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
          
          <Button className="w-full" size="lg">
            এখনই কিনুন
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileCountdownSection;
