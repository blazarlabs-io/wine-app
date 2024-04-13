import type { Metadata } from "next";
import { ProtectedPage, CleanLayout } from "@/components";
import { WineryProvider } from "@/context/wineryContext";
import "../globals.css";

export const metadata: Metadata = {
  title: "Forms",
  description: "Generated by Blazar Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <CleanLayout>{children}</CleanLayout>
    </ProtectedPage>
  );
}
