"use client";

import { euLabelInitData } from "@/data/euLablelInitData";
import { wineryInitialData } from "@/data/wineryInitialData";
import {
  EuLabelInterface,
  WineryDataInterface,
  WineryGeneralInfoInterface,
} from "@/typings/winery";
import { createContext, useContext, useState } from "react";

export interface WineryFormInterface {
  title: string;
  description: string;
  isEditing: boolean;
  formData: WineryGeneralInfoInterface;
}

export interface EuLabelFormInterface {
  title: string;
  description: string;
  isEditing: boolean;
  formData: EuLabelInterface;
}

export interface FormsContextInterface {
  wineryForm: WineryFormInterface;
  euLabelForm: EuLabelFormInterface;
  updateWineryForm: (data: WineryFormInterface) => void;
  updateEuLabelForm: (data: EuLabelFormInterface) => void;
}

const contextInitialData: FormsContextInterface = {
  wineryForm: {
    title: "",
    description: "",
    isEditing: false,
    formData: wineryInitialData,
  },
  euLabelForm: {
    title: "",
    description: "",
    isEditing: false,
    formData: euLabelInitData,
  },
  updateWineryForm: () => {},
  updateEuLabelForm: () => {},
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
  const [wineryForm, setWineryForm] = useState(contextInitialData.wineryForm);
  const [euLabelForm, setEuLabelForm] = useState(
    contextInitialData.euLabelForm
  );

  const updateWineryForm = (data: WineryFormInterface) => {
    setWineryForm(data);
  };

  const updateEuLabelForm = (data: EuLabelFormInterface) => {
    setEuLabelForm(data);
  };

  const value = {
    wineryForm,
    euLabelForm,
    updateWineryForm,
    updateEuLabelForm,
  };

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
};
