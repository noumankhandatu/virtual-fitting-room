"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const images = ["/home 1.jpg", "/home 2.jpg"];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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
      <div className="relative h-full flex items-end justify-center z-20 pb-10">
        <div className="flex w-full justify-center items-center">
          <h1 className="text-white lg:w-[600px] rounded-[43px] p-3 opacity-70 bg-[#3F3932] ">
            <i className="block font-script text-6xl md:text-7xl mb-4 itallic-font text-left text-[#A89172DB]">Bringing the</i>
            <span className="block text-5xl md:text-7xl font-bold mb-4 bebas-font text-center text-white">FITTING ROOM</span>
            <span className="block font-script text-7xl md:text-7xl itallic-font text-right text-[#A89172DB]">to you</span>

            {/* Buttons Container */}
            <Link href="/api/auth/login">
              <div className="flex justify-between flex-col lg:flex-row gap-4 mt-6 w-full">
                <Button className="lg:w-1/2 rounded-full bg-[#A89172] text-white py-6">Login to Try-on!</Button>
                <Button className="lg:w-1/2 rounded-full bg-white hover:text-white text-black py-6">Login as Corporate </Button>
              </div>
            </Link>
          </h1>
        </div>
      </div>
    </section>
  );
}
