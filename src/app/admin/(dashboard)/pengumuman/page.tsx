import React from "react";
import { prisma } from "@/lib/prisma";
import AdminPengumumanManager from "./AdminPengumumanManager";

export const dynamic = "force-dynamic";

export default async function AdminPengumumanPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <AdminPengumumanManager initialAnnouncements={announcements} />
    </div>
  );
}
