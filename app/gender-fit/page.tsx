"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GenderFit() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-4">
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
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="uppercase tracking-wider text-sm font-medium">Go Back</span>
        </button>
      </div>

      {/* Gender Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Men Section */}
          <Link
            href="/men"
            className="group relative flex flex-col items-center transition duration-300 transform hover:scale-105"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QmmjyzEOWWUuggZqk4fmzzDDLdohZC.png"
                alt="Men's Fashion"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-wider">MEN</h2>
          </Link>

          {/* Women Section */}
          <Link
            href="/women"
            className="group relative flex flex-col items-center transition duration-300 transform hover:scale-105"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QmmjyzEOWWUuggZqk4fmzzDDLdohZC.png"
                alt="Women's Fashion"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-wider">WOMEN</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

