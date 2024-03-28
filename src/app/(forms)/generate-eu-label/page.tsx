"use client";

import { GenerateEuLabelPage } from "@/components";
import { useWinery } from "@/context/wineryContext";
import { EuLabelsInterface, WineryDataProps } from "@/typings/components";
import { useEffect } from "react";

export default function GenerateEuLabel() {
  const { updateWinery, generalInfo, wines } = useWinery();

  const wineryData: WineryDataProps = {
    generalInfo: generalInfo,
    wines: wines,
    euLabels: null,
  };

  useEffect(() => {
    const newWineryData: WineryDataProps = {
      generalInfo: wineryData.generalInfo,
      wines: wineryData.wines,
      euLabels: wineryData.euLabels,
    };
    updateWinery(newWineryData);
  }, []);

  return <GenerateEuLabelPage />;
}
