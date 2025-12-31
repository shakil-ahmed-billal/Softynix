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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Softynix - Digital Product Marketplace",
  description:
    "Your trusted digital product marketplace. Buy authentic subscriptions, software licenses, and digital tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
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
