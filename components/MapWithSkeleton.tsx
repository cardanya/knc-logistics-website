"use client";

import { useState, useEffect, useRef } from "react";

interface MapWithSkeletonProps {
  src: string;
  title: string;
}

export default function MapWithSkeleton({ src, title }: MapWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Set timeout to force-hide skeleton after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        console.log(`Map load timeout reached for: ${title}`);
        setIsLoaded(true);
      }
    }, 5000);

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [title]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (mountedRef.current) {
      setIsLoaded(true);
    }
  };

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
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
}
