"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  WineryDataInterface,
  WineryGeneralInfoInterface,
  WinesInterface,
  EuLabelInterface,
} from "@/typings/components";

export interface WineryContextInterface {
  formTitle: string;
  formDescription: string;
  isEditing: boolean;
  showRegisterWinery: boolean;
  exists: boolean;
  singleEuLabel: EuLabelInterface;
  updateSingleEuLabel: (data: EuLabelInterface) => void;
  updateFormDescription: (value: string) => void;
  updateFormTitle: (value: string) => void;
  updateIsEditing: (value: boolean) => void;
  updateShowRegisterWinery: (value: boolean) => void;
}

export const contextInitialData: WineryContextInterface = {
  formTitle: "Register Winery",
  formDescription:
    "Please fill in the form to register your winery. All fields marked with * are mandatory.",
  isEditing: false,
  showRegisterWinery: false,
  exists: false,
  singleEuLabel: {
    referenceNumber: "",
    upc: "",
    wineryName: "",
    wineName: "",
    harvestYear: "",
    controlledDesignationOfOrigin: "",
    country: "",
    alcoholLevel: "",
    bottleSize: "",
    typeOfWine: "",
    colourOfWine: "",
    producedBy: "",
    maturedInOakBarrel: false,
    bottledBy: "",
    addressOfProducer: "",
    qrCodeUrl: "",
    wineImageUrl: "",
    ingredients: {
      grapes: {
        has: false,
        list: [],
      },
      acidityRegulators: {
        has: false,
        list: [],
      },
      antioxidants: {
        has: false,
        list: [],
      },
      preservatives: {
        has: false,
        list: [],
      },
      stabilizers: {
        has: false,
        list: [],
      },
    },
    allergens: {
      sulphites: false,
      tanins: false,
      histamines: false,
      finingAgents: {
        eggWhites: false,
        milkProteins: false,
        gelatines: false,
        other: [],
      },
    },
  },
  updateSingleEuLabel: (data: EuLabelInterface) => {},
  updateFormTitle: (value: string) => {},
  updateIsEditing: (value: boolean) => {},
  updateFormDescription: (value: string) => {},
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
  const [exists, setExists] = useState<boolean>(contextInitialData.exists);
  const [formTitle, setFormTitle] = useState<string>(
    contextInitialData.formTitle
  );
  const [formDescription, setFormDescription] = useState<string>(
    contextInitialData.formDescription
  );
  const [isEditing, setIsEditing] = useState<boolean>(
    contextInitialData.isEditing
  );
  const [showRegisterWinery, setShowRegisterWinery] = useState<boolean>(false);

  const [singleEuLabel, setSingleEuLabel] = useState<EuLabelInterface>(
    contextInitialData.singleEuLabel
  );

  const updateFormTitle = (value: string) => {
    setFormTitle(value);
  };

  const updateFormDescription = (value: string) => {
    setFormDescription(value);
  };

  const updateIsEditing = (value: boolean) => {
    setIsEditing(value);
  };

  const updateShowRegisterWinery = (value: boolean) => {
    setShowRegisterWinery(value);
  };

  const updateWinery = (data: WineryDataInterface) => {
    setExists(data.exists);
  };

  const updateSingleEuLabel = (data: EuLabelInterface) => {
    setSingleEuLabel(data);
  };

  useEffect(() => {}, []);

  const value = {
    formTitle,
    formDescription,
    isEditing,
    showRegisterWinery,
    exists,
    singleEuLabel,
    updateSingleEuLabel,
    updateFormTitle,
    updateIsEditing,
    updateFormDescription,
    updateShowRegisterWinery,
  };

  return (
    <WineryContext.Provider value={value}>{children}</WineryContext.Provider>
  );
};
