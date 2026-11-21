"use client";

import React, { useEffect, useState } from "react";
import { getClinicOperationalStatus } from "@/lib/utils";
import { Clock, ShieldCheck, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  detailed?: boolean;
  className?: string;
}

export default function StatusBadge({ detailed = false, className = "" }: StatusBadgeProps) {
  const [status, setStatus] = useState<ReturnType<typeof getClinicOperationalStatus> | null>(null);

  useEffect(() => {
    setStatus(getClinicOperationalStatus());
    const interval = setInterval(() => {
      setStatus(getClinicOperationalStatus());
    }, 60000); // perbarui tiap menit
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 animate-pulse ${className}`}>
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        Memuat status...
      </div>
    );
  }

  if (!detailed) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
          status.isOpen
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 ring-2 ring-emerald-500/10"
            : "bg-rose-50 text-rose-700 border border-rose-200/80 ring-2 ring-rose-500/10"
        } ${className}`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status.isOpen ? "bg-emerald-400" : "bg-rose-400"
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              status.isOpen ? "bg-emerald-500" : "bg-rose-500"
            }`}
          ></span>
        </span>
        <span>{status.isOpen ? "POLI SEDANG BUKA" : "POLI TUTUP"}</span>
        <span className="text-[11px] opacity-75 font-normal">| UGD 24 Jam Buka</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-4 border transition-all ${
        status.isOpen
          ? "bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-white border-emerald-200 shadow-sm"
          : "bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-white border-rose-200 shadow-sm"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status.isOpen ? "bg-emerald-400" : "bg-rose-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                status.isOpen ? "bg-emerald-500" : "bg-rose-500"
              }`}
            ></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold uppercase tracking-wider ${
                  status.isOpen ? "text-emerald-800" : "text-rose-800"
                }`}
              >
                {status.isOpen ? "Status Poli: Sedang Buka" : "Status Poli: Sedang Tutup"}
              </span>
              <span className="text-xs bg-white/80 border px-2 py-0.5 rounded-full font-medium text-slate-600">
                {status.dayName}, {status.currentTime}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">{status.statusMessage}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
          <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">
            UGD & Bersalin: <span className="text-rose-600 font-bold">SIAGA 24 JAM</span>
          </span>
        </div>
      </div>
    </div>
  );
}
