"use client";

import {
  Button,
  Container,
  InfoTooltip,
  PolygonEditorMap,
  PolygonViewerMap,
  Text,
} from "@/components";
import {
  CoordinateInterface,
  GrapeVariety,
  VineyardGrapeGrownWithCoordinates,
} from "@/typings/winery";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRealtimeDb } from "@/context/realtimeDbContext";
import { getVineyardGrapeGrown } from "@/utils/firestore";
import { useAuth } from "@/context/authContext";

export interface VineyardCoordinatesCrudProps {
  referenceNumber: string;
  onCancel: () => void;
  onSave: (item: VineyardGrapeGrownWithCoordinates) => void;
}

export const VineyardCoordinatesCrud = ({
  referenceNumber,
  onSave,
  onCancel,
}: VineyardCoordinatesCrudProps) => {
  const { wineryGeneralInfo } = useRealtimeDb();
  const { user } = useAuth();
  const [showMapEditor, setShowMapEditor] = useState<boolean>(false);
  const [showMapViewer, setShowMapViewer] = useState<boolean>(false);
  const [vineyardGrapesGrown, setVineyardGrapesGrown] =
    useState<VineyardGrapeGrownWithCoordinates | null>(null);

  useEffect(() => {
    getVineyardGrapeGrown(referenceNumber, user?.uid as string)
      .then((data: any) => {
        console.log(data);
        setVineyardGrapesGrown(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {showMapViewer && (
        <PolygonViewerMap
          initialPosition={
            wineryGeneralInfo.wineryHeadquarters as CoordinateInterface
          }
          initialItems={
            vineyardGrapesGrown as VineyardGrapeGrownWithCoordinates
          }
          onClose={() => setShowMapViewer(false)}
        />
      )}
      {showMapEditor && (
        <PolygonEditorMap
          initialPosition={
            wineryGeneralInfo.wineryHeadquarters as CoordinateInterface
          }
          selectedItem={vineyardGrapesGrown?.grapeGrown as any}
          onPolygonComplete={(
            item: GrapeVariety,
            polygon: CoordinateInterface[]
          ) => {
            if (vineyardGrapesGrown) {
              vineyardGrapesGrown.coordinates = polygon;
              vineyardGrapesGrown.grapeGrown = item;
              setVineyardGrapesGrown(vineyardGrapesGrown);
            }
          }}
          onCancel={() => setShowMapEditor(false)}
          onSave={() => {
            if (vineyardGrapesGrown) {
              setVineyardGrapesGrown(vineyardGrapesGrown);
              setShowMapEditor(false);
            }
          }}
        />
      )}
      <Container intent="flexColLeft" gap="small">
        <Container intent="flexRowLeft" gap="xsmall" className="">
          <Container intent="flexRowBetween" gap="xsmall" className="">
            <Container intent="flexRowLeft" gap="xsmall" className="">
              <Text
                intent="p1"
                variant="dim"
                className="font-semibold min-w-fit"
              >
                * Vineyard Coordinates
              </Text>
              <InfoTooltip text="What is the amount of sugar per 100g of wine?" />
            </Container>
            {vineyardGrapesGrown?.coordinates &&
              vineyardGrapesGrown?.coordinates?.length > 0 && (
                <Button
                  intent="text"
                  onClick={() => setShowMapViewer(true)}
                  className="min-w-fit"
                >
                  Edit coordinates
                </Button>
              )}
          </Container>
        </Container>
        <Container intent="flexRowLeft" gap="xsmall" className="">
          {vineyardGrapesGrown?.coordinates &&
          vineyardGrapesGrown.coordinates.length > 0 ? (
            <>
              {vineyardGrapesGrown.coordinates.map((coordinate, index) => (
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
          ) : vineyardGrapesGrown?.grapeGrown ? (
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
                Set Map for {vineyardGrapesGrown.grapeGrown.name}
              </Text>
            </button>
          ) : (
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
                New Vineyard Coordinates
              </Text>
            </button>
          )}
        </Container>
        <Container intent="flexRowRight" py="medium" gap="small">
          <Button
            intent="secondary"
            size="medium"
            onClick={() => {
              setShowMapEditor(false);
              setShowMapViewer(false);
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            onClick={() => {
              if (vineyardGrapesGrown) {
                onSave(vineyardGrapesGrown);
                setShowMapEditor(false);
                setShowMapViewer(false);
              }
            }}
          >
            Save
          </Button>
        </Container>
      </Container>
    </>
  );
};
