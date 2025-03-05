"use client";

import { useState, useEffect } from "react";

const images = ["/men.png", "/women.png"];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-top transition-opacity duration-1000
            ${currentImageIndex === index ? "opacity-100 bg-mobile-adjust" : "opacity-0 bg-mobile-adjust"}`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: "top",
            zIndex: currentImageIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl ml-auto">
            <h1 className="text-white">
              <i className="block font-script text-6xl md:text-7xl mb-4 itallic-font lg:text-left text-center">Bringing the</i>
              <span className="block text-5xl md:text-7xl text-black font-bold mb-4 bebas-font lg:text-left text-center">FITTING ROOM</span>
              <span className="block font-script text-7xl text-white  md:text-7xl itallic-font lg:text-left text-center">to you</span>
            </h1>
            <p className="text-white/90 text-lg mt-6 mb-8 max-w-lg lg:text-left text-center">
              See how outfits fit on you instantly with our AI-powered Virtual Try-On!
            </p>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentImageIndex === index ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
