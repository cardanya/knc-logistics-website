"use client";

import { useState } from "react";

interface MapWithSkeletonProps {
  src: string;
  title: string;
}

export default function MapWithSkeleton({ src, title }: MapWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="map-wrapper">
      {!isLoaded && <div className="map-skeleton skeleton" aria-hidden="true" />}
      <iframe
        className={`map-frame ${isLoaded ? "is-visible" : ""}`}
        src={src}
        width="100%"
        height="100%"
        title={title}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
    </div>
  );
}
