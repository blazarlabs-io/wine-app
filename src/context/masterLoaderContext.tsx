"use client";

import { createContext, useContext, useState } from "react";

export interface MasterLoaderContextInterface {
  isMasterLoading: boolean;
  updateMasterLoading: (value: boolean) => void;
}

const contextInitialData: MasterLoaderContextInterface = {
  isMasterLoading: false,
  updateMasterLoading: () => {},
};

const MasterLoaderContext = createContext(contextInitialData);

export const useMasterLoader = (): MasterLoaderContextInterface => {
  const context = useContext<MasterLoaderContextInterface>(MasterLoaderContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const MasterLoaderProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [isMasterLoading, setIsMasterLoading] = useState<boolean>(false);

  const updateMasterLoading = (value: boolean) => {
    setIsMasterLoading(value);
  };

  const value = {
    isMasterLoading,
    updateMasterLoading,
  };

  return (
    <MasterLoaderContext.Provider value={value}>
      {children}
    </MasterLoaderContext.Provider>
  );
};
