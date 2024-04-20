import { MapVineyardsMultiGrapeView } from "@/components";

export interface MapViewerSectionProps {
  initialPosition?: any;
  initialItemsWithCoordinates?: any;
}

export const MapViewerSection = ({
  initialPosition,
  initialItemsWithCoordinates,
}: MapViewerSectionProps) => {
  return (
    <MapVineyardsMultiGrapeView
      initialPosition={
        initialPosition || {
          latitude: 11.029170401405926,
          longitude: -74.82477420222459,
        }
      }
      polygons={
        initialItemsWithCoordinates !== undefined
          ? initialItemsWithCoordinates
          : null
      }
    />
  );
};
