/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Text,
  WineItem,
  WineItemList,
  MapVineyardsView,
  GrapesViewerTable,
} from "@/components";
import { VineyardDetails } from "@/typings/winery";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export interface VineyardDetailsSectionProps {
  item: VineyardDetails;
  mapData: any;
}

export const VineyardDetailsSection = ({
  item,
  mapData,
}: VineyardDetailsSectionProps) => {
  const [mapAllowed, setMapAllowed] = useState<boolean>(false);

  useEffect(() => {
    if (
      item.coordinates?.length &&
      item.coordinates?.length > 0 &&
      item.grape?.name !== "" &&
      item.grape?.name !== null &&
      item.grape?.name !== undefined &&
      item.grape?.percentage !== "" &&
      item.grape?.percentage !== null &&
      item.grape?.percentage !== undefined &&
      item.grape?.vintageYear !== 0 &&
      item.grape?.vintageYear !== null &&
      item.grape?.vintageYear !== undefined
    ) {
      setMapAllowed(true);
    }
  }, []);

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
        <GrapesViewerTable
          title="Grapes Varieties"
          variant="surface"
          ingredient={item.grape}
        />
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
      {mapAllowed ? (
        <MapVineyardsView
          initialPosition={mapData.initialPosition}
          initialItems={{
            coordinates: item.coordinates,
            grape: item.grape,
          }}
        />
      ) : (
        <Container
          intent="flexRowCenter"
          px="medium"
          py="xsmall"
          gap="xsmall"
          className="bg-status-info/30 rounded-md border border-status-info relative my-[24px]"
        >
          <Icon
            icon="mdi:information-outline"
            width={24}
            height={24}
            className="text-status-info mt-[-4px]"
          />
          <Text variant="info">
            Vineyard map is not available for this blend component. Please edit
            your wine's blend component by clicking on the yellow edit button
            for this wine.
          </Text>
        </Container>
      )}
    </>
  );
};
