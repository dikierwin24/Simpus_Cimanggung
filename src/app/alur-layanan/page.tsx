import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { PKM_INFO } from "@/lib/constants";
import {
  Clock,
  FileCheck2,
  AlertCircle,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Phone,
  ArrowRight,
  UserCheck,
  Layers,
  HeartPulse,
  CreditCard,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function AlurLayananPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-medical-600 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
              Informasi Pelayanan
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Jam Kerja & Alur Pelayanan Pasien Puskesmas Cimanggung
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Panduan lengkap waktu operasional loket pendaftaran, jam praktik poli rawat jalan, syarat berkas pasien BPJS maupun Umum, serta tahapan berobat yang tertib dan nyaman.
            </p>
          </div>

          {/* Real-time Status Card */}
          <StatusBadge detailed />

          {/* SECTION 1: TABEL JAM OPERASIONAL LOKET VS POLI */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Rincian Jam Buka Loket & Pelayanan Poli</h2>
                <p className="text-xs text-slate-500">Perhatikan perbedaan jam tutup loket dan jam selesai poli</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-bold">Hari</th>
                    <th className="py-3.5 px-4 font-bold">Jam Buka Loket Pendaftaran</th>
                    <th className="py-3.5 px-4 font-bold">Jam Pelayanan Poli Rawat Jalan</th>
                    <th className="py-3.5 px-4 font-bold">UGD & PONED (Persalinan)</th>
                    <th className="py-3.5 px-4 font-bold">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Senin – Kamis</td>
                    <td className="py-3 px-4 font-mono font-semibold text-medical-700">07:30 – 11:30 WIB</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">08:00 – 14:00 WIB</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-600">24 Jam Penuh</td>
                    <td className="py-3 px-4 text-slate-500">Pelayanan seluruh poli lengkap</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Jumat</td>
                    <td className="py-3 px-4 font-mono font-semibold text-medical-700">07:30 – 10:00 WIB</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">08:00 – 11:00 WIB</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-600">24 Jam Penuh</td>
                    <td className="py-3 px-4 text-slate-500">Pelayanan lebih singkat (ibadah Shalat Jumat)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Sabtu</td>
                    <td className="py-3 px-4 font-mono font-semibold text-medical-700">07:30 – 11:00 WIB</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">08:00 – 12:30 WIB</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-600">24 Jam Penuh</td>
                    <td className="py-3 px-4 text-slate-500">Poli Umum, KIA & Laboratorium siaga</td>
                  </tr>
                  <tr className="bg-rose-50/30">
                    <td className="py-3 px-4 font-bold text-rose-800">Minggu & Hari Libur</td>
                    <td className="py-3 px-4 font-mono text-rose-600 font-semibold">TUTUP</td>
                    <td className="py-3 px-4 font-mono text-rose-600 font-semibold">TUTUP</td>
                    <td className="py-3 px-4 font-black text-rose-700">SIAGA 24 JAM</td>
                    <td className="py-3 px-4 text-rose-700 font-medium">Khusus keadaan darurat & ibu bersalin</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Catatan Penting:</strong> Pasien diharapkan hadir di loket pendaftaran tepat waktu sesuai jam operasional (paling lambat 30 menit sebelum loket tutup) agar berkas rekam medis dapat diproses dengan baik.
              </p>
            </div>
          </section>

          {/* SECTION 2: ALUR LANGKAH BEROBAT (DIAGRAM VISUAL) */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Alur Berobat Pasien Rawat Jalan</h2>
                <p className="text-xs text-slate-500">5 Tahapan mudah dari kedatangan hingga obat siap dibawa pulang</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                {
                  step: "1",
                  title: "Pendaftaran / Loket",
                  desc: "Ambil nomor antrean di mesin loket, serahkan KTP/BPJS ke petugas loket untuk verifikasi dan pencarian rekam medis.",
                  color: "border-sky-300 bg-sky-50/50",
                  tag: "Loket 1 & 2",
                },
                {
                  step: "2",
                  title: "Pemeriksaan Awal (Triage)",
                  desc: "Perawat melakukan penimbangan berat badan, pengukuran tinggi badan, tensi darah, suhu tubuh, dan identifikasi keluhan.",
                  color: "border-teal-300 bg-teal-50/50",
                  tag: "Ruang Tensi",
                },
                {
                  step: "3",
                  title: "Konsultasi Dokter",
                  desc: "Pemeriksaan medis mendalam di poli tujuan oleh dokter. Pasien dapat berkonsultasi mengenai keluhan dan riwayat penyakit.",
                  color: "border-indigo-300 bg-indigo-50/50",
                  tag: "Ruang Poli",
                },
                {
                  step: "4",
                  title: "Tindakan / Lab (Opsional)",
                  desc: "Jika diperlukan pemeriksaan penunjang (darah, urine) atau tindakan medis lanjutan, pasien diarahkan ke Lab / Ruang Tindakan.",
                  color: "border-amber-300 bg-amber-50/50",
                  tag: "Laboratorium",
                },
                {
                  step: "5",
                  title: "Apotek / Farmasi",
                  desc: "Penyerahan resep obat. Apoteker menyiapkan obat dan memberikan penjelasan dosis serta aturan pakai kepada pasien.",
                  color: "border-emerald-300 bg-emerald-50/50",
                  tag: "Loket Farmasi",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-5 flex flex-col justify-between relative shadow-xs ${item.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-full bg-medical-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: SYARAT PENDAFTARAN PASIEN */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Persyaratan Berkas Pendaftaran Pasien</h2>
                <p className="text-xs text-slate-500">Siapkan dokumen berikut sebelum mendaftar di loket</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pasien BPJS */}
              <div className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm">Pasien BPJS Kesehatan</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Kartu BPJS Kesehatan / KIS asli atau digital (aplikasi Mobile JKN).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>KTP Asli / Fotokopi (atau Kartu Keluarga bagi anak di bawah 17 thn).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Pastikan Faskes Tingkat Pertama (FKTP) terdaftar di <strong>Puskesmas Cimanggung</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Gratis 100% tanpa biaya pendaftaran maupun obat.</span>
                  </li>
                </ul>
              </div>

              {/* Pasien Umum */}
              <div className="border border-sky-200 bg-sky-50/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-medical-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm">Pasien Pasien Umum</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
                    <span>Kartu Tanda Penduduk (KTP) atau Kartu Keluarga.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
                    <span>Kartu Berobat Puskesmas Cimanggung (jika pasien lama).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
                    <span>Biaya retribusi pelayanan sesuai Perda Retribusi Kabupaten Sumedang.</span>
                  </li>
                </ul>
              </div>

              {/* Pasien Bayi/Balita & Ibu Hamil */}
              <div className="border border-pink-200 bg-pink-50/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-pink-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm">Poli KIA, Balita & Imunisasi</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span><strong>Buku KIA (Buku Pink)</strong> wajib dibawa saat kunjungan imunisasi/ANC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span>Fotokopi Kartu Keluarga (KK) & KTP orang tua.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span>Kartu BPJS anak atau BPJS Ibu (untuk bayi baru lahir).</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Bottom CTA */}
          <div className="bg-gradient-to-r from-medical-700 via-medical-600 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Ingin Tahu Dokter yang Bertugas Hari Ini?</h3>
              <p className="text-xs text-white/90 mt-1 max-w-xl">
                Cek jadwal praktik dokter dan tenaga medis yang sedang bertugas di setiap poli rawat jalan Puskesmas Cimanggung.
              </p>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 bg-white text-medical-700 hover:bg-medical-50 font-bold px-6 py-3 rounded-xl shadow-md transition text-xs sm:text-sm whitespace-nowrap"
            >
              <span>Lihat Jadwal Dokter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
