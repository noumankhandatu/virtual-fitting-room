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
        <button onClick={() => router.back()} className="flex items-center space-x-2 bebas-font text-gray-800 hover:text-gray-600 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="bebas-font font-bold">
            Back to {Array.isArray(slug) ? slug.join(" ").replace("_", " ").toUpperCase() : (slug || "").replace("_", " ").toUpperCase()}
          </span>
        </button>

        <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
          <div className="bg-[#EEEEEE] h-[400px] relative flex justify-center items-center">
            <Image src={product.image} alt={product.name} height={300} width={300} className="h-[300px]" />
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl font-medium bebas-font">{product.name}</h1>
            <p className="text-xl font-medium bebas-font">PKR {product.price.toLocaleString()}</p>
            <Link href={"/upload-fit"}>
              <Button className="w-full bebas-font" size="lg" onClick={handleGarmentImage}>
                Try On Virtually
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
