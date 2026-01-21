"use client";

import { ShoppingCart, ChevronRight, Star, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  shortName: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  gradient: string;
  rating?: number;
  reviews?: number;
}

const products: Product[] = [
  { id: 1, name: "Microsoft Office 2021 Pro", shortName: "MO", price: 1000, gradient: "from-blue-500 via-blue-600 to-blue-700", rating: 4.9, reviews: 234 },
  { id: 2, name: "Canva Pro (Solo 2Y)", shortName: "CP", price: 200, originalPrice: 350, badge: "HOT", gradient: "from-violet-500 via-purple-600 to-purple-700", rating: 4.8, reviews: 189 },
  { id: 3, name: "ChatGPT Plus (22 Voi)", shortName: "CP", price: 1100, badge: "NEW", gradient: "from-emerald-500 via-teal-600 to-green-700", rating: 5.0, reviews: 456 },
  { id: 4, name: "Coursera Plus", shortName: "CP", price: 1799, gradient: "from-indigo-500 via-indigo-600 to-indigo-700", rating: 4.7, reviews: 128 },
];

interface ProductsSectionProps {
  title: string;
  showViewAll?: boolean;
}

const MobileViewProductsSection = ({ title, showViewAll = true }: ProductsSectionProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <section className="px-4 py-6 lg:px-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 lg:h-9 bg-gradient-primary rounded-full" />
            <h2 className="text-xl lg:text-3xl font-bold text-foreground">{title}</h2>
          </div>
          {showViewAll && (
            <Button variant="ghost" size="sm" className="text-primary gap-1 hover:gap-2 transition-all font-semibold">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card border border-border rounded-2xl lg:rounded-3xl overflow-hidden animate-slide-up hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-500 card-shine"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Product Image Area */}
              <div className="relative p-3 lg:p-4 pb-0">
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 lg:top-5 lg:right-5 z-10 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart 
                    className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
                      favorites.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground hover:text-red-500'
                    }`} 
                  />
                </button>
                
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 left-4 lg:top-5 lg:left-5 z-10 px-2.5 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold flex items-center gap-1 shadow-lg ${
                    product.badge === "NEW" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  }`}>
                    {product.badge === "NEW" && <Sparkles className="w-3 h-3" />}
                    {product.badge}
                  </span>
                )}
                
                {/* Product Icon */}
                <div className={`w-full aspect-square rounded-xl lg:rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-500 overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/20" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" 
                    style={{ transition: 'transform 0.7s ease, opacity 0.3s ease' }}
                  />
                  <span className="text-3xl lg:text-5xl font-black text-white drop-shadow-lg relative z-10">{product.shortName}</span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-3 lg:p-5 pt-3">
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${
                          i < Math.floor(product.rating || 0) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground/30'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                
                {/* Name */}
                <h3 className="text-sm lg:text-base font-semibold text-foreground line-clamp-2 mb-3 min-h-[2.5rem] lg:min-h-[3rem] group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Price & Action */}
                <div className="flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-primary font-bold text-lg lg:text-2xl">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="shrink-0 h-9 lg:h-10 px-3 lg:px-4 rounded-xl gap-1.5 group-hover:scale-105 transition-transform shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden lg:inline text-sm">Add</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileViewProductsSection;
