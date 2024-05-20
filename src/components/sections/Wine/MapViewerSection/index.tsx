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
          lat: wineryGeneralInfo.wineryHeadquarters.lat,
          lng: wineryGeneralInfo.wineryHeadquarters.lng,
        }
      }
      initialItems={initialItems !== undefined ? initialItems : null}
    />
  );
};
