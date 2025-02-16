"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedNavbar from "@/components/global/protectednavbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";
import { products } from "@/app/all-items/[gender]/[slug]/page";
import { useAppStore } from "@/zustand/store";

export default function ProductDetail() {
  const router = useRouter();
  const { gender, slug, id } = useParams();
  const { isLoading } = useProtectedRoute();
  const { setGarmentImage } = useAppStore();
  if (isLoading) return <Loader />;
  const categoryKey = `${gender} ${slug}`;
  const categoryProducts = products[categoryKey] || [];
  const product = categoryProducts.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-semibold bebas-font text-gray-700">Product Not Found</h1>
        <p className="text-gray-500">Sorry, the requested product does not exist.</p>
        <Button onClick={() => router.back()} className="mt-4 bebas-font">
          Go Back
        </Button>
      </div>
    );
  }

  const handleGarmentImage = () => {
    fetch(product.image)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "garment-image.jpg", { type: blob.type });
        setGarmentImage(file);
      });
  };
  return (
    <div className="min-h-screen bg-white">
      <ProtectedNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-wider bebas-font uppercase">Go Back</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
          <div className="flex justify-center items-center flex-col  ">
            <div className="  bg-[#D9D9D9] lg:h-[400px] lg:w-[500px] relative flex justify-center items-center rounded-[70px] shadow-2xl">
              <Image src={product.image} alt={product.name} height={300} width={300} className="h-[300px] w-auto bg-[#E1E1E1]  " />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl font-medium bebas-font">{product.name}</h1>
            <p className="text-xl font-medium bebas-font">PKR {product.price.toLocaleString()}</p>
            <p className="text-xl font-medium bebas-font"> {product.description}</p>

            <p className="text-xl font-medium bebas-font"> {slug === "upper_body" ? "TOPS" : "BOTTOMS"}</p>
            <div style={{ height: 10 }} />
            <Link href={"/upload-fit"}>
              <Button className="w-full h-[50px] bebas-font rounded-3xl" size="lg" onClick={handleGarmentImage}>
                Try On Virtually
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
