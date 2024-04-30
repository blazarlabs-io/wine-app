"use client";

import {
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";

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
  const { drawingManager } = useDrawingManager();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  var infowindow = new google.maps.InfoWindow();

  useEffect(() => {
    const mark = new google.maps.Marker({
      position: INITIAL_CAMERA.center,
      title: "Headquarters",
    });

    google.maps.event.addListener(mark, "click", function () {
      infowindow.setContent(mark.getTitle());
      infowindow.open(map, mark);
    });

    mark.setMap(map);
  }, [INITIAL_CAMERA]);

  useEffect(() => {
    if (map) {
      console.log(map);
      map.overlayMapTypes.forEach((layer) => {
        console.log(layer);
      });
    }
  }, [map]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 600 }}
      onCameraChanged={handleCameraChange}
    />
  );
};
