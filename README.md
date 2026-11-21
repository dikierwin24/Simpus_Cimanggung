# 🏥 Sistem Informasi UPTD Puskesmas Cimanggung (Kabupaten Sumedang)

Aplikasi web full-stack modern, responsif, dan ramah pengguna untuk **Puskesmas Cimanggung** (Kecamatan Cimanggung, Kabupaten Sumedang, Jawa Barat). Dirancang khusus untuk mempermudah masyarakat mengakses jadwal dokter, mendaftar antrean poli online dari rumah, serta menyediakan Dashboard Admin terproteksi bagi tenaga medis dan staf loket.

---

## 🚀 Fitur Utama

### 1. Halaman Publik (Masyarakat & Pasien)
- **Beranda (Landing Page):**
  - Hero banner modern dengan sambutan hangat dan identitas resmi Puskesmas Cimanggung.
  - **Badge Status Operasional Real-time:** Otomatis menampilkan status `POLI SEDANG BUKA` (hijau) atau `POLI TUTUP` (merah) berdasarkan waktu lokal Jawa Barat (WIB), serta penanda siaga UGD 24 Jam.
  - Ringkasan 7 unit pelayanan terpadu (Poli Umum, Poli Gigi, KIA/KB & USG, MTBS & Imunisasi Anak, Laboratorium Patologi, Konseling Gizi & CKG, UGD & Rawat Inap PONED 24 Jam).
  - Alur berobat ringkas 4 langkah dan papan informasi pengumuman program kesehatan.
- **Informasi Jadwal Dokter & Poli (Real-time Filter):**
  - Kartu profil dokter dan jadwal praktik lengkap (nama nakes, spesialisasi, SIP/NIP, hari praktik, jam mulai - selesai, ruangan).
  - **Filter Instan:** Filter hari (Senin - Sabtu), filter poli, dan pencarian instan nama dokter atau spesialisasi.
  - Status kehadiran nakes dengan badge warna dinamis: **Hadir Sesuai Jadwal** (Hijau), **Sedang Cuti** (Merah), **Dinas Luar / Posyandu** (Oranye), dan **Dokter Pengganti** (Biru).
- **Jam Kerja & Alur Pelayanan:**
  - Tabel rincian komparasi jam buka loket pendaftaran vs jam pelayanan poli (Senin–Kamis 07.30–14.00 WIB, Jumat 07.30–11.00 WIB, Sabtu 07.30–12.30 WIB, serta UGD/Persalinan 24 Jam).
  - Diagram visual 5 langkah alur berobat pasien rawat jalan.
  - Panduan lengkap syarat pendaftaran (Pasien BPJS Kesehatan / KIS, Pasien Umum / KTP, dan Pasien KIA / Buku Pink).
- **Pendaftaran Antrean Online Mandiri:**
  - Formulir pendaftaran mandiri (NIK 16 digit, Nama Lengkap, WhatsApp, Poli Tujuan, Tanggal Kunjungan, BPJS/Umum, No. BPJS, dan Keluhan).
  - **Tiket Antrean Digital:** Menghasilkan kartu tiket dengan kode antrean unik (misal `UMM-004`, `GIG-002`), barcode/QR, detail pasien, estimasi kedatangan, tombol **Cetak / Simpan PDF**, serta tombol **Kirim via WhatsApp**.
  - **Tab Cek Status Antrean:** Pasien cukup memasukkan NIK atau Nomor Antrean untuk melihat status panggilannya secara live.
- **Pengumuman & Edukasi Kesehatan:**
  - Papan informasi program Cek Kesehatan Gratis (CKG), jadwal Posyandu & Imunisasi balita di 11 desa, siaga DBD, dan UGD 24 Jam.
- **Kontak & Lokasi Interaktif:**
  - Nomor siaga UGD & Ambulans 24 Jam (`0812-2345-6789`), WhatsApp informasi, alamat lengkap di Jl. Raya Parakanmuncang - Simpang, serta integrasi Google Maps interaktif.

### 2. Panel Dashboard Admin (Terproteksi NextAuth.js)
- **Autentikasi Aman:** Halaman login staf admin menggunakan NextAuth.js (Auth.js) dengan proteksi sesi JWT dan enkripsi kata sandi `bcryptjs`.
- **Overview Dashboard:** Ringkasan statistik cepat antrean hari ini, pasien menunggu, pasien sedang diperiksa, jadwal dokter hari ini, dan postingan aktif.
- **CRUD & 1-Click Status Switcher Jadwal Dokter:**
  - Admin dapat menambah dokter baru, mengatur jadwal poli, dan **mengubah status kehadiran dokter dengan 1 klik** (`[Hadir]`, `[Cuti]`, `[Dinas Luar]`, `[Pengganti]`). Status di halaman publik warga langsung terupdate seketika!
- **Manajemen Antrean Live Pasien Hari Ini:**
  - Daftar antrean pasien per poli dan tanggal kunjungan.
  - Tombol aksi petugas: **Panggil** (dilengkapi **Audio Speech Pemanggil Suara Otomatis**), **Selesai**, dan **Batal/Dilewati**.
  - Cetak rekap kunjungan harian.
