"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  WineryDataInterface,
  WineryGeneralInfoInterface,
  WinesInterface,
  EuLabelInterface,
} from "@/typings/winery";

export interface WineryContextInterface {
  formTitle: string;
  formDescription: string;
  isEditing: boolean;
  euLabelToEdit: EuLabelInterface | null;
  showRegisterWinery: boolean;
  exists: boolean;
  singleEuLabel: EuLabelInterface;
  updateSingleEuLabel: (data: EuLabelInterface) => void;
  updateFormDescription: (value: string) => void;
  updateFormTitle: (value: string) => void;
  updateIsEditing: (value: boolean) => void;
  updateShowRegisterWinery: (value: boolean) => void;
  updateEuLabelToEdit: (data: EuLabelInterface) => void;
}

export const contextInitialData: WineryContextInterface = {
  formTitle: "Register Winery",
  formDescription:
    "Please fill in the form to register your winery. All fields marked with * are mandatory.",
  isEditing: false,
  euLabelToEdit: null,
  showRegisterWinery: false,
  exists: false,
  singleEuLabel: {
    referenceNumber: "",
    upc: "",
    wineryName: "",
    wineCollectionName: "",
    harvestYear: "",
    controlledDesignationOfOrigin: "",
    country: "",
    alcoholLevel: "",
    bottleSize: "",
    typeOfWine: "",
    colourOfWine: "",
    qrCodeUrl: "",
    wineImageUrl: "",
    ingredients: {
      grapes: {
        has: false,
        list: [],
      },
      acidityRegulators: {
        allergens: {
          has: false,
          list: [],
        },
        has: false,
        list: [],
      },
      antioxidants: {
        allergens: {
          has: false,
          list: [],
        },
        has: false,
        list: [],
      },
      preservatives: {
        allergens: {
          has: false,
          list: [],
        },
        has: false,
        list: [],
      },
      stabilizers: {
        allergens: {
          has: false,
          list: [],
        },
        has: false,
        list: [],
      },
      finingAgents: {
        allergens: {
          has: false,
          list: [],
        },
        has: false,
        list: [],
      },
      sugars: "",
    },
  },
  updateSingleEuLabel: (data: EuLabelInterface) => {},
  updateFormTitle: (value: string) => {},
  updateIsEditing: (value: boolean) => {},
  updateFormDescription: (value: string) => {},
  updateShowRegisterWinery: (value: boolean) => {},
  updateEuLabelToEdit: (data: EuLabelInterface) => {},
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
  const [euLabelToEdit, setEuLabelToEdit] = useState<EuLabelInterface | null>(
    contextInitialData.euLabelToEdit
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

  const updateEuLabelToEdit = (data: EuLabelInterface) => {
    setEuLabelToEdit(data);
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
    euLabelToEdit,
    showRegisterWinery,
    exists,
    singleEuLabel,
    updateSingleEuLabel,
    updateFormTitle,
    updateIsEditing,
    updateFormDescription,
    updateShowRegisterWinery,
    updateEuLabelToEdit,
  };

  return (
    <WineryContext.Provider value={value}>{children}</WineryContext.Provider>
  );
};
