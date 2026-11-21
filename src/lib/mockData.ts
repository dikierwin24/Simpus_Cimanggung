export interface FallbackDoctor {
  id: string;
  name: string;
  nip?: string | null;
  sip?: string | null;
  specialization: string;
  poliId: string;
  phone?: string | null;
  photoUrl?: string | null;
  isActive: boolean;
}

export interface FallbackPoli {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  quotaPerDay: number;
  roomNumber: string;
  isActive: boolean;
  doctors?: FallbackDoctor[];
}

export interface FallbackSchedule {
  id: string;
  doctorId: string;
  poliId: string;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string | null;
  doctor: FallbackDoctor;
  poli: FallbackPoli;
}

export interface FallbackAnnouncement {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  isPinned: boolean;
  author: string;
  publishedAt: Date;
  viewCount: number;
}

export const FALLBACK_POLIS: FallbackPoli[] = [
  {
    id: "poli-1",
    name: "Poli Umum",
    code: "UMM",
    description: "Pemeriksaan kesehatan umum, diagnosis medis, pengobatan, dan rujukan tingkat lanjut untuk masyarakat umum dan lansia.",
    icon: "Stethoscope",
    quotaPerDay: 80,
    roomNumber: "Ruang 01",
    isActive: true,
  },
  {
    id: "poli-2",
    name: "Poli Gigi & Mulut",
    code: "GIG",
    description: "Pelayanan kesehatan gigi, penambalan, pencabutan gigi susu dan dewasa, serta pembersihan karang gigi.",
    icon: "Smile",
    quotaPerDay: 30,
    roomNumber: "Ruang 02",
    isActive: true,
  },
  {
    id: "poli-3",
    name: "Poli KIA / KB & USG",
    code: "KIA",
    description: "Pemeriksaan ibu hamil (ANC), USG dasar kehamilan, pelayanan KB (Suntik, Implan, IUD), dan pasca persalinan.",
    icon: "Baby",
    quotaPerDay: 40,
    roomNumber: "Ruang 03",
    isActive: true,
  },
  {
    id: "poli-4",
    name: "Poli MTBS & Imunisasi Anak",
    code: "ANK",
    description: "Manajemen Terpadu Balita Sakit, pemantauan tumbuh kembang anak, dan imunisasi rutin lengkap bayi & balita.",
    icon: "ShieldCheck",
    quotaPerDay: 40,
    roomNumber: "Ruang 04",
    isActive: true,
  },
  {
    id: "poli-5",
    name: "Laboratorium",
    code: "LAB",
    description: "Pemeriksaan darah lengkap, tes urine rutin, gula darah sewaktu/puasa, kolesterol, asam urat, HIV/Sifilis/Hepatitis, dan tes dahak TB.",
    icon: "FlaskConical",
    quotaPerDay: 50,
    roomNumber: "Ruang 05",
    isActive: true,
  },
  {
    id: "poli-6",
    name: "Poli Konsultasi Gizi & CKG",
    code: "GZI",
    description: "Konseling gizi balita stunting/gizi kurang, diet penyakit degeneratif (DM, Hipertensi), dan skrining Cek Kesehatan Gratis (CKG).",
    icon: "Activity",
    quotaPerDay: 25,
    roomNumber: "Ruang 06",
    isActive: true,
  },
  {
    id: "poli-7",
    name: "UGD & Rawat Tindakan 24 Jam",
    code: "UGD",
    description: "Penanganan kegawatdaruratan medis, kecelakaan, pertolongan pertama, heacting luka, dan pelayanan persalinan 24 jam PONED.",
    icon: "HeartPulse",
    quotaPerDay: 100,
    roomNumber: "Gedung UGD Barat",
    isActive: true,
  },
];

