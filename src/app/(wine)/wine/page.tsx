"use client";

import { WinePage } from "@/components";
import { EuLabelInterface, WineryGeneralInfoInterface } from "@/typings/winery";
import { useWine } from "@/context/wineContext";
import { useAppState } from "@/context/appStateContext";
import { useEffect } from "react";

export default function WineExplorer() {
  const { wineToShow } = useWine();
  const { updateAppLoading } = useAppState();

  useEffect(() => {
    updateAppLoading(false);
  }, []);
  return (
    <>
      {wineToShow.euLabel && wineToShow.generalInfo && (
        <WinePage
          generalInfo={wineToShow.generalInfo as WineryGeneralInfoInterface}
          euLabel={wineToShow.euLabel as EuLabelInterface}
        />
      )}
    </>
  );
}
