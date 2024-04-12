"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

export interface SimpleMapViewerProps {
  lat: string;
  lon: string;
}

export default function SimpleMapViewer({ lat, lon }: SimpleMapViewerProps) {
  const position = [parseFloat(lat), parseFloat(lon)] as LatLngExpression;
  const [map, setMap] = useState<any | null>(null);
  const icon = L.icon({ iconUrl: "/map-marker-icon.png" });

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer
      center={position as LatLngExpression}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "640px", width: "100%" }}
      whenReady={() => setMap(map)}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon} />
    </MapContainer>
  );
}
