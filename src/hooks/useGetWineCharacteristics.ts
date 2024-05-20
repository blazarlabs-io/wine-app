import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

export const useGetWineCharacteristics = () => {
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [wineColours, setWineColours] = useState<string[]>([]);
  const [wineBottleSizes, setWineBottleSizes] = useState<string[]>([]);
  const [aromaProfiles, setAromaProfiles] = useState<string[]>([]);
  const [flavourProfiles, setFlavourProfiles] = useState<string[]>([]);

  const getWineTypesDb = httpsCallable(functions, "getWineTypesDb");
  const getWineColoursDb = httpsCallable(functions, "getWineColoursDb");
  const getWineBottleSizesDb = httpsCallable(functions, "getWineBottleSizesDb");
  const getAromaProfilesDb = httpsCallable(functions, "getAromaProfilesDb");
  const getFlavourProfilesDb = httpsCallable(functions, "getFlavourProfilesDb");

  useEffect(() => {
    getWineTypesDb()
      .then((result: any) => {
        setWineTypes(result.data.wineTypes);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineColoursDb()
      .then((result: any) => {
        setWineColours(result.data.wineColours);
      })
      .catch((error) => {
        console.error(error);
      });

    getWineBottleSizesDb()
      .then((result: any) => {
        setWineBottleSizes(result.data.wineBottleSizes);
      })
      .catch((error) => {
        console.error(error);
      });

    getAromaProfilesDb()
      .then((result: any) => {
        setAromaProfiles(result.data.aromaProfiles);
      })
      .catch((error) => {
        console.error(error);
      });

    getFlavourProfilesDb()
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
