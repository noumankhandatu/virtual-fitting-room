"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProtectedNavbar from "@/components/global/protectednavbar";
import "../../styles/globals.css";
export default function UploadFit() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const image = canvas.toDataURL("image/jpeg");
      setSelectedImage(image);
      setShowCamera(false);
      // Stop all video streams
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    }
  };

  const handleTryOn = () => {
    if (!selectedImage) {
      alert("Please upload or take a picture first");
      return;
    }
    if (!selectedGarment) {
      alert("Please select a garment type");
      return;
    }
    // Add your try-on logic here
    console.log("Processing try-on with:", { selectedImage, selectedGarment });
  };

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
                <Button variant="outline" className="w-full" onClick={startCamera}>
                  <Camera className="w-6 h-6 mr-2 bebas-font" />
                  Take a picture
                </Button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-gray-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
            {selectedImage ? (
              <Image src={selectedImage || "/placeholder.svg"} alt="Preview" width={300} height={400} className="object-contain max-h-full" />
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

        {/* Garment Selection */}
        <div className="mt-8 max-w-xs mx-auto">
          <Select onValueChange={setSelectedGarment}>
            <SelectTrigger>
              <SelectValue placeholder="Select garment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tshirt bebas-font">T-Shirt</SelectItem>
              <SelectItem value="shirt bebas-font">Shirt</SelectItem>
              <SelectItem value="sweater bebas-font">Sweater</SelectItem>
              <SelectItem value="jacket bebas-font">Jacket</SelectItem>
            </SelectContent>
          </Select>
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
