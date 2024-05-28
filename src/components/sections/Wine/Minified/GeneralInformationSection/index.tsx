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
import { MinifiedWine, Wine } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface WineSectionProps {
  item: MinifiedWine;
}

export const WineGeneralInformationSection = ({ item }: WineSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center min-w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="mdi:information-slab-circle-outline"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              General Information
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="">
            <WineItem
              title="Winery Name"
              value={item.wineryName as string}
              variant="surface"
            />
            <WineItem
              title="Collection Name"
              value={item.wineCollectionName as string}
              variant="surface"
            />
            <WineItem
              title="Country"
              value={item.country as string}
              variant="surface"
            />
          </Container>
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="mdi:information-slab-circle-outline"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              General Information
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="w-full">
            <WineItem
              title="Winery Name"
              value={item.wineryName as string}
              variant="surface"
            />
            <WineItem
              title="Collection Name"
              value={item.wineCollectionName as string}
              variant="surface"
            />
            <WineItem
              title="Country"
              value={item.country as string}
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
