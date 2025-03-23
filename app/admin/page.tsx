"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "@/admin/components/category-selector";
import { ProductsGrid } from "@/admin/components/products-grid";
import { ProductCategory } from "@/admin/lib/model/product";
import Image from "next/image";

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
    <main className="container mx-auto py-10 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <Link href="/men-women-styles">
          <Image
            src="/logo.svg"
            alt="Virtual Vogue"
            width={180}
            height={180}
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <Link href={`/add-product?category=${activeCategory}`}>
          <Button className="bg-black text-white px-6 py-3 text-lg rounded-lg shadow-md transition hover:bg-black/80">+ Add New Product</Button>
        </Link>
      </div>

      {/* Category Selector */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Categories</h2>
        <CategorySelector activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </section>
      {/* Product Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-2">{getCategoryTitle(activeCategory)}</h2>
        <div style={{ height: 30 }} />

        <ProductsGrid category={activeCategory} key={activeCategory} />
      </section>
    </main>
  );
}
