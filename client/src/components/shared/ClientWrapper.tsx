// app/components/ClientWrapper.tsx
"use client";
import { Suspense } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
}
