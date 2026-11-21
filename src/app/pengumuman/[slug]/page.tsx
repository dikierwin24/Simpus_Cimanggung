import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { FALLBACK_ANNOUNCEMENTS } from "@/lib/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Tag, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PengumumanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let item: any = null;

  try {
    item = await prisma.announcement.findUnique({
      where: { slug: params.slug },
    });
  } catch (err) {
    console.warn("[PengumumanDetailPage] Database unavailable, looking up fallback data:", err);
  }

  if (!item) {
    item = FALLBACK_ANNOUNCEMENTS.find((a) => a.slug === params.slug);
  }

  if (!item) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-medical-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Pengumuman</span>
          </Link>

          <article className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 space-y-6">
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-medical-50 text-medical-700 text-xs font-bold px-3 py-1 rounded-full border border-medical-200">
                  {item.category}
                </span>
                {item.isPinned && (
                  <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    Pengumuman Penting
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-medical-500" />
                  {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-medical-500" />
                  {item.author}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {item.content}
            </div>

            {/* Footer card */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Diterbitkan secara resmi oleh UPTD Puskesmas Cimanggung, Kab. Sumedang
              </div>
              <Link
                href="/antrean"
                className="inline-flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
              >
                <span>Daftar Antrean Terkait</span>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
