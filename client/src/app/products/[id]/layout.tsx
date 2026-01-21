import { generateMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Product Details",
  description: "View product details, specifications, and reviews. Buy authentic digital products with instant delivery.",
  keywords: ["product details", "buy product", "product information"],
  path: "/products",
  type: "website", // Try changing to "website" or another recognized type
});


export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
