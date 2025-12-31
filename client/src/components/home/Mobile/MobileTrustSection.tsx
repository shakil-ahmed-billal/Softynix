import { Zap, Shield, BadgeCheck, Play } from "lucide-react";

const features = [
  { icon: Zap, text: "ইনস্ট্যান্ট ডেলিভারি" },
  { icon: Shield, text: "১০০% নিরাপদ পেমেন্ট" },
  { icon: BadgeCheck, text: "অরিজিনাল প্রোডাক্ট" },
];

const MobileTrustSection = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-2">কেন Softynix-এ বিশ্বাস করবেন?</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Softynix হল বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস। আমরা অরিজিনাল সাবস্ক্রিপশন, সফটওয়্যার লাইসেন্স এবং ডিজিটাল টুলস সেরা মূল্যে সরবরাহ করি।
      </p>
      
      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-medium">{feature.text}</span>
            </div>
          );
        })}
      </div>
      
      {/* Video Placeholder */}
      <div className="bg-gradient-card border border-border/50 rounded-xl aspect-video flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center glow-primary cursor-pointer hover:scale-105 transition-transform">
          <Play className="w-7 h-7 text-primary-foreground ml-1" />
        </div>
        <span className="text-sm text-muted-foreground">Softynix সম্পর্কে ভিডিও</span>
      </div>
    </section>
  );
};

export default MobileTrustSection;
