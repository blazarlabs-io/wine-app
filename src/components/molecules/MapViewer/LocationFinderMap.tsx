"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const initialPos = [51.5063074745453, -0.13525403437173164];

export interface LocationFinderMapProps {
  onPin: (lat: string, lon: string) => void;
}

const LocationMarker = ({ onPin }: LocationFinderMapProps) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(initialPos);
  const markerRef = useRef(null);
  const icon = L.icon({ iconUrl: "/map-marker-icon.png" });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          const lat = marker.getLatLng().lat;
          const lon = marker.getLatLng().lng;
          onPin(lat, lon);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      icon={icon}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
};

export const LocationFinderMap = ({ onPin }: LocationFinderMapProps) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer
      center={initialPos}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "640px", width: "100%" }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker onPin={onPin} />
    </MapContainer>
  );
};
