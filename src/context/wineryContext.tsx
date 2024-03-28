"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  WineryDataProps,
  WineryGeneralInfoInterface,
  WinesInterface,
  EuLabelsInterface,
} from "@/typings/components";

export interface WineryContextInterface extends WineryDataProps {
  formTitle: string;
  formDescription: string;
  showRegisterWinery: boolean;
  generalInfo: WineryGeneralInfoInterface;
  wines: WinesInterface[] | null;
  singleEuLabel: EuLabelsInterface | null;
  euLabels: EuLabelsInterface[] | null;
  updateSingleEuLabel: (data: EuLabelsInterface) => void;
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
  singleEuLabel: null,
  euLabels: null,
  updateSingleEuLabel: (data: EuLabelsInterface) => {},
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
    contextInitialData.wines as WinesInterface[]
  );
  const [singleEuLabel, setSingleEuLabel] = useState<EuLabelsInterface | null>(
    null
  );
  const [euLabels, setEuLabels] = useState<EuLabelsInterface[]>(
    contextInitialData.euLabels as EuLabelsInterface[]
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
    setWines(data.wines as WinesInterface[]);
    setEuLabels(data.euLabels as EuLabelsInterface[]);
  };

  const updateSingleEuLabel = (data: EuLabelsInterface) => {
    setSingleEuLabel(data);
  };

  useEffect(() => {}, []);

  const value = {
    formTitle,
    formDescription,
    showRegisterWinery,
    generalInfo,
    wines,
    singleEuLabel,
    euLabels,
    updateSingleEuLabel,
    updateFormTitle,
    updateFormDescription,
    updateWinery,
    updateShowRegisterWinery,
  };

  return (
    <WineryContext.Provider value={value}>{children}</WineryContext.Provider>
  );
};
