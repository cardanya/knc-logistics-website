"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  src: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    src: "/videos/hero-slider-1.png",
    title: "Expert Cross Docking Services.",
    description: `Speed isn't just about driving fast.
    It's about smarter logistics.
    Save Time with Cross-Docking. `,
  },

  {
    src: "/videos/hero-slider-2.png",
    title: "K&C Logistics moving freight the right way",
    description:
      "At K&C Logistics, we keep freight moving, fast, safe and organized.",
  },

  {
    src: "/videos/hero-slider-3.jpg",
    title: "Complete Warehousing Solutions",
    description:
      "End-to-end logistics management, inventory control, and distribution services with real-time tracking for seamless operations",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [initialAnimationTriggered, setInitialAnimationTriggered] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set()
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const currentSlideData = slides[currentSlide];
  const SLIDE_DURATION = 10000; // 10 seconds

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isPaused && !prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, SLIDE_DURATION);
    }
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide, startAutoPlay]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Trigger initial slide animation on mount
  // Using double requestAnimationFrame ensures the browser:
  // 1. Renders the initial DOM with base styles (scale(1))
  // 2. Paints those styles to the screen
  // 3. Only then applies the 'active' class (scale(1.1))
  // This creates the necessary before/after states for CSS transitions to work
  useEffect(() => {
    if (!initialAnimationTriggered) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInitialAnimationTriggered(true);
        });
      });
    }
  }, [initialAnimationTriggered]);

  const togglePlayPause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);

    if (newPausedState || prefersReducedMotion) {
      // Pause slider
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      // Resume slider
      startAutoPlay();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(false);
  };

  const markSlideLoaded = useCallback((index: number) => {
    setLoadedSlides((prev) => {
      if (prev.has(index)) return prev;
      const updated = new Set(prev);
      updated.add(index);
      return updated;
    });

    // Clear timeout for this slide
    const timeout = timeoutRefs.current.get(index);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(index);
    }
  }, []);

  // Add timeout fallback for slides that don't load
  useEffect(() => {
    if (!loadedSlides.has(currentSlide) && !timeoutRefs.current.has(currentSlide)) {
      const timeout = setTimeout(() => {
        markSlideLoaded(currentSlide);
      }, 3000); // 3 second timeout

      timeoutRefs.current.set(currentSlide, timeout);
    }

    return () => {
      // Cleanup: clear all timeouts on unmount
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [currentSlide, loadedSlides, markSlideLoaded]);

  return (
    <section className="hero-slider" id="home">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${
              index === currentSlide && (currentSlide !== 0 || initialAnimationTriggered)
                ? "active"
                : ""
            } ${
              index === currentSlide - 1 ||
              (currentSlide === 0 && index === slides.length - 1)
                ? "prev"
                : ""
            }`}
          >
            {index === currentSlide && !loadedSlides.has(index) && (
              <div className="image-skeleton skeleton" />
            )}
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={index <= 1}
              className="slide-media"
              style={{
                objectFit: "cover",
                opacity:
                  index === currentSlide
                    ? loadedSlides.has(index)
                      ? 1
                      : 0
                    : 0,
                transition: "opacity 0.5s ease-in",
              }}
              onLoad={() => {
                markSlideLoaded(index);
              }}
              onError={() => {
                console.error(`Failed to load slide ${index}: ${slide.src}`);
                markSlideLoaded(index); // Hide skeleton even on error
              }}
            />
            <div className="slide-overlay" />
          </div>
        ))}
      </div>

      <div className="hero-content">
        <h1 className="hero-title">{currentSlideData.title}</h1>
        <p className="hero-description">{currentSlideData.description}</p>
        <div className="hero-buttons">
          <Link href="#contact" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="#services" className="btn btn-secondary">
            Our Services
          </Link>
        </div>
      </div>

      {/* Slider Control Button */}
      <button
        className="video-control-btn"
        onClick={togglePlayPause}
        aria-label={isPaused ? "Resume slider" : "Pause slider"}
      >
        <i className={`fas ${isPaused ? "fa-play" : "fa-pause"}`}></i>
      </button>

      {/* Navigation Buttons */}
      <button
        className="slider-nav-btn slider-nav-prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        className="slider-nav-btn slider-nav-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-indicators" aria-label="Slide progress">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
}
