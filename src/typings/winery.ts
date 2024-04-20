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

export interface EuLabelInterface {
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
    grapes: {
      has: boolean;
      list: ItemWithPercentage[];
      listWithCoordinates: GrapesMapCoordinatesInterface[];
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
  };
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
