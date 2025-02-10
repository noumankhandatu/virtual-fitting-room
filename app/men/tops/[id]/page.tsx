"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtectedNavbar from "@/components/global/protectednavbar";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const router = useRouter();

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: params.id,
    name: "TEXTURED POLO SHIRT",
    price: 4990,
    description: "Regular fit | Black",
    image: "/shirt.png",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <ProtectedNavbar />
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center space-x-2 bebas-font text-gray-800 hover:text-gray-600 transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="bebas-font">Back to Tops</span>
        </button>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 aspect-[3/4] relative">
            <Image src={product.image} alt={product.name} fill className="object-cover object-center" />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium mb-2 bebas-font">{product.name}</h1>
              <p className="text-gray-500 bebas-font">{product.description}</p>
            </div>
            <p className="text-xl font-medium bebas-font">PKR {product.price.toLocaleString()}</p>
            <div className="space-y-4">
              <Button className="w-full bebas-font" size="lg">
                Try On Virtually
              </Button>
              <Button variant="outline" className="w-full bebas-font" size="lg">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
