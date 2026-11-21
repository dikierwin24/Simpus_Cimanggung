import React from "react";
import { prisma } from "@/lib/prisma";
import { FALLBACK_ANNOUNCEMENTS } from "@/lib/mockData";
import AdminPengumumanManager from "./AdminPengumumanManager";

export const dynamic = "force-dynamic";

export default async function AdminPengumumanPage() {
  let announcements: any[] = FALLBACK_ANNOUNCEMENTS;
  try {
    const dbAnnouncements = await prisma.announcement.findMany({
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    });
    if (dbAnnouncements && dbAnnouncements.length > 0) announcements = dbAnnouncements;
  } catch (err) {
    console.warn("[AdminPengumumanPage] Database unavailable, using fallback mock data:", err);
  }

  return (
    <div className="space-y-6">
      <AdminPengumumanManager initialAnnouncements={announcements} />
    </div>
  );
}
