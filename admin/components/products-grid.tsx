"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProductCard } from "./product-card";
import { ProductForm } from "./product-form";
import { Product } from "../lib/model/product";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductsGridProps {
  category: string;
}

export function ProductsGrid({ category }: ProductsGridProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching products for category: ${category}`);

      const url = `${process.env.NEXT_PUBLIC_BACKENDURL}/api/products?category=${encodeURIComponent(category)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Products fetched:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const id = productToDelete._id || productToDelete.id;
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the product from the local state
      setProducts(products.filter((p) => p._id !== productToDelete._id && p.id !== productToDelete.id));

      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button onClick={fetchProducts} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center py-8">No products found in this category.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id?.toString() || product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto border-white">
          <DialogTitle>Edit Product</DialogTitle>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSuccess={() => {
                setEditingProduct(null);
                fetchProducts();
              }}
              myHeight={"500px"}
              onCancel={() => setEditingProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
