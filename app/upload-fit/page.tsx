"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedNavbar from "@/components/global/protectednavbar";
import "../../styles/globals.css";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";
import { useAppStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export default function UploadFit() {
  const { setHumanImage } = useAppStore();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

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

    // Flip the image back when drawing
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    setSelectedImage(image);

    // Stop the camera stream
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());

    setShowCamera(false);
  };

  const handleTryOn = () => {
    if (!selectedImage) {
      alert("Please upload or take a picture first");
      return;
    }

    // Convert base64 to a File before storing (if needed)
    fetch(selectedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "human-image.jpg", { type: blob.type });
        setHumanImage(file);
      })
      .catch((error) => console.error("Error processing image:", error));

    router.push("/final-image");
  };

  const takePhotoWithTimer = () => {
    setCountdown(5); // Start countdown from 5

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          takePhoto(); // Call original function after countdown ends
          return null; // Reset countdown
        }
        return prev! - 1; // Decrease countdown
      });
    }, 1000);
  };

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;

  return (
    <div className=" bg-white">
      {/* Navigation */}
      <ProtectedNavbar />
      <div className="container mx-auto  flex justify-center">
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
          <ArrowLeft className="w-4 h-4" />
          <span className=" text-2xl font-bold tracking-wider bebas-font">Go Back</span>
        </button>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-1 gap-8 w-[50%]">
          {/* Upload Section */}
          <div className="bg-gray-100  p-8 flex flex-col items-center justify-center min-h-[400px] relative rounded-[70px]">
            {showCamera ? (
              <div className="w-full h-full">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl transform scale-x-[-1]" />{" "}
                <Button
                  onClick={takePhotoWithTimer}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bebas-font"
                  disabled={countdown !== null} // Disable while counting down
                >
                  {countdown !== null ? `Taking photo in ${countdown}s...` : "Take Photo"}
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-8 ">
                <div
                  className="cursor-pointer p-8 border-2 border-dashed  border-gray-300 rounded-xl hover:border-gray-400 transition"
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
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="h-[300px] w-[300px] max-w-full max-h-full object-contain"
                  />
                ) : showCamera ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl" />
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Try-On Button */}
        {selectedImage && (
          <Button
            className="w-full max-w-xs mx-auto mt-8 bg-black hover:bg-black/90 text-white  text-lg rounded-full block bebas-font"
            onClick={handleTryOn}
          >
            TRY-ON!
          </Button>
        )}
      </div>
    </div>
  );
}
