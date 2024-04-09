// TEXT COMPONENT
export type TextIntentType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p1"
  | "p2";
export type TextVariantType =
  | "normal"
  | "accent"
  | "dim"
  | "inverted"
  | "error"
  | "success"
  | "warning"
  | "info";
export interface TextProps {
  children: React.ReactNode;
  className?: string;
  intent?: TextIntentType;
  variant?: TextVariantType;
}

// TOAST COMPONENT
export type ToastStatusType = "success" | "error" | "info" | "warning";
export interface ToastProps {
  show: boolean;
  status: ToastStatusType | null;
  message: string | null;
  timeout: number | null;
}

// WINERY STAT COMPONENT
export interface WineryStatInterface {
  title: string;
  icon: any;
  value: string;
  updatedAt: string;
}

// WINERY GENERAL DATA
export interface WineryGeneralInfoInterface {
  name: string;
  foundedOn: string;
  logo: string;
  collections: string;
  noOfProducedWines: string;
  vineyardsSurface: string;
  noOfBottlesProducedPerYear: string;
  grapeVarieties: string;
  lastUpdated: string;
  certifications: string[];
  wineryHeadquarters: {
    latitude: string;
    longitude: string;
  };
  wineryRepresentative: {
    name: string;
    email: string;
    phone: string;
  };
}

// WINERY WINES DATA
export interface WineGeneralInfoInterface {
  collectionName: string;
  bottlesProduced: string;
  yearOfBottling: string;
}

export interface WineCharacteristicsInterface {
  alcoholContent: string;
  residualSugar: string;
  acidityLevel: string;
  tanningLevel: string;
  wineColor: string;
  aromaProfile: string;
  flavorProfile: string;
  sulfiteLevel: string;
}

export interface WineStorageConditionsInterface {
  initialStorage: string;
  temperature: string;
  lightExposure: string;
  humidityLevel: string;
  vibrationLevel: string;
}

export interface WineMakingTechniquesInterface {
  technique: "singleGrape" | "cepage" | "coupage";
}

export interface WinePackagingInterface {
  bottleType: string;
  bottleSizing: string;
  closureType: string;
  upcCode: string;
}

export interface WinesInterface {
  generalInfo: WineGeneralInfoInterface;
  characteristics: WineCharacteristicsInterface;
  storageConditions: WineStorageConditionsInterface;
  makingTechniques: WineMakingTechniquesInterface;
  packaging: WinePackagingInterface;
}

export interface EuLabelInterface {
  referenceNumber: string;
  upc: string;
  wineryName: string;
  wineName: string;
  harvestYear: string;
  controlledDesignationOfOrigin: string;
  country: string;
  alcoholLevel: string;
  bottleSize: string;
  typeOfWine: string;
  colourOfWine: string;
  producedBy: string;
  maturedInOakBarrel: boolean;
  bottledBy: string;
  addressOfProducer: string;
  qrCodeUrl: string;
  wineImageUrl: string;
  ingredients: {
    grapes: {
      has: boolean;
      list: string[];
    };
    acidityRegulators: {
      has: boolean;
      list: string[];
    };
    antioxidants: {
      has: boolean;
      list: string[];
    };
    preservatives: {
      has: boolean;
      list: string[];
    };
    stabilizers: {
      has: boolean;
      list: string[];
    };
  };
  allergens: {
    sulphites: boolean;
    tanins: boolean;
    histamines: boolean;
    finingAgents: FiningAgentInterface;
  };
}

export interface FiningAgentInterface {
  eggWhites: boolean;
  milkProteins: boolean;
  gelatines: boolean;
  other: string[];
}

// WINERY DATA PROPS
export interface WineryDataInterface {
  exists: boolean;
  wineryGeneralInfo: WineryGeneralInfoInterface | null;
  tier: string | null;
  level: string | null;
  wines: WinesInterface[] | null;
  euLabels: EuLabelInterface[] | null;
}

export interface WineryInterface {
  generalInfo: WineryGeneralInfoInterface | null;
  tier: string | null;
  level: string | null;
  wines: WinesInterface[] | null;
  euLabels: EuLabelInterface[] | null;
}

// MODAL COMPONENT
export interface ModalProps {
  show: boolean;
  title: string;
  description: string;
  action: {
    label: string;
    onAction: () => void;
  };
}
