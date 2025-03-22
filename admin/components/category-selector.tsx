"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCategory } from "../lib/model/product";

interface CategorySelectorProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export function CategorySelector({ activeCategory, onCategoryChange }: CategorySelectorProps) {
  const categories: { value: ProductCategory; label: string }[] = [
    { value: "male lower_body", label: "Men's Bottoms" },
    { value: "male upper_body", label: "Men's Tops" },
    { value: "female lower_body", label: "Women's Bottoms" },
    { value: "female upper_body", label: "Women's Tops" },
  ];

  return (
    <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as ProductCategory)}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
