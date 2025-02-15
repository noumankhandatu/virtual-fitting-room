"use client";
import React, { useState } from "react";
import { useAppStore } from "@/zustand/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import ProtectedNavbar from "@/components/global/protectednavbar";

const API_URL = "https://da0f-34-57-29-232.ngrok-free.app/try_on";

const Page = () => {
  const { garment_image, human_image, garment_description, category, denoise_steps, seed, number_of_images } = useAppStore();

  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    if (!garment_image || !human_image) {
      alert("Please upload both images before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("garment_image", garment_image);
    formData.append("human_image", human_image);
    formData.append("garment_description", garment_description);
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
      alert("API Call Successful!");
    } catch (error) {
      console.error("Error calling API:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Something went wrong! Please try again.");
      } else {
        alert("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProtectedNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 ">Overview</h1>

        {/* Data Table */}
        <div className="w-full max-w-4xl mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Garment Description</TableCell>
                <TableCell>{garment_description || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell className="capitalize">{category?.replace("_", " ") || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Denoise Steps</TableCell>
                <TableCell>{denoise_steps || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Seed</TableCell>
                <TableCell>{seed || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Number of Images</TableCell>
                <TableCell>{number_of_images || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Garment Image */}
          <Card>
            <CardHeader>
              <CardTitle>Garment Image</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {garment_image ? (
                <img src={URL.createObjectURL(garment_image)} alt="Garment" className="rounded-lg w-40 h-40 object-cover shadow" />
              ) : (
                <p className="text-gray-500">No image uploaded</p>
              )}
            </CardContent>
          </Card>

          {/* Human Image */}
          <Card>
            <CardHeader>
              <CardTitle>Human Image</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {human_image ? (
                <img src={URL.createObjectURL(human_image)} alt="Human" className="rounded-lg w-40 h-40 object-cover shadow" />
              ) : (
                <p className="text-gray-500">No image uploaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Call Button */}
        <Button
          onClick={handleApiCall}
          disabled={loading}
          className={`mt-8 text-white text-lg px-6 py-3 rounded-full shadow-lg ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-black/80"
          }`}
        >
          {loading ? "Processing..." : "Try On Outfit"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
