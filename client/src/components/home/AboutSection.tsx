import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section className="">
      <div className="container mx-auto px-4 py-12">
      <Card>
        <CardContent className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                S
              </span>
            </div>
            <h2 className="text-3xl font-semibold">Softynix সম্পর্কে</h2>
          </div>
          <div className="max-w-3xl space-y-4 text-muted-foreground">
            <p>
              Softynix হল বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ডিজিটাল প্রোডাক্ট
              মার্কেটপ্লেস। আমরা অরিজিনাল সাবস্ক্রিপশন, সফটওয়্যার লাইসেন্স এবং
              ডিজিটাল টুলস সেরা মূল্যে সরবরাহ করি।
            </p>
            <p>
              আমাদের লক্ষ্য হল গ্রাহকদের কাছে মানসম্মত ডিজিটাল প্রোডাক্ট সহজে
              এবং নিরাপদে পৌঁছে দেওয়া। ইনস্ট্যান্ট ডেলিভারি, নিরাপদ পেমেন্ট এবং
              ২৪/৭ সাপোর্টের মাধ্যমে আমরা আপনার বিশ্বাস অর্জন করতে
              প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </section>
  );
}
