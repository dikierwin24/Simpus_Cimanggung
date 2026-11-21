import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.announcement.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Pengumuman berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus pengumuman" },
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
    const { title, summary, content, category, isPinned } = body;

    const updated = await prisma.announcement.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(category && { category }),
        ...(isPinned !== undefined && { isPinned: Boolean(isPinned) }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pengumuman" },
      { status: 500 }
    );
  }
}