export const FALLBACK_DOCTORS: FallbackDoctor[] = [
  {
    id: "doc-1",
    name: "dr. Hj. Heti Supriati, M.K.M.",
    nip: "19720514 200212 2 003",
    sip: "446.1/SIP.042/Dinkes/2021",
    specialization: "Dokter Umum / Kepala Puskesmas",
    poliId: "poli-1",
    phone: "0813-2211-9081",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-2",
    name: "dr. Dimas Aditya Pratama",
    nip: "19880922 201503 1 002",
    sip: "446.1/SIP.119/Dinkes/2022",
    specialization: "Dokter Umum",
    poliId: "poli-1",
    phone: "0812-4433-2211",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-3",
    name: "dr. Siti Nurhalizah",
    nip: "19920310 201902 2 005",
    sip: "446.1/SIP.204/Dinkes/2023",
    specialization: "Dokter Umum",
    poliId: "poli-1",
    phone: "0813-9988-7766",
    photoUrl: "https://images.unsplash.com/photo-1594824813589-325b306b3e40?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-4",
    name: "drg. Rina Kartika Dewi",
    nip: "19850711 201001 2 007",
    sip: "446.2/SIP.055/Dinkes/2021",
    specialization: "Dokter Gigi & Mulut",
    poliId: "poli-2",
    phone: "0821-3322-1199",
    photoUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-5",
    name: "Bdn. Eli Herlina, S.Tr.Keb.",
    nip: "19810419 200604 2 011",
    sip: "446.3/SIPB.089/Dinkes/2020",
    specialization: "Bidan Koordinator KIA / KB",
    poliId: "poli-3",
    phone: "0852-9988-1122",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-6",
    name: "Bdn. Ai Nurlaela, Amd.Keb.",
    nip: "19940815 202012 2 008",
    sip: "446.3/SIPB.140/Dinkes/2022",
    specialization: "Bidan Pelaksana MTBS & Imunisasi",
    poliId: "poli-4",
    phone: "0812-7766-5544",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
    isActive: true,
  },
  {
    id: "doc-7",
    name: "dr. Arya Kusuma",
    nip: "19901103 201701 1 004",
    sip: "446.1/SIP.167/Dinkes/2022",
    specialization: "Dokter Jaga UGD & Emergency",
    poliId: "poli-7",
    phone: "0811-2233-4455",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    isActive: true,
  },
];

