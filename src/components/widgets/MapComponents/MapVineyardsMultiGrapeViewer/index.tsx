"use client";

import {
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDrawingManager } from "./useDrawingManager";
import { CoordinateInterface } from "@/typings/winery";
import { getPolygonCenter } from "@/utils/getPolygonCenter";
import { useResponsive } from "@/hooks/useResponsive";

export interface MapVineyardsDrawProps {
  initialPosition: CoordinateInterface;
  initialItems?: any;
}

export const MapVineyardsMultiGrapeView = ({
  initialPosition,
  initialItems,
}: MapVineyardsDrawProps) => {
  const { responsiveSize } = useResponsive();

  const INITIAL_CAMERA = {
    center: { lat: initialPosition.lat, lng: initialPosition.lng },
    zoom: 15,
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

  const drawPolygon = (polygon: CoordinateInterface[], color: string) => {
    //   const poly = new google.maps.Polygon({
    //     paths: polygon.coordinates,
    //     strokeColor: color,
    //     strokeOpacity: 0.75,
    //     strokeWeight: 4,
    //     fillColor: color,
    //     fillOpacity: 0.25,
    //     editable: false,
    //   });
    //   const mark = new google.maps.Marker({
    //     position: getPolygonCenter(polygon.coordinates),
    //     title: polygon?.name,
    //   });
    //   mark.setMap(map);
    //   poly.setMap(map);
    //   return mark;
  };

  var infowindow = new google.maps.InfoWindow();

  useEffect(() => {
    initialItems?.forEach((item: any, index: number) => {
      const centerMarker = drawPolygon(item as any, colors[index]);

      // google.maps.event.addListener(centerMarker, "click", function () {
      //   infowindow.setContent(item.name + ": " + item.percentage + "%");
      //   infowindow.open(map, centerMarker);
      // });

      google.maps.event.addListener(item, "click", function (event: Event) {});
    });

    return () => {
      initialItems?.forEach((polygon: any) => {
        // polygon.setMap(null);
        google.maps.event.clearListeners(polygon, "click");
      });
    };
  }, [drawingManager]);

  return (
    <Map
      {...cameraProps}
      style={{
        minWidth: responsiveSize === "desktop" ? 800 : 320,
        maxWidth: 800,
        height: 400,
      }}
      onCameraChanged={handleCameraChange}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
    />
  );
};
