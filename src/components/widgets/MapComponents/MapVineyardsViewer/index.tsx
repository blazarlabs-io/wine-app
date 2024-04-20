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
import {
  CoordinateInterface,
  GrapesMapCoordinatesInterface,
} from "@/typings/winery";

export interface MapVineyardsDrawProps {
  initialPosition: any;
  initialPolygon?: GrapesMapCoordinatesInterface;
}

export const MapVineyardsView = ({
  initialPosition,
  initialPolygon,
}: MapVineyardsDrawProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.latitude, lng: initialPosition.longitude },
    zoom: 11,
  };

  const map = useMap();
  const { drawingManager } = useDrawingManager();
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
      editable: false,
    });

    poly.setMap(map);
  };

  useEffect(() => {
    if (initialPolygon) drawPolygon(initialPolygon?.coordinates as any);
  }, [drawingManager]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 400 }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {/* <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} />
      </MapControl> */}
    </Map>
  );
};
