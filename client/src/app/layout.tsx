import { CartWrapper } from "@/components/cart/CartWrapper";
import MobileFooter from "@/components/home/Mobile/layout/MobileFooter";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/auth-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { ToastProvider } from "./providers/toast-provider";
import { FacebookPixel } from "@/components/facebook/FacebookPixel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import Script from "next/script";
import { generateMetadata, generateMetadata as generateSEOMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Home page metadata - optimized for SEO with trending keywords
export const metadata: Metadata = generateMetadata({
  title: "Softynix - Digital Product Marketplace | Buy AI Tools, Software & Courses",
  description:
    "Buy authentic digital products in Bangladesh. Premium AI subscriptions (ChatGPT, Claude), software licenses, productivity apps, and online courses. Best prices, instant delivery, trusted marketplace.",
  keywords: [
    "buy digital products Bangladesh",
    "ChatGPT subscription Bangladesh",
    "Claude AI subscription",
    "software license key",
    "premium software Bangladesh",
    "AI tools Bangladesh",
    "productivity apps",
    "online courses Bangladesh",
    "digital marketplace",
    "buy software online",
    "authentic software licenses",
    "digital products shop",
    "best digital products",
    "trending software",
    "AI subscriptions",
    "productivity tools",
    "creative software",
    "educational courses",
  ],
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        {/* Facebook Pixel Base Code */}
        {FACEBOOK_PIXEL_ID && (
          <>
            <Script
              id="facebook-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {FACEBOOK_PIXEL_ID && <FacebookPixel pixelId={FACEBOOK_PIXEL_ID} />}
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <ToastProvider />
              <CartWrapper>
                <header>
                  <Header />
                </header>
                <div className="flex min-h-screen flex-col">
                  <main className="flex-1">{children}</main>
                </div>
                <footer>
                  <div className="hidden md:block">
                    <Footer />
                  </div>
                  <div className="block md:hidden">
                    <MobileFooter />
                  </div>
                </footer>
                <div className="md:hidden flex">
                  <BottomNav />
                </div>
              </CartWrapper>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
