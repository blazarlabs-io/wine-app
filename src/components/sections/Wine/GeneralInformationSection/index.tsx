"use client";

import {
  Container,
  Text,
  GrapesViewer,
  IngredientViewer,
  EuLabelItem,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { EuLabelInterface } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface WineGeneralInformationSectionProps {
  item: EuLabelInterface;
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
            <EuLabelItem
              title="Harvest Year"
              value={item.harvestYear}
              variant="surface"
            />
            <EuLabelItem
              title="Colour of Wine"
              value={item.colourOfWine}
              variant="surface"
            />
            <EuLabelItem
              title="Bottle Size"
              value={item.bottleSize}
              variant="surface"
            />
            {/* <EuLabelItem title="UPC" value={item.upc} variant="surface" /> */}
            <EuLabelItem
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
