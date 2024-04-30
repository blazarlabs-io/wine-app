import { MapVineyardsMultiGrapeView } from "@/components";
import { useRealtimeDb } from "@/context/realtimeDbContext";

export interface MapViewerSectionProps {
  initialPosition?: any;
  initialItems?: any;
}

export const MapViewerSection = ({
  initialPosition,
  initialItems,
}: MapViewerSectionProps) => {
  const { wineryGeneralInfo } = useRealtimeDb();
  return (
    <MapVineyardsMultiGrapeView
      initialPosition={
        (initialPosition.latitud !== undefined &&
          initialPosition.longitude !== undefined) || {
          latitude: wineryGeneralInfo.wineryHeadquarters.latitude,
          longitude: wineryGeneralInfo.wineryHeadquarters.longitude,
        }
      }
      initialItems={initialItems !== undefined ? initialItems : null}
    />
  );
};
