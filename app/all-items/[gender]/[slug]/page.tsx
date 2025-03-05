"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import ProtectedNavbar from "@/components/global/protectednavbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";
import { products } from "@/data/product-data";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/zustand/store";

export default function AllItems() {
  const router = useRouter();
  const { gender, slug } = useParams();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { setGarmentImage } = useAppStore();

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
  }, [showCamera]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    // Ensure the video is loaded before capturing
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video not ready for capture");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure transformation is correct
    ctx.save(); // Save current context state
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Draw the video frame on the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore(); // Restore the context to avoid issues

    // Convert to image
    const imageData = canvas.toDataURL("image/jpeg");
    setSelectedImage(imageData);

    // Delay stopping the stream to ensure capture is complete
    setTimeout(() => {
      (video.srcObject as MediaStream)?.getTracks().forEach((track) => track.stop());
      setShowCamera(false);
    }, 100); // Short delay to ensure the frame is captured
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentImage = (imageUrl: string) => {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "garment-image.jpg", { type: blob.type });
        setGarmentImage(file); // Make sure setGarmentImage is properly defined
      });
  };

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;

  const categoryKey = `${gender} ${slug}`;
  const categoryProducts = products[categoryKey] || [];

  return (
    <div className="min-h-screen bg-white">
      <ProtectedNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-wider bebas-font uppercase">
            {gender} APPAREL - {slug === "upper_body" ? "TOPS" : "BOTTOMS"}
          </h1>
        </div>

        {/* Image Upload & Camera Section */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-10 p-10 bg-gray-100 rounded-2xl w-full lg:w-[80%]">
            {showCamera ? (
              <div className="relative w-full max-w-md flex flex-col items-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl transform scale-x-[-1]" />

                {/* Timer Display */}
                {countdown !== null && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white text-6xl font-bold py-4 px-6 rounded-lg">
                    {countdown}
                  </div>
                )}

                <Button onClick={takePhotoWithTimer} disabled={countdown !== null} className="mt-4">
                  {countdown !== null ? `Taking photo adjust your cloth` : "Take Photo"}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {!selectedImage && (
                  <>
                    <div
                      className="cursor-pointer p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-10 h-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-lg font-medium">Upload Garment</p>
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                    </div>
                    <Button variant="outline" onClick={() => setShowCamera(true)}>
                      <Camera className="w-6 h-6 mr-2" /> Capture
                    </Button>
                  </>
                )}

                {selectedImage && (
                  <div className="flex items-center justify-center flex-col">
                    <Image src={selectedImage} alt="Preview" width={200} height={200} className="rounded-lg mt-4 h-[300px] w-auto" />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedImage(null);
                          setShowCamera(true);
                        }}
                        className="mt-4"
                      >
                        Retake
                      </Button>

                      <Link href={"/upload-fit"}>
                        <Button onClick={() => handleGarmentImage(selectedImage!)} variant="outline" className="mt-4">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Clothing Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-32 gap-10">
          {categoryProducts.map((product) => (
            <Link key={product.id} href={`/items/${gender}/${slug}/${product.id}`} className="group">
              <div className="bg-[#EDEDED] aspect-[4/5] relative overflow-hidden rounded-3xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="object-center p-5 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-600 transition bebas-font">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
