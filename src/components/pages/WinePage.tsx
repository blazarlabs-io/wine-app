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
import { WineInterface, WineryGeneralInfoInterface } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect } from "react";
import { useAppState } from "@/context/appStateContext";

export interface WinePagePropsInterface {
  generalInfo?: WineryGeneralInfoInterface;
  wine: WineInterface | null;
}

export const WinePage = ({ generalInfo, wine }: WinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();
  useEffect(() => {
    console.log("wine", wine, "generalInfo", generalInfo);
    updateAppLoading(false);
  }, []);
  return (
    <>
      {wine && generalInfo ? (
        <div
          className={classNames(
            "flex flex-col items-center justify-center gap-[48px] w-full max-w-[800px]"
          )}
        >
          <WineImage imageUrl={wine?.wineImageUrl} />
          <WineHeadSection wine={wine as WineInterface} />
          <WineGeneralInformationSection item={wine as WineInterface} />
          <WineIngredientsSection item={wine as WineInterface} />
          <NutritionTable
            items={{
              alcoholLevel: wine.alcoholLevel,
              sugars: wine.ingredients.sugars,
              bottleSize: wine.bottleSize,
            }}
          />
          {wine.ingredients.grapes.list.length > 0 &&
            wine.ingredients.grapes.list[0].coordinates &&
            wine.ingredients.grapes.list[0].coordinates.length > 0 && (
              <MapViewerSection
                initialPosition={generalInfo?.wineryHeadquarters as any}
                initialItems={wine.ingredients.grapes.list}
              />
            )}
          <WineFooterSection wine={wine as WineInterface} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
