import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Shield,
  Package,
  Headphones,
} from "lucide-react";

const trustPoints = [
  { icon: Zap, text: "ইনস্ট্যান্ট ডেলিভারি" },
  { icon: Shield, text: "১০০% নিরাপদ পেমেন্ট" },
  { icon: Package, text: "অরিজিনাল প্রোডাক্ট" },
  { icon: Headphones, text: "২৪/৭ সাপোর্ট" },
];

export default function TrustSection() {
  return (
    <section className="">
      <div className="container mx-auto px-4 py-12 ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        কেন Softynix-ই সেরা?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustPoints.map((point, index) => {
          const IconComponent = point.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group"
            >
              <CardContent className="flex flex-col items-center space-y-3 p-6 text-center">
                <div className="bg-muted p-4 rounded-full group-hover:bg-muted/80 transition-colors">
                  <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="font-medium">{point.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    </section>
  );
}
