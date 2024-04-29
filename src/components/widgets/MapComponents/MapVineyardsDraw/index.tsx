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
import {
  CoordinateInterface,
  GrapesMapCoordinatesInterface,
} from "@/typings/winery";
import { UndoRedoControl } from "./undoRedoControl";

export interface MapVineyardsDrawProps {
  initialPosition: any;
  initialPolygon?: GrapesMapCoordinatesInterface;
  onPolygonComplete: (polygon: any[]) => void;
}

export const MapVineyardsDraw = ({
  initialPosition,
  initialPolygon,
  onPolygonComplete,
}: MapVineyardsDrawProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.latitude, lng: initialPosition.longitude },
    zoom: 15,
  };

  const map = useMap();
  const { drawingManager, polygon, startWithInitialPolygon } =
    useDrawingManager();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  const drawPolygon = (polygon: CoordinateInterface[]) => {
    const poly = new google.maps.Polygon({
      paths: polygon,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    poly.setMap(map);
    onPolygonComplete(polygon);
  };

  useEffect(() => {
    if (initialPolygon) {
      startWithInitialPolygon(initialPolygon.coordinates);
    }
  }, []);

  useEffect(() => {
    // drawPolygon(polygon);
    onPolygonComplete(polygon);
  }, [polygon]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 400 }}
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
