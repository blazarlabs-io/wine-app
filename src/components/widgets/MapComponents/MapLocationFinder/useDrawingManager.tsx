"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import "@vis.gl/react-google-maps/examples.css";

export function useDrawingManager(
  initialValue: google.maps.drawing.DrawingManager | null = null
) {
  const map = useMap();

  const drawing = useMapsLibrary("drawing");

  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager | null>(initialValue);

  const [drawingMode, setDrawingMode] = useState<any>(null);

  const [posibleDrawingModes, setPosibleDrawingModes] = useState<any>(null);

  const [marker, setMarker] = useState<any>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const removeDrawingControls = useCallback((m: any) => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (!map || !drawing) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: drawingMode,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: posibleDrawingModes,
      },
      markerOptions: {
        draggable: true,
      },
    });

    google.maps.event.addListener(
      newDrawingManager,
      "markercomplete",
      (marker: any) => {
        console.log(marker.getPosition().lat(), marker.getPosition().lng());
        setDrawingMode(null);
        setPosibleDrawingModes([]);
        setMarker({
          lat: marker.getPosition().lat(),
          lng: marker.getPosition().lng(),
        });
        google.maps.event.addListener(marker, "dragend", () => {
          console.log(marker.getPosition().lat(), marker.getPosition().lng());
          setMarker({
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
          });
        });
      }
    );

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
      google.maps.event.clearInstanceListeners(newDrawingManager);
    };
  }, [drawing, map, drawingMode, posibleDrawingModes, isEditing]);

  useEffect(() => {
    return () => {
      drawingManager?.setMap(null);
    };
  }, [drawingManager]);

  useEffect(() => {
    if (google.maps.drawing) {
      setDrawingMode(google.maps.drawing.OverlayType.MARKER);
    } else {
      setDrawingMode(null);
      setPosibleDrawingModes([]);
    }
  }, [google.maps.drawing]);

  return { drawingManager, marker, removeDrawingControls };
}
