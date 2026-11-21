import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        doctor: true,
        poli: true,
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json({ success: true, data: schedules });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat jadwal" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { doctorId, poliId, dayOfWeek, dayName, startTime, endTime, status, notes } = body;

    if (!doctorId || !poliId || !dayOfWeek || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, message: "Field wajib harus diisi lengkap" },
        { status: 400 }
      );
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        doctorId,
        poliId,
        dayOfWeek: Number(dayOfWeek),
        dayName: dayName || "Senin",
        startTime,
        endTime,
        status: status || "HADIR",
        notes: notes || null,
      },
      include: {
        doctor: true,
        poli: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Jadwal dokter berhasil ditambahkan",
      data: newSchedule,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan jadwal" },
      { status: 500 }
    );
  }
}
