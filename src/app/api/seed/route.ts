import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seedDatabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({
      success: true,
      message: "Database Puskesmas Cimanggung berhasil di-seed dengan data awal!",
    });
  } catch (error: any) {
    console.error("Error in /api/seed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal seeding database", error: error.message },
      { status: 500 }
    );
  }
}
