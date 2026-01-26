"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import map components (client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapWithSkeletonProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export default function MapWithSkeleton({
  latitude,
  longitude,
  title,
  address,
}: MapWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fix Leaflet default marker icons (only on client side)
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: "/leaflet/marker-icon.png",
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          shadowUrl: "/leaflet/marker-shadow.png",
        });
      });
    }

    // Simulate loading delay
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return (
      <div className="map-wrapper">
        <div className="map-skeleton skeleton" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="map-wrapper">
      {!isLoaded && <div className="map-skeleton skeleton" aria-hidden="true" />}
      {isLoaded && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{title}</strong>
              <br />
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
