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
  location: string;
  noOfProducedWines: string;
  vineyardsSurface: string;
  noOfBottlesProducedPerYear: string;
  grapeVarieties: string;
  lastUpdated: string;
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

// WINERY DATA PROPS
export interface WineryDataProps {
  generalInfo: WineryGeneralInfoInterface | null;
  wines: WinesInterface[] | null;
}
