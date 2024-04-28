import { MapVineyardsMultiGrapeView } from "@/components";

export interface MapViewerSectionProps {
  initialPosition?: any;
  initialItems?: any;
}

export const MapViewerSection = ({
  initialPosition,
  initialItems,
}: MapViewerSectionProps) => {
  console.log("initialItems", initialItems);
  return (
    <MapVineyardsMultiGrapeView
      initialPosition={
        initialPosition || {
          latitude: 11.029170401405926,
          longitude: -74.82477420222459,
        }
      }
      initialItems={initialItems !== undefined ? initialItems : null}
    />
  );
};
