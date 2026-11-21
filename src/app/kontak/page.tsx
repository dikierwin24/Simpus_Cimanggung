import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PKM_INFO } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldAlert,
  MessageCircle,
  ExternalLink,
  Navigation,
  Building2,
} from "lucide-react";

export default function KontakPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-medical-700 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
              Hubungi Kami
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Kontak, Hotline Darurat & Lokasi Puskesmas Cimanggung
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Kami siap melayani kebutuhan informasi dan penanganan darurat medis masyarakat Kecamatan Cimanggung selama 24 jam setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Emergency Hotline Card */}
              <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-900/15">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-white/20 rounded-xl">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-rose-200">
                      Panggilan Cepat 24 Jam
                    </span>
                    <h2 className="text-lg font-black">UGD & Ambulans Darurat</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${PKM_INFO.emergencyPhone.replace(/[^0-9]/g, "")}`}
                    className="w-full bg-white text-rose-700 hover:bg-rose-50 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-base shadow-md transition"
                  >
                    <Phone className="w-5 h-5 text-rose-600" />
                    <span>{PKM_INFO.emergencyPhone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${PKM_INFO.whatsapp}?text=Lapor%20keadaan%20darurat%20medis%20di%20Cimanggung`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Ambulans & UGD</span>
                  </a>
                </div>
              </div>

              {/* Office & Admin Contacts */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Informasi & Administrasi Puskesmas
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-medical-50 text-medical-600 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Alamat Puskesmas:</span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{PKM_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-medical-50 text-medical-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Telepon Kantor / Loket:</span>
                      <p className="text-slate-600 mt-0.5">{PKM_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-medical-50 text-medical-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Email Resmi:</span>
                      <p className="text-slate-600 mt-0.5">{PKM_INFO.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-medical-50 text-medical-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Waktu Pelayanan Loket:</span>
                      <p className="text-slate-600 mt-0.5">Senin - Sabtu mulai 07:30 WIB (Poli s/d selesai)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Areas */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                  Wilayah Kerja Pelayanan ({PKM_INFO.workingAreas.length} Desa)
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PKM_INFO.workingAreas.map((d) => (
                    <span
                      key={d}
                      className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60 font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Map */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-medical-600" />
                    <h3 className="font-bold text-slate-900 text-base">Lokasi di Peta</h3>
                  </div>
                  <a
                    href={PKM_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-medical-600 hover:text-medical-700 bg-medical-50 hover:bg-medical-100 px-3 py-1.5 rounded-xl border border-medical-200 transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video w-full bg-slate-100 relative">
                  <iframe
                    title="Peta Puskesmas Cimanggung"
                    src={PKM_INFO.mapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[380px]"
                  ></iframe>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Patokan Lokasi:</strong> Berada di jalur utama Parakanmuncang - Simpang No. 209, Desa Sindangpakuon, mudah diakses angkutan umum dari arah Rancaekek, Parakanmuncang, maupun Tanjungsari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
