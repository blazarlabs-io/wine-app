import type { Metadata } from "next";
import { BaseLayout } from "@/components";
import "../../globals.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Generated by BlazarLabs",
};

export default function ExplorerRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout>{children}</BaseLayout>;
}
