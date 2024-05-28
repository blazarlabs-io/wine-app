"use client";

import {
  Container,
  Text,
  GrapesViewer,
  IngredientViewer,
  WineItem,
  WineItemList,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { Wine } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface WineSectionProps {
  item: Wine;
}

export const WineStorageConditionsSection = ({ item }: WineSectionProps) => {
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
          <Container intent="grid-2" gap="medium" className="">
            <WineItem
              title="Estate / Place for Initial Storage"
              value={item.storageConditions.placeForInitialStorage as string}
              variant="surface"
            />
            <Container
              intent={"flexColLeft"}
              className={"bg-surface-dark/30 rounded-md p-[16px] w-full"}
            >
              <Text intent="p1" variant="dim" className="font-semibold">
                Storage Temperature
              </Text>
              {item.storageConditions.storageTemperature.selected?.unit ===
                undefined ||
              item.storageConditions.storageTemperature.selected.value ===
                null ? (
                <Text variant="dim">Not Specified</Text>
              ) : (
                <Container intent="flexColLeft" gap="xsmall">
                  <Text variant="dim">
                    {item.storageConditions.storageTemperature.selected.value}
                  </Text>
                  <Text variant="dim">
                    {item.storageConditions.storageTemperature.selected.unit ===
                    "celcius"
                      ? "°C"
                      : "°F"}
                  </Text>
                </Container>
              )}
            </Container>
            <WineItem
              title="Lighting Conditions"
              value={item.storageConditions.lightingConditions as string}
              variant="surface"
            />
            <WineItem
              title="Humidity Level"
              value={item.storageConditions.humidityLevel as string}
              extraVal="%"
              variant="surface"
            />
            <WineItem
              title="Vibration Level"
              value={item.storageConditions.vibrationLevel as string}
              variant="surface"
            />
          </Container>
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
          <Container intent="grid-2" gap="medium" className="w-full">
            <WineItem
              title="Estate / Place for Initial Storage"
              value={item.storageConditions.placeForInitialStorage as string}
              variant="surface"
            />
            <Container
              intent={"flexColLeft"}
              className={"bg-surface-dark/30 rounded-md p-[16px] w-full"}
            >
              <Text intent="p1" variant="dim" className="font-semibold">
                Storage Temperature
              </Text>
              {item.storageConditions.storageTemperature.selected?.unit ===
                undefined ||
              item.storageConditions.storageTemperature.selected.value ===
                null ? (
                <Text variant="dim">Not Specified</Text>
              ) : (
                <Container intent="flexColLeft" gap="xsmall">
                  <Text variant="dim">
                    {item.storageConditions.storageTemperature.selected.value}
                  </Text>
                  <Text variant="dim">
                    {item.storageConditions.storageTemperature.selected.unit ===
                    "celcius"
                      ? "°C"
                      : "°F"}
                  </Text>
                </Container>
              )}
            </Container>
            <WineItem
              title="Lighting Conditions"
              value={item.storageConditions.lightingConditions as string}
              variant="surface"
            />
            <WineItem
              title="Humidity Level"
              value={item.storageConditions.humidityLevel as string}
              extraVal="%"
              variant="surface"
            />
            <WineItem
              title="Vibration Level"
              value={item.storageConditions.vibrationLevel as string}
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
