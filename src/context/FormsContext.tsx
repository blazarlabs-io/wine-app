"use client";

import { wineInitData } from "@/data/wineInitData";
import { wineryInitialData } from "@/data/wineryInitialData";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { createContext, useContext, useState } from "react";

export interface WineryFormInterface {
  title: string;
  description: string;
  isEditing: boolean;
  formData: WineryGeneralInfo;
}

export interface WineFormInterface {
  title: string;
  description: string;
  isEditing: boolean;
  isMinified: boolean;
  formData: Wine;
}

export interface FormsContextInterface {
  wineryForm: WineryFormInterface;
  wineForm: WineFormInterface;
  updateWineryForm: (data: WineryFormInterface) => void;
  updateWineForm: (data: WineFormInterface) => void;
}

const contextInitialData: FormsContextInterface = {
  wineryForm: {
    title: "",
    description: "",
    isEditing: false,
    formData: wineryInitialData,
  },
  wineForm: {
    title: "",
    description: "",
    isEditing: false,
    isMinified: false,
    formData: wineInitData,
  },
  updateWineryForm: () => {},
  updateWineForm: () => {},
};

const FormsContext = createContext(contextInitialData);

export const useForms = (): FormsContextInterface => {
  const context = useContext<FormsContextInterface>(FormsContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const FormsProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [wineryForm, setWineryForm] = useState<WineryFormInterface>(
    contextInitialData.wineryForm
  );
  const [wineForm, setWineForm] = useState<WineFormInterface>(
    contextInitialData.wineForm
  );

  const updateWineryForm = (data: WineryFormInterface) => {
    setWineryForm(data);
  };

  const updateWineForm = (data: WineFormInterface) => {
    setWineForm(data);
  };

  const value = {
    wineryForm,
    wineForm,
    updateWineryForm,
    updateWineForm,
  };

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
};
