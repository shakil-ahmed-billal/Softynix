import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 border-primary/30 bg-primary/10 text-primary animate-fade-in"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            সবচেয়ে নির্ভরযোগ্য ডিজিটাল প্ল্যাটফর্ম
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            ডিজিটাল প্রোডাক্ট কিনুন{" "}
            <span className="text-gradient">নিশ্চিন্তে</span>
          </h1>

          {/* Sub Heading */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" />
              অরিজিনাল সাবস্ক্রিপশন
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-accent" />
              ইনস্ট্যান্ট ডেলিভারি
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success" />
              সেরা মূল্য
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Softynix থেকে কিনুন বিশ্বস্ত ডিজিটাল প্রোডাক্ট, সফটওয়্যার লাইসেন্স ও প্রিমিয়াম সাবস্ক্রিপশন — সম্পূর্ণ নিরাপদ ও দ্রুত ডেলিভারি সহ।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-lg glow-primary hover:opacity-90 transition-opacity">
              প্রোডাক্ট দেখুন
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-border hover:bg-secondary">
              <MessageCircle className="mr-2 h-5 w-5" />
              লাইভ সাপোর্ট
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 pt-16 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50K+</div>
              <div className="text-muted-foreground text-sm md:text-base">সন্তুষ্ট গ্রাহক</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
              <div className="text-muted-foreground text-sm md:text-base">প্রোডাক্ট</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">4.9★</div>
              <div className="text-muted-foreground text-sm md:text-base">রেটিং</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};