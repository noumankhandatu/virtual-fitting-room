"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedNavbar from "@/components/global/protectednavbar";
import "../../styles/globals.css";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";

export default function UploadFit() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Effect to start camera after the state updates
  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
  }, [showCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (!videoRef.current) {
        console.error("videoRef.current is null! Waiting for video element to render...");
        return;
      }

      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) {
      console.error("Video element not found!");
      return;
    }

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context from canvas!");
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    setSelectedImage(image);

    // Stop the camera stream
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());

    setShowCamera(false); // Hide the camera after taking the photo
  };

  const handleTryOn = () => {
    if (!selectedImage) {
      alert("Please upload or take a picture first");
      return;
    }
  };

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <ProtectedNavbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative">
            {showCamera ? (
              <div className="w-full h-full">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl" />
                <Button onClick={takePhoto} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bebas-font">
                  Take Photo
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div
                  className="cursor-pointer p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium bebas-font">Upload your picture</p>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                </div>
                <div className="text-gray-500">-OR-</div>
                <Button variant="outline" className="w-full" onClick={() => setShowCamera(true)}>
                  <Camera className="w-6 h-6 mr-2 bebas-font" />
                  Take a picture
                </Button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-gray-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
            {selectedImage ? (
              <Image src={selectedImage} alt="Preview" width={300} height={400} className="object-contain max-h-full" />
            ) : showCamera ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Garment Preview"
                width={300}
                height={400}
                className="object-contain opacity-50"
              />
            )}
          </div>
        </div>

        {/* Try-On Button */}
        <Button
          className="w-full max-w-xs mx-auto mt-8 bg-black hover:bg-black/90 text-white  text-lg rounded-full block bebas-font"
          onClick={handleTryOn}
        >
          TRY-ON!
        </Button>
      </div>
    </div>
  );
}
