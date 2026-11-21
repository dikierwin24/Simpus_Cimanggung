import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateIndo(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Menghitung status buka/tutup puskesmas berdasarkan waktu lokal Jawa Barat (WIB)
export function getClinicOperationalStatus() {
  const now = new Date();
  // WIB adalah UTC+7
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wibTime = new Date(utc + 3600000 * 7);

  const dayOfWeek = wibTime.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  const hours = wibTime.getHours();
  const minutes = wibTime.getMinutes();
  const currentTimeVal = hours * 60 + minutes;

  // Jadwal Pelayanan Poli:
  // Senin - Kamis: 07.30 - 14.00 (7*60+30 = 450 s/d 14*60 = 840)
  // Jumat: 07.30 - 11.00 (450 s/d 660)
  // Sabtu: 07.30 - 12.30 (450 s/d 750)
  // Minggu: Tutup (Hanya UGD 24 Jam)

  let isOpen = false;
  let closingTime = "";
  let openingTime = "07:30 WIB";
  let statusMessage = "";

  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    // Senin - Kamis
    if (currentTimeVal >= 450 && currentTimeVal < 840) {
      isOpen = true;
      closingTime = "14:00 WIB";
      statusMessage = "Pelayanan Rawat Jalan & Poli Buka s/d 14:00 WIB";
    } else if (currentTimeVal < 450) {
      isOpen = false;
      statusMessage = "Loket Pendaftaran Buka Pukul 07:30 WIB";
    } else {
      isOpen = false;
      statusMessage = "Poli Rawat Jalan Sudah Tutup. UGD & PONED 24 Jam Tetap Siaga";
    }
  } else if (dayOfWeek === 5) {
    // Jumat
    if (currentTimeVal >= 450 && currentTimeVal < 660) {
      isOpen = true;
      closingTime = "11:00 WIB";
      statusMessage = "Pelayanan Poli Buka s/d 11:00 WIB (Persiapan Shalat Jumat)";
    } else {
      isOpen = false;
      statusMessage = "Poli Rawat Jalan Tutup. UGD & PONED 24 Jam Siaga";
    }
  } else if (dayOfWeek === 6) {
    // Sabtu
    if (currentTimeVal >= 450 && currentTimeVal < 750) {
      isOpen = true;
      closingTime = "12:30 WIB";
      statusMessage = "Pelayanan Akhir Pekan Buka s/d 12:30 WIB";
    } else {
      isOpen = false;
      statusMessage = "Poli Rawat Jalan Tutup. UGD 24 Jam Tetap Buka";
    }
  } else {
    // Minggu
    isOpen = false;
    statusMessage = "Poli Tutup Hari Minggu. UGD & Ruang Bersalin (PONED) 24 Jam Tetap Siaga";
  }

  const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} WIB`;

  return {
    isOpen,
    closingTime,
    openingTime,
    statusMessage,
    currentTime: timeString,
    isUgdOpen: true, // UGD 24 Jam selalu buka
    dayName: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][dayOfWeek],
  };
}
