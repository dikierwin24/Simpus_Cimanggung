import React from "react";
import Link from "next/link";
import { PKM_INFO } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  Heart,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-medical-950 to-slate-950 text-slate-300 pt-16 pb-8 border-t border-medical-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Callout Card */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-rose-900/20 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
              <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Layanan Darurat & Ambulans 24 Jam
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Butuh Penanganan Medis Mendesak?</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
                UGD dan ruang bersalin (PONED) Puskesmas Cimanggung selalu siaga setiap saat tanpa libur. Hubungi nomor siaga darurat kami untuk respon cepat.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${PKM_INFO.emergencyPhone.replace(/[^0-9]/g, "")}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-white text-rose-700 hover:bg-rose-50 font-bold px-5 py-3 rounded-xl shadow-md transition text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{PKM_INFO.emergencyPhone}</span>
            </a>
            <a
              href={`https://wa.me/${PKM_INFO.whatsapp}?text=Halo%20Puskesmas%20Cimanggung,%20saya%20membutuhkan%20informasi%20layanan%20medis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl shadow-md transition text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Siaga</span>
            </a>
          </div>
        </div>

        {/* 4 Columns Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Identity & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-medical-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                C
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base tracking-tight">UPTD PUSKESMAS CIMANGGUNG</h4>
                <p className="text-[11px] text-slate-400">Dinas Kesehatan Kab. Sumedang</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Puskesmas Dengan Tempat Perawatan (DTP) yang berkomitmen melayani masyarakat Kecamatan Cimanggung dengan profesional, ramah, dan prima.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1">Kepala Puskesmas:</span>
              <p className="text-xs text-medical-400 font-bold">{PKM_INFO.headOfClinic}</p>
              <p className="text-[10px] text-slate-500">NIP. {PKM_INFO.nipHead}</p>
            </div>
          </div>

          {/* Col 2: Jam Operasional */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-medical-400" />
              Jam Pelayanan
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Senin – Kamis</span>
                <span className="font-semibold text-slate-200">07:30 – 14:00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Jumat</span>
                <span className="font-semibold text-slate-200">07:30 – 11:00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Sabtu</span>
                <span className="font-semibold text-slate-200">07:30 – 12:30 WIB</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Minggu (Poli)</span>
                <span className="font-semibold text-rose-400">Tutup</span>
              </li>
              <li className="flex justify-between pt-1">
                <span className="text-rose-400 font-bold">UGD & Persalinan</span>
                <span className="font-extrabold text-emerald-400">24 Jam Penuh</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Wilayah Binaan */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              11 Desa Binaan
            </h4>
            <p className="text-xs text-slate-400 mb-2">Wilayah Kerja Puskesmas Cimanggung:</p>
            <div className="flex flex-wrap gap-1.5">
              {PKM_INFO.workingAreas.map((desa) => (
                <span
                  key={desa}
                  className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                >
                  {desa}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
              <Link href="/jadwal" className="text-medical-400 hover:text-medical-300 font-medium inline-flex items-center gap-1">
                Lihat Jadwal Dokter Hari Ini <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 4: Alamat & Kontak Lengkap */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-medical-400" />
              Alamat & Kontak
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="leading-relaxed">
                {PKM_INFO.address}
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-medical-400 shrink-0" />
                  <span>Telepon: {PKM_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-medical-400 shrink-0" />
                  <span>{PKM_INFO.email}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={PKM_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-medical-400 hover:text-medical-300 font-semibold"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} UPTD Puskesmas Cimanggung - Kabupaten Sumedang. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Dedikasi Pelayanan Kesehatan Masyarakat Jawa Barat</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
