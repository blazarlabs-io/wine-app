"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  user: User | null;
  authLoading: boolean;
  updateAuthLoading: (loading: boolean) => void;
}

const contextInitialData: AuthContextInterface = {
  user: null,
  authLoading: true,
  updateAuthLoading: () => {},
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const updateAuthLoading = (loading: boolean) => {
    setAuthLoading(loading);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);

      if (user) {
        setUser(user);
        router.push("/home");
      } else {
        setUser(null);
      }

      setTimeout(() => {
        console.log("User", user);
      }, 3000);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, updateAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
