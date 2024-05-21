import { BlendComponent } from "@/typings/winery";

export const blendComonetnInitialData: BlendComponent = {
  name: null,
  type: null,
  ingredients: {
    grapesVarieties: {
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
  vineyardDetails: {
    id: null,
    grapeGrown: {
      vintageYear: null,
      name: null,
      percentage: null,
    },
    controlledDesignationOfOrigin: null,
    coordinates: [],
    elevation: null,
    orientation: null,
    soilType: null,
    vinesAge: null,
    irrigationPractices: [],
  },
  grapesHarvesting: {
    vintageYear: null,
    harvestMethod: null,
    yieldPerHectare: null,
    selectionProcess: null,
  },
  fermentationProcess: {
    method: null,
    yeastType: null,
    time: null,
    malolactic: null,
  },
  agingProcess: {
    vesselType: null,
  },
};
