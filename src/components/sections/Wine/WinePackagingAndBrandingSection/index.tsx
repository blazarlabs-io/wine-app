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

export const WinePackagingAndBrandingSection = ({ item }: WineSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center min-w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="codicon:package"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Packaging and Branding
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="">
            <WineItem
              title="Bottle Size"
              value={item.packagingAndBranding.bottleSize as string}
              variant="surface"
            />
            <WineItem
              title="Bottle Type"
              value={item.packagingAndBranding.bottleType as string}
              variant="surface"
            />
            <WineItemList
              title="Closure Type"
              list={item.packagingAndBranding.closureType as string[]}
              variant="surface"
            />
            <WineItem
              title="Extra Packaging"
              value={item.packagingAndBranding.extraPackaging as string}
              variant="surface"
            />
            <WineItem
              title="GTIN / UPC"
              value={item.packagingAndBranding.upc as string}
              variant="surface"
            />
          </Container>
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="codicon:package"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Packaging and Branding
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="w-full">
            <WineItem
              title="Bottle Size"
              value={item.packagingAndBranding.bottleSize as string}
              variant="surface"
            />
            <WineItem
              title="Bottle Type"
              value={item.packagingAndBranding.bottleType as string}
              variant="surface"
            />
            <WineItemList
              title="Closure Type"
              list={item.packagingAndBranding.closureType as string[]}
              variant="surface"
            />
            <WineItem
              title="Extra Packaging"
              value={item.packagingAndBranding.extraPackaging as string}
              variant="surface"
            />
            <WineItem
              title="GTIN / UPC"
              value={item.packagingAndBranding.upc as string}
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
