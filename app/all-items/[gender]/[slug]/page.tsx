"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProtectedNavbar from "@/components/global/protectednavbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";
import { products } from "@/data/product-data";

// Define product type

export default function AllItems() {
  const router = useRouter();
  const { gender, slug } = useParams();

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;

  // Get products based on dynamic parameters
  const categoryKey = `${gender} ${slug}`;
  const categoryProducts = products[categoryKey] || [];

  const dishwasher = "female";
  const bodyType = "lower_body";

  const menCls = "object-center pt-2 pl-2 pr-2  pb-10 transform group-hover:scale-105 transition-transform duration-300  w-[300px] h-[320px]";
  const femaleCls = "object-center p-5 pl-10 pr-10 pb-10 transform group-hover:scale-105 transition-transform duration-300  w-[250px] h-[350px]";

  return (
    <div className="min-h-screen bg-white">
      <ProtectedNavbar />
      <div data-aos="fade-up" className="container mx-auto px-4 py-8 ">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-wider bebas-font uppercase">
            {gender} APPAREL - {slug === "upper_body" ? "TOPS" : "BOTTOMS"}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:pr-32 lg:pl-32 gap-10">
          {categoryProducts.map((product) => (
            <Link key={product.id} href={`/items/${gender}/${slug}/${product.id}`} className="group">
              <div className="bg-[#EDEDED] aspect-[4/5] relative overflow-hidden rounded-3xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className={(dishwasher === gender || "male" === gender) && bodyType === slug ? femaleCls : menCls}
                />
              </div>
              <div className="mt-4 space-y-1 text-center">
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-600 transition bebas-font">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
