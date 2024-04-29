"use client";

import { WinePage } from "@/components";
import { EuLabelInterface, WineryGeneralInfoInterface } from "@/typings/winery";
import { useWine } from "@/context/wineContext";

export default function WineExplorer() {
  const { wineToShow } = useWine();
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
