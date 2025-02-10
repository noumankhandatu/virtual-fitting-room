"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Upload, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UploadFit() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedGarment, setSelectedGarment] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)
      const image = canvas.toDataURL("image/jpeg")
      setSelectedImage(image)
      setShowCamera(false)
      // Stop all video streams
      const stream = videoRef.current.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
    }
  }

  const handleTryOn = () => {
    if (!selectedImage) {
      alert("Please upload or take a picture first")
      return
    }
    if (!selectedGarment) {
      alert("Please select a garment type")
      return
    }
    // Add your try-on logic here
    console.log("Processing try-on with:", { selectedImage, selectedGarment })
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
          <div className="flex items-center space-x-8">
            <Link href="/home" className="text-gray-800 hover:text-gray-600 transition">
              HOME
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600 transition">
              ABOUT
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition">
              CONTACT
            </Link>
            <div className="flex items-center bg-black rounded-full px-4 py-2">
              <span className="text-white mr-2">name</span>
              <span className="text-white bg-[#6D574A] px-2 py-1 rounded-full text-sm">100</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative">
            {showCamera ? (
              <div className="w-full h-full">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-2xl" />
                <Button onClick={takePhoto} className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  Take Photo
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div
                  className="cursor-pointer p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Upload your picture</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="text-gray-500">-OR-</div>
                <Button variant="outline" className="w-full" onClick={startCamera}>
                  <Camera className="w-6 h-6 mr-2" />
                  Take a picture
                </Button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-gray-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
            {selectedImage ? (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Preview"
                width={300}
                height={400}
                className="object-contain max-h-full"
              />
            ) : (
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Garment Preview"
                width={300}
                height={400}
                className="object-contain opacity-50"
              />
            )}
          </div>
        </div>

        {/* Garment Selection */}
        <div className="mt-8 max-w-xs mx-auto">
          <Select onValueChange={setSelectedGarment}>
            <SelectTrigger>
              <SelectValue placeholder="Select garment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tshirt">T-Shirt</SelectItem>
              <SelectItem value="shirt">Shirt</SelectItem>
              <SelectItem value="sweater">Sweater</SelectItem>
              <SelectItem value="jacket">Jacket</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Try-On Button */}
        <Button
          className="w-full max-w-xs mx-auto mt-8 bg-black hover:bg-black/90 text-white py-6 text-lg rounded-full block"
          onClick={handleTryOn}
        >
          TRY-ON!
        </Button>
      </div>
    </div>
  )
}

