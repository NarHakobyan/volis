"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel() {
  return (
    <div className="relative h-[400px] bg-[#F5F5F5] rounded-[4px] overflow-hidden">
      <Image
        src="/images/anne-kanal.jpg"
        alt="Anne kanali ja Emajõe vaheline ala"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-2 px-4">
        Foto: Marti Viilu
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
