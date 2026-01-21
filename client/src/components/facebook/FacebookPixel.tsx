"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

interface FacebookPixelProps {
  pixelId: string;
}

function FacebookPixelContent({ pixelId }: FacebookPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if fbq is already initialized (from layout.tsx script)
    if (!window.fbq) {
      // Initialize fbq if not already loaded
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function (...args: any[]) {
          n.callMethod
            ? n.callMethod.apply(n, args)
            : n.queue.push(args);
        };
        f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      // Wait a bit for script to load, then init
      setTimeout(() => {
        if (window.fbq) {
          window.fbq("init", pixelId);
        }
      }, 100);
    }

    // Track page view when route changes
    if (window.fbq) {
      window.fbq("track", "PageView", {
        content_name: pathname,
        content_category: "page_view",
      });
    }
  }, [pathname, searchParams, pixelId]);

  return null;
}

export function FacebookPixel({ pixelId }: FacebookPixelProps) {
  return (
    <Suspense fallback={null}>
      <FacebookPixelContent pixelId={pixelId} />
    </Suspense>
  );
}
