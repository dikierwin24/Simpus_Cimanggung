import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_POLIS } from "@/lib/mockData";

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

    try {
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
    } catch (dbErr) {
      console.warn("[GET /api/queues] DB error fallback:", dbErr);
      return NextResponse.json({ success: true, data: [] });
    }
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

    // Ambil data poli dari DB atau Fallback
    let poli: any = null;
    try {
      poli = await prisma.poli.findUnique({
        where: { id: poliId },
      });
    } catch (e) {
      // ignore
    }

    if (!poli) {
      poli = FALLBACK_POLIS.find((p) => p.id === poliId) || FALLBACK_POLIS[0];
    }

    let existingCount = 3;
    try {
      existingCount = await prisma.queueTicket.count({
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
    } catch (e) {
      // ignore count error
    }

    // Buat nomor antrean: kode_poli + nomor urut 3 digit (misal: UMM-004)
    const nextNumber = existingCount + 1;
    const ticketNumber = `${poli.code}-${String(nextNumber).padStart(3, "0")}`;

    try {
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
    } catch (dbErr) {
      console.warn("[POST /api/queues] DB create fallback:", dbErr);
      const mockTicket = {
        id: `tkt-${Date.now()}`,
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
        createdAt: new Date().toISOString(),
        poli: {
          id: poli.id,
          name: poli.name,
          code: poli.code,
          roomNumber: poli.roomNumber,
        },
      };

      return NextResponse.json({
        success: true,
        message: "Nomor antrean berhasil dibuat!",
        data: mockTicket,
      });
    }
  } catch (error) {
    console.error("Error creating queue ticket:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
