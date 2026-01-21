import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateCollectionPageSchema } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Shop - Browse All Digital Products | Softynix",
  description:
    "Browse our complete collection of digital products. Find AI subscriptions, software licenses, productivity apps, creative tools, and online courses. Filter by category, price, and more.",
  keywords: [
    "shop digital products",
    "browse software",
    "digital products catalog",
    "all products",
    "software store",
    "digital marketplace",
    "buy software online",
    "product catalog",
    "digital goods",
    "premium products",
  ],
  path: "/shop",
});

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateCollectionPageSchema({
    name: "Digital Products Shop",
    description:
      "Browse our complete collection of digital products including AI subscriptions, software licenses, productivity apps, and online courses.",
    url: "/shop",
  });

  return (
    <>
      <StructuredData data={structuredData} />
      {children}
    </>
  );
}
