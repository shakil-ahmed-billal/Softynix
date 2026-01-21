import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softynix.com";
const siteName = "Softynix";
const defaultDescription =
  "Your trusted digital product marketplace. Buy authentic subscriptions, software licenses, AI tools, productivity apps, and online courses in Bangladesh.";

/**
 * Generate SEO metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords,
  path = "",
  image,
  type = "website",
  noindex = false,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/logo/headerlogo.png`;

  const defaultKeywords = [
    "digital products",
    "software licenses",
    "AI subscriptions",
    "productivity apps",
    "online courses",
    "digital marketplace",
    "Bangladesh",
    "softynix",
    "buy digital products",
    "premium software",
    "ChatGPT subscription",
    "Claude AI",
    "software license key",
    "productivity tools",
    "digital courses",
  ];

  return {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: keywords ? [...defaultKeywords, ...keywords] : defaultKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: new URL(url),
      title: fullTitle,
      description: description ?? defaultDescription,
      siteName,
      images: [
        {
          url: new URL(ogImage),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || defaultDescription,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo/headerlogo.png`,
    description: defaultDescription,
    sameAs: [
      // Add your social media links here
      // "https://www.facebook.com/softynix",
      // "https://twitter.com/softynix",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

/**
 * Generate structured data for Product
 */
export function generateProductSchema(product: {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  availability?: string;
  sku?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} - Available at ${siteName}`,
    image: product.image || `${siteUrl}/logo/headerlogo.png`,
    category: product.category,
    sku: product.sku || product.name,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability: product.availability
        ? `https://schema.org/${product.availability}`
        : "https://schema.org/InStock",
      url: `${siteUrl}/products/${product.sku}`,
    },
    brand: {
      "@type": "Brand",
      name: siteName,
    },
  };
}

/**
 * Generate structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate structured data for WebSite
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate structured data for CollectionPage (Shop/Category)
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items?: Array<{ name: string; url: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteUrl}${url}`,
    mainEntity: items
      ? {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: item.name,
              url: `${siteUrl}${item.url}`,
              image: item.image,
            },
          })),
        }
      : undefined,
  };
}
