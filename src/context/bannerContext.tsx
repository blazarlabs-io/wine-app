"use client";

import { createContext, useContext, useState } from "react";

export interface BannerContextInterface {
  show: boolean;
  text: string;
  updateBanner: (show: boolean, text: string) => void;
}

const contextInitialData: BannerContextInterface = {
  show: false,
  text: "",
  updateBanner: () => {},
};

const BannerContext = createContext(contextInitialData);

export const useBanner = (): BannerContextInterface => {
  const context = useContext<BannerContextInterface>(BannerContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const BannerProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const updateBanner = (show: boolean, text: string) => {
    setShow(show);
    setText(text);
  };

  const value = {
    show,
    text,
    updateBanner,
  };

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
};
