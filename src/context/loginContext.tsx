"use client";

// LIBS
import { createContext, useContext, useState } from "react";

export interface LoginContextInterface {
  showLogin: boolean;
  updateShowLogin: (value: boolean) => void;
}

const contextInitialData: LoginContextInterface = {
  showLogin: false,
  updateShowLogin: () => {},
};

const LoginContext = createContext(contextInitialData);

export function useLogin(): LoginContextInterface {
  const context = useContext<LoginContextInterface>(LoginContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
}

/* This provider should be nested into the auth provider
  because the internal hooks use auth context hook.
*/
export function LoginProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const updateShowLogin = (value: boolean) => {
    setShowLogin(value);
  };

  return (
    <LoginContext.Provider
      value={{
        showLogin,
        updateShowLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
