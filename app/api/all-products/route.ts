import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("clothing-store");

    // Fetch all products from the database
    const products = await db.collection("products").find({}).toArray();

    // Transform data into the required structure
    const formattedProducts: Record<string, any[]> = {};

    products.forEach(({ category, id, name, price, image, description }) => {
      if (!formattedProducts[category]) {
        formattedProducts[category] = [];
      }
      formattedProducts[category].push({ id, name, price, image, description });
    });

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
