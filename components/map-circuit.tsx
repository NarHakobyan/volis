"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MapPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  active?: boolean;
}

const mapPoints: MapPoint[] = [
  { id: "tallinn", x: 120, y: 80, label: "Tallinn", active: true },
  { id: "tartu", x: 320, y: 180, label: "Tartu", active: true },
  { id: "parnu", x: 180, y: 280, label: "Pärnu" },
  { id: "narva", x: 420, y: 80, label: "Narva", active: true },
  // Add more points as needed
];

export function MapCircuit() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="relative h-[400px] w-full">
      {/* Map SVG */}
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Estonia map outline - simplified for example */}
        <path
          d="M50 100 L450 100 L450 300 L50 300 Z"
          stroke="#000000"
          strokeWidth="2"
          fill="none"
        />

        {/* Interactive points */}
        {mapPoints.map((point) => (
          <g key={point.id}>
            {/* Connection lines for active points */}
            {point.active && (
              <line
                x1={point.x}
                y1={point.y}
                x2={point.x + 20}
                y2={point.y + 20}
                stroke="#000000"
                strokeWidth="1"
                className="opacity-50"
              />
            )}

            {/* Point circle */}
            <circle
              cx={point.x}
              cy={point.y}
              r={8}
              className={cn(
                "cursor-pointer transition-all duration-200",
                point.active
                  ? "fill-[#005AA3]"
                  : "fill-[#C4C4C4]",
                hoveredPoint === point.id && "scale-125"
              )}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </g>
        ))}
      </svg>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <span className="text-lg font-bold text-[#005AA3]">+</span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <span className="text-lg font-bold text-[#005AA3]">-</span>
        </button>
      </div>
    </div>
  );
}
