"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import "@vis.gl/react-google-maps/examples.css";
import { normalizeData } from "./normalizeData";

export function useDrawingManager(
  initialValue: google.maps.drawing.DrawingManager | null = null
) {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(initialValue);

  const [polygon, setPolygon] = useState<any[]>([]);
  const [rawPolygon, setRawPolygon] = useState<any | null>(null);
  const [initialPolygon, setInitialPolygon] = useState<any[] | null>(null);

  const startWithInitialPolygon = (polygon: any) => {
    setInitialPolygon(polygon);
  };

  useEffect(() => {
    if (!map || !drawing) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          //   google.maps.drawing.OverlayType.MARKER,
          //   google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          //   google.maps.drawing.OverlayType.POLYLINE,
          //   google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
      markerOptions: {
        draggable: true,
      },
      circleOptions: {
        editable: true,
      },
      polygonOptions: {
        editable: false,
        draggable: true,
        fillColor: "#FF0000",
        strokeColor: "#222222",
        strokeWeight: 2,
      },
      rectangleOptions: {
        editable: true,
        draggable: true,
      },
      polylineOptions: {
        editable: true,
        draggable: true,
      },
    });

    newDrawingManager.setDrawingMode("polygon");

    setDrawingManager(newDrawingManager);

    // detect polygon complete event
    google.maps.event.addListener(
      newDrawingManager,
      "polygoncomplete",
      function (rawPolygon: google.maps.Polygon) {
        setRawPolygon(rawPolygon);

        // detect drag events
        google.maps.event.addListener(rawPolygon, "dragend", function () {
          const newNormalCoordinates = normalizeData(rawPolygon);
          setPolygon(newNormalCoordinates);
          console.log("dragend");
        });

        const normalCoordinates = normalizeData(rawPolygon);
        setPolygon(normalCoordinates);
        console.log("polygoncomplete");
      }
    );

    return () => {
      newDrawingManager.setMap(null);
      google.maps.event.clearInstanceListeners(newDrawingManager);
    };
  }, [drawing, map]);

  useEffect(() => {
    console.log("initialPolygon", initialPolygon);
    if (initialPolygon) {
      setPolygon(initialPolygon);
    }
    return () => {
      drawingManager?.setMap(null);
    };
  }, [initialPolygon]);

  return { drawingManager, polygon, startWithInitialPolygon };
}
