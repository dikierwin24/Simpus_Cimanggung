import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getTodayDateString } from "@/lib/utils";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  Stethoscope,
  Activity,
  UserCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const todayStr = getTodayDateString();
  const dayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();

  // Ambil data agregat
  const [
    totalTodayQueues,
    waitingQueues,
    calledQueues,
    doneQueues,
    todaySchedules,
    recentQueues,
    totalAnnouncements,
  ] = await Promise.all([
    prisma.queueTicket.count({ where: { appointmentDate: todayStr } }),
    prisma.queueTicket.count({ where: { appointmentDate: todayStr, status: "MENUNGGU" } }),
    prisma.queueTicket.count({ where: { appointmentDate: todayStr, status: "DIPANGGIL" } }),
    prisma.queueTicket.count({ where: { appointmentDate: todayStr, status: "SELESAI" } }),
    prisma.schedule.findMany({
      where: { dayOfWeek },
      include: { doctor: true, poli: true },
      orderBy: { startTime: "asc" },
    }),
    prisma.queueTicket.findMany({
      where: { appointmentDate: todayStr },
      include: { poli: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.announcement.count(),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pantau dan kelola kehadiran nakes, antrean warga, dan pengumuman Puskesmas Cimanggung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/antrean"
            className="inline-flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition"
          >
            <UserCheck className="w-4 h-4" />
            <span>Kelola Loket & Antrean</span>
          </Link>
          <Link
            href="/admin/jadwal"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition"
          >
            <Calendar className="w-4 h-4 text-medical-600" />
            <span>Update Jadwal Dokter</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Antrean Hari Ini</span>
            <div className="w-9 h-9 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalTodayQueues}</span>
            <span className="text-xs text-slate-500">Pasien Terdaftar</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-amber-600 font-semibold">{waitingQueues} Menunggu</span>
            <span className="text-emerald-600 font-semibold">{doneQueues} Selesai</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Sedang Dipanggil</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{calledQueues}</span>
            <span className="text-xs text-slate-500">Dalam Pemeriksaan</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Diperbarui secara live dari loket poli
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Dokter Hari Ini</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{todaySchedules.length}</span>
            <span className="text-xs text-slate-500">Jadwal Praktik</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold">
            {todaySchedules.filter((s) => s.status === "HADIR").length} Dokter Hadir Siaga
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Pengumuman Aktif</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalAnnouncements}</span>
            <span className="text-xs text-slate-500">Postingan Warga</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            CKG, Posyandu, dan info vaksin
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns (Antrean Terbaru vs Dokter Hari Ini) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Antrean Terbaru */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pendaftaran Antrean Terbaru Hari Ini</h2>
              <p className="text-xs text-slate-500">Daftar pasien yang mendaftar online hari ini</p>
            </div>
            <Link
              href="/admin/antrean"
              className="text-xs font-bold text-medical-600 hover:text-medical-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentQueues.length > 0 ? (
            <div className="divide-y divide-slate-100 text-xs">
              {recentQueues.map((q) => (
                <div key={q.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-medical-600 bg-medical-50 px-2.5 py-1 rounded-lg border border-medical-200">
                      {q.ticketNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900">{q.patientName}</h4>
                      <p className="text-slate-500 text-[11px]">
                        {q.poli.name} • {q.patientType}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      q.status === "DIPANGGIL"
                        ? "bg-amber-100 text-amber-800 animate-pulse"
                        : q.status === "SELESAI"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Belum ada antrean yang terdaftar hari ini.
            </div>
          )}
        </div>

        {/* Dokter Bertugas Hari Ini */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Dokter Praktik Hari Ini</h2>
              <p className="text-xs text-slate-500">Status kehadiran saat ini</p>
            </div>
            <Link
              href="/admin/jadwal"
              className="text-xs font-bold text-medical-600 hover:text-medical-700 flex items-center gap-1"
            >
              <span>Ubah Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {todaySchedules.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{s.doctor.name}</h4>
                  <p className="text-slate-500 text-[11px]">
                    {s.poli.name} • {s.startTime} - {s.endTime} WIB
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    s.status === "HADIR"
                      ? "bg-emerald-100 text-emerald-800"
                      : s.status === "CUTI"
                      ? "bg-rose-100 text-rose-800"
                      : s.status === "TUGAS_LUAR"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
