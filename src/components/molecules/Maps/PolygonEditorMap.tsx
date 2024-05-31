"use client";

import { Container, Text, Button, MapVineyardsDraw } from "@/components";
import { CoordinateInterface, Grape } from "@/typings/winery";
import { useValidateMapinitialCoordinates } from "@/hooks/useValidateMapinitialCoordinates";
import { useEffect } from "react";

export interface PolygonEditorMapProps {
  initialPosition: CoordinateInterface;
  selectedItem: Grape;
  onPolygonComplete: (item: Grape, polygon: CoordinateInterface[]) => void;
  onCancel: () => void;
  onSave: () => void;
  onMapDataInvalid?: () => void;
}

export const PolygonEditorMap = ({
  initialPosition,
  selectedItem,
  onPolygonComplete,
  onCancel,
  onSave,
  onMapDataInvalid,
}: PolygonEditorMapProps) => {
  return (
    <Container
      intent="flexColLeft"
      gap="small"
      className="bg-surface-light p-[24px] rounded-md w-full"
    >
      <Container intent="flexColLeft" gap="small">
        <Text intent="h6" className="">
          Select the area where{" "}
          <span className="text-primary-light font-semibold">
            {selectedItem?.name}
          </span>{" "}
          is grown.
        </Text>
      </Container>
      <MapVineyardsDraw
        initialPosition={initialPosition}
        onPolygonComplete={(polygon: CoordinateInterface[]) => {
          onPolygonComplete(selectedItem, polygon);
        }}
      />
      <Container intent="flexRowRight" gap="medium">
        <Button
          intent="text"
          onClick={() => {
            onCancel();
          }}
          className="px-[24px] py-[12px] border border-on-surface-dark/40 rounded-md bg-surface"
        >
          Cancel
        </Button>
        <Button
          intent="text"
          onClick={() => {
            onSave();
          }}
          className="px-[24px] py-[12px] border border-on-surface-dark/40 rounded-md bg-surface"
        >
          Save
        </Button>
      </Container>
    </Container>
  );
};
