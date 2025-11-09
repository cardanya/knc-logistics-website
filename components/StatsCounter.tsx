"use client";

import { useState, useEffect, useRef } from "react";

interface StatsCounterProps {
  icon: string;
  targetValue: string;
  label: string;
}

export default function StatsCounter({ icon, targetValue, label }: StatsCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = statRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value from targetValue (e.g., "20+", "100%", "24/7", "1000+")
    const numericMatch = targetValue.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(targetValue);
      return;
    }

    const numericValue = parseInt(numericMatch[0]);
    const suffix = targetValue.replace(numericMatch[0], "");
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      currentValue += increment;

      if (stepCount >= steps) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(currentValue) + suffix);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, targetValue]);

  return (
    <div className="stat-card" ref={statRef}>
      <i className={icon}></i>
      <div className="stat-number">
        {displayValue}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
