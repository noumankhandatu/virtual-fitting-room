"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "../../styles/globals.css";
import ProtectedNavbar from "@/components/global/protectednavbar";
export default function GenderFit() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <ProtectedNavbar />
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
          <ArrowLeft className="w-4 h-4" />
          <span className=" text-2xl font-bold tracking-wider bebas-font">Go Back</span>
        </button>
      </div>

      {/* Gender Selection */}
      <div className="container mx-auto justify-center px-4 py-8">
        <div style={{ justifyItems: "center" }} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto justify-center items-center">
          {/* Men Section */}
          <Link
            href="/men/tops/1"
            className="group relative flex flex-col items-center justify-center transition duration-300 transform hover:scale-105"
          >
            <div className="relative w-full  overflow-hidden rounded-lg">
              <Image height={400} width={300} src="/boygender.png" alt="Men's Fashion" className=" h-auto w-[300px]" />
              <div className="absolute inset-0 bg-black/0  transition-all duration-300" />
            </div>
          </Link>

          {/* Women Section */}
          <Link
            href="/all-items"
            className="group relative flex flex-col justify-center items-center transition duration-300 transform hover:scale-105"
          >
            <div className="relative w-full  overflow-hidden rounded-lg">
              <Image height={400} width={300} src="/girlgender.png" alt="Women's Fashion" className=" h-auto w-[250px]" />
              <div className="absolute inset-0 bg-black/0 transition-all duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
