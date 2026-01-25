"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Play, Sparkles, Shield, Zap, Award } from "lucide-react";
import { useState } from "react";

// You can set this video URL in environment variables or fetch from API
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL || "";

const features = [
  { 
    icon: Zap, 
    text: "ইনস্ট্যান্ট ডেলিভারি",
    gradient: "from-yellow-500 to-orange-500",
  },
  { 
    icon: Shield, 
    text: "১০০% নিরাপদ পেমেন্ট",
    gradient: "from-blue-500 to-cyan-500",
  },
  { 
    icon: Award, 
    text: "অরিজিনাল প্রোডাক্ট গ্যারান্টি",
    gradient: "from-primary to-emerald-500",
  },
];

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-First Layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          
          {/* Video Card - First on Mobile */}
          <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 rounded-2xl md:rounded-3xl transition-all duration-500 hover:shadow-2xl group order-1 md:order-2 animate-fade-in">
            <CardContent className="p-0">
              {VIDEO_URL && isPlaying ? (
                <div className="relative aspect-video">
                  <iframe
                    src={VIDEO_URL}
                    className="w-full h-full rounded-2xl md:rounded-3xl"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 flex items-center justify-center overflow-hidden">
                    {/* Animated Background Circles */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-float" />
                      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Play Button */}
                    {VIDEO_URL ? (
                      <div className="relative z-10">
                        {/* Pulsing Ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 animate-ping" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/30 animate-pulse" />
                        </div>
                        
                        {/* Main Play Button */}
                        <Button
                          size="lg"
                          onClick={handlePlay}
                          className="relative rounded-full h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all duration-300 group/btn"
                        >
                          <Play className="h-8 w-8 md:h-10 md:w-10 ml-1 text-white fill-white drop-shadow-lg group-hover/btn:scale-110 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-8 relative z-10">
                        <div className="inline-flex p-5 bg-muted/50 rounded-full mb-4">
                          <Play className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground" />
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground font-medium">
                          ভিডিও শীঘ্রই আসছে
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Video Caption */}
                  <div className="p-4 md:p-5 text-center bg-gradient-to-t from-card/50 to-transparent backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p className="text-xs md:text-sm font-semibold text-foreground">
                        Softynix সম্পর্কে জানুন
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content - Second on Mobile */}
          <div className="space-y-4 md:space-y-6 order-2 md:order-1 animate-slide-up">
            {/* Badge */}
            <Badge 
              variant="outline" 
              className="px-3 py-1.5 md:px-4 md:py-2 border-primary/30 bg-primary/10 text-primary font-semibold text-xs md:text-sm rounded-full inline-flex items-center gap-2"
            >
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              বিশ্বস্ত মার্কেটপ্লেস
            </Badge>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              কেন <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Softynix</span>-এ বিশ্বাস করবেন?
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Softynix হল বাংলাদেশের <span className="font-semibold text-foreground">সবচেয়ে নির্ভরযোগ্য</span> ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস। আমরা অরিজিনাল সাবস্ক্রিপশন, সফটওয়্যার লাইসেন্স এবং ডিজিটাল টুলস <span className="font-semibold text-primary">সেরা মূল্যে</span> সরবরাহ করি।
            </p>

            {/* Features List */}
            <ul className="space-y-3 md:space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <li 
                    key={index}
                    className="flex items-center gap-3 md:gap-4 group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon with Gradient */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-xl`} />
                      <div className={`relative p-2 md:p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Text */}
                    <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.text}
                    </span>

                    {/* Check Icon */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" strokeWidth={3} />
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* CTA Section */}
            <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                className="bg-gradient-primary text-primary-foreground px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-semibold rounded-xl shadow-lg glow-primary hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/shop">
                  এখনই কিনুন
                  <Sparkles className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground px-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-background" />
                </div>
                <span className="font-semibold">
                  <span className="text-primary">50K+</span> সন্তুষ্ট গ্রাহক
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}