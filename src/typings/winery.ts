import { Timestamp } from "firebase/firestore";

export type Level = "bronze" | "silver" | "gold" | "platinum";

// WINERY
export interface Winery {
  generalInfo: WineryGeneralInfo;
  disabled: boolean;
  isVerified: boolean;
  id: string;
  level: Level;
  tier: number;
  wines: Wine[];
}

// CREATE ADMIN NOTIFICATION
export interface CreateAdminNotification {
  requestDate: Timestamp;
  wineryName: string;
  wineryEmail: string;
  wineryPhone: string;
  wineryRepresentative: string;
}

// WINERY GENERAL INFORMATION
export interface WineryGeneralInfo {
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
  wineryHeadquarters: CoordinateInterface;
  wineryRepresentative: {
    name: string;
    email: string;
    phone: string;
  };
}

// SINGLE WINE
export interface Wine {
  referenceNumber: string;
  isMinified: boolean;
  createdAt: Timestamp | null;
  // wine general information
  generalInformation: {
    wineryName: string;
    wineryId: string;
    wineCollectionName: string;
    country: string;
    collectionSize: string;
    bottlingYear: string;
    awardsAndRecognitions: string[];
    wineImageUrl: string;
    qrCodeUrl: string;
  };
  // wine characteristics
  characteristics: {
    wineColour: string;
    wineType: string;
    alcoholLevel: string;
    residualSugar: string;
    acidityLevel: string;
    tanningLevel: string;
    aromaProfile: {
      has: boolean;
      list: string[];
    };
    flavourProfile: {
      has: boolean;
      list: string[];
    };
    sulphiteLevel: string;
  };
  // wine-making technique
  wineMakingTechnique: {
    wineMakingTechnique: string;
    isWineVegan: boolean;
    isWineOrganic: boolean;
    isWineBioDynamic: boolean;
    isWineNatural: boolean;
    sustainablePractices: {
      has: boolean;
      list: string[];
    };
  };
  // wine storage conditions
  storageConditions: {
    placeForInitialStorage: string;
    storageTemperature: StorageTemperature;
    lightingConditions: string;
    humidityLevel: string;
    vibrationLevel: string;
  };
  // wine packaging and branding
  packagingAndBranding: {
    bottleSize: string;
    bottleType: string[];
    closureType: string[];
    extraPackaging: string;
    upc: string;
  };
  // Blend components
  blendComponents: BlendComponent[];
  marketingInfo: string;
  minifiedWine: MinifiedWine;
  // Tokenization
  tokenization: {
    isTokenized: boolean;
    tokenizationDate: Timestamp | null;
    ipfsHash: string;
    ipfsUrl: string;
  };
}

// MINIFIED WINE
export interface MinifiedWine {
  upc: string;
  wineryName: string;
  wineryId: string;
  wineCollectionName: string;
  country: string;
  wineType: string;
  bottleSize: string;
  wineColour: string;
  alcoholLevel: string;
  controlledDesignationOfOrigin: string;
  wineImageUrl: string;
  qrCodeUrl: string;
  grapes: Grape[];
  blendIngredients: BlendIngredients;
  residualSugar: string;
}

// BLEND COMPONENTS
export interface BlendComponent {
  id: string;
  name: string;
  type: string;
  ingredients: BlendIngredients;
  vineyardDetails: VineyardDetails;
  grapesHarvesting: GrapesHarvesting;
  fermentationProcess: FermentationProcess;
  agingProcess: AgingProcess;
}

// SINGLE GRAPE VARIETY
export interface Grape {
  name: string;
  percentage: string;
  vintageYear: number;
}

// BLEND INGREDIENTS
export interface BlendIngredients {
  acidityRegulators: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
  antioxidants: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
  preservatives: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
  stabilizers: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
  finingAgents: {
    allergens: {
      has: boolean;
      list: string[];
    };
    has: boolean;
    list: string[];
  };
}

// VINEYARD DETAILS
export interface VineyardDetails {
  name: string;
  controlledDesignationOfOrigin: string;
  grape: Grape;
  coordinates: CoordinateInterface[];
  elevation: string;
  orientation: string;
  soilType: string[];
  vinesAge: string;
  irrigationPractices: string[];
}

// GRAPES HARVESTING
export interface GrapesHarvesting {
  vintageYear: number;
  harvestMethod: string;
  yieldPerHectare: string;
  selectionProcess: string;
}

// FERMENTATION PROCESS
export interface FermentationProcess {
  method: string;
  yeastType: string[];
  time: string[];
  malolactic: boolean;
}

// AGING PROCESS
export interface AgingProcess {
  vesselType: string;
}

// COORDINATE INTERFACE
export interface CoordinateInterface {
  lat: number;
  lng: number;
}

// GRAPES MAP COORDINATES INTERFACE
export interface GrapeAndVineyard {
  grape: Grape;
  vineyard: VineyardDetails;
}

// STORAGE TEMPERATURE
export type TemperatureUnits = "celcius" | "fahrenheit";

export interface SelectedTemperature {
  unit: TemperatureUnits;
  value: string;
}
export interface StorageTemperature {
  units: TemperatureUnits[];
  selected: SelectedTemperature;
}

export interface VineyardGrapeAndCoordinates {
  grape: Grape;
  coordinates: CoordinateInterface[];
}
