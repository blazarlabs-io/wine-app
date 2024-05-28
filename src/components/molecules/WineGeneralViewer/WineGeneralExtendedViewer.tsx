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
} from "@/components";
import { Wine, WineryGeneralInfo } from "@/typings/winery";
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

export const WineGeneralExtendedViewer = ({
  item,
  generalInfo,
}: WineGeneralViewerInterface) => {
  const { responsiveSize } = useResponsive();

  const mapData = {
    initialPosition: generalInfo?.wineryHeadquarters as any,
  };
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
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Wine Name"
                  variant="surface"
                  value={item.generalInformation.wineCollectionName as string}
                />
                <WineItem
                  title="Country"
                  value={item.generalInformation.country as string}
                  variant="surface"
                />
              </Container>
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Collection Name"
                  value={item.generalInformation.wineCollectionName as string}
                  variant="surface"
                />
                <WineItem
                  title="Collection Size"
                  value={item.generalInformation.collectionSize as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItemList
                  title="Awards & Recognitions"
                  list={
                    item.generalInformation.awardsAndRecognitions as string[]
                  }
                  onEmpty="Not Specified"
                  variant="surface"
                />
              </Container>
              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Characteristics
                </Text>
              </Container>
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Type of Wine"
                  value={item.characteristics.wineType as string}
                  variant="surface"
                />
                <WineItem
                  title="Colour of Wine"
                  value={item.characteristics.wineColour as string}
                  variant="surface"
                />
                <WineItem
                  title="Alcohol Level"
                  value={item.characteristics.alcoholLevel + " %vol"}
                  variant="surface"
                />
                <WineItem
                  title="Residual Sugar"
                  value={item.characteristics.residualSugar as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Acidity Level"
                  value={item.characteristics.acidityLevel as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Tanin Level"
                  value={item.characteristics.tanningLevel as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItemList
                  title="Aroma Profile"
                  list={item.characteristics.aromaProfile.list as string[]}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItemList
                  title="Flavour Profile"
                  list={item.characteristics.flavourProfile.list as string[]}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Sulphite Level"
                  value={item.characteristics.sulphiteLevel as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
              </Container>

              {/* Wine Making Technique */}

              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Wine Making Technique
                </Text>
              </Container>
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Technique"
                  value={item.wineMakingTechnique.wineMakingTechnique as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Vegan"
                  value={
                    (item.wineMakingTechnique.isWineVegan as boolean)
                      ? "Yes"
                      : "No"
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Organic"
                  value={
                    (item.wineMakingTechnique.isWineOrganic as boolean)
                      ? "Yes"
                      : "No"
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Bio Dynamic"
                  value={
                    (item.wineMakingTechnique.isWineBioDynamic as boolean)
                      ? "Yes"
                      : "No"
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Natural"
                  value={
                    (item.wineMakingTechnique.isWineNatural as boolean)
                      ? "Yes"
                      : "No"
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItemList
                  title="Sustainable Practices"
                  list={
                    item.wineMakingTechnique.sustainablePractices
                      .list as string[]
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
              </Container>

              {/* Storage Conditions */}

              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Storage Conditions
                </Text>
              </Container>
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Technique"
                  value={
                    item.storageConditions.placeForInitialStorage as string
                  }
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <Container
                  intent={"flexColLeft"}
                  className={"bg-surface-dark/30 rounded-md p-[16px] w-full"}
                >
                  <Text intent="p1" variant="dim" className="font-semibold">
                    Storage Temperature
                  </Text>
                  {item.storageConditions.storageTemperature.selected?.unit ===
                    undefined ||
                  item.storageConditions.storageTemperature.selected.value ===
                    null ? (
                    <Text variant="dim">Not Specified</Text>
                  ) : (
                    <Container intent="flexRowLeft" gap="xsmall">
                      <Text variant="dim">
                        {
                          item.storageConditions.storageTemperature.selected
                            .value
                        }
                      </Text>
                      <Text variant="dim">
                        {item.storageConditions.storageTemperature.selected
                          .unit === "celcius"
                          ? "°C"
                          : "°F"}
                      </Text>
                    </Container>
                  )}
                </Container>
                <WineItem
                  title="Lighting Conditions"
                  value={item.storageConditions.lightingConditions as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Humidity Level"
                  value={item.storageConditions.humidityLevel as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
                <WineItem
                  title="Virbation Level"
                  value={item.storageConditions.vibrationLevel as string}
                  variant="surface"
                  onEmpty="Not Specified"
                />
              </Container>

              {/* PAckaging And Branding */}

              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Packaging And Branding
                </Text>
              </Container>
              <Container intent="grid-4" gap="large">
                <WineItem
                  title="Bottle Size"
                  value={item.packagingAndBranding.bottleSize as string}
                  onEmpty="Not Specified"
                  variant="surface"
                />
                <WineItem
                  title="Bottle Type"
                  value={item.packagingAndBranding.bottleType as string}
                  onEmpty="Not Specified"
                  variant="surface"
                />
                <WineItemList
                  title="Bottle Type"
                  list={item.packagingAndBranding.closureType as string[]}
                  onEmpty="Not Specified"
                  variant="surface"
                />
                <WineItem
                  title="Extra Packaging"
                  value={item.packagingAndBranding.extraPackaging as string}
                  onEmpty="Not Specified"
                  variant="surface"
                />
                <WineItem
                  title="GTIN/UPC"
                  value={item.packagingAndBranding.upc as string}
                  onEmpty="Not Specified"
                  variant="surface"
                />
              </Container>

              {/* Ingredients */}
              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Blend Components
                </Text>
              </Container>
              <Container intent="flexColLeft" gap="medium" className="w-full">
                {item.blendComponents.length > 0 && (
                  <>
                    {item.blendComponents.map((blendComponent, index) => (
                      <div
                        key={"blend-" + index}
                        className="flex items-center justify-center w-full"
                      >
                        <Container intent="flexRowLeft" className="min-w-full">
                          <Disclosure
                            as="div"
                            className="w-full bg-surface-dark/30 rounded-md"
                            defaultOpen={false}
                          >
                            <DisclosureButton className="p-6 border border-on-surface-dark/30 rounded-md group flex w-full items-center justify-between">
                              <Text
                                intent="h6"
                                variant="dim"
                                className="font-semibold"
                              >
                                {blendComponent.name || "Blend Component Name"}
                              </Text>
                              <Icon
                                icon="ion:chevron-down-sharp"
                                className="size-6 text-white/60 group-data-[hover]:text-white/50 group-data-[open]:rotate-180"
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="border border-on-surface-dark/30 px-[24px] rounded-b-md">
                              {/* <Text intent="p1" variant="dim">
                              {blendComponent.type || "Blend Component Type"}
                            </Text> */}
                              {/* INGREDIENTS */}
                              <IngredientsSection
                                item={blendComponent.ingredients}
                              />
                              {/* VINEYARD DETAILS */}
                              <VineyardDetailsSection
                                item={blendComponent.vineyardDetails}
                                mapData={mapData}
                              />
                              {/* GRAPES HARVESTING */}
                              <GrapesHarvestingSection
                                item={blendComponent.grapesHarvesting}
                              />
                              {/* FERMENTATION PROCESS */}
                              <FermentationProcessSection
                                item={blendComponent.fermentationProcess}
                              />
                              {/* AGEING */}
                              <AgeingSection
                                item={blendComponent.agingProcess}
                              />
                            </DisclosurePanel>
                          </Disclosure>
                        </Container>
                      </div>
                    ))}
                  </>
                )}
              </Container>

              {/* Ingredients */}
              <Container intent="flexColLeft" className="max-w-fit">
                <Text intent="h6" variant="accent" className="font-semibold">
                  Marketing
                </Text>
              </Container>
              <WineItem
                title="Extra Information"
                value={item.marketingInfo as string}
                onEmpty="Not Specified"
                variant="surface"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-w-full gap-[24px]">
              <Container intent="flexColCenter" className="max-w-fit">
                <Text intent="h5" variant="accent" className="font-semibold">
                  General Information
                </Text>
              </Container>
              <WineItem
                centered
                title="Reference Number"
                value={item.referenceNumber as string}
              />
              <Container intent="grid-2" gap="medium" className="">
                <WineItem
                  title="Wine Name"
                  value={item.generalInformation.wineCollectionName as string}
                  variant="surface"
                />
                <WineItem
                  title="UPC"
                  value={item.packagingAndBranding.upc as string}
                  variant="surface"
                />
                {/* <WineItem
                  title="Harvest Year"
                  value={item.harvestYear}
                  variant="surface"
                /> */}
                <WineItem
                  title="Country"
                  value={item.generalInformation.country as string}
                  variant="surface"
                />
                {/* <WineItem
                  title="Controlled Designation of Origin"
                  value={item.controlledDesignationOfOrigin}
                  variant="surface"
                /> */}
                <WineItem
                  title="Alcohol Level"
                  value={item.characteristics.alcoholLevel + " %vol"}
                  variant="surface"
                />
                <WineItem
                  title="Type of Wine"
                  value={item.characteristics.wineType as string}
                  variant="surface"
                />
                <WineItem
                  title="Colour of Wine"
                  value={item.characteristics.wineColour as string}
                  variant="surface"
                />
                <WineItem
                  title="Bottle Size"
                  value={item.packagingAndBranding.bottleSize as string}
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
