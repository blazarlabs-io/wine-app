"use client";

import { useAppState } from "@/context/appStateContext";
import { redirect, usePathname } from "next/navigation";

export const RouteBlocker = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  const { updateAppLoading } = useAppState();

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/wine-form") ||
    pathname.startsWith("/winery-form") ||
    pathname.startsWith("/about-us") ||
    pathname.startsWith("/contact-us") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/explore")
  ) {
    updateAppLoading(false);
    redirect("/");
  } else {
    return children;
  }
};
