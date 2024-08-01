import { useEffect, useState } from "react";

import { useWineClient } from "@/context/wineClientSdkContext";

export const useGetWineCharacteristics = () => {
  const { wineClient } = useWineClient();

  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [wineColours, setWineColours] = useState<string[]>([]);
  const [wineBottleSizes, setWineBottleSizes] = useState<string[]>([]);
  const [aromaProfiles, setAromaProfiles] = useState<string[]>([]);
  const [flavourProfiles, setFlavourProfiles] = useState<string[]>([]);

  useEffect(() => {
    if (wineClient) {
      wineClient.utils
        .getSystemVariable("wineTypes")
        .then((result: any) => {
          setWineTypes(result.data);
        })
        .catch((error: any) => {
          console.error(error);
        });

      wineClient.utils
        .getSystemVariable("wineColours")
        .then((result: any) => {
          setWineColours(result.data);
        })
        .catch((error: any) => {
          console.error(error);
        });

      wineClient.utils
        .getSystemVariable("wineBottleSizes")
        .then((result: any) => {
          setWineBottleSizes(result.data);
        })
        .catch((error: any) => {
          console.error(error);
        });

      wineClient.utils
        .getSystemVariable("aromaProfiles")
        .then((result: any) => {
          setAromaProfiles(result.data);
        })
        .catch((error: any) => {
          console.error(error);
        });

      wineClient.utils
        .getSystemVariable("flavourProfiles")
        .then((result: any) => {
          setFlavourProfiles(result.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [wineClient]);

  return {
    wineTypes,
    wineColours,
    wineBottleSizes,
    aromaProfiles,
    flavourProfiles,
  };
};
