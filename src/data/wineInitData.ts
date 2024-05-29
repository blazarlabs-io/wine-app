import { Wine } from "@/typings/winery";

export const wineInitData: Wine = {
  referenceNumber: "",
  isMinified: true,
  generalInformation: {
    wineryName: "",
    wineCollectionName: "",
    country: "",
    collectionSize: "",
    bottlingYear: "",
    awardsAndRecognitions: [],
    wineImageUrl: "",
    qrCodeUrl: "",
  },
  characteristics: {
    wineColour: "",
    wineType: "",
    alcoholLevel: "",
    residualSugar: "",
    acidityLevel: "",
    tanningLevel: "",
    aromaProfile: {
      has: false,
      list: [],
    },
    flavourProfile: {
      has: false,
      list: [],
    },
    sulphiteLevel: "",
  },
  wineMakingTechnique: {
    wineMakingTechnique: "",
    isWineVegan: false,
    isWineOrganic: false,
    isWineBioDynamic: false,
    isWineNatural: false,
    sustainablePractices: {
      has: false,
      list: [],
    },
  },
  storageConditions: {
    placeForInitialStorage: "",
    storageTemperature: {
      units: ["celcius", "fahrenheit"],
      selected: {
        unit: "celcius",
        value: "",
      },
    },
    lightingConditions: "",
    humidityLevel: "",
    vibrationLevel: "",
  },
  packagingAndBranding: {
    bottleSize: "",
    bottleType: [],
    closureType: [],
    extraPackaging: "",
    upc: "",
  },
  blendComponents: [],
  marketingInfo: "",
  minifiedWine: {
    upc: "",
    wineryName: "",
    wineCollectionName: "",
    country: "",
    wineType: "",
    bottleSize: "",
    wineColour: "",
    alcoholLevel: "",
    controlledDesignationOfOrigin: "",
    wineImageUrl: "",
    qrCodeUrl: "",
    grapes: [],
    blendIngredients: {
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
    },
    residualSugar: "",
  },
};
