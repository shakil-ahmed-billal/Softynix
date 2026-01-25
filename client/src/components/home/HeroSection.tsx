import { ArrowRight, MessageCircle, Sparkles, Star, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-16 lg:py-20">
      {/* Subtle Background Effects - Optimized for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-0 w-60 h-60 md:w-80 md:h-80 bg-primary/15 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Compact Trust Badge */}
          <div className="mb-4 md:mb-6 animate-slide-up">
            <Badge 
              variant="outline" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 border-primary/30 bg-primary/10 text-primary font-medium text-xs md:text-sm rounded-full"
            >
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              বাংলাদেশের #১ বিশ্বস্ত মার্কেটপ্লেস
            </Badge>
          </div>

          {/* Mobile-Optimized Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 md:mb-5 animate-fade-in px-2" style={{ animationDelay: "0.1s" }}>
            <span className="block text-foreground mb-1 md:mb-2">
              ডিজিটাল প্রোডাক্ট কিনুন
            </span>
            <span className="block text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              নিশ্চিন্তে ও নিরাপদে
            </span>
          </h1>

          {/* Compact Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-medium">
              <CheckCircle2 className="w-3 h-3 text-primary" />
              <span>অরিজিনাল</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs md:text-sm font-medium">
              <Zap className="w-3 h-3 text-accent" />
              <span>ইনস্ট্যান্ট ডেলিভারি</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-medium">
              <Star className="w-3 h-3 text-primary" />
              <span>সেরা মূল্য</span>
            </span>
          </div>

          {/* Concise Description */}
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="font-semibold text-primary">Softynix</span> থেকে কিনুন বিশ্বস্ত ডিজিটাল প্রোডাক্ট, সফটওয়্যার ও প্রিমিয়াম সাবস্ক্রিপশন — 
            <span className="text-foreground font-medium"> নিরাপদ ও দ্রুত ডেলিভারি সহ।</span>
          </p>

          {/* Mobile-Optimized CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8 md:mb-10 px-4 animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-primary text-primary-foreground px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold rounded-xl shadow-lg glow-primary hover:scale-105 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center">
                প্রোডাক্ট দেখুন
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto px-6 py-5 md:px-8 md:py-6 text-sm md:text-base font-semibold rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
            >
              <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              লাইভ সাপোর্ট
            </Button>
          </div>

          {/* Compact Stats Section */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-6 md:pt-10 border-t border-border/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-primary mb-1">
                50K+
              </div>
              <div className="text-muted-foreground text-[10px] md:text-xs lg:text-sm font-medium">সন্তুষ্ট গ্রাহক</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, hsl(258.3 89.5% 66.3%), hsl(142 76% 36%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                500+
              </div>
              <div className="text-muted-foreground text-[10px] md:text-xs lg:text-sm font-medium">প্রোডাক্ট</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-1">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  4.9
                </span>
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="text-muted-foreground text-[10px] md:text-xs lg:text-sm font-medium">রেটিং</div>
            </div>
          </div>

          {/* Compact Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 animate-fade-in px-4" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span>নিরাপদ পেমেন্ট</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              <span>২৪/৭ সাপোর্ট</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span>মানি ব্যাক</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};