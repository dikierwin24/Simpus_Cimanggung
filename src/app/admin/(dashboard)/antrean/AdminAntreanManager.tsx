"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Volume2,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Calendar,
  AlertCircle,
  Loader2,
  Printer,
  ChevronRight,
} from "lucide-react";
import { formatDateIndo } from "@/lib/utils";

interface QueueItem {
  id: string;
  ticketNumber: string;
  nik: string;
  patientName: string;
  phone: string;
  gender: string;
  patientType: string;
  bpjsNumber: string | null;
  appointmentDate: string;
  complaint: string | null;
  status: string;
  calledAt: Date | string | null;
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
  initialQueues: QueueItem[];
  polis: PoliItem[];
  todayDate: string;
}

export default function AdminAntreanManager({
  initialQueues,
  polis,
  todayDate,
}: Props) {
  const [queues, setQueues] = useState<QueueItem[]>(initialQueues);
  const [selectedDate, setSelectedDate] = useState<string>(todayDate);
  const [selectedPoli, setSelectedPoli] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loadingFetch, setLoadingFetch] = useState(false);

  // Audio Voice Announcement (SpeechSynthesis Web API)
  const speakQueueNumber = (ticketNumber: string, poliName: string, room: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // batalkan suara sebelumnya
      // Format pembacaan nomor antrean (misal: U M M 0 0 2)
      const spelled = ticketNumber.replace("-", " ");
      const text = `Nomor antrean ${spelled}. Silakan menuju ke ${poliName}, ${room}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Update Status Antrean (Menunggu -> Dipanggil -> Selesai / Batal)
  const handleUpdateStatus = async (queue: QueueItem, newStatus: string) => {
    setUpdatingId(queue.id);
    try {
      const res = await fetch(`/api/queues/${queue.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();

      if (json.success) {
        setQueues((prev) =>
          prev.map((q) => (q.id === queue.id ? { ...q, status: newStatus } : q))
        );

        if (newStatus === "DIPANGGIL") {
          speakQueueNumber(queue.ticketNumber, queue.poli.name, queue.poli.roomNumber);
        }
      } else {
        alert(json.message || "Gagal mengubah status antrean");
      }
    } catch (err) {
      alert("Terjadi masalah jaringan.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    setLoadingFetch(true);
    try {
      const res = await fetch(`/api/queues?date=${date}`);
      const json = await res.json();
      if (json.success) {
        setQueues(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFetch(false);
    }
  };

  const filteredQueues = queues.filter((q) => {
    if (selectedPoli !== "all" && q.poli.id !== selectedPoli) return false;
    if (selectedStatus !== "all" && q.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      if (
        !q.patientName.toLowerCase().includes(s) &&
        !q.ticketNumber.toLowerCase().includes(s) &&
        !q.nik.includes(s) &&
        !q.phone.includes(s)
      ) {
        return false;
      }
    }
    return true;
  });

  const waitingCount = queues.filter((q) => q.status === "MENUNGGU").length;
  const calledCount = queues.filter((q) => q.status === "DIPANGGIL").length;
  const doneCount = queues.filter((q) => q.status === "SELESAI").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Antrean Pasien Hari Ini
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Panggil pasien dengan tombol suara otomatis, verifikasi berkas, dan tandai pasien yang telah selesai dilayani.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            aria-label="Pilih tanggal antrean"
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl shadow-xs"
          />
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition"
          >
            <Printer className="w-4 h-4 text-medical-600" />
            <span>Cetak Rekap</span>
          </button>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Terdaftar</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{queues.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-soft">
          <span className="text-xs font-bold text-amber-700 uppercase">Menunggu</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{waitingCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-soft">
          <span className="text-xs font-bold text-blue-700 uppercase">Dipanggil</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{calledCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-soft">
          <span className="text-xs font-bold text-emerald-700 uppercase">Selesai Dilayani</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{doneCount}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama pasien, NIK, atau nomor tiket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="w-full md:w-56">
          <select
            value={selectedPoli}
            onChange={(e) => setSelectedPoli(e.target.value)}
            aria-label="Filter Poli"
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
          >
            <option value="all">Semua Poli</option>
            {polis.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-44">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter Status"
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
          >
            <option value="all">Semua Status</option>
            <option value="MENUNGGU">Menunggu</option>
            <option value="DIPANGGIL">Dipanggil</option>
            <option value="SELESAI">Selesai</option>
            <option value="BATAL">Batal</option>
          </select>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
        {loadingFetch ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-medical-600" />
            <span>Memuat data antrean...</span>
          </div>
        ) : filteredQueues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-bold">No. Antrean</th>
                  <th className="py-3.5 px-4 font-bold">Identitas Pasien</th>
                  <th className="py-3.5 px-4 font-bold">Poli & Keluhan</th>
                  <th className="py-3.5 px-4 font-bold">Penjamin</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  <th className="py-3.5 px-4 font-bold text-center">Panggil & Aksi Petugas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredQueues.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-base font-black text-medical-600 bg-medical-50 px-2.5 py-1 rounded-lg border border-medical-200 inline-block">
                        {item.ticketNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block text-sm">{item.patientName}</span>
                      <span className="font-mono text-[11px] text-slate-500">NIK: {item.nik}</span>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">
                        {item.poli.name} ({item.poli.roomNumber})
                      </span>
                      {item.complaint && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5 max-w-xs truncate">
                          &quot;{item.complaint}&quot;
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.patientType === "BPJS"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.patientType}
                      </span>
                      {item.bpjsNumber && (
                        <span className="block font-mono text-[10px] text-slate-500 mt-0.5">
                          {item.bpjsNumber}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          item.status === "DIPANGGIL"
                            ? "bg-amber-100 text-amber-800 animate-pulse"
                            : item.status === "SELESAI"
                            ? "bg-slate-100 text-slate-600"
                            : item.status === "BATAL"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    {/* Action buttons with audio call */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Tombol Panggil Suara */}
                        <button
                          onClick={() => handleUpdateStatus(item, "DIPANGGIL")}
                          disabled={updatingId === item.id}
                          className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] shadow-xs transition"
                          title="Panggil nomor antrean dengan suara bel otomatis"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Panggil</span>
                        </button>

                        {/* Tombol Selesai */}
                        <button
                          onClick={() => handleUpdateStatus(item, "SELESAI")}
                          disabled={updatingId === item.id}
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] shadow-xs transition"
                          title="Tandai pasien selesai diperiksa"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selesai</span>
                        </button>

                        {/* Tombol Batal/Dilewati */}
                        <button
                          onClick={() => handleUpdateStatus(item, "BATAL")}
                          disabled={updatingId === item.id}
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 px-2 py-1.5 rounded-lg text-[11px] transition"
                          title="Batalkan / Pasien tidak hadir"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-400 space-y-1">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-600">Tidak ada data antrean ditemukan</p>
            <p>Silakan sesuaikan tanggal atau pilihan filter pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
