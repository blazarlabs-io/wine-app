import type { Metadata } from "next";
import { Khula } from "next/font/google";
import { Providers } from "@/context/Providers";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { Modal } from "@/components";

const inter = Khula({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wine Portal by Blazar Labs",
  description: "Onchain supply chain tracking for wineries and wine lovers",
  openGraph: {
    title: "Wine Portal by Blazar Labs",
    description: "Onchain supply chain tracking for wineries and wine lovers",
    url: "https://wines.blazarlabs.io/",
    siteName: "wines.blazarlabs.io",
    images: [
      {
        url: "https://wines.blazarlabs.io/og.jpg",
        width: 1080,
        height: 618,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine Portal by Blazar Labs",
    description: "Onchain supply chain tracking for wineries and wine lovers",
    images: ["https://wines.blazarlabs.io/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <div className="relative w-full h-full">
              <Modal />
              {children}
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
