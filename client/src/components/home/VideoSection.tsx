"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Play } from "lucide-react";
import { useState } from "react";

// You can set this video URL in environment variables or fetch from API
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL || "";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center border-2 border-primary/20 rounded-xl md:pl-6">
          <div className="space-y-6 p-5 md:p-0">
            <h2 className="text-3xl font-semibold">
              কেন Softynix-এ বিশ্বাস করবেন?
            </h2>
            <p className="text-muted-foreground">
              Softynix হল বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ডিজিটাল প্রোডাক্ট
              মার্কেটপ্লেস। আমরা অরিজিনাল সাবস্ক্রিপশন, সফটওয়্যার লাইসেন্স এবং
              ডিজিটাল টুলস সেরা মূল্যে সরবরাহ করি।
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>ইনস্ট্যান্ট ডেলিভারি</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>১০০% নিরাপদ পেমেন্ট</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>অরিজিনাল প্রোডাক্ট</span>
              </li>
            </ul>
          </div>
          <Card className="relative overflow-hidden">
            <CardContent className="p-0">
              {VIDEO_URL && isPlaying ? (
                <div className="relative aspect-video">
                  <iframe
                    src={VIDEO_URL}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    {VIDEO_URL ? (
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={handlePlay}
                        className="rounded-full h-20 w-20 bg-primary hover:bg-primary/90"
                      >
                        <Play className="h-10 w-10 ml-1 text-primary-foreground" />
                      </Button>
                    ) : (
                      <div className="text-center p-8">
                        <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Video coming soon
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Softynix সম্পর্কে ভিডিও
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
