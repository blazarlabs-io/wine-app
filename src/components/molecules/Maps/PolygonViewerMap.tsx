"use client";

import { Container, Text, Button, MapVineyardsView } from "@/components";
import {
  CoordinateInterface,
  GrapeAndVineyard,
  VineyardGrapeGrownWithCoordinates,
} from "@/typings/winery";
export interface PolygonEditorMapProps {
  initialPosition: CoordinateInterface;
  initialItems: VineyardGrapeGrownWithCoordinates;
  onClose: () => void;
}

export const PolygonViewerMap = ({
  initialPosition,
  initialItems,
  onClose,
}: PolygonEditorMapProps) => {
  return (
    <Container
      intent="flexColLeft"
      gap="small"
      className="bg-surface-light p-[24px] rounded-md max-w-[848px]"
    >
      <MapVineyardsView
        initialPosition={initialPosition}
        initialItems={initialItems as VineyardGrapeGrownWithCoordinates}
      />
      <Container intent="flexColLeft" gap="small">
        <Text intent="h6" className="">
          Currently viewing location where{" "}
          <span className="text-primary-light font-semibold">
            {initialItems?.grapeGrown?.name}
          </span>{" "}
          <span className="text-primary-light font-semibold">
            ({initialItems?.grapeGrown?.percentage}%)
          </span>{" "}
          is grown.
        </Text>
      </Container>
      <Container intent="flexRowRight" gap="small">
        <Button
          intent="primary"
          size="medium"
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>
      </Container>
    </Container>
  );
};
