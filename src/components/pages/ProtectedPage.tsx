"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";

export const ProtectedPage = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  } else {
    return children;
  }
};
