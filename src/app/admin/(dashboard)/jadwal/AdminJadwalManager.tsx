"use client";

import React, { useState } from "react";
import {
  Calendar,
  Plus,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Edit2,
  X,
  Loader2,
  Search,
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
    specialization: string;
  };
  poli: {
    id: string;
    name: string;
    roomNumber: string;
  };
}

interface DoctorItem {
  id: string;
  name: string;
  specialization: string;
  poli: {
    id: string;
    name: string;
  };
}

interface PoliItem {
  id: string;
  name: string;
}

interface Props {
  initialSchedules: ScheduleItem[];
  doctors: DoctorItem[];
  polis: PoliItem[];
}

const DAYS_MAP = [
  { num: 1, name: "Senin" },
  { num: 2, name: "Selasa" },
  { num: 3, name: "Rabu" },
  { num: 4, name: "Kamis" },
  { num: 5, name: "Jumat" },
  { num: 6, name: "Sabtu" },
];

export default function AdminJadwalManager({
  initialSchedules,
  doctors,
  polis,
}: Props) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchDoc, setSearchDoc] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modals state
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form New Doctor
  const [docForm, setDocForm] = useState({
    name: "",
    nip: "",
    sip: "",
    specialization: "",
    poliId: polis[0]?.id || "",
    phone: "",
  });

  // Form New Schedule
  const [schedForm, setSchedForm] = useState({
    doctorId: doctors[0]?.id || "",
    dayOfWeek: "1",
    startTime: "08:00",
    endTime: "13:00",
    status: "HADIR",
    notes: "",
  });

  // Form Edit Schedule
  const [editForm, setEditForm] = useState({
    dayOfWeek: "1",
    startTime: "08:00",
    endTime: "13:00",
    status: "HADIR",
    notes: "",
  });

  const handleOpenEdit = (item: ScheduleItem) => {
    setEditingSchedule(item);
    setEditForm({
      dayOfWeek: String(item.dayOfWeek),
      startTime: item.startTime,
      endTime: item.endTime,
      status: item.status,
      notes: item.notes || "",
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule) return;

    setSubmitting(true);
    const dayObj = DAYS_MAP.find((d) => d.num === Number(editForm.dayOfWeek));

    try {
      const res = await fetch(`/api/schedules/${editingSchedule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          dayOfWeek: Number(editForm.dayOfWeek),
          dayName: dayObj?.name || "Senin",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSchedules((prev) =>
          prev.map((s) => (s.id === editingSchedule.id ? json.data : s))
        );
        setEditingSchedule(null);
      } else {
        alert(json.message || "Gagal memperbarui jadwal");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setSubmitting(false);
    }
  };

  // Quick 1-click status update function!
  const handleQuickStatusChange = async (scheduleId: string, newStatus: string) => {
    setUpdatingId(scheduleId);
    try {
      const res = await fetch(`/api/schedules/${scheduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (json.success) {
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === scheduleId ? { ...item, status: newStatus } : item
          )
        );
      } else {
        alert(json.message || "Gagal memperbarui status");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
    try {
      const res = await fetch(`/api/schedules/${scheduleId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setSchedules((prev) => prev.filter((item) => item.id !== scheduleId));
      }
    } catch (err) {
      alert("Gagal menghapus jadwal.");
    }
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docForm),
      });
      const json = await res.json();
      if (json.success) {
        alert("Dokter baru berhasil ditambahkan!");
        setShowDoctorModal(false);
        window.location.reload();
      } else {
        alert(json.message || "Gagal menambahkan dokter");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const dayObj = DAYS_MAP.find((d) => d.num === Number(schedForm.dayOfWeek));
    const doctorObj = doctors.find((d) => d.id === schedForm.doctorId);

    try {
      const res = await fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...schedForm,
          poliId: doctorObj?.poli.id,
          dayName: dayObj?.name || "Senin",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSchedules((prev) => [...prev, json.data]);
        setShowScheduleModal(false);
        alert("Jadwal praktik berhasil ditambahkan!");
      } else {
        alert(json.message || "Gagal membuat jadwal");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = schedules.filter((s) => {
    if (selectedDay !== "all" && String(s.dayOfWeek) !== selectedDay) return false;
    if (searchDoc.trim()) {
      const q = searchDoc.toLowerCase();
      if (!s.doctor.name.toLowerCase().includes(q) && !s.poli.name.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Jadwal Praktik & Kehadiran Dokter
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ubah status kehadiran dokter dengan <strong>1 klik tombol</strong>. Perubahan langsung tampil secara instan di halaman publik warga.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDoctorModal(true)}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition"
          >
            <UserPlus className="w-4 h-4 text-medical-600" />
            <span>+ Dokter Baru</span>
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="inline-flex items-center gap-1.5 bg-medical-600 hover:bg-medical-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Jadwal Praktik</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Days Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedDay("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedDay === "all"
                ? "bg-medical-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua Hari
          </button>
          {DAYS_MAP.map((d) => (
            <button
              key={d.num}
              onClick={() => setSelectedDay(String(d.num))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedDay === String(d.num)
                  ? "bg-medical-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Search Doctor */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari dokter / poli..."
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Dokter & Spesialisasi</th>
                <th className="py-3.5 px-4 font-bold">Poli & Ruang</th>
                <th className="py-3.5 px-4 font-bold">Hari & Jam</th>
                <th className="py-3.5 px-4 font-bold text-center">Status Saat Ini</th>
                <th className="py-3.5 px-4 font-bold text-center">Ubah Status Cepat (1-Klik)</th>
                <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block text-sm">{item.doctor.name}</span>
                    <span className="text-[11px] text-slate-500">{item.doctor.specialization}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-medical-700 bg-medical-50 px-2 py-0.5 rounded border border-medical-200 text-[11px]">
                      {item.poli.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.poli.roomNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 block">{item.dayName}</span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {item.startTime} - {item.endTime} WIB
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {updatingId === item.id ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-medical-600 font-bold">
                        <Loader2 className="w-3 h-3 animate-spin" /> Menyimpan...
                      </span>
                    ) : (
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          item.status === "HADIR"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "CUTI"
                            ? "bg-rose-100 text-rose-800"
                            : item.status === "TUGAS_LUAR"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>
                  {/* 1-Click Quick Action Buttons */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        title="Set Hadir"
                        onClick={() => handleQuickStatusChange(item.id, "HADIR")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          item.status === "HADIR"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700"
                        }`}
                      >
                        Hadir
                      </button>
                      <button
                        title="Set Cuti"
                        onClick={() => handleQuickStatusChange(item.id, "CUTI")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          item.status === "CUTI"
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700"
                        }`}
                      >
                        Cuti
                      </button>
                      <button
                        title="Set Dinas Luar"
                        onClick={() => handleQuickStatusChange(item.id, "TUGAS_LUAR")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          item.status === "TUGAS_LUAR"
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-800"
                        }`}
                      >
                        Dinas Luar
                      </button>
                      <button
                        title="Set Digantikan"
                        onClick={() => handleQuickStatusChange(item.id, "DIGANTIKAN")}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          item.status === "DIGANTIKAN"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700"
                        }`}
                      >
                        Pengganti
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition"
                        title="Edit Jam & Detail Jadwal"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: TAMBAH DOKTER BARU */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Tambah Tenaga Medis / Dokter</h3>
              <button
                onClick={() => setShowDoctorModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDoctor} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="dr. Contoh Dokter, Sp.A"
                  value={docForm.name}
                  onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Spesialisasi / Tugas *</label>
                <input
                  type="text"
                  required
                  placeholder="Dokter Umum / Dokter Gigi / Bidan"
                  value={docForm.specialization}
                  onChange={(e) => setDocForm({ ...docForm, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Poli Penempatan *</label>
                <select
                  value={docForm.poliId}
                  onChange={(e) => setDocForm({ ...docForm, poliId: e.target.value })}
                  aria-label="Poli Penempatan"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  {polis.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIP (Opsional)</label>
                  <input
                    type="text"
                    placeholder="1985xxxx xxxx"
                    value={docForm.nip}
                    onChange={(e) => setDocForm({ ...docForm, nip: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SIP (Opsional)</label>
                  <input
                    type="text"
                    placeholder="446.1/SIP..."
                    value={docForm.sip}
                    onChange={(e) => setDocForm({ ...docForm, sip: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDoctorModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold"
                >
                  {submitting ? "Menyimpan..." : "Simpan Dokter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TAMBAH JADWAL PRAKTIK */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Tambah Jadwal Praktik Poli</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Dokter *</label>
                <select
                  value={schedForm.doctorId}
                  onChange={(e) => setSchedForm({ ...schedForm, doctorId: e.target.value })}
                  aria-label="Pilih Dokter"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.poli.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hari Praktik *</label>
                <select
                  value={schedForm.dayOfWeek}
                  onChange={(e) => setSchedForm({ ...schedForm, dayOfWeek: e.target.value })}
                  aria-label="Hari Praktik"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  {DAYS_MAP.map((d) => (
                    <option key={d.num} value={String(d.num)}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai *</label>
                  <input
                    type="time"
                    required
                    value={schedForm.startTime}
                    onChange={(e) => setSchedForm({ ...schedForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Selesai *</label>
                  <input
                    type="time"
                    required
                    value={schedForm.endTime}
                    onChange={(e) => setSchedForm({ ...schedForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Kehadiran *</label>
                <select
                  value={schedForm.status}
                  onChange={(e) => setSchedForm({ ...schedForm, status: e.target.value })}
                  aria-label="Status Kehadiran"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="HADIR">Hadir Sesuai Jadwal</option>
                  <option value="CUTI">Sedang Cuti</option>
                  <option value="TUGAS_LUAR">Dinas Luar</option>
                  <option value="DIGANTIKAN">Dokter Pengganti</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Misal: Khusus pasien USG atau Pengganti dr. A"
                  value={schedForm.notes}
                  onChange={(e) => setSchedForm({ ...schedForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold"
                >
                  {submitting ? "Menyimpan..." : "Simpan Jadwal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT JADWAL PRAKTIK */}
      {editingSchedule && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Edit Jadwal Praktik</h3>
                <p className="text-xs text-medical-700 font-semibold">
                  {editingSchedule.doctor.name} ({editingSchedule.poli.name})
                </p>
              </div>
              <button
                onClick={() => setEditingSchedule(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hari Praktik *</label>
                <select
                  value={editForm.dayOfWeek}
                  onChange={(e) => setEditForm({ ...editForm, dayOfWeek: e.target.value })}
                  aria-label="Hari Praktik"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  {DAYS_MAP.map((d) => (
                    <option key={d.num} value={String(d.num)}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai *</label>
                  <input
                    type="time"
                    required
                    value={editForm.startTime}
                    onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Selesai *</label>
                  <input
                    type="time"
                    required
                    value={editForm.endTime}
                    onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Kehadiran *</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  aria-label="Status Kehadiran"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="HADIR">Hadir Sesuai Jadwal</option>
                  <option value="CUTI">Sedang Cuti</option>
                  <option value="TUGAS_LUAR">Dinas Luar</option>
                  <option value="DIGANTIKAN">Dokter Pengganti</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
                <input
                  type="text"
                  placeholder="Misal: Pemeriksaan USG dasar"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold"
                >
                  {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