export const FALLBACK_SCHEDULES: FallbackSchedule[] = [
  {
    id: "sch-1",
    doctorId: "doc-1",
    poliId: "poli-1",
    dayOfWeek: 1,
    dayName: "Senin",
    startTime: "08:00",
    endTime: "12:00",
    status: "HADIR",
    notes: "Pemeriksaan umum & rujukan",
    doctor: FALLBACK_DOCTORS[0],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-2",
    doctorId: "doc-2",
    poliId: "poli-1",
    dayOfWeek: 1,
    dayName: "Senin",
    startTime: "08:00",
    endTime: "13:30",
    status: "HADIR",
    notes: "Layanan umum & lansia",
    doctor: FALLBACK_DOCTORS[1],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-3",
    doctorId: "doc-4",
    poliId: "poli-2",
    dayOfWeek: 1,
    dayName: "Senin",
    startTime: "08:30",
    endTime: "13:00",
    status: "HADIR",
    notes: "Perawatan gigi dewasa & anak",
    doctor: FALLBACK_DOCTORS[3],
    poli: FALLBACK_POLIS[1],
  },
  {
    id: "sch-4",
    doctorId: "doc-5",
    poliId: "poli-3",
    dayOfWeek: 1,
    dayName: "Senin",
    startTime: "08:00",
    endTime: "13:00",
    status: "HADIR",
    notes: "ANC & USG Dasar Kehamilan",
    doctor: FALLBACK_DOCTORS[4],
    poli: FALLBACK_POLIS[2],
  },
  {
    id: "sch-5",
    doctorId: "doc-2",
    poliId: "poli-1",
    dayOfWeek: 2,
    dayName: "Selasa",
    startTime: "08:00",
    endTime: "13:30",
    status: "TUGAS_LUAR",
    notes: "Dinas Luar: Pembinaan Posyandu Desa Sindangpakuon",
    doctor: FALLBACK_DOCTORS[1],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-6",
    doctorId: "doc-3",
    poliId: "poli-1",
    dayOfWeek: 2,
    dayName: "Selasa",
    startTime: "08:00",
    endTime: "13:30",
    status: "HADIR",
    notes: "Layanan umum pengganti dr. Dimas",
    doctor: FALLBACK_DOCTORS[2],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-7",
    doctorId: "doc-4",
    poliId: "poli-2",
    dayOfWeek: 2,
    dayName: "Selasa",
    startTime: "08:30",
    endTime: "13:00",
    status: "HADIR",
    notes: "Penambalan & Pencabutan Gigi",
    doctor: FALLBACK_DOCTORS[3],
    poli: FALLBACK_POLIS[1],
  },
  {
    id: "sch-8",
    doctorId: "doc-1",
    poliId: "poli-1",
    dayOfWeek: 3,
    dayName: "Rabu",
    startTime: "08:00",
    endTime: "12:00",
    status: "HADIR",
    notes: "Pemeriksaan umum",
    doctor: FALLBACK_DOCTORS[0],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-9",
    doctorId: "doc-3",
    poliId: "poli-1",
    dayOfWeek: 3,
    dayName: "Rabu",
    startTime: "08:00",
    endTime: "13:30",
    status: "CUTI",
    notes: "Cuti Tahunan (Digantikan dr. Arya)",
    doctor: FALLBACK_DOCTORS[2],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-10",
    doctorId: "doc-7",
    poliId: "poli-1",
    dayOfWeek: 3,
    dayName: "Rabu",
    startTime: "08:00",
    endTime: "13:30",
    status: "DIGANTIKAN",
    notes: "Dokter Pengganti untuk Poli Umum",
    doctor: FALLBACK_DOCTORS[6],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-11",
    doctorId: "doc-2",
    poliId: "poli-1",
    dayOfWeek: 4,
    dayName: "Kamis",
    startTime: "08:00",
    endTime: "13:30",
    status: "HADIR",
    notes: "Pemeriksaan Prolanis (DM/Hipertensi)",
    doctor: FALLBACK_DOCTORS[1],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-12",
    doctorId: "doc-3",
    poliId: "poli-1",
    dayOfWeek: 4,
    dayName: "Kamis",
    startTime: "08:00",
    endTime: "13:30",
    status: "HADIR",
    notes: "Pemeriksaan umum & lansia",
    doctor: FALLBACK_DOCTORS[2],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-13",
    doctorId: "doc-2",
    poliId: "poli-1",
    dayOfWeek: 5,
    dayName: "Jumat",
    startTime: "08:00",
    endTime: "11:00",
    status: "HADIR",
    notes: "Pelayanan singkat hari Jumat",
    doctor: FALLBACK_DOCTORS[1],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-14",
    doctorId: "doc-3",
    poliId: "poli-1",
    dayOfWeek: 6,
    dayName: "Sabtu",
    startTime: "08:00",
    endTime: "12:00",
    status: "HADIR",
    notes: "Pemeriksaan umum akhir pekan",
    doctor: FALLBACK_DOCTORS[2],
    poli: FALLBACK_POLIS[0],
  },
  {
    id: "sch-15",
    doctorId: "doc-7",
    poliId: "poli-7",
    dayOfWeek: 7,
    dayName: "Minggu",
    startTime: "00:00",
    endTime: "23:59",
    status: "HADIR",
    notes: "Siaga UGD 24 Jam",
    doctor: FALLBACK_DOCTORS[6],
    poli: FALLBACK_POLIS[6],
  },
];

