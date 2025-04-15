"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Feature } from "geojson";
import { useRouter } from "next/navigation";

// Estonia's approximate center coordinates
const CENTER_POSITION = [58.5953, 25.0136];
const ZOOM_LEVEL = 7;

// This is a simplified version. In a real app, you would load this from an API
const mockRegions = [
  {
    id: "tallinn",
    name: "Tallinn",
    hasActiveVoting: true,
    coordinates: [59.4370, 24.7536],
  },
  {
    id: "tartu",
    name: "Tartu",
    hasActiveVoting: false,
    coordinates: [58.3780, 26.7290],
  },
  // Add more regions as needed
];

export function EstoniaMap() {
  const router = useRouter();

  const handleRegionClick = (region: typeof mockRegions[0]) => {
    router.push(`/lg/${region.id}`);
  };

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg border">
      <MapContainer
        center={CENTER_POSITION}
        zoom={ZOOM_LEVEL}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mockRegions.map((region) => (
          <div
            key={region.id}
            className={`absolute cursor-pointer rounded-full p-2 ${
              region.hasActiveVoting ? "bg-primary" : "bg-muted"
            }`}
            style={{
              left: `${region.coordinates[1]}%`,
              top: `${region.coordinates[0]}%`,
            }}
            onClick={() => handleRegionClick(region)}
          >
            <span className="text-xs font-medium">{region.name}</span>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
