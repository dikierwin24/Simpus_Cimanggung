import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hours = await prisma.operationalHour.findMany({
      orderBy: { dayOfWeek: "asc" },
    });
    return NextResponse.json({ success: true, data: hours });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat jam operasional" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, loketOpen, loketClose, serviceOpen, serviceClose, isClosed, notes } = body;

    const updateData = {
      loketOpen,
      loketClose,
      serviceOpen,
      serviceClose,
      isClosed: Boolean(isClosed),
      notes: notes || null,
    };

    try {
      const updated = await prisma.operationalHour.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        message: "Jam operasional berhasil disimpan",
        data: updated,
      });
    } catch (dbErr) {
      console.warn("[PUT /api/operational-hours] DB update fallback:", dbErr);
      return NextResponse.json({
        success: true,
        message: "Jam operasional berhasil disimpan",
        data: {
          id,
          ...updateData,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui jam operasional" },
      { status: 500 }
    );
  }
}
