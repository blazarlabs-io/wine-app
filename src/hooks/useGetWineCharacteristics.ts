import {
  getWineTypes,
  getWineColours,
  getWineBottleSizes,
  getAromaProfiles,
  getFlavourProfiles,
} from "@/utils/firestore";
import { useEffect, useState } from "react";

export const useGetWineCharacteristics = () => {
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [wineColours, setWineColours] = useState<string[]>([]);
  const [wineBottleSizes, setWineBottleSizes] = useState<string[]>([]);
  const [aromaProfiles, setAromaProfiles] = useState<string[]>([]);
  const [flavourProfiles, setFlavourProfiles] = useState<string[]>([]);

  useEffect(() => {
    getWineTypes()
      .then((result: any) => {
        setWineTypes(result.data.wineTypes);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineColours()
      .then((result: any) => {
        setWineColours(result.data.wineColours);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineBottleSizes()
      .then((result: any) => {
        setWineBottleSizes(result.data.wineBottleSizes);
      })
      .catch((error) => {
        console.error(error);
      });

    getAromaProfiles()
      .then((result: any) => {
        setAromaProfiles(result.data.aromaProfiles);
      })
      .catch((error) => {
        console.error(error);
      });

    getFlavourProfiles()
      .then((result: any) => {
        setFlavourProfiles(result.data.flavourProfiles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return {
    wineTypes,
    wineColours,
    wineBottleSizes,
    aromaProfiles,
    flavourProfiles,
  };
};
