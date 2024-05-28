import { MinifiedWine, Wine } from "@/typings/winery";
import { useEffect, useState } from "react";

export const useMinifiedOrExtendedWine = (wine: Wine) => {
  const [currentWine, setCurrentWine] = useState<Wine | MinifiedWine | null>(
    null
  );

  useEffect(() => {
    if (wine.isMinified) {
      setCurrentWine(wine.minifiedWine as MinifiedWine);
    } else {
      setCurrentWine(wine as Wine);
    }
  }, [wine]);

  return { currentWine };
};
