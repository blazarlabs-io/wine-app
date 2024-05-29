import { Timestamp } from "firebase-admin/firestore";

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
  bottleType: string[];
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

export interface CoordinateInterface extends google.maps.LatLng {
  lat: () => number;
  lng: () => number;
}

export interface GrapesMapCoordinatesInterface {
  name: string;
  percentage: string;
  coordinates: any[];
}
export interface ItemWithPercentage {
  name: string;
  percentage: string;
}

export interface GrapesInterface {
  has: boolean;
  list: GrapesMapCoordinatesInterface[];
}

export interface WineInterface {
  referenceNumber: string;
  upc: string;
  wineryName: string;
  wineCollectionName: string;
  harvestYear: string;
  controlledDesignationOfOrigin: string;
  country: string;
  alcoholLevel: string;
  bottleSize: string;
  typeOfWine: string;
  colourOfWine: string;
  qrCodeUrl: string;
  wineImageUrl: string;
  ingredients: {
    grapes: GrapesInterface;
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
  };
}

// WINERY DATA PROPS
export interface WineryDataInterface {
  exists: boolean;
  wineryGeneralInfo: WineryGeneralInfoInterface | null;
  tier: string | null;
  level: string | null;
  wines: WineInterface[] | null;
}

export interface WineryInterface {
  generalInfo: WineryGeneralInfoInterface | null;
  tier: string | null;
  level: string | null;
  wines: WineInterface[] | null;
}

export interface CreateAdminNotification {
  requestDate: Timestamp;
  wineryName: string;
  wineryEmail: string;
  wineryPhone: string;
  wineryRepresentative: string;
}

//////////////////////////////////////////
//////////////////////////////////////////

export interface Wine {
  referenceNumber: string;
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
  // wine storage conditions
  storageConditions: {
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
  // wine packaging and branding
  packagingAndBranding: {
    bottleSize: string | null;
    bottleType: string | null;
    closureType: string | null;
    extraPackaging: string | null;
    upc: string | null;
  };
  // Blend components
  blendComponents: BlendComponent[];
  marketingInfo: string;
}

// BLEND COMPONENTS
export interface BlendComponent {
  ingredients: BlendIngredients | null;
  vineyardDetails: VineyardDetails | null;
  grapesHarvesting: GrapesHarvesting | null;
  fermentationProcess: FermentationProcess | null;
  agingProcess: AgingProcess | null;
}

// SINGLE GRAPE VARIETY
export interface Grape {
  name: string;
  percentage: string;
  vineyardId: string;
}

// BLEND INGREDIENTS
export interface BlendIngredients {
  grapesVarieties: {
    has: boolean;
    list: Grape[];
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
  controlledDesignationOfOrigin: string | null;
  coordinates: CoordinateInterface[] | null;
  elevation: string | null;
  orientation: string | null;
  soilType: string | null;
  vinesAge: string | null;
  irrigationPractices: string[] | null;
}

// GRAPES HARVESTING
export interface GrapesHarvesting {
  harvestMethod: string | null;
  yieldPerHectare: string | null;
  selectionProcess: string | null;
}

// FERMENTATION PROCESS
export interface FermentationProcess {
  method: string | null;
  yeastType: string[] | null;
  time: string[] | null;
  malolactic: boolean | null;
}

// AGING PROCESS
export interface AgingProcess {
  vesselType: string | null;
}
