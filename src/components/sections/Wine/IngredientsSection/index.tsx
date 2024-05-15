"use client";

import {
  Container,
  Text,
  GrapesViewer,
  IngredientViewer,
  WineItem,
  GrapesViewerTable,
  IngredientViewerTable,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { WineInterface } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface IngredientsSectionProps {
  item: WineInterface;
}

export const WineIngredientsSection = ({ item }: IngredientsSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "mobile" && (
        <div className="flex flex-col items-center justify-center w-full gap-[24px] px-[24px]">
          <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
            <Icon
              icon="fluent-emoji-high-contrast:grapes"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Ingredients
            </Text>
          </Container>

          <Container intent="grid-2" gap="small" className="">
            <GrapesViewerTable
              title="Grapes Varieties"
              variant="surface"
              ingredient={item.ingredients.grapes.list}
            />
            <IngredientViewerTable
              title="Acidity Regulators"
              variant="surface"
              ingredient={item.ingredients.acidityRegulators}
            />
          </Container>
          <Container intent="grid-2" gap="small">
            <IngredientViewerTable
              title="Antioxidants"
              variant="surface"
              ingredient={item.ingredients.antioxidants}
            />
            <IngredientViewerTable
              title="Preservatives"
              variant="surface"
              ingredient={item.ingredients.preservatives}
            />
          </Container>
          <Container intent="grid-2" gap="small">
            <IngredientViewerTable
              title="Stabilizers"
              variant="surface"
              ingredient={item.ingredients.stabilizers}
            />
            <IngredientViewerTable
              title="Finings Agents"
              variant="surface"
              ingredient={item.ingredients.finingAgents}
            />
          </Container>
        </div>
      )}
      {responsiveSize === "desktop" && (
        <div className="flex flex-col items-cemter justify-center w-full gap-[24px]">
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <Icon
              icon="fluent-emoji-high-contrast:grapes"
              width="20"
              height="20"
              className="text-primary-light mt-[-4px]"
            />
            <Text intent="h6" variant="dim" className="font-semibold uppercase">
              Ingredients
            </Text>
          </Container>

          <Container intent="grid-2" gap="small" className="w-full">
            <GrapesViewerTable
              title="Grapes Varieties"
              variant="surface"
              ingredient={item.ingredients.grapes.list}
            />
            <IngredientViewerTable
              title="Acidity Regulators"
              variant="surface"
              ingredient={item.ingredients.acidityRegulators}
            />
          </Container>
          <Container intent="grid-2" gap="small" className="w-full">
            <IngredientViewerTable
              title="Antioxidants"
              variant="surface"
              ingredient={item.ingredients.antioxidants}
            />
            <IngredientViewerTable
              title="Preservatives"
              variant="surface"
              ingredient={item.ingredients.preservatives}
            />
          </Container>
          <Container intent="grid-2" gap="small" className="w-full">
            <IngredientViewerTable
              title="Stabilizers"
              variant="surface"
              ingredient={item.ingredients.stabilizers}
            />
            <IngredientViewerTable
              title="Finings Agents"
              variant="surface"
              ingredient={item.ingredients.finingAgents}
            />
          </Container>
        </div>
      )}
    </>
  );
};
