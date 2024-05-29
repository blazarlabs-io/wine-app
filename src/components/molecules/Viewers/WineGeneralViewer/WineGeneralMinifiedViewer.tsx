"use client";

import {
  AllergenViewer,
  Container,
  WineItem,
  IngredientViewer,
  BounceLoader,
  Text,
  GrapesViewer,
  GrapesViewerTable,
  IngredientViewerTable,
  WineItemList,
  MinifiedGrapesViewerTable,
} from "@/components";
import { Grape, Wine, WineryGeneralInfo } from "@/typings/winery";
import { useResponsive } from "@/hooks/useResponsive";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IngredientsSection } from "@/components/sections/Wine/Extended/WineBlendComponentsSection/IngredientsSection";
import { VineyardDetailsSection } from "@/components/sections/Wine/Extended/WineBlendComponentsSection/VineyardDetailsSection";
import { GrapesHarvestingSection } from "@/components/sections/Wine/Extended/WineBlendComponentsSection/GrapesHarvestingSection";
import { FermentationProcessSection } from "@/components/sections/Wine/Extended/WineBlendComponentsSection/FermentationProcessSection";
import { AgeingSection } from "@/components/sections/Wine/Extended/WineBlendComponentsSection/AgeingSection";
import { Icon } from "@iconify/react";

export interface WineGeneralViewerInterface {
  item: Wine;
  generalInfo?: WineryGeneralInfo;
}

export const WineGeneralMinifiedViewer = ({
  item,
  generalInfo,
}: WineGeneralViewerInterface) => {
  return (
    <>
      {item && item !== undefined ? (
        <>
          <div className="flex flex-col items-start justify-center min-w-full gap-[24px]">
            {/* General Information */}
            <Container intent="flexColLeft" className="max-w-fit">
              <Text intent="h6" variant="accent" className="font-semibold">
                General Information
              </Text>
            </Container>
            <Container intent="grid-4" gap="large">
              <WineItem
                title="Wine Name"
                variant="surface"
                value={item.minifiedWine.wineCollectionName as string}
              />
              <WineItem
                title="Country"
                value={item.minifiedWine.country as string}
                variant="surface"
              />
              <WineItem
                title="Collection Name"
                value={item.minifiedWine.wineCollectionName as string}
                variant="surface"
              />
            </Container>

            {/* Characteristics */}
            <Container intent="flexColLeft" className="max-w-fit">
              <Text intent="h6" variant="accent" className="font-semibold">
                Characteristics
              </Text>
            </Container>
            <Container intent="grid-4" gap="large">
              <WineItem
                title="Type of Wine"
                value={item.minifiedWine.wineType as string}
                variant="surface"
              />
              <WineItem
                title="Colour of Wine"
                value={item.minifiedWine.wineColour as string}
                variant="surface"
              />
              <WineItem
                title="Alcohol Level"
                value={item.minifiedWine.alcoholLevel + " %vol"}
                variant="surface"
              />
              <WineItem
                title="Residual Sugar"
                value={item.minifiedWine.residualSugar as string}
                variant="surface"
                onEmpty="Not Specified"
              />
            </Container>

            {/* Ingredients */}
            <Container intent="flexColLeft" className="max-w-fit">
              <Text intent="h6" variant="accent" className="font-semibold">
                Ingredients
              </Text>
            </Container>
            <Container intent="grid-4" gap="large">
              <MinifiedGrapesViewerTable
                title="Grape Varieties"
                ingredient={item.minifiedWine.grapes}
              />

              <IngredientViewerTable
                title="Acidity Regulators"
                variant="surface"
                ingredient={
                  item.minifiedWine.blendIngredients.acidityRegulators
                }
              />
              <IngredientViewerTable
                title="Antioxidants"
                variant="surface"
                ingredient={item.minifiedWine.blendIngredients.antioxidants}
              />
              <IngredientViewerTable
                title="Preservatives"
                variant="surface"
                ingredient={item.minifiedWine.blendIngredients.preservatives}
              />
              <IngredientViewerTable
                title="Stabilizers"
                variant="surface"
                ingredient={item.minifiedWine.blendIngredients.stabilizers}
              />
              <IngredientViewerTable
                title="Finings Agents"
                variant="surface"
                ingredient={item.minifiedWine.blendIngredients.finingAgents}
              />
            </Container>

            {/* Packaging And Branding */}
            <Container intent="flexColLeft" className="max-w-fit">
              <Text intent="h6" variant="accent" className="font-semibold">
                Packaging And Branding
              </Text>
            </Container>
            <Container intent="grid-4" gap="large">
              <WineItem
                title="Bottle Size"
                value={item.minifiedWine.bottleSize as string}
                onEmpty="Not Specified"
                variant="surface"
              />
              <WineItem
                title="GTIN/UPC"
                value={item.minifiedWine.upc as string}
                onEmpty="Not Specified"
                variant="surface"
              />
            </Container>
          </div>
        </>
      ) : (
        <Container intent="flexColCenter" className="min-h-[320px]">
          <BounceLoader width="40" height="40" />
        </Container>
      )}
    </>
  );
};
