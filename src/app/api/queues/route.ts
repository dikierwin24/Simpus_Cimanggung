import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const poliId = searchParams.get("poliId");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (date) {
      where.appointmentDate = date;
    }

    if (poliId && poliId !== "all") {
      where.poliId = poliId;
    }

    if (search) {
      where.OR = [
        { ticketNumber: { contains: search } },
        { nik: { contains: search } },
        { patientName: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const queues = await prisma.queueTicket.findMany({
      where,
      include: {
        poli: {
          select: {
            id: true,
            name: true,
            code: true,
            roomNumber: true,
          },
        },
      },
      orderBy: [{ appointmentDate: "desc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ success: true, data: queues });
  } catch (error) {
    console.error("Error fetching queues:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data antrean" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nik,
      patientName,
      phone,
      gender,
      poliId,
      appointmentDate,
      patientType,
      bpjsNumber,
      complaint,
      address,
    } = body;

    // Validasi dasar
    if (!nik || nik.length < 16) {
      return NextResponse.json(
        { success: false, message: "NIK harus berjumlah 16 digit angka" },
        { status: 400 }
      );
    }

    if (!patientName || patientName.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap wajib diisi minimal 3 karakter" },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 9) {
      return NextResponse.json(
        { success: false, message: "Nomor WhatsApp aktif wajib diisi" },
        { status: 400 }
      );
    }

    if (!poliId) {
      return NextResponse.json(
        { success: false, message: "Poli tujuan harus dipilih" },
        { status: 400 }
      );
    }

    if (!appointmentDate) {
      return NextResponse.json(
        { success: false, message: "Tanggal kunjungan wajib diisi" },
        { status: 400 }
      );
    }

    // Ambil data poli
    const poli = await prisma.poli.findUnique({
      where: { id: poliId },
    });

    if (!poli) {
      return NextResponse.json(
        { success: false, message: "Poli tujuan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek apakah kuota hari tersebut masih ada
    const existingCount = await prisma.queueTicket.count({
      where: {
        poliId: poli.id,
        appointmentDate: appointmentDate,
        status: { not: "BATAL" },
      },
    });

    if (existingCount >= poli.quotaPerDay) {
      return NextResponse.json(
        {
          success: false,
          message: `Maaf, kuota antrean ${poli.name} pada tanggal tersebut telah penuh (${poli.quotaPerDay} pasien). Silakan pilih tanggal lain.`,
        },
        { status: 400 }
      );
    }

    // Cek apakah NIK sudah mendaftar di poli yang sama pada hari yang sama
    const duplicate = await prisma.queueTicket.findFirst({
      where: {
        nik: nik.trim(),
        poliId: poli.id,
        appointmentDate: appointmentDate,
        status: { not: "BATAL" },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: `NIK ini sudah terdaftar di ${poli.name} pada tanggal ${appointmentDate} dengan No Antrean ${duplicate.ticketNumber}.`,
          existingTicket: duplicate,
        },
        { status: 400 }
      );
    }

    // Buat nomor antrean: kode_poli + nomor urut 3 digit (misal: UMM-004)
    const nextNumber = existingCount + 1;
    const ticketNumber = `${poli.code}-${String(nextNumber).padStart(3, "0")}`;

    const newTicket = await prisma.queueTicket.create({
      data: {
        ticketNumber,
        nik: nik.trim(),
        patientName: patientName.trim(),
        phone: phone.trim(),
        gender: gender || "L",
        poliId: poli.id,
        appointmentDate,
        patientType: patientType || "BPJS",
        bpjsNumber: bpjsNumber ? bpjsNumber.trim() : null,
        complaint: complaint ? complaint.trim() : null,
        address: address ? address.trim() : null,
        status: "MENUNGGU",
      },
      include: {
        poli: {
          select: {
            id: true,
            name: true,
            code: true,
            roomNumber: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Nomor antrean berhasil dibuat!",
      data: newTicket,
    });
  } catch (error) {
    console.error("Error creating queue ticket:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
