import { ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Canva Pro (Solo 2Y)", shortName: "CP", price: 200, gradient: "from-violet-500 to-purple-700" },
  { id: 2, name: "ChatGPT Plus (22 Voi)", shortName: "CP", price: 1100, gradient: "from-emerald-500 to-green-700" },
  { id: 3, name: "Microsoft Office 2021 Pro", shortName: "MO", price: 1000, gradient: "from-blue-500 to-blue-700" },
  { id: 4, name: "Data Science & ML Bootcamp", shortName: "DS", price: 149.99, gradient: "from-orange-500 to-red-600" },
  { id: 5, name: "Web Dev Masterclass", shortName: "WD", price: 99.99, gradient: "from-cyan-500 to-blue-600" },
  { id: 6, name: "Slack Pro - Team", shortName: "SP", price: 7.25, gradient: "from-pink-500 to-purple-600" },
];

const MobileTrendingProducts = () => {
  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">নতুন ও ট্রেন্ডিং</h2>
        <Button variant="ghost" size="sm" className="text-primary gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-gradient-card border border-border/50 rounded-xl p-3 flex flex-col min-w-[140px] animate-slide-up hover:border-primary/30 transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Product Icon */}
            <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-3`}>
              <span className="text-xl font-bold text-white/90">{product.shortName}</span>
            </div>
            
            {/* Product Info */}
            <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-2 flex-1">
              {product.name}
            </h3>
            
            {/* Price & Action */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-primary font-bold text-sm">৳{product.price}</div>
              <Button variant="cart" size="iconSm" className="shrink-0 h-7 w-7">
                <ShoppingCart className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MobileTrendingProducts;