export const FALLBACK_ANNOUNCEMENTS: FallbackAnnouncement[] = [
  {
    id: "ann-1",
    title: "Cek Kesehatan Gratis (CKG) untuk Seluruh Warga Kecamatan Cimanggung",
    slug: "cek-kesehatan-gratis-ckg-cimanggung",
    summary: "Puskesmas Cimanggung menyelenggarakan program skrining kesehatan gratis meliputi tensi darah, gula darah sewaktu, dan indeks massa tubuh.",
    content: `Pemerintah Kabupaten Sumedang bersama Puskesmas Cimanggung mengundang warga masyarakat yang berusia 15 tahun ke atas untuk memanfaatkan program **Cek Kesehatan Gratis (CKG)**.

Layanan yang disediakan:
1. Pemeriksaan Tekanan Darah (Skrining Hipertensi)
2. Pemeriksaan Gula Darah Sewaktu (Skrining Diabetes Melitus)
3. Pengukuran Indeks Massa Tubuh (IMT) dan Lingkar Perut
4. Konseling Pola Hidup Sehat & Berhenti Merokok

Syarat cukup membawa fotokopi KTP / KK domisili Kecamatan Cimanggung (Desa Bunter, Cihanjuang, Cikahuripan, Cimanggung, Mangunarga, Pasirnanjung, Sindanggalih, Sindangpakuon, Sindangsari, Sukadana, Tegalmanggung). Layanan tersedia setiap hari Kamis pukul 08.30 - 12.00 WIB di Poli Gizi & Promkes.`,
    category: "CKG",
    isPinned: true,
    author: "dr. Hj. Heti Supriati, M.K.M.",
    publishedAt: new Date(),
    viewCount: 142,
  },
  {
    id: "ann-2",
    title: "Jadwal Pekan Imunisasi Balita dan Posyandu Serentak Bulan Ini",
    slug: "jadwal-pekan-imunisasi-balita-posyandu",
    summary: "Pelaksanaan imunisasi dasar lengkap dan penimbangan balita serentak di 11 desa binaan Puskesmas Cimanggung.",
    content: `Diberitahukan kepada seluruh orang tua yang memiliki bayi dan balita di wilayah Cimanggung bahwa pelaksanaan Imunisasi Rutin Lengkap (Polio, DPT-HB-Hib, PCV, Rotavirus, dan Campak-Rubella) serta pemantauan tumbuh kembang (stunting) diadakan di masing-masing Posyandu desa mulai tanggal 5 s/d 20 setiap bulannya.

Mohon pastikan membawa **Buku KIA (Buku Pink)** dan kartu BPJS/KTP orang tua. Jika terlewat jadwal Posyandu, ibu dapat membawa anak langsung ke Poli MTBS/Imunisasi Puskesmas Cimanggung setiap hari Rabu dan Sabtu.`,
    category: "POSYANDU",
    isPinned: true,
    author: "Bdn. Eli Herlina, S.Tr.Keb.",
    publishedAt: new Date(Date.now() - 2 * 86400000),
    viewCount: 98,
  },
  {
    id: "ann-3",
    title: "Pelayanan UGD & Ruang Bersalin (PONED) Siaga Penuh 24 Jam",
    slug: "layanan-ugd-poned-24-jam-cimanggung",
    summary: "Puskesmas Cimanggung tetap melayani kasus gawat darurat dan persalinan normal maupun rujukan selama 24 jam tanpa henti.",
    content: `Sebagai Puskesmas DTP (Dengan Tempat Perawatan), Puskesmas Cimanggung memiliki fasilitas Unit Gawat Darurat (UGD) dan Pelayanan Obstetri Neonatal Emergensi Dasar (PONED) yang beroperasi **24 Jam Setiap Hari**, termasuk hari libur nasional dan hari Minggu.

Fasilitas yang siaga:
- Tim Dokter Jaga dan Perawat Terlatih
- Bidan Siaga Persalinan 24 Jam
- Layanan Ambulans Siaga Darurat 24 Jam (Hotline: 0812-2345-6789)
- Ruang Tindakan Bedah Minor dan Observasi Pasien

Bagi masyarakat yang membutuhkan bantuan penjemputan darurat, dapat menghubungi Call Center Puskesmas Cimanggung.`,
    category: "DARURAT",
    isPinned: false,
    author: "dr. Arya Kusuma",
    publishedAt: new Date(Date.now() - 5 * 86400000),
    viewCount: 231,
  },
  {
    id: "ann-4",
    title: "Kewaspadaan Terhadap Penyakit Demam Berdarah Dengue (DBD) di Musim Hujan",
    slug: "kewaspadaan-demam-berdarah-dbd-musim-hujan",
    summary: "Imbauan kepada masyarakat Cimanggung untuk menggalakkan Gerakan Pemberantasan Sarang Nyamuk (PSN) 3M Plus.",
    content: `Memasuki musim penghujan, Puskesmas Cimanggung mencatat peningkatan potensi perkembangbiakan nyamuk *Aedes aegypti*. Kami mengajak warga untuk aktif melakukan Gerakan 3M Plus:
- **Menguras** tempat penampungan air secara teratur.
- **Menutup** rapat tempat-tempat penampungan air.
- **Mendaur ulang** barang-barang bekas yang dapat menampung genangan air.

Plus: Menaburkan bubuk abate (tersedia gratis di Puskesmas), memasang kawat kasa, dan memelihara ikan pemakan jentik. Segera periksakan diri ke Puskesmas jika mengalami demam tinggi mendadak lebih dari 2 hari!`,
    category: "EDUKASI",
    isPinned: false,
    author: "Tim Promkes Puskesmas Cimanggung",
    publishedAt: new Date(Date.now() - 7 * 86400000),
    viewCount: 175,
  },
];
