"use client";

import {
  Button,
  Container,
  PolygonEditorMap,
  PolygonViewerMap,
  Text,
} from "@/components";
import {
  BlendComponent,
  CoordinateInterface,
  Grape,
  VineyardGrapeAndCoordinates,
} from "@/typings/winery";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { useModal } from "@/context/modalContext";
import { useValidateMapinitialCoordinates } from "@/hooks/useValidateMapinitialCoordinates";
import { useSetMapInitialData } from "@/hooks/useSetMapInitialData";

export interface VineyardCoordinatesCrudProps {
  blendComponent: BlendComponent;
  grape: Grape;
  onCancel: () => void;
  onSave: (gap: VineyardGrapeAndCoordinates) => void;
  onDelete?: () => void;
}

export const VineyardCoordinatesCrud = ({
  grape,
  blendComponent,
  onSave,
  onCancel,
  onDelete,
}: VineyardCoordinatesCrudProps) => {
  const { wineryGeneralInfo } = useRealtimeDb();
  const { updateModal } = useModal();
  const { initialMapData } = useSetMapInitialData();
  const [showMapEditor, setShowMapEditor] = useState<boolean>(false);
  const [showMapViewer, setShowMapViewer] = useState<boolean>(false);
  const [grapeAndCoordinates, setGrapeAndCoordinates] =
    useState<VineyardGrapeAndCoordinates>({} as VineyardGrapeAndCoordinates);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleFindOnMap = () => {
    if (
      blendComponent.vineyardDetails?.grape?.name === null ||
      blendComponent.vineyardDetails?.grape?.percentage === null ||
      blendComponent.vineyardDetails?.grape?.vintageYear === null
    ) {
      updateModal({
        show: true,
        title: "Grape Details Not Set",
        description:
          "To set your vineyard coordinates, you must set your grape details first (name, percentage and vintage year).",
        action: {
          label: "Ok",
          onAction: () => {
            updateModal({
              show: false,
              title: "",
              description: "",
              action: {
                label: "",
                onAction: () => {},
              },
            });
          },
        },
      });
      return;
    } else {
      setShowMapEditor(true);
    }
  };

  useEffect(() => {
    if (isDone === true) {
      if (grapeAndCoordinates && Object.keys(grapeAndCoordinates).length > 0) {
        onSave(grapeAndCoordinates as VineyardGrapeAndCoordinates);
        setIsDone(false);
      }
    }

    if (
      showMapEditor &&
      wineryGeneralInfo.wineryHeadquarters.lat === null &&
      wineryGeneralInfo.wineryHeadquarters.lng === null
    ) {
      updateModal({
        show: true,
        title: "Winery Headquarters Not Set",
        description:
          "To set your vineyard coordinates, you must set your winery headquarters coordinates first. Please go to the winery settings on your dashboard and set your winery headquarters.",
        action: {
          label: "Ok",
          onAction: () => {
            updateModal({
              show: false,
              title: "",
              description: "",
              action: {
                label: "",
                onAction: () => {},
              },
            });
          },
        },
      });
    }
  }, [
    isDone,
    grapeAndCoordinates,
    showMapEditor,
    wineryGeneralInfo.wineryHeadquarters.lat,
    wineryGeneralInfo.wineryHeadquarters.lng,
  ]);

  useEffect(() => {
    if (
      blendComponent.vineyardDetails?.grape &&
      blendComponent.vineyardDetails?.coordinates &&
      blendComponent.vineyardDetails?.coordinates.length > 0
    ) {
      setGrapeAndCoordinates({
        grape: blendComponent.vineyardDetails.grape,
        coordinates: blendComponent.vineyardDetails.coordinates,
      });
    }
  }, [blendComponent]);

  return (
    <>
      <Container intent="flexRowLeft" py="small" gap="xsmall" className="">
        <Container intent="flexRowRight" gap="xsmall" className="">
          {grapeAndCoordinates?.coordinates &&
            grapeAndCoordinates?.coordinates?.length > 0 && (
              <div className="flex items-center justify-center gap-[24px]">
                <Button
                  intent="text"
                  onClick={() => setShowMapViewer(true)}
                  className="min-w-fit flex items-center justify-center gap-[4px]"
                >
                  <Icon icon="hugeicons:view" className="mt-[-4px]" />
                  View
                </Button>
                <Button
                  intent="text"
                  onClick={() => {
                    setGrapeAndCoordinates({} as VineyardGrapeAndCoordinates);
                    onDelete && onDelete();
                  }}
                  className="min-w-fit flex items-center justify-center gap-[4px]"
                >
                  <Icon icon="ph:trash" className="mt-[-4px]" />
                  Delete
                </Button>
              </div>
            )}
        </Container>
      </Container>
      {showMapViewer && (
        <div className="w-full">
          <PolygonViewerMap
            initialPosition={
              wineryGeneralInfo.wineryHeadquarters as CoordinateInterface
            }
            initialItems={grapeAndCoordinates as VineyardGrapeAndCoordinates}
            onClose={() => setShowMapViewer(false)}
          />
        </div>
      )}
      {showMapEditor && (
        <div className="w-full">
          <PolygonEditorMap
            initialPosition={initialMapData as CoordinateInterface}
            selectedItem={blendComponent.vineyardDetails?.grape as any}
            onPolygonComplete={(
              item: Grape,
              polygon: CoordinateInterface[]
            ) => {
              grapeAndCoordinates.coordinates = polygon;
              grapeAndCoordinates.grape = item;
              setGrapeAndCoordinates(grapeAndCoordinates);
            }}
            onCancel={() => setShowMapEditor(false)}
            onSave={() => {
              setIsDone(true);
              setShowMapEditor(false);
            }}
            onMapDataInvalid={() => {
              setShowMapEditor(false);
            }}
          />
        </div>
      )}
      <Container intent="flexColLeft" gap="small">
        <Container intent="flexRowWrap" gap="xsmall" className="">
          {grapeAndCoordinates?.coordinates &&
          grapeAndCoordinates.coordinates.length > 0 ? (
            <>
              {grapeAndCoordinates.coordinates.map((coordinate, index) => (
                <div
                  key={index}
                  className="border border-primary-light rounded-lg p-[12px] bg-surface-dark flex items-center gap-[8px]"
                >
                  <Text
                    intent="p2"
                    variant="dim"
                    className="font-semibold min-w-fit"
                  >
                    {coordinate.lat}, {coordinate.lng}
                  </Text>
                </div>
              ))}
            </>
          ) : grapeAndCoordinates?.grape ? (
            <button
              type="button"
              onClick={() => setShowMapEditor(true)}
              className="flex items-center justify-center gap-[4px] border border-primary-light rounded-md p-[12px]"
            >
              <Icon
                icon="bx:map"
                className="text-primary-light w-[20px] mt-[-4px]"
              />
              <Text
                intent="p2"
                variant="dim"
                className="font-semibold min-w-fit text-primary-light"
              >
                Set Map for {grapeAndCoordinates.grape.name}
              </Text>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleFindOnMap()}
              className="flex items-center justify-center gap-[4px] border border-primary-light rounded-md p-[12px]"
            >
              <Icon
                icon="bx:map"
                className="text-primary-light w-[20px] mt-[-4px]"
              />
              <Text
                intent="p2"
                variant="dim"
                className="font-semibold min-w-fit text-primary-light"
              >
                Find on Map
              </Text>
            </button>
          )}
        </Container>
      </Container>
    </>
  );
};
