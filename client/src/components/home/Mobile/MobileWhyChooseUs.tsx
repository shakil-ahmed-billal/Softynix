import { Zap, Shield, BadgeCheck, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "ইনস্ট্যান্ট ডেলিভারি", color: "from-yellow-500 to-orange-500" },
  { icon: Shield, title: "১০০% নিরাপদ পেমেন্ট", color: "from-blue-500 to-cyan-500" },
  { icon: BadgeCheck, title: "অরিজিনাল প্রোডাক্ট", color: "from-emerald-500 to-green-500" },
  { icon: Headphones, title: "২৪/৭ সাপোর্ট", color: "from-purple-500 to-violet-500" },
];

const MobileWhyChooseUs = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">কেন Softynix-ই সেরা?</h2>
      
    <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-gradient-card border border-border/50 rounded-xl p-4 flex flex-col items-center text-center gap-3 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{feature.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MobileWhyChooseUs;
