"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";
import { useRouter } from "next/navigation";

export const ProtectedPage = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();

  const { updateAppLoading } = useAppState();

  if (!user) {
    updateAppLoading(false);
    redirect("/login");
  } else {
    return children;
  }
};
