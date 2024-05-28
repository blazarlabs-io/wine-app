"use client";

import { Container, Text, Button, MapVineyardsView } from "@/components";
import {
  CoordinateInterface,
  GrapeAndVineyard,
  VineyardGrapeAndCoordinates,
} from "@/typings/winery";
export interface PolygonEditorMapProps {
  initialPosition: CoordinateInterface;
  initialItems: VineyardGrapeAndCoordinates;
  onClose: () => void;
}

export const PolygonViewerMap = ({
  initialPosition,
  initialItems,
  onClose,
}: PolygonEditorMapProps) => {
  console.log("initialItems", initialItems);
  return (
    <Container
      intent="flexColLeft"
      gap="small"
      className="bg-surface-light p-[24px] rounded-md w-full"
    >
      <MapVineyardsView
        initialPosition={initialPosition}
        initialItems={initialItems as VineyardGrapeAndCoordinates}
      />
      <Container intent="flexColLeft" gap="small">
        <Text intent="h6" className="">
          Currently viewing location where{" "}
          <span className="text-primary-light font-semibold">
            {initialItems?.grape?.name}
          </span>{" "}
          <span className="text-primary-light font-semibold">
            ({initialItems?.grape?.percentage}%)
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
