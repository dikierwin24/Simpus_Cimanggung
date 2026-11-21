import React from "react";
import { prisma } from "@/lib/prisma";
import AdminJadwalManager from "./AdminJadwalManager";

export const dynamic = "force-dynamic";

export default async function AdminJadwalPage() {
  const [schedules, doctors, polis] = await Promise.all([
    prisma.schedule.findMany({
      include: {
        doctor: true,
        poli: true,
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
    prisma.doctor.findMany({
      include: { poli: true },
      orderBy: { name: "asc" },
    }),
    prisma.poli.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <AdminJadwalManager
        initialSchedules={schedules}
        doctors={doctors}
        polis={polis}
      />
    </div>
  );
}
