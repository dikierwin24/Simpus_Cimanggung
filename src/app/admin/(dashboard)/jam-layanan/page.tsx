import React from "react";
import { prisma } from "@/lib/prisma";
import AdminJamManager from "./AdminJamManager";

export const dynamic = "force-dynamic";

const DEFAULT_HOURS = [
  { id: "1", dayOfWeek: 1, dayName: "Senin", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler seluruh poli" },
  { id: "2", dayOfWeek: 2, dayName: "Selasa", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & konsultasi gizi" },
  { id: "3", dayOfWeek: 3, dayName: "Rabu", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & imunisasi rutin" },
  { id: "4", dayOfWeek: 4, dayName: "Kamis", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan Prolanis & Cek Kesehatan Gratis" },
  { id: "5", dayOfWeek: 5, dayName: "Jumat", loketOpen: "07:30", loketClose: "10:00", serviceOpen: "08:00", serviceClose: "11:00", isClosed: false, isUgd24H: true, notes: "Waktu pelayanan disesuaikan ibadah Shalat Jumat" },
  { id: "6", dayOfWeek: 6, dayName: "Sabtu", loketOpen: "07:30", loketClose: "11:00", serviceOpen: "08:00", serviceClose: "12:30", isClosed: false, isUgd24H: true, notes: "Pelayanan poli umum, KIA & laboratorium" },
  { id: "7", dayOfWeek: 7, dayName: "Minggu", loketOpen: "-", loketClose: "-", serviceOpen: "-", serviceClose: "-", isClosed: true, isUgd24H: true, notes: "Poli rawat jalan tutup. UGD & PONED siaga 24 Jam." },
];

export default async function AdminJamLayananPage() {
  let hours: any[] = DEFAULT_HOURS;
  try {
    const dbHours = await prisma.operationalHour.findMany({
      orderBy: { dayOfWeek: "asc" },
    });
    if (dbHours && dbHours.length > 0) hours = dbHours;
  } catch (err) {
    console.warn("[AdminJamLayananPage] Database unavailable, using default hours:", err);
  }

  return (
    <div className="space-y-6">
      <AdminJamManager initialHours={hours} />
    </div>
  );
}
