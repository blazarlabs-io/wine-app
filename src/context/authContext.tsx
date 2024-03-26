"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  user: User | null;
  loading: boolean;
}

const contextInitialData: AuthContextInterface = {
  user: null,
  loading: true,
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setLoading(false);
      if (user) {
        setUser(user);
        router.push("/home");
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
