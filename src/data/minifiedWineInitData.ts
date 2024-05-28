import { MinifiedWine } from "@/typings/winery";

export const minifiedWineInitData: MinifiedWine = {
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
};
