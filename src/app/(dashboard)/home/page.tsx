"use client";

import { DashboardHomePage } from "@/components";
import { WineryDataProps } from "@/typings/components";
import { useEffect } from "react";
import { useWinery } from "@/context/wineryContext";
import { wines } from "@/data/winesSample";

const wineryData: WineryDataProps = {
  generalInfo: {
    name: "Helver Wines",
    foundedOn: "1923",
    location: "39990 Anza Road, Temecula, CA 92591",
    noOfProducedWines: wines.length.toString(),
    vineyardsSurface: "50 Ha",
    noOfBottlesProducedPerYear: "3000",
    grapeVarieties: "5",
    lastUpdated: new Date().toLocaleString(),
  },
  wines: wines,
  euLabels: null,
};

// const wineryData: WineryDataProps = {
//   generalInfo: null,
//   wines: null,
// };

export default function DahsboardHome() {
  const { updateWinery } = useWinery();

  useEffect(() => {
    const newWineryData: WineryDataProps = {
      generalInfo: wineryData.generalInfo,
      wines: wineryData.wines,
      euLabels: wineryData.euLabels,
    };
    updateWinery(newWineryData);
  }, []);

  return <DashboardHomePage />;
}
