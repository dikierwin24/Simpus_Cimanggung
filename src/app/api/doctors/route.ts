import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        poli: true,
        schedules: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat data dokter" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nip, sip, specialization, poliId, phone, photoUrl } = body;

    if (!name || !specialization || !poliId) {
      return NextResponse.json(
        { success: false, message: "Nama, Spesialisasi, dan Poli wajib diisi" },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        nip: nip || null,
        sip: sip || null,
        specialization,
        poliId,
        phone: phone || null,
        photoUrl: photoUrl || null,
      },
      include: {
        poli: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Dokter berhasil ditambahkan",
      data: doctor,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan dokter" },
      { status: 500 }
    );
  }
}
