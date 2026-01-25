import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Package,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const trustPoints = [
  { 
    icon: Zap, 
    text: "ইনস্ট্যান্ট ডেলিভারি",
    description: "অর্ডারের সাথে সাথে",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
  },
  { 
    icon: Package, 
    text: "অরিজিনাল প্রোডাক্ট",
    description: "১০০% খাঁটি গ্যারান্টি",
    gradient: "from-primary to-emerald-500",
    bgGradient: "from-primary/10 to-emerald-500/10",
  },
  { 
    icon: Headphones, 
    text: "২৪/৭ সাপোর্ট",
    description: "সবসময় আপনার সাথে",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <Badge 
            variant="outline" 
            className="mb-4 px-4 py-2 border-primary/30 bg-primary/10 text-primary font-semibold text-xs md:text-sm rounded-full inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
            আমাদের বিশেষত্ব
          </Badge>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            কেন <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Softynix</span>-ই সেরা?
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            আমরা প্রতিশ্রুতিবদ্ধ সেরা সেবা ও নিরাপত্তা প্রদানে
          </p>
        </div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {trustPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="group relative h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${point.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <CardContent className="relative flex flex-col items-center text-center p-6 md:p-8 space-y-4">
                    {/* Icon Container with Gradient */}
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full`} />
                      
                      {/* Icon Circle */}
                      <div className={`relative bg-gradient-to-br ${point.gradient} p-3 md:p-5 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-lg" strokeWidth={2.5} />
                      </div>
                      
                      {/* Check Badge */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-1.5">
                      <p className="text-xs md:text-base lg:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {point.text}
                      </p>
                      {/* <p className="text-xs md:text-sm text-muted-foreground">
                        {point.description}
                      </p> */}
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className={`w-0 group-hover:w-16 h-1 bg-gradient-to-r ${point.gradient} rounded-full transition-all duration-500 mt-2`} />
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats/Trust Indicator */}
        <div className="mt-10 md:mt-14 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-semibold text-foreground">
              <span className="text-primary font-bold">5000+</span> গ্রাহক আমাদের বিশ্বাস করেন
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}