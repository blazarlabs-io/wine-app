"use client";

import {
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";
import {
  CoordinateInterface,
  GrapesMapCoordinatesInterface,
} from "@/typings/winery";
import { getPolygonCenter } from "@/utils/getPolygonCenter";

export interface MapVineyardsDrawProps {
  initialPosition: any;
  polygons?: any;
}

export const MapVineyardsMultiGrapeView = ({
  initialPosition,
  polygons,
}: MapVineyardsDrawProps) => {
  const INITIAL_CAMERA = {
    center: { lat: initialPosition.latitude, lng: initialPosition.longitude },
    zoom: 11,
  };

  const map = useMap();
  const { drawingManager } = useDrawingManager();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  };

  const colors: string[] = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00CB",
    "#00FFFF",
    "#aaFF00",
  ];

  const drawPolygon = (
    polygon: GrapesMapCoordinatesInterface,
    color: string
  ) => {
    const poly = new google.maps.Polygon({
      paths: polygon.coordinates,
      strokeColor: color,
      strokeOpacity: 0.75,
      strokeWeight: 4,
      fillColor: color,
      fillOpacity: 0.25,
      editable: false,
    });

    const mark = new google.maps.Marker({
      position: getPolygonCenter(polygon.coordinates),
      title: polygon?.name,
    });

    mark.setMap(map);
    poly.setMap(map);

    return mark;
  };

  var infowindow = new google.maps.InfoWindow();

  useEffect(() => {
    // if (initialPolygon) drawPolygon(initialPolygon?.coordinates as any);
    console.log("initialPosition", initialPosition);

    polygons?.forEach((polygon: any, index: number) => {
      console.log("polygon", polygon);
      const centerMarker = drawPolygon(polygon as any, colors[index]);

      google.maps.event.addListener(centerMarker, "click", function () {
        infowindow.setContent(polygon.name + ": " + polygon.percentage + "%");
        infowindow.open(map, centerMarker);
      });

      google.maps.event.addListener(polygon, "click", function (event) {
        console.log("polygon", polygon);
      });
    });

    return () => {
      polygons?.forEach((polygon: any) => {
        // polygon.setMap(null);
        google.maps.event.clearListeners(polygon, "click");
      });
    };
  }, [drawingManager]);

  return (
    <Map
      {...cameraProps}
      style={{ width: 800, height: 400 }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
    />
  );
};
