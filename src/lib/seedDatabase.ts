import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PKM_INFO } from "@/lib/constants";

export async function seedDatabase() {
  console.log("🌱 Auto-seeding Puskesmas Cimanggung database...");

  // 1. Admin User
  const existingAdmin = await prisma.user.findFirst({
    where: { email: "admin@pkmcimanggung.go.id" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        email: "admin@pkmcimanggung.go.id",
        name: "Administrator Puskesmas Cimanggung",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  // 2. Site Setting
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: PKM_INFO.name,
      tagline: PKM_INFO.tagline,
      address: PKM_INFO.address,
      phone: PKM_INFO.phone,
      emergencyPhone: PKM_INFO.emergencyPhone,
      whatsapp: PKM_INFO.whatsappDisplay,
      email: PKM_INFO.email,
      headOfClinic: PKM_INFO.headOfClinic,
      mapsUrl: PKM_INFO.mapsUrl,
      statusOverride: "AUTO",
    },
  });

  // 3. Poli Units
  const existingPolis = await prisma.poli.count();
  if (existingPolis === 0) {
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

    // 4. Dokter
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

    // 5. Jadwal
    const schedulesData = [
      { doctorId: drHeti.id, poliId: poliUmum.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pemeriksaan umum & rujukan" },
      { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Layanan umum & lansia" },
      { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Perawatan gigi dewasa & anak" },
      { doctorId: bdnEli.id, poliId: poliKia.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "13:00", status: "HADIR", notes: "ANC & USG Dasar Kehamilan" },
      { doctorId: bdnAi.id, poliId: poliAnak.id, dayOfWeek: 1, dayName: "Senin", startTime: "08:00", endTime: "12:30", status: "HADIR", notes: "Imunisasi Dasar & MTBS" },
      { doctorId: drArya.id, poliId: poliUgd.id, dayOfWeek: 1, dayName: "Senin", startTime: "00:00", endTime: "23:59", status: "HADIR", notes: "Shift Siaga 24 Jam" },
      { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:00", endTime: "13:30", status: "TUGAS_LUAR", notes: "Dinas Luar: Posyandu" },
      { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Pengganti dr. Dimas" },
      { doctorId: drgRina.id, poliId: poliGigi.id, dayOfWeek: 2, dayName: "Selasa", startTime: "08:30", endTime: "13:00", status: "HADIR", notes: "Penambalan & Cabut Gigi" },
      { doctorId: drHeti.id, poliId: poliUmum.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pemeriksaan umum" },
      { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 3, dayName: "Rabu", startTime: "08:00", endTime: "13:30", status: "CUTI", notes: "Cuti Tahunan" },
      { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 4, dayName: "Kamis", startTime: "08:00", endTime: "13:30", status: "HADIR", notes: "Pemeriksaan Prolanis" },
      { doctorId: drDimas.id, poliId: poliUmum.id, dayOfWeek: 5, dayName: "Jumat", startTime: "08:00", endTime: "11:00", status: "HADIR", notes: "Pelayanan Jumat" },
      { doctorId: drSiti.id, poliId: poliUmum.id, dayOfWeek: 6, dayName: "Sabtu", startTime: "08:00", endTime: "12:00", status: "HADIR", notes: "Pelayanan Sabtu" },
      { doctorId: drArya.id, poliId: poliUgd.id, dayOfWeek: 7, dayName: "Minggu", startTime: "00:00", endTime: "23:59", status: "HADIR", notes: "Siaga 24 Jam" },
    ];

    for (const item of schedulesData) {
      await prisma.schedule.create({ data: item });
    }
  }

  // 6. Jam Operasional
  const existingHours = await prisma.operationalHour.count();
  if (existingHours === 0) {
    const hours = [
      { dayOfWeek: 1, dayName: "Senin", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler seluruh poli" },
      { dayOfWeek: 2, dayName: "Selasa", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & konsultasi gizi" },
      { dayOfWeek: 3, dayName: "Rabu", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan reguler & imunisasi rutin" },
      { dayOfWeek: 4, dayName: "Kamis", loketOpen: "07:30", loketClose: "11:30", serviceOpen: "08:00", serviceClose: "14:00", isClosed: false, isUgd24H: true, notes: "Pelayanan Prolanis & Cek Kesehatan Gratis" },
      { dayOfWeek: 5, dayName: "Jumat", loketOpen: "07:30", loketClose: "10:00", serviceOpen: "08:00", serviceClose: "11:00", isClosed: false, isUgd24H: true, notes: "Waktu pelayanan disesuaikan ibadah Shalat Jumat" },
      { dayOfWeek: 6, dayName: "Sabtu", loketOpen: "07:30", loketClose: "11:00", serviceOpen: "08:00", serviceClose: "12:30", isClosed: false, isUgd24H: true, notes: "Pelayanan poli umum, KIA & laboratorium" },
      { dayOfWeek: 7, dayName: "Minggu", loketOpen: "-", loketClose: "-", serviceOpen: "-", serviceClose: "-", isClosed: true, isUgd24H: true, notes: "Poli rawat jalan tutup. UGD & PONED siaga 24 Jam." },
    ];
    for (const h of hours) {
      await prisma.operationalHour.create({ data: h });
    }
  }

  // 7. Pengumuman
  const existingAnnouncements = await prisma.announcement.count();
  if (existingAnnouncements === 0) {
    const annList = [
      {
        title: "Cek Kesehatan Gratis (CKG) untuk Seluruh Warga Kecamatan Cimanggung",
        slug: "cek-kesehatan-gratis-ckg-cimanggung",
        summary: "Puskesmas Cimanggung menyelenggarakan program skrining kesehatan gratis meliputi tensi darah, gula darah sewaktu, dan indeks massa tubuh.",
        content: `Pemerintah Kabupaten Sumedang bersama Puskesmas Cimanggung mengundang warga masyarakat yang berusia 15 tahun ke atas untuk memanfaatkan program Cek Kesehatan Gratis (CKG).\n\nSyarat cukup membawa fotokopi KTP / KK domisili Kecamatan Cimanggung. Layanan tersedia setiap hari Kamis pukul 08.30 - 12.00 WIB.`,
        category: "CKG",
        isPinned: true,
        author: "dr. Hj. Heti Supriati, M.K.M.",
      },
      {
        title: "Jadwal Pekan Imunisasi Balita dan Posyandu Serentak Bulan Ini",
        slug: "jadwal-pekan-imunisasi-balita-posyandu",
        summary: "Pelaksanaan imunisasi dasar lengkap dan penimbangan balita serentak di 11 desa binaan Puskesmas Cimanggung.",
        content: `Diberitahukan kepada seluruh orang tua yang memiliki bayi dan balita di wilayah Cimanggung bahwa pelaksanaan Imunisasi Rutin Lengkap diadakan di masing-masing Posyandu desa mulai tanggal 5 s/d 20 setiap bulannya.`,
        category: "POSYANDU",
        isPinned: true,
        author: "Bdn. Eli Herlina, S.Tr.Keb.",
      },
      {
        title: "Pelayanan UGD & Ruang Bersalin (PONED) Siaga Penuh 24 Jam",
        slug: "layanan-ugd-poned-24-jam-cimanggung",
        summary: "Puskesmas Cimanggung tetap melayani kasus gawat darurat dan persalinan normal maupun rujukan selama 24 jam tanpa henti.",
        content: `Sebagai Puskesmas DTP, Puskesmas Cimanggung memiliki fasilitas Unit Gawat Darurat (UGD) dan PONED yang beroperasi 24 Jam Setiap Hari termasuk hari libur nasional.\n\nHotline Darurat: 0812-9587-4439`,
        category: "DARURAT",
        isPinned: false,
        author: "dr. Arya Kusuma",
      },
    ];
    for (const ann of annList) {
      await prisma.announcement.create({ data: ann });
    }
  }

  console.log("✅ Auto-seeding selesai!");
}
