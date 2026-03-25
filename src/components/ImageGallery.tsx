"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface ImageGalleryProps {
  images: string[];
}

const PlaceholderSvg = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg
    className={`${className} text-taupe-300`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  const validImages = images.filter(Boolean);
  const hasImages = validImages.length > 0;
  const hasMultiple = validImages.length > 1;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0) setActiveIndex(validImages.length - 1);
      else if (index >= validImages.length) setActiveIndex(0);
      else setActiveIndex(index);
    },
    [validImages.length]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Placeholder view when no images
  if (!hasImages) {
    return (
      <div className="w-full">
        <div className="aspect-square rounded-lg bg-taupe-100 flex items-center justify-center">
          <PlaceholderSvg />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* Main image */}
      <div className="relative">
        <div
          ref={mainImageRef}
          className="relative aspect-square overflow-hidden rounded-lg bg-taupe-100 cursor-crosshair"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={validImages[activeIndex]}
            alt={`Product image ${activeIndex + 1}`}
            fill
            className={`object-cover transition-transform duration-200 ${
              isZooming ? "scale-150" : "scale-100"
            }`}
            style={
              isZooming
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Arrow navigation */}
        {hasMultiple && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-taupe-700 shadow-sm hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-taupe-700 shadow-sm hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image counter badge */}
        {hasMultiple && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white">
            {activeIndex + 1} / {validImages.length}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validImages.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                index === activeIndex
                  ? "border-blush-600 ring-1 ring-blush-600"
                  : "border-taupe-200 hover:border-taupe-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
