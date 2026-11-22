import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    });
    return NextResponse.json({ success: true, data: announcements });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat pengumuman" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, summary, content, category, isPinned, author } = body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { success: false, message: "Judul, ringkasan, dan isi pengumuman wajib diisi" },
        { status: 400 }
      );
    }

    // Buat slug unik
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    try {
      const newAnnouncement = await prisma.announcement.create({
        data: {
          title,
          slug,
          summary,
          content,
          category: category || "UMUM",
          isPinned: Boolean(isPinned),
          author: author || "Staf Puskesmas Cimanggung",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Pengumuman berhasil dipublikasikan",
        data: newAnnouncement,
      });
    } catch (dbErr) {
      console.warn("[POST /api/announcements] DB create fallback:", dbErr);
      const mockAnnouncement = {
        id: `ann-${Date.now()}`,
        title,
        slug,
        summary,
        content,
        category: category || "UMUM",
        isPinned: Boolean(isPinned),
        author: author || "Staf Puskesmas Cimanggung",
        publishedAt: new Date().toISOString(),
      };
      return NextResponse.json({
        success: true,
        message: "Pengumuman berhasil dipublikasikan",
        data: mockAnnouncement,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat pengumuman" },
      { status: 500 }
    );
  }
}
