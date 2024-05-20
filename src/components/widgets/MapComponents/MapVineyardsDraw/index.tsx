"use client";

import {
  ControlPosition,
  MapControl,
  Map,
  MapCameraProps,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";
import { CoordinateInterface } from "@/typings/winery";
import { UndoRedoControl } from "./undoRedoControl";

export interface MapVineyardsDrawProps {
  initialPosition: any;
  onPolygonComplete: (polygon: any[]) => void;
}

export const MapVineyardsDraw = ({
  initialPosition,
  onPolygonComplete,
}: MapVineyardsDrawProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.lat, lng: initialPosition.lng },
    zoom: 15,
  };

  const map = useMap();
  const { drawingManager, polygon, startWithInitialPolygon } =
    useDrawingManager();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  useEffect(() => {
    // console.log("MapVineyardDraw", initialPosition);
    // if (initialPolygon) {
    //   startWithInitialPolygon(initialPolygon.coordinates);
    // }
  }, []);

  useEffect(() => {
    // drawPolygon(polygon);
    onPolygonComplete(polygon);
  }, [polygon]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 640, height: 400 }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl>
    </Map>
  );
};
