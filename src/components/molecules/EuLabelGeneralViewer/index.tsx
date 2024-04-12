"use client";

import {
  AllergenViewer,
  Container,
  EuLabelItem,
  IngredientViewer,
  BounceLoader,
  Text,
  GrapesViewer,
} from "@/components";
import { EuLabelInterface } from "@/typings/winery";
import { useResponsive } from "@/hooks/useResponsive";

export interface EuLabelGeneralViewerInterface {
  item: EuLabelInterface;
}

export const EuLabelGeneralViewer = ({
  item,
}: EuLabelGeneralViewerInterface) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      {item && item !== undefined ? (
        <>
          {responsiveSize !== "mobile" ? (
            <div className="flex flex-col items-start justify-center min-w-full gap-[24px]">
              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  General Information
                </Text>
              </Container>
              <Container intent="grid-5" gap="large" className="">
                <EuLabelItem
                  title="Reference Number"
                  variant="surface"
                  value={item.referenceNumber}
                />
                <EuLabelItem title="UPC" value={item.upc} variant="surface" />
              </Container>
              <Container intent="grid-5" gap="large">
                <EuLabelItem
                  title="Wine Name"
                  variant="surface"
                  value={item.wineCollectionName}
                />
                <EuLabelItem
                  title="Harvest Year"
                  value={item.harvestYear}
                  variant="surface"
                />
                <EuLabelItem
                  title="Country"
                  value={item.country}
                  variant="surface"
                />
                <div className="col-span-2">
                  <EuLabelItem
                    title="Controlled Designation of Origin"
                    value={item.controlledDesignationOfOrigin}
                    variant="surface"
                  />
                </div>
              </Container>

              <Container intent="grid-5" gap="large">
                <EuLabelItem
                  title="Type of Wine"
                  value={item.typeOfWine}
                  variant="surface"
                />
                <EuLabelItem
                  title="Colour of Wine"
                  value={item.colourOfWine}
                  variant="surface"
                />
                <EuLabelItem
                  title="Alcohol Level"
                  value={item.alcoholLevel + " %vol"}
                  variant="surface"
                />
                <EuLabelItem
                  title="Bottle Size"
                  value={item.bottleSize}
                  variant="surface"
                />
              </Container>
              {/* Ingredients */}
              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Ingredients
                </Text>
              </Container>
              <Container intent="grid-5" gap="large" className="">
                <GrapesViewer
                  title="Grapes Varieties"
                  variant="surface"
                  ingredient={item.ingredients.grapes.list}
                />
                <IngredientViewer
                  title="Acidity Regulators"
                  variant="surface"
                  ingredient={item.ingredients.acidityRegulators}
                />
                <IngredientViewer
                  title="Antioxidants"
                  variant="surface"
                  ingredient={item.ingredients.antioxidants}
                />
              </Container>
              <Container intent="grid-5" gap="large">
                <IngredientViewer
                  title="Preservatives"
                  variant="surface"
                  ingredient={item.ingredients.preservatives}
                />
                <IngredientViewer
                  title="Stabilizers"
                  variant="surface"
                  ingredient={item.ingredients.stabilizers}
                />
                <Container
                  intent="flexColLeft"
                  gap="small"
                  className="bg-surface-dark rounded-md p-[16px] w-full"
                >
                  <Text intent="p2" variant="dim" className="">
                    Sugars (g/100g)
                  </Text>
                  <Text intent="p1">{item.ingredients.sugars + " g/100g"}</Text>
                </Container>
              </Container>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-w-full gap-[24px]">
              <Container intent="flexColCenter" className="max-w-fit">
                <Text intent="h5" variant="accent" className="font-semibold">
                  General Information
                </Text>
              </Container>
              <EuLabelItem
                centered
                title="Reference Number"
                value={item.referenceNumber}
              />
              <Container intent="grid-2" gap="medium" className="">
                <EuLabelItem
                  title="Wine Name"
                  value={item.wineCollectionName}
                  variant="surface"
                />
                <EuLabelItem title="UPC" value={item.upc} variant="surface" />
                <EuLabelItem
                  title="Harvest Year"
                  value={item.harvestYear}
                  variant="surface"
                />
                <EuLabelItem
                  title="Country"
                  value={item.country}
                  variant="surface"
                />
                <EuLabelItem
                  title="Controlled Designation of Origin"
                  value={item.controlledDesignationOfOrigin}
                  variant="surface"
                />
                <EuLabelItem
                  title="Alcohol Level"
                  value={item.alcoholLevel + " %vol"}
                  variant="surface"
                />
                <EuLabelItem
                  title="Type of Wine"
                  value={item.typeOfWine}
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
              </Container>
            </div>
          )}
        </>
      ) : (
        <Container intent="flexColCenter" className="min-h-[320px]">
          <BounceLoader width="40" height="40" />
        </Container>
      )}
    </>
  );
};