"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Product type definition
interface Product {
  id: string
  name: string
  price: number
  image: string
}

// Sample product data
const products: Product[] = [
  {
    id: "1",
    name: "TEXTURED POLO SHIRT",
    price: 4990,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    name: "KNITTED BASIC POLO",
    price: 4990,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    name: "LINEN MANDARIN COLLAR SHIRT",
    price: 4990,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "4",
    name: "EMBROIDERED RESORT SHIRT",
    price: 6490,
    image: "/placeholder.svg?height=400&width=300",
  },
  // Add more products as needed
]

export default function MenTops() {
  const router = useRouter()

  // Format price in PKR
  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`
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

      {/* Back Button and Category Title */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-medium tracking-wider">MEN APPAREL - TOPS</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/men/tops/${product.id}`} className="group">
              <div className="bg-gray-100 aspect-[3/4] relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

