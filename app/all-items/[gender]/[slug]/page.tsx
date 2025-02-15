"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProtectedNavbar from "@/components/global/protectednavbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Loader from "@/components/loader";

// Define product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Define products type
type Products = {
  [key: string]: Product[];
};

// Sample product data
export const products: Products = {
  "male upper_body": [
    { id: "1", name: "TEXTURED POLO SHIRT", price: 4990, image: "/cloths/men-top/mentop1.png" },
    { id: "2", name: "COTTON T-SHIRT", price: 2990, image: "/cloths/men-top/mentop2.png" },
    { id: "3", name: "COTTON T-SHIRT", price: 2990, image: "/cloths/men-top/mentop3.png" },
  ],
  "male lower_body": [
    { id: "1", name: "TEXTURED TROUSERS", price: 5990, image: "/cloths/men-lower/menlower1.png" },
    { id: "2", name: "SLIM FIT JEANS", price: 6990, image: "/cloths/men-lower/menlower2.png" },
    { id: "3", name: "COTTON CHINOS", price: 4990, image: "/cloths/men-lower/menlower3.png" },
  ],
  "female upper_body": [
    { id: "1", name: "ELEGANT BLOUSE", price: 4500, image: "/cloths/female-top/femaletop1.png" },
    { id: "2", name: "SUMMER TANK TOP", price: 3500, image: "/cloths/female-top/femaletop2.png" },
    { id: "3", name: "FLORAL BLOUSE", price: 4800, image: "/cloths/female-top/femaletop3.png" },
  ],
  "female lower_body": [
    { id: "1", name: "PLEATED SKIRT", price: 5200, image: "/cloths/female-lower/femalelower1.png" },
    { id: "2", name: "WIDE-LEG PANTS", price: 6000, image: "/cloths/female-lower/femalelower2.png" },
    { id: "3", name: "HIGH-WAIST JEANS", price: 5800, image: "/cloths/female-lower/femalelower3.png" },
  ],
};

export default function AllItems() {
  const router = useRouter();
  const { gender, slug } = useParams();

  console.log("AllItems Page - Params:", { gender, slug });

  // Format price in PKR
  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const { isLoading } = useProtectedRoute();
  if (isLoading) return <Loader />;

  // Get products based on dynamic parameters
  const categoryKey = `${gender} ${slug}`;
  const categoryProducts = products[categoryKey] || [];

  return (
    <div className="min-h-screen bg-white">
      <ProtectedNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-medium tracking-wider bebas-font uppercase">
            {gender} APPAREL - {slug}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <Link key={product.id} href={`/items/${gender}/${slug}/${product.id}`} className="group">
              <div className="bg-gray-100 aspect-[4/5] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition bebas-font">{product.name}</h3>
                <p className="text-sm text-gray-500 bebas-font">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
