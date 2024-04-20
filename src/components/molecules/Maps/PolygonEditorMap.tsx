"use client";

import { Container, Text, Button, MapVineyardsDraw } from "@/components";
import { CoordinateInterface } from "@/typings/winery";
import Image from "next/image";
import { useState } from "react";

export interface PolygonEditorMapProps {
  initialPosition: any;
  initialItemsWithCoordinates: any;
  selectedItem: any;
  onPolygonComplete: (item: any, polygon: any[]) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const PolygonEditorMap = ({
  initialPosition,
  selectedItem,
  initialItemsWithCoordinates,
  onPolygonComplete,
  onCancel,
  onSave,
}: PolygonEditorMapProps) => {
  return (
    <Container
      intent="flexColLeft"
      gap="small"
      className="bg-surface-light p-[24px] rounded-md max-w-[848px]"
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
        initialPolygon={
          initialItemsWithCoordinates !== undefined
            ? (
                initialItemsWithCoordinates.filter(
                  (item: any) => item.name === selectedItem?.name
                ) as any
              )[0]
            : null
        }
        onPolygonComplete={(polygon: CoordinateInterface[]) => {
          onPolygonComplete(selectedItem, polygon);
        }}
      />
      <Container intent="flexColLeft" py="small">
        <Text intent="h6" className="font-semibold mb-[16px]">
          Instructions
        </Text>
        <Text intent="p1" className="">
          1. Use ctrl + scroll to zoom in and out of the map.
        </Text>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            2. Use crtl + left-click to pan and tilt or select and use the
          </Text>
          <Image
            src="/draw-hand-icon.png"
            width="20"
            height="20"
            className="mt-[-4px]"
            alt=""
          />
          <Text>icon on the top of the map.</Text>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            3. Select the
          </Text>
          <Image
            src="/draw-polygon-icon.png"
            width="20"
            height="20"
            className="mt-[-4px]"
            alt=""
          />
          <Text>icon on the top the map to start drawing your polygon.</Text>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            4. Click on the map location to add the first vertex.
          </Text>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            5. Move the mouse to a new location and click to add another vertex.
          </Text>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            6. Add as many vertices as necessary to define the polygon.
          </Text>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall">
          <Text intent="p1" className="">
            7. Close the polygon by clicking over the first vertex.
          </Text>
        </Container>
      </Container>
      <Container intent="flexRowRight" gap="small">
        <Button
          intent="secondary"
          size="medium"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          intent="primary"
          size="medium"
          onClick={() => {
            onSave();
          }}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
};
