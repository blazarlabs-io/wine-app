"use client";

import {
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export interface MapLocationViewerProps {
  initialPosition: any;
}

export const MapLocationViewer = ({
  initialPosition,
}: MapLocationViewerProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.latitude, lng: initialPosition.longitude },
    zoom: 15,
  };

  const map = useMap();
  // const { drawingManager } = useDrawingManager();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  useEffect(() => {
    const mark = new google.maps.Marker({
      position: INITIAL_CAMERA.center,
      title: "Headquarters",
    });

    mark.setMap(map);
  }, [INITIAL_CAMERA]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 600 }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    ></Map>
  );
};
