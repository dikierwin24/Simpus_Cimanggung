import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { PKM_INFO } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
  Baby,
  Smile,
  FlaskConical,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch real-time data dari database
  const [announcements, poliList, totalDoctors, todayQueuesCount] = await Promise.all([
    prisma.announcement.findMany({
      take: 3,
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    }),
    prisma.poli.findMany({
      where: { isActive: true },
      include: {
        doctors: { where: { isActive: true } },
      },
    }),
    prisma.doctor.count({ where: { isActive: true } }),
    prisma.queueTicket.count(),
  ]);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-hero-aurora pt-10 pb-18 lg:pt-16 lg:pb-24 border-b border-medical-200/60">
          {/* Modern dot grid & ambient glowing orbs */}
          <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none"></div>
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[420px] h-[420px] rounded-full bg-emerald-300/30 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[360px] h-[360px] rounded-full bg-teal-300/25 blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Realtime Operational Status Notice Bar */}
            <div className="mb-6 max-w-2xl">
              <StatusBadge detailed />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/85 backdrop-blur-sm text-medical-800 border border-medical-200 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-medical-600" />
                  <span>Portal Informasi Resmi • Dinas Kesehatan Kab. Sumedang</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                  Pelayanan Medis Prima,{" "}
                  <span className="bg-gradient-to-r from-medical-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Dekat & Nyaman
                  </span>{" "}
                  untuk Warga Cimanggung
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Selamat datang di portal resmi <strong>{PKM_INFO.name}</strong>. Akses jadwal praktik dokter secara real-time, daftar antrean poli dari rumah, serta informasi layanan kesehatan dan UGD 24 jam.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/antrean"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
                  >
                    <span>Ambil Nomor Antrean</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/jadwal"
                    className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-slate-800 font-bold px-5 py-3.5 rounded-2xl border border-medical-200 shadow-soft hover:border-medical-400 hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
                  >
                    <Calendar className="w-4 h-4 text-medical-600" />
                    <span>Jadwal Dokter & Poli</span>
                  </Link>

                  <a
                    href={`https://wa.me/${PKM_INFO.whatsapp}?text=Halo%20Admin%20Puskesmas%20Cimanggung`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-900 font-semibold px-4 py-3.5 rounded-2xl border border-emerald-300/70 transition text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Tanya Petugas</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-medical-200/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-medical-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold">BPJS & Pasien Umum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-medical-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold">UGD & Bersalin 24 Jam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-medical-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-semibold">Terakreditasi Paripurna</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Foto Gedung UPTD Puskesmas Cimanggung & Ringkasan */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative group">
                  {/* Photo Frame */}
                  <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white/95 ring-1 ring-medical-200/80 bg-medical-900 aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/gedung-puskesmas-cimanggung.jpg"
                      alt="Gedung UPTD Puskesmas Cimanggung Kabupaten Sumedang"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    {/* Gradient overlay bawah untuk teks caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    {/* Badge Akreditasi / Lokasi di pojok kiri atas */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-medical-900 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md border border-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-medical-600" />
                      <span>Puskesmas DTP • Rawat Inap & PONED</span>
                    </div>

                    {/* Caption Gedung di bagian bawah foto */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                      <div>
                        <p className="font-display text-base sm:text-lg font-extrabold leading-tight">
                          Gedung UPTD Puskesmas Cimanggung
                        </p>
                        <p className="text-[11px] sm:text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          <span>Jl. Raya Parakanmuncang - Simpang No. 209, Sindangpakuon</span>
                        </p>
                      </div>
                      <Link
                        href="/kontak"
                        className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl transition shrink-0 self-start sm:self-auto"
                      >
                        <span>Lihat Peta</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Info Strip Ringkasan Layanan di Bawah Foto Gedung */}
                <div className="glass-card rounded-2xl p-4 shadow-card border border-white/90 ring-1 ring-medical-200/70 grid grid-cols-3 gap-3 text-center sm:text-left">
                  <div className="bg-white/90 p-3 rounded-xl border border-medical-100">
                    <span className="text-[11px] text-slate-500 font-semibold block">Unit Poli</span>
                    <span className="font-display text-lg sm:text-xl font-black text-slate-900">{poliList.length} Layanan</span>
                    <span className="text-[10px] text-medical-600 font-bold block">Rawat Jalan & UGD</span>
                  </div>
                  <div className="bg-white/90 p-3 rounded-xl border border-medical-100">
                    <span className="text-[11px] text-slate-500 font-semibold block">Tenaga Medis</span>
                    <span className="font-display text-lg sm:text-xl font-black text-slate-900">{totalDoctors} Nakes</span>
                    <span className="text-[10px] text-teal-600 font-bold block">Dokter & Bidan Siaga</span>
                  </div>
                  <div className="bg-gradient-to-br from-medical-50 to-emerald-50 p-3 rounded-xl border border-medical-200/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-medical-700 font-bold block">Program CKG</span>
                      <span className="font-display text-sm sm:text-base font-extrabold text-slate-900 leading-tight block mt-0.5">
                        Cek Gratis
                      </span>
                    </div>
                    <Link
                      href="/alur-layanan"
                      className="text-[10px] font-bold text-medical-700 hover:text-medical-800 inline-flex items-center justify-center sm:justify-start gap-0.5 mt-1"
                    >
                      <span>Info & Alur</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Strip Info Instansi Portal Web Informasi */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-soft flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-medical-100 text-medical-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 block">Kepala Puskesmas</span>
                  <p className="font-display text-sm font-bold text-slate-900 truncate">{PKM_INFO.headOfClinic}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-soft flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 block">Wilayah Binaan</span>
                  <p className="font-display text-sm font-bold text-slate-900">{PKM_INFO.workingAreas.length} Desa di Kec. Cimanggung</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-soft flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 block">Loket Pendaftaran</span>
                  <p className="font-display text-sm font-bold text-slate-900">Senin – Sabtu, 07:30 WIB</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/90 shadow-soft flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 block">Hotline UGD & Ambulans</span>
                  <p className="font-display text-sm font-bold text-rose-700">{PKM_INFO.emergencyPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LAYANAN UNGGULAN SECTION */}
        <section className="py-16 bg-white/75 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-medical-700 bg-medical-50 px-3.5 py-1 rounded-full border border-medical-200">
                Layanan Terpadu
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
                Poli & Pelayanan Kesehatan Masyarakat
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Fasilitas pelayanan kesehatan tingkat pertama (FKTP) lengkap dengan tenaga medis berpengalaman dan peralatan standar Kemenkes RI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {poliList.map((poli) => (
                <div
                  key={poli.id}
                  className="group bg-white/95 rounded-2xl p-6 border border-medical-100/90 hover:border-medical-300 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-medical-50 text-medical-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-medical-600 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-glow transition-all duration-300">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold bg-medical-50/70 text-medical-800 px-2.5 py-1 rounded-lg border border-medical-100">
                        {poli.roomNumber}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-medical-700 transition">
                      {poli.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {poli.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Kuota: <strong className="text-slate-700">{poli.quotaPerDay} Pasien/Hari</strong>
                    </span>
                    <Link
                      href={`/antrean?poli=${poli.id}`}
                      className="font-bold text-medical-600 hover:text-medical-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition"
                    >
                      <span>Daftar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALUR PELAYANAN RINGKAS */}
        <section className="py-16 bg-health-mesh border-y border-medical-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-medical-700 bg-white/90 px-3.5 py-1 rounded-full border border-medical-200 shadow-xs">
                Mudah & Cepat
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
                Alur Berobat di Puskesmas Cimanggung
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Panduan praktis berobat mulai dari pengambilan nomor antrean hingga pengambilan obat di apotek.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Ambil Antrean Online",
                  desc: "Daftar lewat website ini dari rumah untuk mendapatkan nomor tiket digital dan estimasi kedatangan.",
                },
                {
                  step: "02",
                  title: "Verifikasi di Loket",
                  desc: "Tunjukkan nomor antrean digital kepada petugas loket bersama KTP/KK dan Kartu BPJS (jika ada).",
                },
                {
                  step: "03",
                  title: "Pemeriksaan di Poli",
                  desc: "Pemeriksaan medis tanda-tanda vital oleh perawat & konsultasi langsung dengan dokter jaga.",
                },
                {
                  step: "04",
                  title: "Farmasi & Konseling",
                  desc: "Mengambil obat yang diresepkan di apotek Puskesmas disertai penjelasan pemakaian dari apoteker.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-white/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="font-display text-4xl font-black bg-gradient-to-br from-medical-500 to-teal-300 bg-clip-text text-transparent block mb-2">
                    {item.step}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/alur-layanan"
                className="inline-flex items-center gap-2 text-sm font-bold text-medical-700 hover:text-medical-800 bg-white/95 border border-medical-200 px-5 py-2.5 rounded-xl shadow-soft hover:shadow-card transition"
              >
                <span>Lihat Panduan Lengkap Syarat BPJS & Jam Loket</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* PENGUMUMAN & EDUKASI KESEHATAN TERKINI */}
        <section className="py-16 bg-white/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-medical-700 bg-medical-50 px-3.5 py-1 rounded-full border border-medical-200">
                  Papan Informasi
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
                  Pengumuman & Info Kesehatan Terkini
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Kabar seputar program kesehatan, vaksinasi, posyandu, dan agenda di Kecamatan Cimanggung.
                </p>
              </div>
              <Link
                href="/pengumuman"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-medical-600 hover:text-medical-700"
              >
                <span>Lihat Semua Pengumuman</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((item) => (
                <article
                  key={item.id}
                  className="bg-white/95 rounded-2xl border border-medical-100/90 hover:border-medical-300 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-medical-50 text-medical-700 font-bold px-2.5 py-0.5 rounded-full border border-medical-200">
                        {item.category}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-slate-900 text-base leading-snug hover:text-medical-600 transition">
                      <Link href={`/pengumuman/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium truncate max-w-[150px]">
                      {item.author}
                    </span>
                    <Link
                      href={`/pengumuman/${item.slug}`}
                      className="font-bold text-medical-600 hover:text-medical-700 inline-flex items-center gap-1"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION DARURAT & LOKASI */}
        <section className="py-16 bg-gradient-to-r from-emerald-900 via-medical-700 to-teal-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Kesehatan Anda dan Keluarga Adalah Prioritas Kami
            </h2>
            <p className="text-sm sm:text-base text-medical-100 max-w-2xl mx-auto leading-relaxed">
              Jangan tunda pemeriksaan kesehatan. Segera kunjungi Puskesmas Cimanggung atau ambil nomor antrean sekarang untuk menghindari antrean panjang di loket.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/antrean"
                className="bg-white text-medical-800 hover:bg-medical-50 font-bold px-6 py-3.5 rounded-2xl shadow-elevated hover:-translate-y-0.5 transition text-sm"
              >
                Ambil Antrean Online Sekarang
              </Link>
              <Link
                href="/kontak"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-6 py-3.5 rounded-2xl transition text-sm"
              >
                Lihat Denah & Kontak Puskesmas
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
