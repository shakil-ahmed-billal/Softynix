import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export function EmptyState({
  title,
  description,
  ctaText = "Browse Products",
  ctaHref = "/shop",
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
        <Button asChild>
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

