import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puskesmas Cimanggung - Kabupaten Sumedang",
  description:
    "Sistem Informasi Resmi UPTD Puskesmas Cimanggung, Dinas Kesehatan Kabupaten Sumedang. Jadwal dokter, antrean online, jam pelayanan, dan layanan UGD 24 Jam.",
  keywords: [
    "Puskesmas Cimanggung",
    "Sumedang",
    "Jadwal Dokter Puskesmas",
    "Antrean Online Puskesmas",
    "Dinas Kesehatan Sumedang",
    "UGD 24 Jam Cimanggung",
    "Poli Umum Cimanggung",
  ],
  authors: [{ name: "Puskesmas Cimanggung" }],
  openGraph: {
    title: "Puskesmas Cimanggung - Melayani Dengan Hati dan Senyuman",
    description: "Sistem Informasi & Pendaftaran Antrean Online Puskesmas Cimanggung Kab. Sumedang",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans min-h-screen flex flex-col text-slate-800">
        {children}
      </body>
    </html>
  );
}
