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
  MapViewerSection,
} from "@/components";
import { EuLabelInterface, WineryGeneralInfoInterface } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect } from "react";
import { useAppState } from "@/context/appStateContext";

export interface WinePagePropsInterface {
  generalInfo?: WineryGeneralInfoInterface;
  euLabel: EuLabelInterface | null;
}

export const WinePage = ({ generalInfo, euLabel }: WinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();
  useEffect(() => {
    console.log("euLabel", euLabel, "generalInfo", generalInfo);
    updateAppLoading(false);
  }, []);
  return (
    <>
      {euLabel && generalInfo ? (
        <div
          className={classNames(
            "flex flex-col items-center justify-center gap-[48px] w-full max-w-[800px]"
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
          {euLabel.ingredients.grapes.list.length > 0 &&
            euLabel.ingredients.grapes.list[0].coordinates.length > 0 && (
              <MapViewerSection
                initialPosition={generalInfo?.wineryHeadquarters as any}
                initialItems={euLabel.ingredients.grapes.list}
              />
            )}
          <WineFooterSection euLabel={euLabel as EuLabelInterface} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
