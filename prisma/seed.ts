import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai seeding database Puskesmas Cimanggung...");

  // 1. Bersihkan data lama jika ada
  await prisma.queueTicket.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.poli.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.operationalHour.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      email: "admin@pkmcimanggung.go.id",
      name: "Administrator Puskesmas Cimanggung",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin berhasil dibuat: admin@pkmcimanggung.go.id / admin123");

  // 3. Site Setting
  await prisma.siteSetting.create({
    data: {
      id: "default",
      name: "Puskesmas Cimanggung",
      tagline: "Melayani Dengan Hati dan Senyuman untuk Masyarakat Cimanggung yang Sehat & Mandiri",
      address: "Jl. Raya Parakanmuncang - Simpang No. 12, Desa Sindanggalih, Kec. Cimanggung, Kab. Sumedang, Jawa Barat 45364",
      phone: "(022) 7792-341",
      emergencyPhone: "0812-2345-6789",
      whatsapp: "0812-2345-6789",
      email: "pkm.cimanggung@sumedangkab.go.id",
      headOfClinic: "dr. Hj. Heti Supriati, M.K.M.",
      mapsUrl: "https://maps.google.com/?q=Puskesmas+Cimanggung+Sumedang",
      statusOverride: "AUTO",
    },
  });

  // 4. Poli Units
  const poliUmum = await prisma.poli.create({
    data: {
      name: "Poli Umum",
      code: "UMM",
      description: "Pemeriksaan kesehatan umum, diagnosis medis, pengobatan, dan rujukan tingkat lanjut untuk masyarakat umum dan lansia.",
      icon: "Stethoscope",
      quotaPerDay: 80,
      roomNumber: "Ruang 01",
    },
  });

  const poliGigi = await prisma.poli.create({
    data: {
      name: "Poli Gigi & Mulut",
      code: "GIG",
      description: "Pelayanan kesehatan gigi, penambalan, pencabutan gigi susu dan dewasa, serta pembersihan karang gigi.",
      icon: "Smile",
      quotaPerDay: 30,
      roomNumber: "Ruang 02",
    },
  });

  const poliKia = await prisma.poli.create({
    data: {
      name: "Poli KIA / KB & USG",
      code: "KIA",
      description: "Pemeriksaan ibu hamil (ANC), USG dasar kehamilan, pelayanan KB (Suntik, Implan, IUD), dan pasca persalinan.",
      icon: "Baby",
      quotaPerDay: 40,
      roomNumber: "Ruang 03",
    },
  });

  const poliAnak = await prisma.poli.create({
    data: {
      name: "Poli MTBS & Imunisasi Anak",
      code: "ANK",
      description: "Manajemen Terpadu Balita Sakit, pemantauan tumbuh kembang anak, dan imunisasi rutin lengkap bayi & balita.",
      icon: "ShieldAlert",
      quotaPerDay: 40,
      roomNumber: "Ruang 04",
    },
  });

  const poliLab = await prisma.poli.create({
    data: {
      name: "Laboratorium",
      code: "LAB",
      description: "Pemeriksaan darah lengkap, tes urine rutin, gula darah sewaktu/puasa, kolesterol, asam urat, HIV/Sifilis/Hepatitis, dan tes dahak TB.",
      icon: "FlaskConical",
      quotaPerDay: 50,
      roomNumber: "Ruang 05",
    },
  });

  const poliGizi = await prisma.poli.create({
    data: {
      name: "Poli Konsultasi Gizi & CKG",
      code: "GZI",
      description: "Konseling gizi balita stunting/gizi kurang, diet penyakit degeneratif (DM, Hipertensi), dan skrining Cek Kesehatan Gratis (CKG).",
      icon: "Apple",
      quotaPerDay: 25,
      roomNumber: "Ruang 06",
    },
  });

  const poliUgd = await prisma.poli.create({
    data: {
      name: "UGD & Rawat Tindakan 24 Jam",
      code: "UGD",
      description: "Penanganan kegawatdaruratan medis, kecelakaan, pertolongan pertama, heacting luka, dan pelayanan persalinan 24 jam PONED.",
      icon: "HeartPulse",
      quotaPerDay: 100,
      roomNumber: "Gedung UGD Barat",
    },
  });

  console.log("✅ Unit Poli berhasil dibuat.");

  // 5. Tenaga Medis / Dokter
  const drHeti = await prisma.doctor.create({
    data: {
      name: "dr. Hj. Heti Supriati, M.K.M.",
      nip: "19720514 200212 2 003",
      sip: "446.1/SIP.042/Dinkes/2021",
      specialization: "Dokter Umum / Kepala Puskesmas",
      poliId: poliUmum.id,
      phone: "0813-2211-9081",
      photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    },
  });

  const drDimas = await prisma.doctor.create({
    data: {
      name: "dr. Dimas Aditya Pratama",
      nip: "19880922 201503 1 002",
      sip: "446.1/SIP.119/Dinkes/2022",
      specialization: "Dokter Umum",
      poliId: poliUmum.id,
      phone: "0812-4433-2211",
      photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    },
  });

  const drSiti = await prisma.doctor.create({
    data: {
      name: "dr. Siti Nurhalizah",
      nip: "19920310 201902 2 005",
      sip: "446.1/SIP.204/Dinkes/2023",
      specialization: "Dokter Umum",
      poliId: poliUmum.id,
      phone: "0813-9988-7766",
      photoUrl: "https://images.unsplash.com/photo-1594824813589-325b306b3e40?w=400&q=80",
    },
  });

  const drgRina = await prisma.doctor.create({
    data: {
      name: "drg. Rina Kartika Dewi",
      nip: "19850711 201001 2 007",
      sip: "446.2/SIP.055/Dinkes/2021",
      specialization: "Dokter Gigi & Mulut",
      poliId: poliGigi.id,
      phone: "0821-3322-1199",
      photoUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
    },
  });

  const bdnEli = await prisma.doctor.create({
    data: {
      name: "Bdn. Eli Herlina, S.Tr.Keb.",
      nip: "19810419 200604 2 011",
      sip: "446.3/SIPB.089/Dinkes/2020",
      specialization: "Bidan Koordinator KIA / KB",
      poliId: poliKia.id,
      phone: "0852-9988-1122",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
  });

  const bdnAi = await prisma.doctor.create({
    data: {
      name: "Bdn. Ai Nurlaela, Amd.Keb.",
      nip: "19940815 202012 2 008",
      sip: "446.3/SIPB.140/Dinkes/2022",
      specialization: "Bidan Pelaksana MTBS & Imunisasi",
      poliId: poliAnak.id,
      phone: "0812-7766-5544",
      photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
    },
  });

  const drArya = await prisma.doctor.create({
    data: {
      name: "dr. Arya Kusuma",
      nip: "19901103 201701 1 004",
      sip: "446.1/SIP.167/Dinkes/2022",
      specialization: "Dokter Jaga UGD & Emergency",
      poliId: poliUgd.id,
      phone: "0811-2233-4455",
      photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    },
  });

  const nendenLab = await prisma.doctor.create({
    data: {
      name: "Nenden Sri Wahyuni, A.Md.A.K.",
      nip: "19890214 201201 2 006",
      sip: "446.4/SIPAL.032/Dinkes/2021",
      specialization: "Pranata Laboratorium Kesehatan",
      poliId: poliLab.id,
      phone: "0813-8877-6655",
      photoUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    },
  });

  const sarahGizi = await prisma.doctor.create({
    data: {
      name: "Sarah Fatimah, S.Gz.",
      nip: "19950620 202203 2 009",
      sip: "446.5/SIPTG.018/Dinkes/2023",
      specialization: "Nutrisionis / Konselor Gizi",
      poliId: poliGizi.id,
      phone: "0822-1144-7788",
      photoUrl: "https://images.unsplash.com/photo-1594824813589-325b306b3e40?w=400&q=80",
    },
  });

  console.log("✅ Tenaga medis berhasil dibuat.");

  // 6. Jadwal Praktik Dokter
  const schedulesData = [
    // Senin
    { doctorId: drHeti.id, poliId: poliUmum.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pemeriksaan umum & rujukan" },
    { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Layanan umum & lansia" },
    { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Perawatan gigi dewasa & anak" },
    { doctorId: bdnEli.id, poliId: poliKia.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "13:00", status: "HADIR", notes: "ANC & USG Dasar Kehamilan" },
    { doctorId: bdnAi.id, poliId: poliAnak.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "12:30", status: "HADIR", notes: "Imunisasi Dasar & MTBS" },
    { doctorId: nendenLab.id, poliId: poliLab.id, dayOfWeek: 1, dayName: "Senin", startTime: "07:45", endTime: "13:30", status: "HADIR", notes: "Sampel darah & tes laboratorium" },
    { doctorId: drArya.id, poliId: poliUgd.id, dayOfWeek: 1, dayName: "Senin", startTime: "00:00", endTime: "23:59", status: "HADIR", notes: "Shift Siaga 24 Jam" },

    // Selasa
    { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:00", endTime: "13:30", status: "TUGAS_LUAR", notes: "Dinas Luar: Pembinaan Posyandu Desa Sindangpakuon" },
    { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Layanan umum pengganti dr. Dimas" },
    { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Penambalan & Pencabutan Gigi" },
    { doctorId: bdnEli.id, poliId: poliKia.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:00", endTime: "13:00", status: "HADIR", notes: "Pemeriksaan Ibu Hamil & KB" },
    { doctorId: sarahGizi.id, poliId: poliGizi.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:30", endTime: "12:00", status: "HADIR", notes: "Konseling gizi balita & bumil KEK" },

    // Rabu
    { doctorId: drHeti.id, poliId: poliUmum.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pemeriksaan umum" },
    { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "13:30", status: "CUTI", notes: "Cuti Tahunan (Digantikan dr. Arya)" },
    { doctorId: drArya.id, poliId: poliUmum.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "13:30", status: "DIGANTIKAN", notes: "Dokter Pengganti untuk Poli Umum" },
    { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Poli Gigi Buka Sesuai Kuota" },
    { doctorId: bdnEli.id, poliId: poliKia.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "13:00", status: "HADIR", notes: "Pemasangan IUD & Implan" },
    { doctorId: bdnAi.id, poliId: poliAnak.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "12:30", status: "HADIR", notes: "Jadwal Vaksin BCG & Polio" },

    // Kamis
    { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 4, dayName: "Kamis", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Pemeriksaan Prolanis (DM/Hipertensi)" },
    { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 4, dayName: "Kamis", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Pemeriksaan umum & lansia" },
    { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 4, dayName: "Kamis", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Pelayanan Gigi & Mulut" },
    { doctorId: sarahGizi.id, poliId: poliGizi.id, dayOfWeek: 4, dayName: "Kamis", startTime: "08:30", endTime: "12:30", status: "HADIR", notes: "Skrining Cek Kesehatan Gratis (CKG)" },

    // Jumat
    { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 5, dayName: "Jumat", startTime: "08:00", endTime: "11:00", status: "HADIR", notes: "Pelayanan singkat hari Jumat" },
    { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 5, dayName: "Jumat", startTime: "08:30", endTime: "10:45", status: "HADIR", notes: "Khusus tindakan darurat gigi" },
    { doctorId: bdnEli.id, poliId: poliKia.id, dayOfWeek: 5, dayName: "Jumat", startTime: "08:00", endTime: "11:00", status: "HADIR", notes: "Konsultasi Kesehatan Reproduksi" },
    { doctorId: nendenLab.id, poliId: poliLab.id, dayOfWeek: 5, dayName: "Jumat", startTime: "07:45", endTime: "10:45", status: "HADIR", notes: "Pelayanan Lab singkat" },

    // Sabtu
    { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 6, dayName: "Sabtu", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pemeriksaan umum akhir pekan" },
    { doctorId: bdnAi.id, poliId: poliAnak.id, dayOfWeek: 6, dayName: "Sabtu", startTime: "08:00", endTime: "11:30", status: "HADIR", notes: "Pemeriksaan MTBS balita" },
    { doctorId: drArya.id, poliId: poliUgd.id, dayOfWeek: 6, dayName: "Sabtu", startTime: "00:00", endTime: "23:59", status: "HADIR", notes: "Siaga IGD 24 Jam" },
  ];

  for (const item of schedulesData) {
    await prisma.schedule.create({ data: item });
  }
  console.log("✅ Jadwal dokter berhasil dibuat.");

  // 7. Jam Operasional Puskesmas
  const operationalHoursData = [
    { dayOfWeek: 1, dayName: "Senin", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler seluruh poli" },
    { dayOfWeek: 2, dayName: "Selasa", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & konsultasi gizi" },
    { dayOfWeek: 3, dayName: "Rabu", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & imunisasi rutin" },
    { dayOfWeek: 4, dayName: "Kamis", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan Prolanis & Cek Kesehatan Gratis" },
    { dayOfWeek: 5, dayName: "Jumat", loketOpen: "07:30", loketClose: "10:00", serviceOpen: "08:00", serviceClose: "11:00", isClosed: false, isUgd24H: true, notes: "Waktu pelayanan disesuaikan ibadah Shalat Jumat" },
    { dayOfWeek: 6, dayName: "Sabtu", loketOpen: "07:30", loketClose: "11:00", serviceOpen: "08:00", serviceClose: "12:30", isClosed: false, isUgd24H: true, notes: "Pelayanan poli umum, KIA & laboratorium" },
    { dayOfWeek: 7, dayName: "Minggu", loketOpen: "-", loketClose: "-", serviceOpen: "-", serviceClose: "-", isClosed: true, isUgd24H: true, notes: "Poli rawat jalan tutup. UGD & PONED (Persalinan) tetap BUKA 24 Jam." },
  ];

  for (const op of operationalHoursData) {
    await prisma.operationalHour.create({ data: op });
  }
  console.log("✅ Jam operasional berhasil dibuat.");

  // 8. Pengumuman & Berita Kesehatan
  const announcementsData = [
    {
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
    },
    {
      title: "Jadwal Pekan Imunisasi Balita dan Posyandu Serentak Bulan Ini",
      slug: "jadwal-pekan-imunisasi-balita-posyandu",
      summary: "Pelaksanaan imunisasi dasar lengkap dan penimbangan balita serentak di 11 desa binaan Puskesmas Cimanggung.",
      content: `Diberitahukan kepada seluruh orang tua yang memiliki bayi dan balita di wilayah Cimanggung bahwa pelaksanaan Imunisasi Rutin Lengkap (Polio, DPT-HB-Hib, PCV, Rotavirus, dan Campak-Rubella) serta pemantauan tumbuh kembang (stunting) diadakan di masing-masing Posyandu desa mulai tanggal 5 s/d 20 setiap bulannya.

Mohon pastikan membawa **Buku KIA (Buku Pink)** dan kartu BPJS/KTP orang tua. Jika terlewat jadwal Posyandu, ibu dapat membawa anak langsung ke Poli MTBS/Imunisasi Puskesmas Cimanggung setiap hari Rabu dan Sabtu.`,
      category: "POSYANDU",
      isPinned: true,
      author: "Bdn. Eli Herlina, S.Tr.Keb.",
    },
    {
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
    },
    {
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
    },
  ];

  for (const ann of announcementsData) {
    await prisma.announcement.create({ data: ann });
  }
  console.log("✅ Pengumuman berhasil dibuat.");

  // 9. Dummy Queue Tickets untuk demo sistem antrean
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dummyQueues = [
    {
      ticketNumber: "UMM-001",
      nik: "3211051204850001",
      patientName: "Asep Sunandar",
      birthDate: "1985-04-12",
      gender: "L",
      phone: "081234567890",
      address: "Dusun Cicabe RT 02/05 Desa Sindanggalih",
      poliId: poliUmum.id,
      appointmentDate: todayStr,
      patientType: "BPJS",
      bpjsNumber: "0001234567891",
      complaint: "Demam dan batuk berdahak sudah 3 hari",
      status: "SELESAI",
    },
    {
      ticketNumber: "UMM-002",
      nik: "3211054508900003",
      patientName: "Siti Maryam",
      birthDate: "1990-08-15",
      gender: "P",
      phone: "081398765432",
      address: "Kp. Bunter RT 01/02 Desa Cihanjuang",
      poliId: poliUmum.id,
      appointmentDate: todayStr,
      patientType: "BPJS",
      bpjsNumber: "0009876543210",
      complaint: "Pusing berputar dan mual sejak tadi malam",
      status: "DIPANGGIL",
    },
    {
      ticketNumber: "UMM-003",
      nik: "3211052309780002",
      patientName: "Dadang Ruhiyat",
      birthDate: "1978-09-23",
      gender: "L",
      phone: "085211223344",
      address: "Desa Sindangpakuon RT 03/01",
      poliId: poliUmum.id,
      appointmentDate: todayStr,
      patientType: "UMUM",
      complaint: "Kontrol tekanan darah dan cek kolesterol",
      status: "MENUNGGU",
    },
    {
      ticketNumber: "GIG-001",
      nik: "3211055502940004",
      patientName: "Dewi Lestari",
      birthDate: "1994-02-15",
      gender: "P",
      phone: "087812345678",
      address: "Perum Parakanmuncang Indah Blok B4",
      poliId: poliGigi.id,
      appointmentDate: todayStr,
      patientType: "BPJS",
      bpjsNumber: "0003456789123",
      complaint: "Gigi geraham belakang ngilu dan berlubang",
      status: "MENUNGGU",
    },
    {
      ticketNumber: "KIA-001",
      nik: "3211056211960002",
      patientName: "Neng Ani Suryani",
      birthDate: "1996-11-22",
      gender: "P",
      phone: "082199887766",
      address: "Dusun Cikahuripan RT 04/03",
      poliId: poliKia.id,
      appointmentDate: todayStr,
      patientType: "BPJS",
      bpjsNumber: "0005678912345",
      complaint: "Pemeriksaan kehamilan trimester kedua (ANC rutin)",
      status: "MENUNGGU",
    },
  ];

  for (const q of dummyQueues) {
    await prisma.queueTicket.create({ data: q });
  }
  console.log("✅ Tiket antrean demo berhasil dibuat.");
  console.log("🎉 Seeding Puskesmas Cimanggung selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("❌ Gagal seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
