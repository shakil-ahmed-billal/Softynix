"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 43,
    seconds: 53,
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

  return (
    <section className="">
      <div className="container mx-auto px-4 py-12 ">
        <Card className="border-purple-500/30 bg-card">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                বিশেষ ছাড়! সীমিত সময়ের অফার
              </h3>
              <p className="text-muted-foreground">
                আজই কিনুন এবং বিশেষ ছাড় পান
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <div className="bg-background rounded-lg p-3 min-w-[60px] text-center border border-primary/20">
                  <div className="text-2xl font-bold text-primary">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                </div>
                <div className="bg-background rounded-lg p-3 min-w-[60px] text-center border border-primary/20">
                  <div className="text-2xl font-bold text-primary">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-background rounded-lg p-3 min-w-[60px] text-center border border-primary/20">
                  <div className="text-2xl font-bold text-primary">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground">Seconds</div>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <ShoppingBag className="mr-2 h-5 w-5" />
                এখনই কিনুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
