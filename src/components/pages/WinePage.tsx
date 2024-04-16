"use client";

import {
  Container,
  WineHeadSection,
  WineGeneralInformationSection,
  WineIngredientsSection,
  GeneralLoaderOverlay,
  WineFooterSection,
  WineImage,
  NutritionTable,
} from "@/components";
import { EuLabelInterface } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect } from "react";
import { useAppState } from "@/context/appStateContext";

export interface WinePagePropsInterface {
  euLabel: EuLabelInterface | null;
}

export const WinePage = ({ euLabel }: WinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();
  useEffect(() => {
    updateAppLoading(false);
  }, []);
  return (
    <>
      {euLabel ? (
        <div
          className={classNames(
            "flex flex-col items-center justify-center gap-[48px] w-full z-[-2] mb-[32px] max-w-[800px]"
          )}
        >
          <WineImage imageUrl={euLabel?.wineImageUrl} />
          <WineHeadSection euLabel={euLabel as EuLabelInterface} />
          <WineGeneralInformationSection item={euLabel as EuLabelInterface} />
          <WineIngredientsSection item={euLabel as EuLabelInterface} />
          <NutritionTable
            items={{
              alcoholLevel: euLabel.alcoholLevel,
              sugars: euLabel.ingredients.sugars,
              bottleSize: euLabel.bottleSize,
            }}
          />
          <WineFooterSection euLabel={euLabel as EuLabelInterface} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
