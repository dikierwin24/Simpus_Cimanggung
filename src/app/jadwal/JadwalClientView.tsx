"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Building2,
  ArrowRight,
  Filter,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  doctor: {
    id: string;
    name: string;
    nip: string | null;
    sip: string | null;
    specialization: string;
    photoUrl: string | null;
  };
  poli: {
    id: string;
    name: string;
    code: string;
    roomNumber: string;
  };
}

interface PoliItem {
  id: string;
  name: string;
  code: string;
}

interface Props {
  initialSchedules: ScheduleItem[];
  polis: PoliItem[];
}

const DAYS = [
  { id: "all", label: "Semua Hari" },
  { id: "1", label: "Senin" },
  { id: "2", label: "Selasa" },
  { id: "3", label: "Rabu" },
  { id: "4", label: "Kamis" },
  { id: "5", label: "Jumat" },
  { id: "6", label: "Sabtu" },
];

export default function JadwalClientView({ initialSchedules, polis }: Props) {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedPoli, setSelectedPoli] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Tentukan hari saat ini otomatis (1: Senin, ..., 6: Sabtu)
  const todayNum = new Date().getDay();
  const todayDayStr = todayNum === 0 ? "7" : String(todayNum);

  const filteredSchedules = useMemo(() => {
    return initialSchedules.filter((item) => {
      // Filter hari
      if (selectedDay !== "all" && String(item.dayOfWeek) !== selectedDay) {
        return false;
      }

      // Filter poli
      if (selectedPoli !== "all" && item.poli.id !== selectedPoli) {
        return false;
      }

      // Filter nama dokter atau spesialisasi
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const docName = item.doctor.name.toLowerCase();
        const spec = item.doctor.specialization.toLowerCase();
        const poliName = item.poli.name.toLowerCase();
        if (
          !docName.includes(query) &&
          !spec.includes(query) &&
          !poliName.includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialSchedules, selectedDay, selectedPoli, searchQuery]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "HADIR":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Hadir Sesuai Jadwal
          </span>
        );
      case "CUTI":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Sedang Cuti
          </span>
        );
      case "TUGAS_LUAR":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Dinas Luar / Posyandu
          </span>
        );
      case "DIGANTIKAN":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <RefreshCw className="w-3.5 h-3.5" />
            Dokter Pengganti
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card space-y-4">
        {/* Top search & poli select */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama dokter, poli, atau spesialisasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-medical-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Poli Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedPoli}
              onChange={(e) => setSelectedPoli(e.target.value)}
              aria-label="Filter berdasarkan poli"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-medical-500 focus:bg-white transition"
            >
              <option value="all">Semua Poli Pelayanan</option>
              {polis.map((poli) => (
                <option key={poli.id} value={poli.id}>
                  {poli.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Days Filter Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Hari:
          </span>
          {DAYS.map((day) => {
            const isSelected = selectedDay === day.id;
            const isToday = day.id === todayDayStr;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-medical-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{day.label}</span>
                {isToday && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? "bg-medical-700 text-white" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    Hari Ini
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Menampilkan <strong>{filteredSchedules.length}</strong> jadwal dokter
        </span>
        {(selectedDay !== "all" || selectedPoli !== "all" || searchQuery !== "") && (
          <button
            onClick={() => {
              setSelectedDay("all");
              setSelectedPoli("all");
              setSearchQuery("");
            }}
            className="text-medical-600 font-semibold hover:underline"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Grid of Doctor Cards */}
      {filteredSchedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition duration-200 shadow-soft hover:shadow-card p-6 flex flex-col justify-between ${
                item.status === "CUTI"
                  ? "border-rose-200/80 bg-rose-50/20"
                  : item.status === "TUGAS_LUAR"
                  ? "border-amber-200/80 bg-amber-50/20"
                  : "border-slate-200/90 hover:border-medical-300"
              }`}
            >
              <div>
                {/* Poli badge & Room number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold bg-medical-50 text-medical-700 border border-medical-200/80 px-2.5 py-1 rounded-lg">
                    {item.poli.name}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.poli.roomNumber}
                  </span>
                </div>

                {/* Doctor Avatar & Identity */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-100 to-sky-100 border border-medical-200 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                    {item.doctor.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.doctor.photoUrl}
                        alt={item.doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-medical-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.doctor.name}
                    </h3>
                    <p className="text-xs text-medical-700 font-medium mt-0.5">
                      {item.doctor.specialization}
                    </p>
                    {item.doctor.sip && (
                      <p className="text-[10px] text-slate-400 font-mono mt-1">
                        SIP: {item.doctor.sip}
                      </p>
                    )}
                  </div>
                </div>

                {/* Schedule details & Status */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <CalendarIcon className="w-3.5 h-3.5 text-medical-500" />
                      Hari Praktik:
                    </span>
                    <span className="font-bold text-slate-900">{item.dayName}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-medical-500" />
                      Jam Pelayanan:
                    </span>
                    <span className="font-mono font-semibold text-slate-900">
                      {item.startTime} - {item.endTime} WIB
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500">Status Kehadiran:</span>
                    <div>{renderStatusBadge(item.status)}</div>
                  </div>

                  {item.notes && (
                    <div className="mt-2 text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                      <strong className="text-slate-700">Catatan:</strong> {item.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-1">
                {item.status === "HADIR" || item.status === "DIGANTIKAN" ? (
                  <Link
                    href={`/antrean?poli=${item.poli.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition"
                  >
                    <span>Daftar Antrean {item.poli.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 text-slate-400 font-semibold py-2.5 rounded-xl text-xs cursor-not-allowed"
                  >
                    <span>Dokter Sedang Tidak Hadir</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Tidak ada jadwal yang sesuai kriteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Silakan ganti pilihan hari, pilih poli lain, atau hapus kata kunci pencarian Anda.
          </p>
          <button
            onClick={() => {
              setSelectedDay("all");
              setSelectedPoli("all");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-medical-600 bg-medical-50 px-4 py-2 rounded-xl hover:bg-medical-100 transition"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}
