"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface Slide {
  type: "video" | "image";
  src: string;
  title: string;
  description: string;
  poster?: string;
}

const slides: Slide[] = [
  {
    type: "video",
    src: "/videos/hero-video-1.mp4",
    title: "Expert Cross Docking Services.",
    description: `Speed isn't just about driving fast.
    It's about smarter logistics.
    Save Time with Cross-Docking. `,
    poster: "/warehousing-service.jpg",
  },

  {
    type: "video",
    src: "/videos/hero-video-2.mp4",
    title: "K&C Logistics moving freight the right way",
    description:
      "At K&C Logistics, we keep freight moving, fast, safe and organized.",
    poster: "/supply-chain-service.jpg",
  },

  {
    type: "video",
    src: "/videos/hero-video-3.mp4",
    title: "Complete Warehousing Solutions",
    description:
      "End-to-end logistics management, inventory control, and distribution services with real-time tracking for seamless operations",
    poster: "/parking-service.jpg",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set()
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlideData = slides[currentSlide];
  const isVideo = currentSlideData.type === "video";
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

  useEffect(() => {
    if (isVideo && videoRef.current) {
      // Reset video to start
      videoRef.current.currentTime = 0;

      if (!isPaused && !prefersReducedMotion) {
        videoRef.current.play().catch(() => {
          // Silently handle autoplay restrictions
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide, isPaused, isVideo, prefersReducedMotion]);

  const togglePlayPause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);

    if (newPausedState || prefersReducedMotion) {
      // Pause slider
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Also pause video if current slide is video
      if (isVideo && videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      // Resume slider
      startAutoPlay();

      // Also resume video if current slide is video
      if (isVideo && videoRef.current) {
        videoRef.current.play().catch(() => {
          // Silently handle autoplay restrictions
        });
      }
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
  }, []);

  const defaultPoster = "/kc_logo.png";

  return (
    <section className="hero-slider" id="home">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""} ${
              index === currentSlide - 1 ||
              (currentSlide === 0 && index === slides.length - 1)
                ? "prev"
                : ""
            }`}
          >
            {slide.type === "video" && !prefersReducedMotion ? (
              <>
                {index === currentSlide && !loadedSlides.has(index) && (
                  <div className="video-skeleton skeleton" />
                )}
                <video
                  ref={index === currentSlide ? videoRef : null}
                  src={slide.src}
                  className="slide-media"
                  style={{
                    opacity:
                      index === currentSlide
                        ? loadedSlides.has(index)
                          ? 1
                          : 0
                        : 0,
                    transition: "opacity 0.5s ease-in",
                  }}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={slide.poster ?? defaultPoster}
                  onCanPlay={() => {
                    if (index === currentSlide) {
                      markSlideLoaded(index);
                    }
                  }}
                  onLoadedData={() => {
                    if (index === currentSlide) {
                      markSlideLoaded(index);
                    }
                  }}
                />
              </>
            ) : (
              <div
                className="slide-media slide-image"
                style={{
                  backgroundImage: `url(${slide.poster ?? defaultPoster})`,
                }}
              />
            )}
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

      {/* Video Control Button */}
      <button
        className="video-control-btn"
        onClick={togglePlayPause}
        aria-label={isPaused ? "Play" : "Pause"}
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
