import type { Metadata } from "next";
import { BaseLayout, ProtectedPage } from "@/components";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by Blazar Labs",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <BaseLayout>{children}</BaseLayout>
    </ProtectedPage>
  );
}
