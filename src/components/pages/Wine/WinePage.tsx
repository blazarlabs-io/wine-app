"use client";

import {
  ExtendedWineHeadSection,
  MinifiedWineHeadSection,
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
  MinifiedWineGeneralInformationSection,
  MinifiedWineCharacteristicsSection,
  MinifiedWinePackagingAndBrandingSection,
  MinifiedBlendIngredientsSection,
  LineGraph,
  Sensors,
} from "@/components";
import {
  BlendIngredients,
  Grape,
  MinifiedWine,
  Wine,
  WineryGeneralInfo,
} from "@/typings/winery";
import { classNames } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { useAppState } from "@/context/appStateContext";
import { useGetIpfsData } from "@/hooks/useGetIpfsData";

export interface WinePagePropsInterface {
  generalInfo?: WineryGeneralInfo;
  wine: Wine | null;
}

export const WinePage = ({ generalInfo, wine }: WinePagePropsInterface) => {
  const { updateAppLoading } = useAppState();
  const {
    ipfsData,
    setIpfsUrl,
    sensorData,
    temperatureData,
    humidityData,
    vibrationData,
    lightingData,
  } = useGetIpfsData();
  const [sensors, setSensors] = useState<any>(null);

  const mapData = {
    initialPosition: generalInfo?.wineryHeadquarters as any,
  };

  useEffect(() => {
    updateAppLoading(false);

    if (wine?.tokenization?.isTokenized) {
      setIpfsUrl(wine.tokenization.ipfsUrl as string);
    }

    if (ipfsData && temperatureData.length > 0) {
      setSensors(temperatureData);
    }
  }, [ipfsData]);
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

          {wine?.isMinified ? (
            <>
              <MinifiedWineHeadSection
                wine={wine.minifiedWine as MinifiedWine}
              />
              <MinifiedWineGeneralInformationSection
                item={wine.minifiedWine as MinifiedWine}
              />
              <MinifiedWineCharacteristicsSection
                item={wine.minifiedWine as MinifiedWine}
              />
              <MinifiedWinePackagingAndBrandingSection
                item={wine.minifiedWine as MinifiedWine}
              />
              <MinifiedBlendIngredientsSection
                item={wine.minifiedWine.blendIngredients as BlendIngredients}
                grapes={wine.minifiedWine.grapes as Grape[]}
              />
              <NutritionTable
                items={{
                  alcoholLevel: wine.minifiedWine.alcoholLevel,
                  sugars: wine.minifiedWine.residualSugar,
                  bottleSize: wine.minifiedWine.bottleSize,
                }}
              />
            </>
          ) : (
            <>
              <ExtendedWineHeadSection wine={wine as Wine} />
              {sensors && sensors.length > 0 && (
                <div className="w-full gap-[16px] flex">
                  <Sensors
                    temperatureData={temperatureData}
                    humidityData={humidityData}
                    vibrationData={vibrationData}
                    lightingData={lightingData}
                  />
                </div>
              )}

              <ExtendedWineGeneralInformationSection item={wine as Wine} />
              <ExtendedWineCharacteristicsSection item={wine as Wine} />
              <ExtendedWineMakingTechniqueSection item={wine as Wine} />
              <ExtendedWinePackagingAndBrandingSection item={wine as Wine} />
              <ExtendedWineStorageConditionsSection item={wine as Wine} />
              <WineBlendComponentsSection
                item={wine as Wine}
                mapData={mapData}
              />
              <NutritionTable
                items={{
                  alcoholLevel: wine.characteristics.alcoholLevel,
                  sugars: wine.characteristics.residualSugar,
                  bottleSize: wine.packagingAndBranding.bottleSize,
                }}
              />
            </>
          )}
          <WineFooterSection wine={wine as Wine} />
        </div>
      ) : (
        <GeneralLoaderOverlay />
      )}
    </>
  );
};
