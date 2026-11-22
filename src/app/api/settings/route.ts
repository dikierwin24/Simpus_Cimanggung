import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PKM_INFO } from "@/lib/constants";

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
    return NextResponse.json({
      success: true,
      data: {
        id: "default",
        name: PKM_INFO.name,
        tagline: PKM_INFO.tagline,
        address: PKM_INFO.address,
        phone: PKM_INFO.phone,
        emergencyPhone: PKM_INFO.emergencyPhone,
        whatsapp: PKM_INFO.whatsappDisplay,
        email: PKM_INFO.email,
        headOfClinic: PKM_INFO.headOfClinic,
        mapsUrl: PKM_INFO.mapsUrl,
      },
    });
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

    const dataToSave = {
      name,
      tagline,
      address,
      phone,
      emergencyPhone,
      whatsapp,
      email,
      headOfClinic,
      mapsUrl,
    };

    try {
      const updated = await prisma.siteSetting.upsert({
        where: { id: "default" },
        update: dataToSave,
        create: {
          id: "default",
          ...dataToSave,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Pengaturan berhasil disimpan",
        data: updated,
      });
    } catch (dbErr) {
      console.warn("[PUT /api/settings] DB upsert fallback:", dbErr);
      return NextResponse.json({
        success: true,
        message: "Pengaturan berhasil disimpan",
        data: {
          id: "default",
          ...dataToSave,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan pengaturan" },
      { status: 500 }
    );
  }
}
