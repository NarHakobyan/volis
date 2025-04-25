'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Region {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  activeProjects: number;
  totalBudget: string;
}

const regions: Region[] = [
  {
    id: 'tartu-kesklinn',
    name: 'Tartu Kesklinn',
    coordinates: { x: 50, y: 45 },
    activeProjects: 12,
    totalBudget: '75,000€'
  },
  {
    id: 'annelinn',
    name: 'Annelinn',
    coordinates: { x: 70, y: 40 },
    activeProjects: 8,
    totalBudget: '45,000€'
  },
  {
    id: 'tahtvere',
    name: 'Tähtvere',
    coordinates: { x: 30, y: 35 },
    activeProjects: 5,
    totalBudget: '30,000€'
  },
  {
    id: 'karlova',
    name: 'Karlova',
    coordinates: { x: 55, y: 60 },
    activeProjects: 4,
    totalBudget: '25,000€'
  },
  {
    id: 'supilinn',
    name: 'Supilinn',
    coordinates: { x: 40, y: 30 },
    activeProjects: 3,
    totalBudget: '20,000€'
  }
];

export function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[820px] h-[400px] mx-auto">
      <Image
        src="/images/map-circuit.png"
        alt="Eesti kaart küsitlustega"
        fill
        className="object-contain"
        priority
      />
      <TooltipProvider>
        {regions.map((region) => (
          <Tooltip key={region.id}>
            <TooltipTrigger asChild>
              <Link
                href={`/kov/participatory-budget?region=${region.id}`}
                className={`absolute group cursor-pointer`}
                style={{
                  left: `${region.coordinates.x}%`,
                  top: `${region.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="relative">
                  <div className={`
                    w-4 h-4 rounded-full bg-blue-500
                    ${hoveredRegion === region.id ? 'scale-125' : 'scale-100'}
                    transition-all duration-200 ease-in-out
                    group-hover:bg-blue-600
                    flex items-center justify-center
                  `}>
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-8 h-8 rounded-full bg-blue-500/20
                    animate-ping
                  `} />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-medium text-sm">{region.name}</h3>
                <div className="text-xs text-gray-500 mt-1">
                  <p>{region.activeProjects} aktiivset projekti</p>
                  <p>Eelarve: {region.totalBudget}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
