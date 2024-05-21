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
      initialPosition={(initialPosition.lat, initialPosition.lng)}
      initialItems={initialItems !== undefined ? initialItems : null}
    />
  );
};
