import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const queue = await prisma.queueTicket.findUnique({
      where: { id: params.id },
      include: {
        poli: true,
      },
    });

    if (!queue) {
      return NextResponse.json(
        { success: false, message: "Antrean tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: queue });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat data antrean" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["MENUNGGU", "DIPANGGIL", "SELESAI", "BATAL"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Status tidak valid" },
        { status: 400 }
      );
    }

    const updateData: {
      status: string;
      calledAt?: Date;
      completedAt?: Date;
    } = { status };

    if (status === "DIPANGGIL") {
      updateData.calledAt = new Date();
    } else if (status === "SELESAI") {
      updateData.completedAt = new Date();
    }

    const updated = await prisma.queueTicket.update({
      where: { id: params.id },
      data: updateData,
      include: {
        poli: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Status berhasil diubah menjadi ${status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui status antrean" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.queueTicket.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Data antrean berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus antrean" },
      { status: 500 }
    );
  }
}
