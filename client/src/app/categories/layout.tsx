import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateCollectionPageSchema } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Product Categories - Browse by Category | Softynix",
  description:
    "Browse digital products by category. Find AI subscriptions, software licenses, productivity apps, creative tools, and online courses organized by category.",
  keywords: [
    "product categories",
    "browse by category",
    "digital product categories",
    "software categories",
    "AI tools category",
    "productivity apps category",
    "course categories",
    "digital marketplace categories",
  ],
  path: "/categories",
});

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateCollectionPageSchema({
    name: "Product Categories",
    description:
      "Browse digital products organized by category including AI subscriptions, software licenses, productivity apps, and online courses.",
    url: "/categories",
  });

  return (
    <>
      <StructuredData data={structuredData} />
      {children}
    </>
  );
}
