"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "@/admin/components/category-selector";
import { ProductsGrid } from "@/admin/components/products-grid";
import { ProductCategory } from "@/admin/lib/model/product";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("male lower_body");

  const getCategoryTitle = (category: ProductCategory): string => {
    switch (category) {
      case "male lower_body":
        return "Men's Bottoms";
      case "male upper_body":
        return "Men's Tops";
      case "female lower_body":
        return "Women's Bottoms";
      case "female upper_body":
        return "Women's Tops";
      default:
        return "Products";
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Virtual Vogue</h1>
        <Link href={`/add-product?category=${activeCategory}`}>
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="mb-8">
        <CategorySelector activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{getCategoryTitle(activeCategory)}</h2>
        <ProductsGrid category={activeCategory} key={activeCategory} />
      </div>
    </main>
  );
}
