import { type NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/scripts/seed-db";

export async function GET(request: NextRequest) {
  try {
    const result = await seedDatabase();

    if (result.success) {
      return NextResponse.json({
        message: `Database seeded successfully with ${result.count} products`,
      });
    } else {
      return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
