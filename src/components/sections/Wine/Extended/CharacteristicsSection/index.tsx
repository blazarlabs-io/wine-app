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

export const WineCharacteristicsSection = ({ item }: WineSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center min-w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="mdi:feature-search-outline"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Characteristics
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="">
            <WineItem
              title="Wine Colour"
              value={item.characteristics.wineColour as string}
              variant="surface"
            />
            <WineItem
              title="Wine Type"
              value={item.characteristics.wineType as string}
              variant="surface"
            />
            <WineItem
              title="Alcohol Level"
              value={item.characteristics.alcoholLevel as string}
              extraVal="% vol"
              variant="surface"
            />
            <WineItem
              title="Residual Sugar"
              value={item.characteristics.residualSugar as string}
              extraVal="g. per l."
              variant="surface"
            />
            <WineItem
              title="Acidity Level"
              value={item.characteristics.acidityLevel as string}
              extraVal="g. per l."
              variant="surface"
            />
            <WineItem
              title="Taning Level"
              value={item.characteristics.tanningLevel as string}
              variant="surface"
            />
            <WineItemList
              title="Aroma Profile"
              list={item.characteristics.aromaProfile.list as string[]}
              variant="surface"
            />
            <WineItemList
              title="Flavour Profile"
              list={item.characteristics.flavourProfile.list as string[]}
              variant="surface"
            />
            <WineItem
              title="Sulphite Levels"
              value={item.characteristics.tanningLevel as string}
              extraVal="ppm"
              variant="surface"
            />
          </Container>
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="mdi:feature-search-outline"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Characteristics
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="w-full">
            <WineItem
              title="Wine Colour"
              value={item.characteristics.wineColour as string}
              variant="surface"
            />
            <WineItem
              title="Wine Type"
              value={item.characteristics.wineType as string}
              variant="surface"
            />
            <WineItem
              title="Alcohol Level"
              value={item.characteristics.alcoholLevel as string}
              extraVal="% vol"
              variant="surface"
            />
            <WineItem
              title="Residual Sugar"
              value={item.characteristics.residualSugar as string}
              extraVal="g. per l."
              variant="surface"
            />
            <WineItem
              title="Acidity Level"
              value={item.characteristics.acidityLevel as string}
              extraVal="g. per l."
              variant="surface"
            />
            <WineItem
              title="Taning Level"
              value={item.characteristics.tanningLevel as string}
              variant="surface"
            />
            <WineItemList
              title="Aroma Profile"
              list={item.characteristics.aromaProfile.list as string[]}
              variant="surface"
            />
            <WineItemList
              title="Flavour Profile"
              list={item.characteristics.flavourProfile.list as string[]}
              variant="surface"
            />
            <WineItem
              title="Sulphite Levels"
              value={item.characteristics.tanningLevel as string}
              extraVal="ppm"
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
