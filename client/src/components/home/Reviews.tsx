"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

// Static reviews - can be replaced with API later
const reviews = [
  {
    id: 1,
    name: "John Doe",
    profession: "Software Developer",
    rating: 5,
    comment: "Excellent service and fast delivery. Highly recommended!",
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Designer",
    rating: 5,
    comment: "Great quality products and amazing customer support.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    profession: "Entrepreneur",
    rating: 4,
    comment: "Good platform for digital products. Will order again!",
  },
];

export default function Reviews() {
  return (
   <section className="">
     <div className="container mx-auto px-4 py-12 ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        গ্রাহকদের মতামত
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
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
                {review.comment}
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.profession}
                  </p>
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
