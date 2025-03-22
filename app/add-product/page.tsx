"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/admin/components/product-form";
import { ProductCategory } from "@/admin/lib/model/product";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") as ProductCategory) || "male lower_body";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline">← Back to Products</Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>

      <ProductForm
        product={{ category, name: "", price: 0, image: "", description: "", id: "" }}
        onSuccess={() => router.push("/")}
        onCancel={() => router.push("/")}
      />
    </div>
  );
}
