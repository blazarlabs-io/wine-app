"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppState } from "./appStateContext";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  user: User | null;
}

const contextInitialData: AuthContextInterface = {
  user: null,
};

const AuthContext = createContext(contextInitialData);

export const useAuth = (): AuthContextInterface => {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

/* This provider should be nested into the auth provider
  because the internal hooks use auth context hook.
*/
export const AuthProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const { updateAppLoading } = useAppState();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      updateAppLoading(false);
      if (user) {
        console.log("User", user);
        setUser(user);
        // router.push("/home");
      } else {
        console.log("No user");
        setUser(null);
        updateAppLoading(false);
        // router.replace("/");
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
