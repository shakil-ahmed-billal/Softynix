import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Shopping Cart - Review Your Items | Softynix",
  description:
    "Review items in your shopping cart. Add or remove products before checkout. Secure checkout process with multiple payment options.",
  keywords: [
    "shopping cart",
    "cart",
    "checkout",
    "buy products",
    "add to cart",
  ],
  path: "/cart",
  noindex: true, // Cart pages typically shouldn't be indexed
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
