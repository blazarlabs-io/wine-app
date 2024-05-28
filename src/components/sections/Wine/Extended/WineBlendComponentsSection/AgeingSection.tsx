import {
  Container,
  Text,
  WineItem,
  WineItemList,
  PolygonViewerMap,
  MapVineyardsView,
} from "@/components";
import { AgingProcess } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface AgeingSectionProps {
  item: AgingProcess;
}

export const AgeingSection = ({ item }: AgeingSectionProps) => {
  return (
    <>
      <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="hugeicons:time-quarter-pass"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold capitalize">
            Ageing
          </Text>
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
        <WineItem
          title="Type of Vessel"
          value={item.vesselType as string}
          variant="surface"
        />
      </Container>
    </>
  );
};
