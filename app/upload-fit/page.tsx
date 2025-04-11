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
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => videoRef.current?.play();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA || video.paused) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    setSelectedImage(canvas.toDataURL("image/jpeg"));
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    setShowCamera(false);
  };

  const handleTryOn = () => {
    if (!selectedImage) {
      alert("Please upload or take a picture first");
      return;
    }
    fetch(selectedImage)
      .then((res) => res.blob())
      .then((blob) => setHumanImage(new File([blob], "human-image.jpg", { type: blob.type })))
      .catch(console.error);
    router.push("/final-image");
  };

  const takePhotoWithTimer = () => {
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          takePhoto();
          return null;
        }
        return prev! - 1;
      });
    }, 1000);
  };

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;

  const myMens = [
    "https://iili.io/3ccXnb2.jpg",
    // "https://res-console.cloudinary.com/noumancloud/thumbnails/v1/image/upload/v1743177026/MDAwMzVfMDBfaXhqaGp4/drilldown",
    // "https://res-console.cloudinary.com/noumancloud/thumbnails/v1/image/upload/v1743177026/MDE5OTJfMDBfZGFkaHZ1/drilldown",
    // "https://res-console.cloudinary.com/noumancloud/thumbnails/v1/image/upload/v1743177026/c2FtMV8xX3pvandjaQ==/drilldown",
    // "https://res-console.cloudinary.com/noumancloud/thumbnails/v1/image/upload/v1743177026/SmVuc2VuX2xtdGhqYg==/drilldown",
    // "https://res-console.cloudinary.com/noumancloud/thumbnails/v1/image/upload/v1743175154/OGEzYWEyNjAtYzMzNi00Yjg1LWIxYTctODg5ZGJlOGJiZTZjX2J2anMxeg==/drilldown",
  ];

  return (
    <div className="bg-white min-h-screen">
      <ProtectedNavbar />
      <div className="container mx-auto px-4 flex justify-center mt-4">
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-lg font-bold tracking-wider bebas-font">Go Back</span>
        </button>
      </div>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-lg md:max-w-2xl p-6  lg:p-20 bg-gray-100 rounded-[70px]">
          {showCamera ? (
            <div className="relative w-full h-80">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl transform scale-x-[-1]" />
              {countdown !== null && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white text-6xl font-bold py-4 px-6 rounded-lg">
                  {countdown}
                </div>
              )}
              <Button
                onClick={takePhotoWithTimer}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bebas-font"
                disabled={countdown !== null}
              >
                {countdown !== null ? `Taking photo ajust your self` : "Take Photo"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div
                className="cursor-pointer p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p className="text-base font-medium bebas-font">Upload your picture</p>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
              </div>
              <div className="text-gray-500">- OR -</div>
              <Button variant="outline" className="w-full" onClick={() => setShowCamera(true)}>
                <Camera className="w-5 h-5 mr-2" /> Take a picture
              </Button>
              {selectedImage && (
                <Image src={selectedImage} alt="Preview" width={300} height={300} className="h-auto w-full max-w-[300px] mx-auto rounded-lg" />
              )}
            </div>
          )}
        </div>
        {selectedImage && (
          <Button className="w-full max-w-xs mt-6 bg-black hover:bg-black/90 text-white text-lg rounded-full bebas-font" onClick={handleTryOn}>
            TRY-ON!
          </Button>
        )}
        <div style={{ height: 50 }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-32 gap-10">
          {myMens.map((product: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-[#EDEDED] aspect-[4/5] relative overflow-hidden rounded-3xl flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setSelectedImage(product); // Update selected image
                }}
              >
                <Image
                  src={product}
                  alt="image"
                  width={220}
                  height={240}
                  className="h-[240px] w-[220px] bg-transparent p-5 transform group-hover:scale-105 transition-transform duration-300 rounded-3xl"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
