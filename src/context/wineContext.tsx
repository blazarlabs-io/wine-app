"use client";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { ToastProps } from "@/typings/components";
import { EuLabelInterface, WineryGeneralInfoInterface } from "@/typings/winery";

export interface WineToShow {
  generalInfo: WineryGeneralInfoInterface | null;
  euLabel: EuLabelInterface | null;
}

export interface WineContextInterface {
  wineToShow: WineToShow;
  updateWineToShow: (wine: WineToShow) => void;
}

const contextInitialData: WineContextInterface = {
  wineToShow: {
    generalInfo: null,
    euLabel: null,
  },
  updateWineToShow: () => {},
};

const WineContext = createContext(contextInitialData);

export const useWine = (): WineContextInterface => {
  const context = useContext<WineContextInterface>(WineContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

/* This provider should be nested into the auth provider
  because the internal hooks use auth context hook.
*/
export const WineProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [wineToShow, setWineToShow] = useState(contextInitialData.wineToShow);

  const updateWineToShow = (wine: WineToShow) => {
    console.log("wine", wine);
    setWineToShow(wine);
  };

  useEffect(() => {}, []);

  const value = {
    wineToShow,
    updateWineToShow,
  };

  return <WineContext.Provider value={value}>{children}</WineContext.Provider>;
};
