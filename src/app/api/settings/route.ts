import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let setting = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    if (!setting) {
      setting = await prisma.siteSetting.create({
        data: {
          id: "default",
        },
      });
    }

    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat pengaturan profil" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      tagline,
      address,
      phone,
      emergencyPhone,
      whatsapp,
      email,
      headOfClinic,
      mapsUrl,
    } = body;

    const updated = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        name,
        tagline,
        address,
        phone,
        emergencyPhone,
        whatsapp,
        email,
        headOfClinic,
        mapsUrl,
      },
      create: {
        id: "default",
        name,
        tagline,
        address,
        phone,
        emergencyPhone,
        whatsapp,
        email,
        headOfClinic,
        mapsUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Informasi profil Puskesmas berhasil disimpan",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan pengaturan profil" },
      { status: 500 }
    );
  }
}
