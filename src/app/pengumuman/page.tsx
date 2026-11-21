import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Calendar, User, ArrowRight, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PengumumanPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-medical-600 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
              Pusat Informasi Warga
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Pengumuman, Program Kesehatan & Berita Cimanggung
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Dapatkan berita terbaru seputar imunisasi posyandu balita, program Cek Kesehatan Gratis (CKG), edukasi pencegahan DBD, dan agenda pelayanan Puskesmas Cimanggung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-medical-300 shadow-soft hover:shadow-card transition duration-200 p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-medical-50 text-medical-700 font-bold px-2.5 py-0.5 rounded-full border border-medical-200">
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 leading-snug hover:text-medical-600 transition">
                    <Link href={`/pengumuman/${item.slug}`}>{item.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium truncate max-w-[150px]">
                    {item.author}
                  </span>
                  <Link
                    href={`/pengumuman/${item.slug}`}
                    className="font-bold text-medical-600 hover:text-medical-700 inline-flex items-center gap-1 group"
                  >
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
