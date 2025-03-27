"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProtectedNavbar from "@/components/global/protectednavbar";
import { useAppStore } from "@/zustand/store";

export default function ProductShowcase() {
  const { generated_image } = useAppStore();

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleDownload = async () => {
    if (!generated_image) return;

    try {
      const response = await fetch(generated_image);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "generated-outfit.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <div>
      <ProtectedNavbar />
      <div className="container mx-auto py-12 px-4">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div
              ref={imageContainerRef}
              className="relative h-[400px] overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              {generated_image ? (
                <>
                  <Image src={generated_image} alt="Generated Outfit" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                  {/* Zoom effect */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url(${generated_image})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        backgroundSize: "200%",
                        backgroundRepeat: "no-repeat",
                        zIndex: 10,
                      }}
                    />
                  )}
                </>
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col justify-center p-6">
              <h1 className="text-3xl font-bold mb-4">Generated Outfit</h1>
              <p className="text-muted-foreground mb-6">This is your AI-generated outfit. Click the button below to download your image.</p>
              <Button onClick={handleDownload} className="w-fit">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