- **Manajemen Pengumuman & Berita:** CRUD pengumuman warga, kategori program, dan sematkan di teratas (*pinned*).
- **Pengaturan Jam Operasional:** Pengaturan jam buka/tutup loket dan poli untuk setiap hari.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS dengan palet warna medis (Medical Blue `#0284C7`, Sky Blue `#0EA5E9`, Health Green & Soft Red)
- **Icons:** Lucide Icons
- **Database & ORM:** Prisma ORM dengan SQLite (`dev.db`) untuk setup lokal otomatis tanpa konfigurasi rumit
- **Autentikasi:** NextAuth.js (Auth.js) dengan Credentials Provider & Session Strategy JWT

---

## 📂 Struktur Direktori Proyek

```
c:\Sistem Informasi PKM 2\
├── prisma/
│   ├── schema.prisma              # Skema database SQLite (User, Poli, Doctor, Schedule, QueueTicket, dll)
│   ├── seed.ts                    # Script seeding data realistis Puskesmas Cimanggung
│   └── dev.db                     # Database SQLite lokal
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout dengan metadata Puskesmas Cimanggung
│   │   ├── globals.css            # Tailwind & medical variables + print ticket stylesheet
│   │   ├── page.tsx               # Halaman Beranda (Landing Page)
│   │   ├── jadwal/                # Halaman Jadwal Dokter & Poli (Filter & Search)
│   │   ├── alur-layanan/          # Halaman Jam Kerja & Alur Pelayanan Pasien
│   │   ├── antrean/               # Halaman Pendaftaran Antrean Online & Cek Tiket
│   │   ├── pengumuman/            # Halaman Pengumuman Warga & Detail Postingan
│   │   ├── kontak/                # Halaman Kontak Darurat, Ambulans 24 Jam & Peta
│   │   ├── admin/
│   │   │   ├── login/page.tsx     # Form login admin & staf
│   │   │   └── (dashboard)/       # Route group dashboard admin terproteksi
│   │   │       ├── layout.tsx     # Admin sidebar, header & session protection
│   │   │       ├── page.tsx       # Ringkasan operasional harian
│   │   │       ├── jadwal/        # CRUD & 1-click switcher jadwal dokter
│   │   │       ├── antrean/       # Manajemen antrean live & pemanggil suara
│   │   │       ├── pengumuman/    # CRUD pengumuman kesehatan
│   │   │       └── jam-layanan/   # Pengaturan jam loket & poli
│   │   └── api/
│   │       ├── auth/[...nextauth] # Endpoint autentikasi NextAuth
│   │       ├── queues/            # API pendaftaran & pembaruan antrean
│   │       ├── schedules/         # API jadwal dokter & update status 1-klik
│   │       ├── doctors/           # API data tenaga medis
│   │       ├── announcements/     # API CRUD pengumuman
│   │       └── operational-hours/ # API jam buka loket & pelayanan
│   ├── components/
│   │   ├── Navbar.tsx             # Navigasi publik + badge status buka/tutup live
│   │   ├── Footer.tsx             # Kontak darurat, 11 desa binaan, embed Maps
│   │   ├── StatusBadge.tsx        # Indikator operasional buka/tutup otomatis
│   │   ├── QueueTicketCard.tsx    # Tiket antrean digital (Cetak, PDF, WhatsApp)
│   │   └── admin/
│   │       ├── AdminSidebar.tsx   # Sidebar dashboard admin
│   │       └── AdminHeader.tsx    # Header dashboard admin
│   └── lib/
│       ├── prisma.ts              # Prisma Client singleton
│       ├── auth.ts                # Opsi konfigurasi NextAuth
│       ├── utils.ts               # Penghitung waktu operasional WIB & format tanggal
│       └── constants.ts           # Data identitas UPTD Puskesmas Cimanggung
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🔑 Kredensial Login Administrator

| Email | Password | Role |
|---|---|---|
| `admin@pkmcimanggung.go.id` | `admin123` | Administrator Puskesmas |

---

## ⚙️ Langkah Instalasi & Menjalankan Aplikasi

Jika Anda ingin menjalankan aplikasi dari awal pada komputer atau server lain:

### 1. Masuk ke Direktori Proyek
```bash
cd "c:\Sistem Informasi PKM 2"
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Generate Prisma Client & Buat Database SQLite
```bash
npx prisma generate
npx prisma db push
```

### 4. Eksekusi Seeding Data Dummy Realistis
Script ini akan mengisi akun admin, data poli, dokter Cimanggung, jadwal Senin–Sabtu, jam operasional, tiket demo, dan pengumuman CKG:
```bash
npm run prisma:seed
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Akses aplikasi melalui browser:
- **Halaman Utama Publik:** [http://localhost:3000](http://localhost:3000)
- **Portal Login Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🏥 Wilayah Binaan Puskesmas Cimanggung (11 Desa)
1. Desa Bunter
2. Desa Cihanjuang
3. Desa Cikahuripan
4. Desa Cimanggung
5. Desa Mangunarga
6. Desa Pasirnanjung
7. Desa Sindanggalih
8. Desa Sindangpakuon
9. Desa Sindangsari
10. Desa Sukadana
11. Desa Tegalmanggung
