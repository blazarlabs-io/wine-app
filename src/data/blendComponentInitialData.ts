import { BlendComponent } from "@/typings/winery";

export const blendComponentInitialData: BlendComponent = {
  id: "",
  name: "",
  type: "",
  ingredients: {
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
  vineyardDetails: {
    name: "",
    grape: {
      name: "",
      percentage: "",
      vintageYear: 0,
    },
    controlledDesignationOfOrigin: "",
    coordinates: [],
    elevation: "",
    orientation: "",
    soilType: [],
    vinesAge: "",
    irrigationPractices: [],
  },
  grapesHarvesting: {
    vintageYear: 0,
    harvestMethod: "",
    yieldPerHectare: "",
    selectionProcess: "",
  },
  fermentationProcess: {
    method: "",
    yeastType: [],
    time: [],
    malolactic: false,
  },
  agingProcess: {
    vesselType: "",
  },
};
