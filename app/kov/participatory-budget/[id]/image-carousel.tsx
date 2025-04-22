"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "/images/anne-kanal.jpg",
    alt: "Anne kanali ja Emajõe vaheline ala",
    caption: "Foto: Marti Viilu",
  },
  {
    src: "/images/anne-kanal.jpg",
    alt: "Planeeritav piknikuala",
    caption: "Visualiseering: Arhitektuuribüroo",
  },
  {
    src: "/images/anne-kanal.jpg",
    alt: "Planeeritav mänguväljak",
    caption: "Visualiseering: Arhitektuuribüroo",
  },
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="group relative h-full w-full">
        {/* Main Image */}
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-all duration-300"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Image Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <p className="text-sm">{images[currentIndex].caption}</p>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
            onClick={previousImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsFullscreen(true)}
          aria-label="View fullscreen"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>

        {/* Image Indicators */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black">
          <div className="relative h-[90vh]">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
              sizes="90vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <p className="text-sm">{images[currentIndex].caption}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
                onClick={previousImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white border-0 shadow-md"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
