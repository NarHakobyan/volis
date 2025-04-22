"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Feature } from "geojson";
import { useRouter } from "next/navigation";
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";
import type { LatLngTuple } from "leaflet";

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
    <div className="relative h-[600px] w-full">
      <MapContainer
        center={CENTER_POSITION as LatLngTuple}
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
              region.hasActiveVoting ? "bg-[#005AA3]" : "bg-gray-300"
            }`}
            style={{
              left: `${region.coordinates[1]}%`,
              top: `${region.coordinates[0]}%`,
            }}
            onClick={() => handleRegionClick(region)}
          >
            <span className="text-xs font-medium text-white">{region.name}</span>
          </div>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#005AA3] bg-white text-[#005AA3] hover:bg-[#005AA3] hover:text-white"
        >
          <Search className="h-4 w-4" />
        </Button>
        <div className="h-[1px] w-full bg-[#005AA3]" />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#005AA3] bg-white text-[#005AA3] hover:bg-[#005AA3] hover:text-white"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-[#005AA3] bg-white text-[#005AA3] hover:bg-[#005AA3] hover:text-white"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4 rounded-sm bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#005AA3]" />
          <span className="text-sm text-[#131317]">Aktiivne hääletus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <span className="text-sm text-[#131317]">Hääletus puudub</span>
        </div>
      </div>
    </div>
  );
}
