import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import AntreanClientView from "./AntreanClientView";

export const dynamic = "force-dynamic";

export default async function AntreanPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const defaultPoliId = typeof searchParams.poli === "string" ? searchParams.poli : undefined;

  const polis = await prisma.poli.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-health-mesh">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-medical-600 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
              Layanan Mandiri Warga
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Pendaftaran Antrean Poli Online
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Daftar kunjungan dari rumah, dapatkan tiket antrean digital, dan datang langsung ke loket verifikasi tanpa perlu antre sejak subuh.
            </p>
          </div>

          <AntreanClientView polis={polis} defaultPoliId={defaultPoliId} />
        </div>
      </main>

      <Footer />
    </>
  );
}
