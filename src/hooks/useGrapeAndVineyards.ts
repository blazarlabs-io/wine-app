import {
  BlendComponent,
  GrapeAndVineyard,
  GrapeVariety,
  VineyardDetails,
} from "@/typings/winery";
import { useEffect, useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const useGrapeAndVineyards = () => {
  const { wines } = useRealtimeDb();

  const [grapesAndVineyards, setGrapesAndVineyards] = useState<
    GrapeAndVineyard[]
  >([]);

  useEffect(() => {
    wines.map((wine) => {
      wine.blendComponents.map((blendComponent: BlendComponent) => {
        const vineyard: VineyardDetails = blendComponent.vineyardDetails;
        const grapes: GrapeVariety[] =
          blendComponent.ingredients.grapesVarieties.list;
        grapes.map((grape) => {
          if (grape.name === vineyard.id) {
            setGrapesAndVineyards([...grapesAndVineyards, { grape, vineyard }]);
          }
        });
      });
    });
  }, []);

  return { grapesAndVineyards };
};
