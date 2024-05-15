"use client";

import {
  Container,
  Text,
  GrapesViewer,
  IngredientViewer,
  WineItem,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { WineInterface } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface WineGeneralInformationSectionProps {
  item: WineInterface;
}

export const WineGeneralInformationSection = ({
  item,
}: WineGeneralInformationSectionProps) => {
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
              title="Harvest Year"
              value={item.harvestYear}
              variant="surface"
            />
            <WineItem
              title="Colour of Wine"
              value={item.colourOfWine}
              variant="surface"
            />
            <WineItem
              title="Bottle Size"
              value={item.bottleSize}
              variant="surface"
            />
            {/* <WineItem title="UPC" value={item.upc} variant="surface" /> */}
            <WineItem
              title="Controlled Designation of Origin"
              value={item.controlledDesignationOfOrigin}
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
              title="Harvest Year"
              value={item.harvestYear}
              variant="surface"
            />
            <WineItem
              title="Colour of Wine"
              value={item.colourOfWine}
              variant="surface"
            />
            <WineItem
              title="Bottle Size"
              value={item.bottleSize}
              variant="surface"
            />
            {/* <WineItem title="UPC" value={item.upc} variant="surface" /> */}
            <WineItem
              title="Controlled Designation of Origin"
              value={item.controlledDesignationOfOrigin}
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
