"use client";

import {
  Container,
  Text,
  GrapesViewer,
  IngredientViewer,
  WineItem,
  WineItemList,
  Sensors,
} from "@/components";
import { SensorData } from "@/hooks/useGetIpfsData";
import { useResponsive } from "@/hooks/useResponsive";
import { Wine } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface WineSectionProps {
  sensorData: {
    temperature: SensorData[];
    humidity: SensorData[];
    vibration: SensorData[];
    lighting: SensorData[];
  };
}

export const WineStorageConditionsSection = ({
  sensorData,
}: WineSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center min-w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="tabler:barrel"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Storage Conditions
            </Text>
          </Container>
          {sensorData && (
            <div className="w-full gap-[16px] flex">
              <Sensors
                temperatureData={sensorData.temperature}
                humidityData={sensorData.humidity}
                vibrationData={sensorData.vibration}
                lightingData={sensorData.lighting}
              />
            </div>
          )}
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="tabler:barrel"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Storage Conditions
            </Text>
          </Container>
          {sensorData && (
            <div className="w-full gap-[16px] flex">
              <Sensors
                temperatureData={sensorData.temperature}
                humidityData={sensorData.humidity}
                vibrationData={sensorData.vibration}
                lightingData={sensorData.lighting}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
