import React from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const handleDownload = async (outputImage: string) => {
  if (!outputImage) return;

  try {
    const response = await fetch(outputImage);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "generated-outfit.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading the image:", error);
    alert("Failed to download the image. Please try again.");
  }
};

const OutputImageDialog = ({ outputImage, setOutputImage }: { outputImage: string | null; setOutputImage: (value: string | null) => void }) => {
  return (
    <Dialog open={!!outputImage} onOpenChange={(isOpen) => !isOpen && setOutputImage(null)}>
      <DialogContent style={{ borderRadius: "20px" }} className="max-w-lg bg-white  shadow-lg p-6">
        <DialogTitle>
          <p className="text-2xl font-bold tracking-wider bebas-font  text-center text-gray-800">🎉 Voilà! Your Perfect Fit</p>
        </DialogTitle>

        {/* Image Preview */}
        <div className="relative flex items-center justify-center mt-4">
          {outputImage && (
            <img className="w-[260px] h-[320px] object-cover rounded-lg shadow-md border border-gray-200" src={outputImage} alt="Generated Outfit" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {outputImage && (
            <Button
              onClick={() => handleDownload(outputImage)}
              className="bg-green-600 text-white hover:bg-green-700 transition-all px-6 py-2 rounded-lg shadow-md"
            >
              ⬇️ Download Image
            </Button>
          )}
          <DialogClose asChild>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-all px-6 py-2 rounded-lg shadow-md">❌ Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutputImageDialog;
