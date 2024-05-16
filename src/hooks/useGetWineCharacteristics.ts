import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

export const useGetWineCharacteristics = () => {
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [wineColours, setWineColours] = useState<string[]>([]);
  const [wineBottleSizes, setWineBottleSizes] = useState<string[]>([]);

  const getWineTypesDb = httpsCallable(functions, "getWineTypesDb");
  const getWineColoursDb = httpsCallable(functions, "getWineColoursDb");
  const getWineBottleSizesDb = httpsCallable(functions, "getWineBottleSizesDb");

  useEffect(() => {
    getWineTypesDb()
      .then((result: any) => {
        console.log("getWineTypesDb", result);
        setWineTypes(result.data.wineTypes);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineColoursDb()
      .then((result: any) => {
        console.log("getWineColoursDb", result);
        setWineColours(result.data.wineColours);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineBottleSizesDb()
      .then((result: any) => {
        console.log("getWineBottleSizesDb", result);
        setWineBottleSizes(result.data.wineBottleSizes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { wineTypes, wineColours, wineBottleSizes };
};
