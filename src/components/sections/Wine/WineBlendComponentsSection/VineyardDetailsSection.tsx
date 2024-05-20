import {
  Container,
  Text,
  WineItem,
  WineItemList,
  PolygonViewerMap,
  MapVineyardsView,
} from "@/components";
import { VineyardDetails } from "@/typings/winery";
import { Icon } from "@iconify/react";

export interface VineyardDetailsSectionProps {
  item: VineyardDetails;
  mapData: any;
}

export const VineyardDetailsSection = ({
  item,
  mapData,
}: VineyardDetailsSectionProps) => {
  return (
    <>
      <Container intent="flexRowLeft" gap="xsmall" className="mt-[24px]">
        <Container intent="flexRowCenter" gap="xsmall" className="max-w-fit">
          <Icon
            icon="material-symbols:landscape-outline"
            width="20"
            height="20"
            className="text-primary-light mt-[-4px]"
          />
          <Text intent="h6" variant="dim" className="font-semibold capitalize">
            Vineyard Details
          </Text>
        </Container>
      </Container>
      <Container intent="grid-2" gap="medium" className="w-full mt-[12px]">
        <WineItem
          title="Control Designation of Origin"
          value={item.controlledDesignationOfOrigin as string}
          variant="surface"
        />
        <WineItem
          title="Elevation"
          value={item.elevation as string}
          extraVal="meters"
          variant="surface"
        />
        <WineItem
          title="Orientation"
          value={item.orientation as string}
          extraVal="orientation"
          variant="surface"
        />
        <WineItem
          title="Soil Type"
          value={item.soilType as string}
          variant="surface"
        />
        <WineItem
          title="Vines' Age"
          value={item.vinesAge as string}
          extraVal="years"
          variant="surface"
        />
        <WineItemList
          title="Irrigation Practices"
          list={item.irrigationPractices as string[]}
          variant="surface"
        />
      </Container>
      <MapVineyardsView
        initialPosition={mapData.initialPosition}
        initialItems={{
          coordinates: item.coordinates,
          grapeGrown: item.grapeGrown,
        }}
      />
    </>
  );
};
