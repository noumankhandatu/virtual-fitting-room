"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const router = useRouter()

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: params.id,
    name: "TEXTURED POLO SHIRT",
    price: 4990,
    description: "Regular fit | Black",
    image: "/placeholder.svg?height=600&width=400",
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GpETPLq6qxdcs8dbRk0zPuROU32hVj.png"
              alt="Virtual Vogue"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-800 hover:text-gray-600 transition">
              HOME
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600 transition">
              ABOUT
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition">
              CONTACT
            </Link>
            <Link href="/signin" className="text-gray-800 hover:text-gray-600 transition">
              LOGIN
            </Link>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tops</span>
        </button>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 aspect-[3/4] relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium mb-2">{product.name}</h1>
              <p className="text-gray-500">{product.description}</p>
            </div>
            <p className="text-xl font-medium">PKR {product.price.toLocaleString()}</p>
            <div className="space-y-4">
              <Button className="w-full" size="lg">
                Try On Virtually
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

