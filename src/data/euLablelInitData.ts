import { EuLabelInterface } from "@/typings/winery";

export const euLabelInitData: EuLabelInterface = {
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
};
