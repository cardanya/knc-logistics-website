"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const SCROLL_INTERVAL = 5000; // 5 seconds

  // Update cards per view based on window width
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, SCROLL_INTERVAL);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isPaused) {
      startAutoScroll();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startAutoScroll]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };

  // Create a continuous array for smooth infinite scrolling
  const displayTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div className="testimonial-carousel-wrapper">
      <div
        className="testimonial-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="testimonial-carousel-track"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
            transition: "transform 0.8s ease-in-out",
          }}
        >
          {displayTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-nav-btn carousel-prev"
        onClick={handlePrev}
        aria-label="Previous testimonials"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        className="carousel-nav-btn carousel-next"
        onClick={handleNext}
        aria-label="Next testimonials"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex % testimonials.length ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
