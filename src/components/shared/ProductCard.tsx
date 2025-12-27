import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: string;
    originalPrice?: string;
    rating: number;
    discount?: number;
    isNew?: boolean;
    image?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Generate initials from product title
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="relative w-full aspect-square bg-muted flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-4xl font-bold text-muted-foreground/30">
            {getInitials(product.title)}
          </div>
        </div>
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0 z-20">
            -{product.discount}%
          </Badge>
        )}
        {product.isNew && (
          <Badge className="absolute top-2 right-2 bg-primary text-white border-0 z-20">
            New
          </Badge>
        )}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded z-20">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-white font-medium">{product.rating}</span>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-2">
          <p className="font-bold text-primary text-xl">{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </p>
          )}
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90">
          কার্টে যোগ করুন
        </Button>
      </CardContent>
    </Card>
  );
}
