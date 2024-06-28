"use client";

import {
  ExtendedWineHeadSection,
  ExtendedWineGeneralInformationSection,
  ExtendedWineCharacteristicsSection,
  GeneralLoaderOverlay,
  WineFooterSection,
  WineImage,
  NutritionTable,
  ExtendedWineStorageConditionsSection,
  ExtendedWineMakingTechniqueSection,
  ExtendedWinePackagingAndBrandingSection,
  WineBlendComponentsSection,
  Text,
  TokenizedWineStorageConditionsSection,
} from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { useAppState } from "@/context/appStateContext";
import { SensorData } from "@/hooks/useGetIpfsData";
import { Icon } from "@iconify/react";

export interface TokenizedWinePagePropsInterface {
  generalInfo?: WineryGeneralInfo;
  wine: Wine | null;
  sensorData: {
    temperature: SensorData[];
    humidity: SensorData[];
    vibration: SensorData[];
    lighting: SensorData[];
  };
}

export const TokenizedWinePage = ({
  generalInfo,
  wine,
  sensorData,
}: TokenizedWinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();
  const [sensors, setSensors] = useState<any>(null);

  const mapData = {
    initialPosition: generalInfo?.wineryHeadquarters as any,
  };

  useEffect(() => {
    updateAppLoading(false);
  }, [sensorData]);
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

          <div className="flex flex-col items-center justify-center w-full relative max-w-fit">
            <ExtendedWineHeadSection wine={wine as Wine} />
            <Icon
              icon="formkit:cardano"
              width="40px"
              height="40px"
              className="text-status-info top-[56px] left-[112px] absolute"
            />
            <Icon
              icon="material-symbols-light:token-outline"
              width="40px"
              height="40px"
              className="text-status-info top-[56px] right-[112px] absolute"
            />
            <Text variant="accent" className="text-status-info">
              This wine is tokenized
            </Text>
          </div>

          <ExtendedWineGeneralInformationSection item={wine as Wine} />
          <ExtendedWineCharacteristicsSection item={wine as Wine} />
          <TokenizedWineStorageConditionsSection sensorData={sensorData} />
          <ExtendedWineMakingTechniqueSection item={wine as Wine} />
          <ExtendedWinePackagingAndBrandingSection item={wine as Wine} />
          <WineBlendComponentsSection item={wine as Wine} mapData={mapData} />
          <NutritionTable
            items={{
              alcoholLevel: wine.characteristics.alcoholLevel,
              sugars: wine.characteristics.residualSugar,
              bottleSize: wine.packagingAndBranding.bottleSize,
            }}
          />

          <WineFooterSection wine={wine as Wine} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
