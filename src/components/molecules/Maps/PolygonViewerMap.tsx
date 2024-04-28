"use client";

import { Container, Text, Button, MapVineyardsView } from "@/components";
export interface PolygonEditorMapProps {
  initialPosition: any;
  initialItems: any;
  selectedItem: any;
  onClose: () => void;
}

export const PolygonViewerMap = ({
  initialPosition,
  selectedItem,
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
        initialPolygon={
          initialItems !== undefined
            ? (
                initialItems.filter(
                  (item: any) => item.name === selectedItem?.name
                ) as any
              )[0]
            : null
        }
      />
      <Container intent="flexColLeft" gap="small">
        <Text intent="h6" className="">
          Currently viewing location where{" "}
          <span className="text-primary-light font-semibold">
            {selectedItem?.name}
          </span>{" "}
          <span className="text-primary-light font-semibold">
            ({selectedItem?.percentage}%)
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
