"use client";

import React, { useState } from "react";
import QueueTicketCard, { TicketData } from "@/components/QueueTicketCard";
import { getTodayDateString } from "@/lib/utils";
import {
  UserCheck,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Building2,
  Phone,
  Shield,
  CreditCard,
  FileText,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface PoliItem {
  id: string;
  name: string;
  code: string;
  quotaPerDay: number;
  roomNumber: string;
}

interface Props {
  polis: PoliItem[];
  defaultPoliId?: string;
}

export default function AntreanClientView({ polis, defaultPoliId }: Props) {
  const [activeTab, setActiveTab] = useState<"daftar" | "cek">("daftar");
  const todayStr = getTodayDateString();

  // Form state
  const [formData, setFormData] = useState({
    nik: "",
    patientName: "",
    gender: "L",
    phone: "",
    poliId: defaultPoliId || (polis[0]?.id ?? ""),
    appointmentDate: todayStr,
    patientType: "BPJS",
    bpjsNumber: "",
    complaint: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ticketResult, setTicketResult] = useState<TicketData | null>(null);

  // Cek Status State
  const [searchKey, setSearchKey] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchedTickets, setSearchedTickets] = useState<TicketData[]>([]);

  const selectedPoli = polis.find((p) => p.id === formData.poliId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validasi NIK
    if (formData.nik.trim().length !== 16 || !/^\d+$/.test(formData.nik.trim())) {
      setErrorMsg("NIK harus berupa 16 digit angka sesuai KTP / Kartu Keluarga.");
      return;
    }

    if (formData.patientName.trim().length < 3) {
      setErrorMsg("Nama lengkap minimal 3 karakter.");
      return;
    }

    if (formData.phone.trim().length < 9) {
      setErrorMsg("Nomor WhatsApp minimal 9 digit angka.");
      return;
    }

    if (formData.patientType === "BPJS" && (!formData.bpjsNumber || formData.bpjsNumber.trim().length < 6)) {
      setErrorMsg("Nomor kartu BPJS Kesehatan wajib diisi jika memilih penjamin BPJS.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/queues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.message || "Gagal membuat nomor antrean.");
      } else {
        setTicketResult(json.data);
      }
    } catch (err) {
      setErrorMsg("Terjadi gangguan koneksi internet. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTickets = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setSearching(true);
    setSearchError(null);
    setSearchedTickets([]);

    try {
      const res = await fetch(`/api/queues?search=${encodeURIComponent(searchKey.trim())}`);
      const json = await res.json();

      if (json.success && json.data.length > 0) {
        setSearchedTickets(json.data);
      } else {
        setSearchError("Tidak ditemukan antrean dengan NIK atau No. Tiket tersebut.");
      }
    } catch (err) {
      setSearchError("Gagal memeriksa status antrean.");
    } finally {
      setSearching(false);
    }
  };

  // Jika tiket baru saja dibuat, tampilkan kartu tiket langsung
  if (ticketResult) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center max-w-md mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h2 className="text-base font-bold text-emerald-900">Pendaftaran Antrean Berhasil!</h2>
          <p className="text-xs text-emerald-700 mt-0.5">
            Simpan atau cetak tiket antrean Anda di bawah ini dan tunjukkan kepada petugas loket.
          </p>
        </div>

        <QueueTicketCard
          ticket={ticketResult}
          onReset={() => {
            setTicketResult(null);
            setFormData((prev) => ({
              ...prev,
              nik: "",
              patientName: "",
              phone: "",
              bpjsNumber: "",
              complaint: "",
            }));
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs Switcher */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("daftar")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "daftar"
              ? "bg-white text-medical-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Ambil Antrean Baru</span>
        </button>
        <button
          onClick={() => setActiveTab("cek")}
          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "cek"
              ? "bg-white text-medical-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Cek Tiket Saya</span>
        </button>
      </div>

      {activeTab === "daftar" ? (
        /* TAB 1: FORM PENDAFTARAN ANTREAN */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <h2 className="text-lg font-bold text-slate-900">Formulir Pendaftaran Antrean Online</h2>
            <p className="text-xs text-slate-500 mt-1">
              Isi data diri pasien dengan benar sesuai identitas KTP/KK untuk pencarian rekam medis.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Pendaftaran Belum Berhasil</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Poli & Tanggal Selection */}
            <div className="bg-medical-50/50 p-5 rounded-2xl border border-medical-100 space-y-4">
              <span className="text-xs font-bold text-medical-800 uppercase tracking-wider block">
                1. Pilih Poli & Waktu Kunjungan
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Poli Pelayanan Tujuan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.poliId}
                    onChange={(e) => setFormData({ ...formData, poliId: e.target.value })}
                    required
                    aria-label="Poli Pelayanan Tujuan"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
                  >
                    {polis.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.roomNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tanggal Rencana Kunjungan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    required
                    aria-label="Tanggal Rencana Kunjungan"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {selectedPoli && (
                <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                  <span>
                    Kode Antrean: <strong className="text-medical-700 font-mono">{selectedPoli.code}</strong>
                  </span>
                  <span>
                    Batas Kuota: <strong className="text-slate-800">{selectedPoli.quotaPerDay} pasien/hari</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Identitas Pasien */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Data Identitas Pasien
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NIK Pasien (16 Digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="321105xxxxxxxxxx"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, "") })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formData.nik.length}/16 digit angka NIK KTP/KK
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap Pasien <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sesuai kartu identitas"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Jenis Kelamin <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="L"
                        checked={formData.gender === "L"}
                        onChange={() => setFormData({ ...formData, gender: "L" })}
                        className="text-medical-600 focus:ring-medical-500"
                      />
                      Laki-laki
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="P"
                        checked={formData.gender === "P"}
                        onChange={() => setFormData({ ...formData, gender: "P" })}
                        className="text-medical-600 focus:ring-medical-500"
                      />
                      Perempuan
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Digunakan untuk kirim tiket & konfirmasi kehadiran
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Domisili / Desa di Cimanggung
                </label>
                <input
                  type="text"
                  placeholder="Misal: Dusun Cicabe RT 02/05 Desa Sindanggalih"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Penjamin Pembayaran */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                3. Jenis Penjamin Pasien
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Penjamin / Metode Bayar <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.patientType}
                    onChange={(e) => setFormData({ ...formData, patientType: e.target.value })}
                    aria-label="Penjamin atau Metode Bayar"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                  >
                    <option value="BPJS">BPJS Kesehatan / KIS (Gratis)</option>
                    <option value="UMUM">Pasien Umum (Bayar Retribusi)</option>
                  </select>
                </div>

                {formData.patientType === "BPJS" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nomor Kartu BPJS / KIS <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="0001234567891 (13 digit)"
                      value={formData.bpjsNumber}
                      onChange={(e) => setFormData({ ...formData, bpjsNumber: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Keluhan Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan keluhan yang dirasakan, misal: batuk demam 3 hari..."
                  value={formData.complaint}
                  onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses Antrean...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar & Terbitkan Nomor Antrean</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Dengan mendaftar, Anda menyetujui data digunakan untuk administrasi pelayanan kesehatan di Puskesmas Cimanggung.
              </p>
            </div>
          </form>
        </div>
      ) : (
        /* TAB 2: CEK STATUS TIKET ANTREAN SAYA */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 max-w-xl mx-auto space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Cek Status & Lihat Tiket Antrean</h2>
            <p className="text-xs text-slate-500 mt-1">
              Masukkan 16 digit NIK atau Nomor Tiket (contoh: UMM-001) untuk melihat status panggilan antrean Anda hari ini.
            </p>
          </div>

          <form onSubmit={handleSearchTickets} className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan NIK atau No. Antrean..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden font-medium"
              required
            />
            <button
              type="submit"
              disabled={searching}
              className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-5 py-3 rounded-xl transition flex items-center gap-1.5 text-xs sm:text-sm disabled:opacity-70"
            >
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Cari</span>
            </button>
          </form>

          {searchError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{searchError}</span>
            </div>
          )}

          {searchedTickets.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hasil Pencarian ({searchedTickets.length} Tiket Ditemukan)
              </h3>
              {searchedTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-medical-600 font-mono">
                        {t.ticketNumber}
                      </span>
                      <p className="text-xs font-bold text-slate-800">{t.patientName}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        t.status === "DIPANGGIL"
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : t.status === "SELESAI"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 flex justify-between border-t border-slate-200/80 pt-2">
                    <span>
                      {t.poli.name} ({t.poli.roomNumber})
                    </span>
                    <span>Tgl: {t.appointmentDate}</span>
                  </div>

                  <button
                    onClick={() => setTicketResult(t)}
                    className="w-full text-center bg-medical-50 hover:bg-medical-100 text-medical-700 font-semibold py-2 rounded-xl text-xs border border-medical-200 transition"
                  >
                    Buka Kartu Tiket Lengkap & Cetak
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
