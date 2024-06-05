"use client";

import {
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";
import {
  CoordinateInterface,
  VineyardGrapeAndCoordinates,
} from "@/typings/winery";
import { Container, DropDown, Text } from "@/components";
import { getPolygonCenter } from "@/utils/getPolygonCenter";
import { useSetMapInitialData } from "@/hooks/useSetMapInitialData";

export interface MapVineyardsDrawProps {
  initialPosition: CoordinateInterface;
  initialItems: VineyardGrapeAndCoordinates;
}

export const MapVineyardsView = ({
  initialPosition,
  initialItems,
}: MapVineyardsDrawProps) => {
  const { initialMapData } = useSetMapInitialData();

  // initial camera position
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.lat, lng: initialPosition.lng },
    zoom: 15,
  };

  // get map instance
  const map = useMap();

  // get drawing manager instance
  const { drawingManager } = useDrawingManager();

  // set camera props
  const [cameraProps, setCameraProps] = useState<MapCameraProps | null>(null);

  // Markers array
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // handle camera change
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  // create info window
  const infowindow = new google.maps.InfoWindow();

  const drawPolygon = (polygon: CoordinateInterface[]) => {
    const poly = new google.maps.Polygon({
      paths: polygon,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      editable: false,
    });

    poly.setMap(map);
  };

  useEffect(() => {
    console.log(initialItems);
    if (initialMapData && initialItems.coordinates.length === 0) {
      setCameraProps({
        center: { lat: initialMapData.lat, lng: initialMapData.lng },
        zoom: 15,
      });
    } else {
      setCameraProps({
        center: getPolygonCenter(
          initialItems.coordinates
        ) as CoordinateInterface,
        zoom: 15,
      });
    }
  }, [initialMapData]);

  useEffect(() => {
    if (initialItems?.coordinates) {
      drawPolygon(initialItems?.coordinates);

      const mark = new google.maps.Marker({
        position: getPolygonCenter(
          initialItems?.coordinates
        ) as CoordinateInterface,
        title: initialItems?.grape?.name,
      });

      mark.setMap(map);

      setMarkers([...markers, mark]);
    }
  }, [drawingManager]);

  useEffect(() => {
    if (markers.length > 0) {
      markers.forEach((marker) => {
        google.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(marker.getTitle());
          infowindow.open(map, marker);
        });
      });
    }
  }, [markers]);

  // console.log("initialItems", initialItems);
  // console.log("initialPosition", initialPosition);

  return (
    <>
      {cameraProps ? (
        <Map
          {...cameraProps}
          style={{ width: "100%", height: 400 }}
          onCameraChanged={handleCameraChange}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapTypeId={"satellite"}
        >
          {/* <DropDown id="mapStyle" items={[]} onSelect={() => {}} /> */}
        </Map>
      ) : (
        <Container
          intent="flexRowLeft"
          gap="xsmall"
          py="medium"
          className="mt-[24px]"
        >
          <Text variant="warning" className="font-semibold capitalize">
            No coordinates available
          </Text>
          <Text variant="dim">Please add coordinates to show the map</Text>
        </Container>
      )}
    </>
  );
};
