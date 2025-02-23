"use client";
import React, { useState } from "react";
import { useAppStore } from "@/zustand/store";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ProtectedNavbar from "@/components/global/protectednavbar";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import OutputImageDialog from "@/components/global/modal";

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const router = useRouter();

  const { garment_image, human_image, garment_description, category, denoise_steps, seed, number_of_images } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const handleApiCall = async () => {
    if (!garment_image || !human_image) {
      alert("Please upload both images before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("garment_image", garment_image);
    formData.append("human_image", human_image);
    formData.append("garment_description", garment_description.replace(/"/g, ""));
    formData.append("category", category);
    formData.append("denoise_steps", denoise_steps.toString());
    formData.append("seed", seed.toString());
    formData.append("number_of_images", number_of_images.toString());

    try {
      setLoading(true);
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data);

      if (response.data?.images?.length > 0) {
        // Convert Base64 to Data URL
        const base64Image = response.data.images[0];
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setOutputImage(imageUrl);
      } else {
        alert("No image received from API!");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!outputImage) return;

    try {
      const response = await fetch(outputImage);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "generated-outfit.png"; // Set the download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <div>
      <ProtectedNavbar />
      <OutputImageDialog outputImage={outputImage} setOutputImage={setOutputImage} />
      {!outputImage && (
        <>
          <div className=" flex flex-col items-center justify-center p-10 ">
            <div className="container mx-auto  flex justify-center">
              <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
                <ArrowLeft className="w-4 h-4" />
                <span className=" text-2xl font-bold tracking-wider bebas-font">Go Back</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
              {garment_image ? (
                <div className="flex justify-center items-center flex-col  ">
                  <div className="  bg-[#D9D9D9] lg:h-[320px] lg:w-[400px] relative flex justify-center items-center rounded-[70px] shadow-2xl">
                    <Image
                      src={URL.createObjectURL(garment_image)}
                      alt={"grament"}
                      height={300}
                      width={300}
                      className="h-[280px] w-auto bg-[#E1E1E1]  "
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No image uploaded</p>
              )}

              {human_image ? (
                <div className="flex justify-center items-center flex-col  ">
                  <div className="  bg-[#D9D9D9] lg:h-[320px] lg:w-[400px] relative flex justify-center items-center rounded-[70px] shadow-2xl">
                    <Image
                      src={URL.createObjectURL(human_image)}
                      alt={"grament"}
                      height={300}
                      width={300}
                      className="h-[280px] w-auto  bg-[#E1E1E1]  "
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No image uploaded</p>
              )}
            </div>

            {outputImage && (
              <div className="mt-10">
                <div className="flex justify-center items-center flex-col  ">
                  <div className="  bg-[#D9D9D9] lg:h-[400px] lg:w-[500px] relative flex justify-center items-center rounded-[70px] shadow-2xl">
                    <Image src={outputImage} alt={"grament"} height={300} width={300} className="h-[300px] w-auto bg-[#E1E1E1]  " />
                  </div>
                </div>
              </div>
            )}
            {/* API Call Button */}
            <Button
              onClick={handleApiCall}
              disabled={loading}
              className={`mt-8 text-white text-lg px-10 py-3 h-[50px] rounded-full shadow-lg ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-black/80"
              }`}
            >
              {loading ? "Processing..." : "Try On Outfit"}
            </Button>
          </div>
        </>
      )}

      {/* Output Image Display */}
    </div>
  );
};

export default Page;
