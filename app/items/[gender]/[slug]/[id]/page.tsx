"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedNavbar from "@/components/global/protectednavbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";
import { useAppStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const router = useRouter();
  const { gender, slug, id } = useParams();
  const { isLoading } = useProtectedRoute();
  const { setGarmentImage } = useAppStore();
  const [allProducts, setAllProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/all-products");
        setAllProducts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <Loader />;
  if (loading) return <Loader />;
  const categoryKey = `${gender} ${slug}`;
  const categoryProducts = allProducts[categoryKey] || [];
  const product = categoryProducts.find((item: any) => item.id === id);

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

      <div className="container mx-auto ">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-wider bebas-font uppercase">Go Back</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 justify-center items-center lg:pl-20 lg:pr-20">
          <div className="flex justify-center items-center flex-col  ">
            <div
              data-aos="fade-down"
              className="  bg-[#D9D9D9] lg:h-[320px] lg:w-[400px] relative flex justify-center items-center rounded-[70px] shadow-2xl"
            >
              <Image src={product.image} alt={product.name} height={300} width={300} className="h-[290px] p-7 lg:p-2 w-auto   " />
            </div>
          </div>
          <div data-aos="fade-down" className="space-y-6">
            <p className="text-xl font-medium bebas-font"> {slug === "upper_body" ? "TOPS" : "BOTTOMS"}</p>
            <h1 className="text-2xl font-medium bebas-font">{product.name}</h1>
            <p className="text-xl font-medium bebas-font"> {product.description}</p>
            <div style={{ height: 10 }} />
            <Link href={"/upload-fit"}>
              <Button className="w-full h-[50px] bebas-font rounded-[70px]" size="lg" onClick={handleGarmentImage}>
                Try On Virtually
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
