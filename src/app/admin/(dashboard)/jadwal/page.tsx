import React from "react";
import { prisma } from "@/lib/prisma";
import { FALLBACK_SCHEDULES, FALLBACK_DOCTORS, FALLBACK_POLIS } from "@/lib/mockData";
import AdminJadwalManager from "./AdminJadwalManager";

export const dynamic = "force-dynamic";

export default async function AdminJadwalPage() {
  let schedules: any[] = FALLBACK_SCHEDULES;
  let doctors: any[] = FALLBACK_DOCTORS;
  let polis: any[] = FALLBACK_POLIS;

  try {
    const [dbSchedules, dbDoctors, dbPolis] = await Promise.all([
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

    if (dbSchedules && dbSchedules.length > 0) schedules = dbSchedules;
    if (dbDoctors && dbDoctors.length > 0) doctors = dbDoctors;
    if (dbPolis && dbPolis.length > 0) polis = dbPolis;
  } catch (err) {
    console.warn("[AdminJadwalPage] Database unavailable, using fallback mock data:", err);
  }

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
