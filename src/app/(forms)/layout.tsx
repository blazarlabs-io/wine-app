import type { Metadata } from "next";
import { ProtectedPage, CleanLayout } from "@/components";
import { WineryProvider } from "@/context/wineryContext";
import "../globals.css";

export const metadata: Metadata = {
  title: "App Name",
  description: "Generated by XXXXXX",
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