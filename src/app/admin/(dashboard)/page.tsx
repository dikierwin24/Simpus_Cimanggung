import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getTodayDateString } from "@/lib/utils";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  Stethoscope,
  Activity,
  Users,
  Shield,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const dayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();

  let todaySchedules: any[] = [];
  let totalDoctors = 0;
  let totalPolis = 0;
  let totalAnnouncements = 0;

  try {
    const [
      dbTodaySchedules,
      dbTotalDoctors,
      dbTotalPolis,
      dbTotalAnnouncements,
    ] = await Promise.all([
      prisma.schedule.findMany({
        where: { dayOfWeek },
        include: { doctor: true, poli: true },
        orderBy: { startTime: "asc" },
      }),
      prisma.doctor.count({ where: { isActive: true } }),
      prisma.poli.count({ where: { isActive: true } }),
      prisma.announcement.count(),
    ]);

    todaySchedules = dbTodaySchedules;
    totalDoctors = dbTotalDoctors;
    totalPolis = dbTotalPolis;
    totalAnnouncements = dbTotalAnnouncements;
  } catch (err) {
    console.warn("[AdminDashboardOverview] Database error:", err);
  }

  const doctorsHadir = todaySchedules.filter((s) => s.status === "HADIR").length;
  const doctorsCuti = todaySchedules.filter((s) => s.status === "CUTI").length;
  const doctorsTugasLuar = todaySchedules.filter((s) => s.status === "TUGAS_LUAR").length;

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola kehadiran dokter, jam pelayanan poli, dan publikasi pengumuman Puskesmas Cimanggung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/jadwal"
            className="inline-flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition"
          >
            <Calendar className="w-4 h-4" />
            <span>Kelola Jadwal Dokter</span>
          </Link>
          <Link
            href="/admin/pengumuman"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition"
          >
            <Bell className="w-4 h-4 text-medical-600" />
            <span>Tambah Pengumuman</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Jadwal Hari Ini</span>
            <div className="w-9 h-9 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{todaySchedules.length}</span>
            <span className="text-xs text-slate-500">Sesi Praktik</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-semibold">{doctorsHadir} Hadir</span>
            <span className="text-rose-600 font-semibold">{doctorsCuti} Cuti</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Dokter Hadir Siaga</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{doctorsHadir}</span>
            <span className="text-xs text-slate-500">Tenaga Medis</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            {doctorsTugasLuar > 0 ? `${doctorsTugasLuar} Dokter Tugas Luar/Posyandu` : "Semua dokter siap di poli"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Unit Layanan & Poli</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalPolis}</span>
            <span className="text-xs text-slate-500">Poli Aktif</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-teal-700 font-semibold">
            Rawat Jalan, UGD & PONED 24 Jam
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
            <span className="text-xs text-slate-500">Informasi Publik</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            CKG, Posyandu, dan info imunisasi
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Jadwal Dokter Hari Ini */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Jadwal Praktik Dokter & Tenaga Medis Hari Ini</h2>
              <p className="text-xs text-slate-500">Pantau dan ubah status kehadiran dokter secara langsung</p>
            </div>
            <Link
              href="/admin/jadwal"
              className="text-xs font-bold text-medical-600 hover:text-medical-700 flex items-center gap-1"
            >
              <span>Kelola Jadwal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {todaySchedules.length > 0 ? (
            <div className="divide-y divide-slate-100 text-xs">
              {todaySchedules.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-medical-50 text-medical-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{s.doctor.name}</h4>
                      <p className="text-slate-500 text-[11px]">
                        {s.poli.name} • {s.startTime} - {s.endTime} WIB
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
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
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Tidak ada jadwal dokter untuk hari ini atau seluruh poli rawat jalan sedang tutup.
            </div>
          )}
        </div>

        {/* Pintasan Pengelolaan */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Pintasan Manajemen Cepat</h3>
            <div className="space-y-2">
              <Link
                href="/admin/jadwal"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-medical-300 hover:bg-medical-50/50 transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-medical-600" />
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-medical-700">
                    Update Status & Jadwal Dokter
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/jam-layanan"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-medical-300 hover:bg-medical-50/50 transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-medical-600" />
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-medical-700">
                    Atur Jam Loket & Pelayanan
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/pengumuman"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-medical-300 hover:bg-medical-50/50 transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-medical-600" />
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-medical-700">
                    Tulis Pengumuman & Berita
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>

              <Link
                href="/admin/informasi"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-medical-300 hover:bg-medical-50/50 transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-medical-600" />
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-medical-700">
                    Ubah Profil & Kontak Puskesmas
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-5 text-emerald-950">
            <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Database Online Aktif</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              Semua perubahan status dokter dan informasi yang Anda ubah di panel ini tersimpan langsung di server cloud PostgreSQL Supabase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
