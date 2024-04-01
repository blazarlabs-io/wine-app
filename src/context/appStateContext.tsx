"use client";

import { createContext, useContext, useState } from "react";

export interface AppStateContextInterface {
  isAppLoading: boolean;
  updateAppLoading: (value: boolean) => void;
}

const contextInitialData: AppStateContextInterface = {
  isAppLoading: false,
  updateAppLoading: () => {},
};

const AppStateContext = createContext(contextInitialData);

export const useAppState = (): AppStateContextInterface => {
  const context = useContext<AppStateContextInterface>(AppStateContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const AppStateProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

  const updateAppLoading = (value: boolean) => {
    setIsAppLoading(value);
  };

  const value = {
    isAppLoading,
    updateAppLoading,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
