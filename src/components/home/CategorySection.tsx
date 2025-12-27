import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/dummy-data";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="relative">
      <div className=" container mx-auto px-4 py-12 ">
        <h2 className="text-3xl font-semibold text-center mb-8">
          জনপ্রিয় ক্যাটাগরি
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} href="/categories">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                    <div className="bg-muted p-4 rounded-2xl group-hover:bg-muted/80 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                      {category.nameBn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category.count} প্রোডাক্ট
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
