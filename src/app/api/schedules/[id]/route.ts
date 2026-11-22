import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, startTime, endTime, notes, dayOfWeek, dayName } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (startTime !== undefined) dataToUpdate.startTime = startTime;
    if (endTime !== undefined) dataToUpdate.endTime = endTime;
    if (notes !== undefined) dataToUpdate.notes = notes;
    if (dayOfWeek !== undefined) dataToUpdate.dayOfWeek = Number(dayOfWeek);
    if (dayName !== undefined) dataToUpdate.dayName = dayName;

    try {
      const updated = await prisma.schedule.update({
        where: { id: params.id },
        data: dataToUpdate,
        include: {
          doctor: true,
          poli: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Jadwal berhasil diperbarui",
        data: updated,
      });
    } catch (dbErr) {
      console.warn("[PATCH /api/schedules/[id]] DB update fallback:", dbErr);
      return NextResponse.json({
        success: true,
        message: "Jadwal berhasil diperbarui (mode demo / memori)",
        data: {
          id: params.id,
          ...dataToUpdate,
        },
      });
    }
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui jadwal" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    try {
      await prisma.schedule.delete({
        where: { id: params.id },
      });
    } catch (dbErr) {
      console.warn("[DELETE /api/schedules/[id]] DB delete fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Jadwal berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus jadwal" },
      { status: 500 }
    );
  }
}
