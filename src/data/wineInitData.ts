import { Wine } from "@/typings/winery";

export const wineInitData: Wine = {
  referenceNumber: null,
  generalInformation: {
    wineryName: null,
    wineCollectionName: null,
    country: null,
    collectionSize: null,
    bottlingYear: null,
    awardsAndRecognitions: [],
    wineImageUrl: null,
    qrCodeUrl: null,
  },
  characteristics: {
    wineColour: null,
    wineType: null,
    alcoholLevel: null,
    residualSugar: null,
    acidityLevel: null,
    tanningLevel: null,
    aromaProfile: {
      has: null,
      list: [],
    },
    flavourProfile: {
      has: null,
      list: [],
    },
    sulphiteLevel: null,
  },
  wineMakingTechnique: {
    wineMakingTechnique: null,
    isWineVegan: null,
    isWineOrganic: null,
    isWineBioDynamic: null,
    isWineNatural: null,
    sustainablePractices: {
      has: null,
      list: [],
    },
  },
  storageConditions: {
    placeForInitialStorage: null,
    storageTemperature: {
      units: ["celcius", "fahrenheit"],
      selected: {
        unit: null,
        value: null,
      },
    },
    lightingConditions: null,
    humidityLevel: null,
    vibrationLevel: null,
  },
  packagingAndBranding: {
    bottleSize: null,
    bottleType: null,
    closureType: [],
    extraPackaging: null,
    upc: null,
  },
  blendComponents: [],
  marketingInfo: null,
};
