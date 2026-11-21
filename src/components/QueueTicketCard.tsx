"use client";

import React, { useRef } from "react";
import {
  Printer,
  Share2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Phone,
  QrCode,
  AlertTriangle,
} from "lucide-react";
import { PKM_INFO } from "@/lib/constants";
import { formatDateIndo } from "@/lib/utils";

export interface TicketData {
  id: string;
  ticketNumber: string;
  patientName: string;
  nik: string;
  phone: string;
  patientType: string;
  bpjsNumber?: string | null;
  appointmentDate: string;
  poli: {
    name: string;
    code: string;
    roomNumber: string;
  };
  status: string;
  complaint?: string | null;
  createdAt: string | Date;
}

interface Props {
  ticket: TicketData;
  onReset?: () => void;
}

export default function QueueTicketCard({ ticket, onReset }: Props) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(
      `*TIKET ANTREAN ONLINE PUSKESMAS CIMANGGUNG*\n\n` +
      `No. Antrean: *${ticket.ticketNumber}*\n` +
      `Nama: ${ticket.patientName}\n` +
      `Poli Tujuan: ${ticket.poli.name} (${ticket.poli.roomNumber})\n` +
      `Tanggal: ${formatDateIndo(ticket.appointmentDate)}\n` +
      `Jenis Pasien: ${ticket.patientType}\n` +
      `Status: ${ticket.status}\n\n` +
      `_Harap hadir 15 menit sebelum loket pelayanan dimulai dan tunjukkan pesan/tiket ini kepada petugas loket._`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Mask NIK untuk privasi (e.g. 321105******0001)
  const maskedNik =
    ticket.nik.length >= 16
      ? `${ticket.nik.substring(0, 6)}******${ticket.nik.substring(12)}`
      : ticket.nik;

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Action buttons (hidden on print) */}
      <div className="no-print flex items-center justify-between gap-2">
        <button
          onClick={handlePrint}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / PDF</span>
        </button>
        <button
          onClick={shareViaWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition"
        >
          <Share2 className="w-4 h-4" />
          <span>Kirim WhatsApp</span>
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="px-3 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium transition"
          >
            Daftar Lagi
          </button>
        )}
      </div>

      {/* Ticket Body */}
      <div
        id="printable-ticket"
        ref={ticketRef}
        className="bg-white rounded-2xl border-2 border-dashed border-medical-300 p-6 shadow-card relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="text-center pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 text-medical-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-medical-600" />
            <span>{PKM_INFO.name}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-800">KARTU BUKTI ANTREAN ONLINE</h2>
          <p className="text-[11px] text-slate-500">{PKM_INFO.address}</p>
        </div>

        {/* Big Ticket Number Banner */}
        <div className="my-5 text-center bg-medical-50 border border-medical-200 rounded-xl py-4 px-2">
          <span className="text-xs font-bold tracking-wider text-medical-700 uppercase">
            Nomor Antrean Anda
          </span>
          <div className="text-4xl sm:text-5xl font-black text-medical-600 tracking-tight my-1">
            {ticket.ticketNumber}
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1 rounded-full border border-medical-200">
            <span>{ticket.poli.name}</span>
            <span className="text-medical-600 font-bold">({ticket.poli.roomNumber})</span>
          </div>
        </div>

        {/* Patient Details */}
        <div className="space-y-2.5 text-xs border-b border-slate-200 pb-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Nama Pasien:</span>
            <span className="font-bold text-slate-800 uppercase">{ticket.patientName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">NIK:</span>
            <span className="font-mono font-medium text-slate-700">{maskedNik}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Penjamin / Pembayaran:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                ticket.patientType === "BPJS"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {ticket.patientType} {ticket.bpjsNumber ? `(${ticket.bpjsNumber})` : ""}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Tanggal Kunjungan:</span>
            <span className="font-semibold text-slate-800">
              {formatDateIndo(ticket.appointmentDate)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Status Saat Ini:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="pt-4 space-y-2">
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-[11px] text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Mohon hadir 15 menit sebelum loket dimulai (Pk 07:30 WIB) dan tunjukkan kartu ini / nomor antrean ke petugas loket pendaftaran.
            </p>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2">
            <span>Diterbitkan: {new Date(ticket.createdAt).toLocaleString("id-ID")}</span>
            <span className="font-mono">PKM-CMG-{ticket.id.slice(-6).toUpperCase()}</span>
          </div>
        </div>

        {/* Decorative corner cutouts */}
        <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-50 rounded-full border-r border-medical-300"></div>
        <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-50 rounded-full border-l border-medical-300"></div>
      </div>
    </div>
  );
}
