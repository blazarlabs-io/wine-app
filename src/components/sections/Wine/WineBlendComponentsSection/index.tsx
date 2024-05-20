"use client";

import { Container, Text, WineItem, WineItemList } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { Wine } from "@/typings/winery";
import { Icon } from "@iconify/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { VineyardDetailsSection } from "./VineyardDetailsSection";
import { IngredientsSection } from "./IngredientsSection";
import { GrapesHarvestingSection } from "./GrapesHarvestingSection";
import { FermentationProcessSection } from "./FermentationProcessSection";
import { AgeingSection } from "./AgeingSection";

export interface WineBlendComponentSectionProps {
  item: Wine;
  mapData: any;
}

export const WineBlendComponentsSection = ({
  item,
  mapData,
}: WineBlendComponentSectionProps) => {
  const { responsiveSize } = useResponsive();
  return (
    <>
      <Container
        intent={responsiveSize === "mobile" ? "flexRowCenter" : "flexRowLeft"}
        gap="xsmall"
        className=""
      >
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="radix-icons:blending-mode"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold uppercase">
            Blend Components
          </Text>
        </Container>
      </Container>
      {item.blendComponents && item.blendComponents.length > 0 && (
        <>
          {item.blendComponents.map((blendComponent, index) => (
            <div
              key={"blend-" + index}
              className="flex flex-col items-center justify-center w-full px-[24px]"
            >
              <Container intent="flexRowLeft" className="mt-[-24px]">
                <Disclosure
                  as="div"
                  className="p-6 w-full bg-surface-dark/30 rounded-md"
                  defaultOpen={false}
                >
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <Text intent="h6" variant="dim" className="font-semibold">
                      {blendComponent.name || "Blend Component Name"}
                    </Text>
                    <Icon
                      icon="ion:chevron-down-sharp"
                      className="size-6 text-white/60 group-data-[hover]:text-white/50 group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2">
                    <Text intent="p1" variant="dim">
                      {blendComponent.type || "Blend Component Type"}
                    </Text>
                    {/* INGREDIENTS */}
                    <IngredientsSection item={blendComponent.ingredients} />
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
                    <AgeingSection item={blendComponent.agingProcess} />
                  </DisclosurePanel>
                </Disclosure>
              </Container>
            </div>
          ))}
        </>
      )}
    </>
  );
};
