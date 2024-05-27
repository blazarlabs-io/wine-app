import {
  Container,
  Text,
  WineItem,
  WineItemList,
  PolygonViewerMap,
  MapVineyardsView,
} from "@/components";
import {
  FermentationProcess,
  GrapesHarvesting,
  VineyardDetails,
} from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface GrapesHarvestingSectionProps {
  item: FermentationProcess;
}

export const FermentationProcessSection = ({
  item,
}: GrapesHarvestingSectionProps) => {
  return (
    <>
      <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="hugeicons:chemistry-03"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold capitalize">
            Fermentation Process
          </Text>
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
        <WineItem
          title="Fermentation Method"
          value={item.method as string}
          variant="surface"
        />
        <WineItem
          title="Yeast Type"
          value={item.yeastType as string}
          variant="surface"
        />
        <WineItem
          title="Fermentation Time"
          value={item.time as string}
          extraVal="Kg/Ha"
          variant="surface"
        />
        <WineItem
          title="Malolactic Fermentation"
          value={(item.malolactic as boolean) ? "Yes" : "No"}
          variant="surface"
        />
      </Container>
    </>
  );
};
