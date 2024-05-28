import { MinifiedWine, Wine } from "@/typings/winery";
import { useEffect, useState } from "react";

export const useMinifiedOrExtendedWineArray = (wines: Wine[]) => {
  const [currentWines, setCurrentWines] = useState<(Wine | MinifiedWine)[]>([]);

  useEffect(() => {
    if (!wines) return;

    wines.map((wine) => {
      let wineToAdd: Wine | MinifiedWine;
      if (wine.isMinified) {
        wineToAdd = wine.minifiedWine;
        setCurrentWines(
          (prev) => [...prev, wineToAdd] as (Wine | MinifiedWine)[]
        );
      } else {
        wineToAdd = wine;
        setCurrentWines(
          (prev) => [...prev, wineToAdd] as (Wine | MinifiedWine)[]
        );
      }
    });
  }, [wines]);

  return { currentWines };
};
