"use client";

import {
  Container,
  GrapesViewer,
  GrapesViewerTable,
  IngredientViewerTable,
  Text,
} from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { BlendIngredients, Grape } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface IngredientsSectionProps {
  item: BlendIngredients;
  grapes: Grape[];
}

export const BlendIngredientsSection = ({
  item,
  grapes,
}: IngredientsSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {responsiveSize === "desktop" && (
        <>
          <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
            <Container
              intent="flexRowCenter"
              gap="xsmall"
              className="max-w-fit"
            >
              <Icon
                icon="mdi:nutrition"
                width="20"
                height="20"
                className="text-primary-light mt-[-4px]"
              />
              <Text
                intent="h6"
                variant="dim"
                className="font-semibold uppercase"
              >
                Ingredients
              </Text>
            </Container>
          </Container>
          <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
            <GrapesViewer
              title="Grapes"
              ingredient={grapes}
              variant="surface"
            />
            <IngredientViewerTable
              title="Acidity Regulators"
              variant="surface"
              ingredient={item.acidityRegulators}
            />
            <IngredientViewerTable
              title="Antioxidants"
              variant="surface"
              ingredient={item.antioxidants}
            />
            <IngredientViewerTable
              title="Preservatives"
              variant="surface"
              ingredient={item.preservatives}
            />
            <IngredientViewerTable
              title="Stabilizers"
              variant="surface"
              ingredient={item.stabilizers}
            />
            <IngredientViewerTable
              title="Finings Agents"
              variant="surface"
              ingredient={item.finingAgents}
            />
          </Container>
        </>
      )}
      {responsiveSize === "mobile" && (
        <>
          <Container
            intent="flexRowCenter"
            gap="xsmall"
            className="mt-[24px] px-[24px]"
          >
            <Container
              intent="flexRowCenter"
              gap="xsmall"
              className="max-w-fit"
            >
              <Icon
                icon="mdi:nutrition"
                width="20"
                height="20"
                className="text-primary-light mt-[-4px]"
              />
              <Text
                intent="h6"
                variant="dim"
                className="font-semibold uppercase"
              >
                Ingredients
              </Text>
            </Container>
          </Container>
          <Container
            intent="grid-2"
            gap="medium"
            className="w-full mt-[12px] px-[24px]"
          >
            <GrapesViewer
              title="Grapes"
              ingredient={grapes}
              variant="surface"
            />
            <IngredientViewerTable
              title="Acidity Regulators"
              variant="surface"
              ingredient={item.acidityRegulators}
            />
            <IngredientViewerTable
              title="Antioxidants"
              variant="surface"
              ingredient={item.antioxidants}
            />
            <IngredientViewerTable
              title="Preservatives"
              variant="surface"
              ingredient={item.preservatives}
            />
            <IngredientViewerTable
              title="Stabilizers"
              variant="surface"
              ingredient={item.stabilizers}
            />
            <IngredientViewerTable
              title="Finings Agents"
              variant="surface"
              ingredient={item.finingAgents}
            />
          </Container>
        </>
      )}
    </>
  );
};
