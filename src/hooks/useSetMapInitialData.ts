import { CoordinateInterface } from "@/typings/winery";
import { useEffect, useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export const useSetMapInitialData = () => {
  const { wineryGeneralInfo } = useRealtimeDb();
  const [initialMapData, setInitialMapData] = useState<CoordinateInterface>();

  useEffect(() => {
    if (
      !wineryGeneralInfo.wineryHeadquarters ||
      wineryGeneralInfo.wineryHeadquarters.lat === 0 ||
      wineryGeneralInfo.wineryHeadquarters.lng === 0 ||
      wineryGeneralInfo.wineryHeadquarters.lat === null ||
      wineryGeneralInfo.wineryHeadquarters.lng === null ||
      wineryGeneralInfo.wineryHeadquarters.lat === undefined ||
      wineryGeneralInfo.wineryHeadquarters.lng === undefined
    ) {
      // * Default to Chisinau, Moldova
      setInitialMapData({ lat: 47.01107733795374, lng: 28.86435367870404 });
    } else {
      setInitialMapData(wineryGeneralInfo.wineryHeadquarters);
    }
  }, [wineryGeneralInfo.wineryHeadquarters]);

  return { initialMapData };
};
