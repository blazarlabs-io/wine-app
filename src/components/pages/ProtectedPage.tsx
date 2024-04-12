"use client";

import { redirect } from "next/navigation";
import { getWineryDataDb, initWineryInDb } from "@/utils/firestore";
import { useAuth } from "@/context/authContext";
import { useWinery } from "@/context/wineryContext";
import { WineryDataInterface } from "@/typings/winery";
import { useAppState } from "@/context/appStateContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedPage = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();

  const router = useRouter();

  const { updateAppLoading } = useAppState();

  console.log("PROTECTED");

  if (!user) {
    updateAppLoading(false);
    redirect("/login");
  } else {
    return children;
  }
};
