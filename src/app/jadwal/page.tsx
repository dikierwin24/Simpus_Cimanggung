import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { FALLBACK_SCHEDULES, FALLBACK_POLIS } from "@/lib/mockData";
import JadwalClientView from "./JadwalClientView";

export const dynamic = "force-dynamic";

export default async function JadwalPage() {
  let schedules: any[] = FALLBACK_SCHEDULES;
  let polis: any[] = FALLBACK_POLIS;

  try {
    const [dbSchedules, dbPolis] = await Promise.all([
      prisma.schedule.findMany({
        include: {
          doctor: true,
          poli: true,
        },
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      }),
      prisma.poli.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      }),
    ]);

    if (dbSchedules && dbSchedules.length > 0) schedules = dbSchedules;
    if (dbPolis && dbPolis.length > 0) polis = dbPolis;
  } catch (err) {
    console.warn("[JadwalPage] Database unavailable, using fallback mock data:", err);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-medical-600 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
              Jadwal Tenaga Medis
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Jadwal Praktik Dokter & Tenaga Medis Puskesmas Cimanggung
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Informasi lengkap kehadiran dokter dan bidan di setiap poli rawat jalan. Status kehadiran diperbarui secara langsung oleh staf administrasi Puskesmas.
            </p>
          </div>

          {/* Interactive Client Component for Search & Filtering */}
          <JadwalClientView initialSchedules={schedules} polis={polis} />
        </div>
      </main>
      <Footer />
    </>
  );
}
