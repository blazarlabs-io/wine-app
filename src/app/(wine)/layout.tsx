import type { Metadata } from "next";
import { BaseLayout } from "@/components";
import "../globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wine",
  description: "Generated by BlazarLabs",
};

export default function ExplorerRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout>
      <Suspense>{children}</Suspense>
    </BaseLayout>
  );
}
