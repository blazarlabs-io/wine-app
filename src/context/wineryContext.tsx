"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  WineryDataProps,
  WineryGeneralInfoInterface,
  WinesInterface,
} from "@/typings/components";

export interface WineryContextInterface extends WineryDataProps {
  formTitle: string;
  formDescription: string;
  showRegisterWinery: boolean;
  generalInfo: WineryGeneralInfoInterface;
  wines: WinesInterface[] | null;
  updateFormDescription: (value: string) => void;
  updateFormTitle: (value: string) => void;
  updateWinery: (data: WineryDataProps) => void;
  updateShowRegisterWinery: (value: boolean) => void;
}

const contextInitialData: WineryContextInterface = {
  formTitle: "Register Winery",
  formDescription:
    "Please fill in the form to register your winery. All fields marked with * are mandatory.",
  showRegisterWinery: false,
  generalInfo: {
    name: "",
    foundedOn: "",
    location: "",
    noOfProducedWines: "",
    vineyardsSurface: "",
    noOfBottlesProducedPerYear: "",
    grapeVarieties: "",
    lastUpdated: "",
  },
  wines: null,
  updateFormTitle: (value: string) => {},
  updateFormDescription: (value: string) => {},
  updateWinery: (data: WineryDataProps) => {},
  updateShowRegisterWinery: (value: boolean) => {},
};

const WineryContext = createContext(contextInitialData);

export const useWinery = (): WineryContextInterface => {
  const context = useContext<WineryContextInterface>(WineryContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const WineryProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [formTitle, setFormTitle] = useState<string>(
    contextInitialData.formTitle
  );
  const [formDescription, setFormDescription] = useState<string>(
    contextInitialData.formDescription
  );
  const [showRegisterWinery, setShowRegisterWinery] = useState<boolean>(false);
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfoInterface>(
    contextInitialData.generalInfo
  );
  const [wines, setWines] = useState<WinesInterface[]>(
    contextInitialData.wines
  );

  const updateFormTitle = (value: string) => {
    setFormTitle(value);
  };

  const updateFormDescription = (value: string) => {
    setFormDescription(value);
  };

  const updateShowRegisterWinery = (value: boolean) => {
    setShowRegisterWinery(value);
  };

  const updateWinery = (data: WineryDataProps) => {
    setGeneralInfo(data.generalInfo as WineryGeneralInfoInterface);
    setWines(data.wines);
  };

  useEffect(() => {}, []);

  const value = {
    formTitle,
    formDescription,
    showRegisterWinery,
    generalInfo,
    wines,
    updateFormTitle,
    updateFormDescription,
    updateWinery,
    updateShowRegisterWinery,
  };

  return (
    <WineryContext.Provider value={value}>{children}</WineryContext.Provider>
  );
};
