"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, Loader2 } from "lucide-react";
import { useApprovedReviews } from "@/hooks/useApprovedReviews";

export default function Reviews() {
  const { data: reviews = [], isLoading, error } = useApprovedReviews(6);

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            গ্রাহকদের মতামত
          </h2>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching reviews:", error);
    return (
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            গ্রাহকদের মতামত
          </h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load reviews. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show section even if no reviews, but with a message
  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            গ্রাহকদের মতামত
          </h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No reviews yet. Be the first to review our products!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-4">
          গ্রাহকদের মতামত
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          আমাদের গ্রাহকদের কাছ থেকে আসা মূল্যবান মতামত
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: any) => (
            <Card
              key={review.id}
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/30 mb-2" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment || "Great product!"}
                </p>
                <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                  <Avatar className="ring-2 ring-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.user?.name
                        ? review.user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {review.user?.name || "Anonymous"}
                    </p>
                    {review.product && (
                      <p className="text-xs text-muted-foreground">
                        {review.product.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
