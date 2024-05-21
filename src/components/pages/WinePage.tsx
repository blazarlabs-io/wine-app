"use client";

import {
  Container,
  WineHeadSection,
  WineGeneralInformationSection,
  WineCharacteristicsSection,
  GeneralLoaderOverlay,
  WineFooterSection,
  WineImage,
  NutritionTable,
  MapViewerSection,
  WineStorageConditionsSection,
  WineMakingTechniqueSection,
  WinePackagingAndBrandingSection,
  WineBlendComponentsSection,
} from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect } from "react";
import { useAppState } from "@/context/appStateContext";

export interface WinePagePropsInterface {
  generalInfo?: WineryGeneralInfo;
  wine: Wine | null;
}

export const WinePage = ({ generalInfo, wine }: WinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();

  const mapData = {
    initialPosition: generalInfo?.wineryHeadquarters as any,
  };

  useEffect(() => {
    updateAppLoading(false);
  }, []);
  return (
    <>
      {wine && generalInfo ? (
        <div
          className={classNames(
            "flex flex-col items-center justify-center gap-[48px] w-full max-w-[800px] mb-[48px]"
          )}
        >
          <WineImage
            imageUrl={wine?.generalInformation.wineImageUrl as string}
          />
          <WineHeadSection wine={wine as Wine} />
          <WineGeneralInformationSection item={wine as Wine} />
          <WineCharacteristicsSection item={wine as Wine} />
          <WineStorageConditionsSection item={wine as Wine} />
          <WineMakingTechniqueSection item={wine as Wine} />
          <WinePackagingAndBrandingSection item={wine as Wine} />
          <WineBlendComponentsSection item={wine as Wine} mapData={mapData} />
          {/* <NutritionTable
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
            )} */}
          <WineFooterSection wine={wine as Wine} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
