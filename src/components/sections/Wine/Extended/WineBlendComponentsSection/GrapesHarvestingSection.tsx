import {
  Container,
  Text,
  WineItem,
  WineItemList,
  PolygonViewerMap,
  MapVineyardsView,
} from "@/components";
import { GrapesHarvesting, VineyardDetails } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface GrapesHarvestingSectionProps {
  item: GrapesHarvesting;
}

export const GrapesHarvestingSection = ({
  item,
}: GrapesHarvestingSectionProps) => {
  return (
    <>
      <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="tdesign:grape"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold capitalize">
            Grapes Harvesting
          </Text>
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
        <WineItem
          title="Vintage Year"
          value={item.vintageYear?.toString() as string}
          variant="surface"
        />
        <WineItem
          title="Harvest Method"
          value={item.harvestMethod as string}
          variant="surface"
        />
        <WineItem
          title="Yield Per Hectare"
          value={item.yieldPerHectare as string}
          extraVal="Kg/Ha"
          variant="surface"
        />
        <WineItem
          title="Grape Selection Process"
          value={item.selectionProcess as string}
          variant="surface"
        />
      </Container>
    </>
  );
};
