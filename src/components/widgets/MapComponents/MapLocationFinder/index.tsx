"use client";

import {
  ControlPosition,
  MapControl,
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";

export interface MapVineyardsDrawProps {
  initialPosition: any;
  isEditing: boolean;
  onMarkerSet: (marker: any[]) => void;
}

export const MapLocationFinder = ({
  initialPosition,
  isEditing,
  onMarkerSet,
}: MapVineyardsDrawProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.latitude, lng: initialPosition.longitude },
    zoom: 5,
  };

  const map = useMap();

  const { drawingManager, marker, removeDrawingControls } = useDrawingManager();

  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  useEffect(() => {
    console.log("isEditing", isEditing, INITIAL_CAMERA.center);
    if (marker) {
      onMarkerSet(marker);
    }
  }, [marker]);

  //   useEffect(() => {
  //     if (isEditing) {
  //       const mark = new google.maps.Marker({
  //         position: INITIAL_CAMERA.center,
  //         title: "Headquarters",

  //         draggable: true,
  //       });

  //       mark.setMap(map);
  //       removeDrawingControls(mark);
  //     }
  //   }, [INITIAL_CAMERA]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 600 }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      <MapControl position={ControlPosition.TOP_CENTER}>
        {/* <UndoRedoControl drawingManager={drawingManager} /> */}
      </MapControl>
    </Map>
  );
};
