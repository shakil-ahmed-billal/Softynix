import { Brain, BookOpen, Briefcase, AppWindow, Key, Wrench } from "lucide-react";

const categories = [
  { icon: Brain, name: "AI Solutions", count: 5, color: "from-violet-500 to-purple-600" },
  { icon: BookOpen, name: "Learning Courses", count: 4, color: "from-blue-500 to-cyan-500" },
  { icon: Briefcase, name: "Productivity Apps", count: 5, color: "from-orange-500 to-amber-500" },
  { icon: AppWindow, name: "Software & Apps", count: 4, color: "from-pink-500 to-rose-500" },
  { icon: Key, name: "Software Licenses", count: 4, color: "from-emerald-500 to-teal-500" },
  { icon: Wrench, name: "Utility Tools", count: 3, color: "from-indigo-500 to-blue-600" },
];

const MobileViewCategoriesSection = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold text-foreground mb-4">জনপ্রিয় ক্যাটাগরি</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={index}
              className="bg-gradient-card border border-border/50 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/50 transition-all duration-300 active:scale-95 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-foreground line-clamp-1">{category.name}</div>
                <div className="text-[10px] text-muted-foreground">{category.count} প্রোডাক্ট</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MobileViewCategoriesSection;
