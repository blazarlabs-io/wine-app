"use client";

import { createContext, useContext, useState } from "react";

export interface UiContextInterface {
  topBar: {
    loginLabel: string;
  };
  updateTopBar: (newTopBar: Partial<UiContextInterface["topBar"]>) => void;
}

const contextInitialData: UiContextInterface = {
  topBar: {
    loginLabel: "Login as Winery Owner",
  },
  updateTopBar: () => {},
};

const UiContext = createContext(contextInitialData);

export const useUI = (): UiContextInterface => {
  const context = useContext<UiContextInterface>(UiContext);

  if (context === undefined) {
    throw new Error("use Provider must be used as within a Provider");
  }

  return context;
};

export const UiContextProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [topBar, setTopBar] = useState(contextInitialData.topBar);

  const updateTopBar = (newTopBar: Partial<UiContextInterface["topBar"]>) => {
    setTopBar((prev) => ({ ...prev, ...newTopBar }));
  };

  const value = {
    topBar,
    updateTopBar,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
