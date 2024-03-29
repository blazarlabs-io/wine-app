"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  WineryDataInterface,
  WineryGeneralInfoInterface,
  WinesInterface,
  EuLabelInterface,
} from "@/typings/components";

export interface WineryContextInterface extends WineryDataInterface {
  formTitle: string;
  formDescription: string;
  showRegisterWinery: boolean;
  generalInfo: WineryGeneralInfoInterface;
  exists: boolean;
  wines: WinesInterface[] | null;
  singleEuLabel: EuLabelInterface;
  euLabels: EuLabelInterface[] | null;
  updateSingleEuLabel: (data: EuLabelInterface) => void;
  updateFormDescription: (value: string) => void;
  updateFormTitle: (value: string) => void;
  updateWinery: (data: WineryDataInterface) => void;
  updateShowRegisterWinery: (value: boolean) => void;
}

export const contextInitialData: WineryContextInterface = {
  formTitle: "Register Winery",
  formDescription:
    "Please fill in the form to register your winery. All fields marked with * are mandatory.",
  showRegisterWinery: false,
  exists: false,
  generalInfo: {
    name: "",
    foundedOn: "",
    location: "",
    logo: "",
    noOfProducedWines: "",
    vineyardsSurface: "",
    noOfBottlesProducedPerYear: "",
    grapeVarieties: "",
    lastUpdated: "",
    wineryHeadquarters: {
      latitude: 0,
      longitude: 0,
    },
  },
  wines: null,
  singleEuLabel: {
    referenceNumber: "",
    upc: "",
    wineryName: "",
    wineName: "",
    harvestYear: "",
    controlledDesignationOfOrigin: "",
    country: "",
    product: "",
    alcoholLevel: "",
    bottleSize: "",
    kindOfWine: "",
    colourOfWine: "",
    producedBy: "",
    maturedInOakBarrel: false,
    bottledBy: "",
    addressOfProducer: "",
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
  euLabels: null,
  updateSingleEuLabel: (data: EuLabelInterface) => {},
  updateFormTitle: (value: string) => {},
  updateFormDescription: (value: string) => {},
  updateWinery: (data: WineryDataInterface) => {},
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
  const [showRegisterWinery, setShowRegisterWinery] = useState<boolean>(false);
  const [generalInfo, setGeneralInfo] = useState<WineryGeneralInfoInterface>(
    contextInitialData.generalInfo
  );
  const [wines, setWines] = useState<WinesInterface[]>(
    contextInitialData.wines as WinesInterface[]
  );
  const [singleEuLabel, setSingleEuLabel] = useState<EuLabelInterface>(
    contextInitialData.singleEuLabel
  );
  const [euLabels, setEuLabels] = useState<EuLabelInterface[]>(
    contextInitialData.euLabels as EuLabelInterface[]
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

  const updateWinery = (data: WineryDataInterface) => {
    setExists(data.exists);
    setGeneralInfo(data.generalInfo as WineryGeneralInfoInterface);
    setWines(data.wines as WinesInterface[]);
    setEuLabels(data.euLabels as EuLabelInterface[]);
  };

  const updateSingleEuLabel = (data: EuLabelInterface) => {
    setSingleEuLabel(data);
  };

  useEffect(() => {}, []);

  const value = {
    formTitle,
    formDescription,
    showRegisterWinery,
    generalInfo,
    exists,
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
