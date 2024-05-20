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
  referenceNumber: string | null;
  // wine general information
  generalInformation: {
    wineryName: string | null;
    wineCollectionName: string | null;
    country: string | null;
    collectionSize: string | null;
    bottlingYear: string | null;
    awardsAndRecognitions: string[] | null;
    wineImageUrl: string | null;
    qrCodeUrl: string | null;
  };
  // wine characteristics
  characteristics: {
    wineColour: string | null;
    wineType: string | null;
    alcoholLevel: string | null;
    residualSugar: string | null;
    acidityLevel: string | null;
    tanningLevel: string | null;
    aromaProfile: {
      has: boolean | null;
      list: string[] | null;
    };
    flavourProfile: {
      has: boolean | null;
      list: string[] | null;
    };
    sulphiteLevel: string | null;
  };
  // wine-making technique
  wineMakingTechnique: {
    wineMakingTechnique: string | null;
    isWineVegan: boolean | null;
    isWineOrganic: boolean | null;
    isWineBioDynamic: boolean | null;
    isWineNatural: boolean | null;
    sustainablePractices: {
      has: boolean | null;
      list: string[] | null;
    };
  };
  // wine storage conditions
  storageConditions: {
    placeForInitialStorage: string | null;
    storageTemperature: StorageTemperature;
    lightingConditions: string | null;
    humidityLevel: string | null;
    vibrationLevel: string | null;
  };
  // wine packaging and branding
  packagingAndBranding: {
    bottleSize: string | null;
    bottleType: string | null;
    closureType: string[] | null;
    extraPackaging: string | null;
    upc: string | null;
  };
  // Blend components
  blendComponents: BlendComponent[];
  marketingInfo: string | null;
}

// BLEND COMPONENTS
export interface BlendComponent {
  name: string | null;
  type: string | null;
  ingredients: BlendIngredients;
  vineyardDetails: VineyardDetails;
  grapesHarvesting: GrapesHarvesting;
  fermentationProcess: FermentationProcess;
  agingProcess: AgingProcess;
}

// SINGLE GRAPE VARIETY
export interface GrapeVariety {
  name: string;
  percentage: string;
  vintageYear: number;
}

// BLEND INGREDIENTS
export interface BlendIngredients {
  grapesVarieties: {
    has: boolean;
    list: GrapeVariety[];
  };
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
  sugars: string;
}

// VINEYARD DETAILS
export interface VineyardDetails {
  id: string | null;
  controlledDesignationOfOrigin: string | null;
  grapeGrown: GrapeVariety;
  coordinates: CoordinateInterface[] | null;
  elevation: string | null;
  orientation: string | null;
  soilType: string | null;
  vinesAge: string | null;
  irrigationPractices: string[] | null;
}

// GRAPES HARVESTING
export interface GrapesHarvesting {
  vintageYear: number | null;
  harvestMethod: string | null;
  yieldPerHectare: string | null;
  selectionProcess: string | null;
}

// FERMENTATION PROCESS
export interface FermentationProcess {
  method: string | null;
  yeastType: string | null;
  time: string | null;
  malolactic: boolean | null;
}

// AGING PROCESS
export interface AgingProcess {
  vesselType: string | null;
}

// COORDINATE INTERFACE
export interface CoordinateInterface {
  lat: number;
  lng: number;
}

// GRAPES MAP COORDINATES INTERFACE
export interface GrapeAndVineyard {
  grape: GrapeVariety;
  vineyard: VineyardDetails;
}

// STORAGE TEMPERATURE
export type TemperatureUnits = "celcius" | "fahrenheit";
export interface SelectedTemperature {
  unit: TemperatureUnits | null;
  value: string | null;
}
export interface StorageTemperature {
  units: TemperatureUnits[];
  selected: SelectedTemperature | null;
}

export interface VineyardGrapeGrownWithCoordinates {
  grapeGrown: GrapeVariety | null;
  coordinates: CoordinateInterface[] | null;
}
