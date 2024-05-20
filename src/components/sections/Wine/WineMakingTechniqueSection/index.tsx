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

export const WineMakingTechniqueSection = ({ item }: WineSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center min-w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="fluent:drink-wine-20-filled"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Wine Making Technique
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="">
            <WineItem
              title="Vegan"
              value={
                (item.wineMakingTechnique.isWineVegan as boolean) ? "Yes" : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Organic"
              value={
                (item.wineMakingTechnique.isWineOrganic as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Biodynamic"
              value={
                (item.wineMakingTechnique.isWineBioDynamic as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Natural"
              value={
                (item.wineMakingTechnique.isWineNatural as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItemList
              title="Sustainability Practices"
              list={
                item.wineMakingTechnique.sustainablePractices.list as string[]
              }
              variant="surface"
            />
          </Container>
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="fluent:drink-wine-20-filled"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Wine Making Technique
            </Text>
          </Container>
          <Container intent="grid-2" gap="medium" className="w-full">
            <WineItem
              title="Vegan"
              value={
                (item.wineMakingTechnique.isWineVegan as boolean) ? "Yes" : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Organic"
              value={
                (item.wineMakingTechnique.isWineOrganic as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Biodynamic"
              value={
                (item.wineMakingTechnique.isWineBioDynamic as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItem
              title="Natural"
              value={
                (item.wineMakingTechnique.isWineNatural as boolean)
                  ? "Yes"
                  : "No"
              }
              variant="surface"
            />
            <WineItemList
              title="Sustainability Practices"
              list={
                item.wineMakingTechnique.sustainablePractices.list as string[]
              }
              variant="surface"
            />
          </Container>
        </div>
      )}
    </>
  );
};
