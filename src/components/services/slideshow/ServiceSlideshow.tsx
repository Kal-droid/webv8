import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { financialServices } from '../../../data/services';
import ServiceSlide from './ServiceSlide';
import SlideControls from './SlideControls';
import SlideIndicators from './SlideIndicators';

export default function ServiceSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % financialServices.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + financialServices.length) % financialServices.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative max-w-5xl mx-auto" // Reduced from max-w-6xl to max-w-5xl
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Services slideshow"
    >
      {/* Slides Container */}
      <div className="relative aspect-[16/10] bg-primary/5 rounded-xl overflow-hidden"> {/* Updated aspect ratio */}
        <AnimatePresence mode="wait">
          {financialServices.map((service, index) => (
            <ServiceSlide
              key={service.id}
              service={service}
              isActive={currentSlide === index}
            />
          ))}
        </AnimatePresence>

        <SlideControls
          onPrev={prevSlide}
          onNext={nextSlide}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </div>

      <SlideIndicators
        total={financialServices.length}
        current={currentSlide}
        onChange={setCurrentSlide}
      />
    </div>
  );
}