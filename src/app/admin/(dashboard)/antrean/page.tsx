import React from "react";
import { prisma } from "@/lib/prisma";
import { FALLBACK_POLIS } from "@/lib/mockData";
import AdminAntreanManager from "./AdminAntreanManager";
import { getTodayDateString } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAntreanPage() {
  const todayStr = getTodayDateString();

  let queues: any[] = [];
  let polis: any[] = FALLBACK_POLIS;

  try {
    const [dbQueues, dbPolis] = await Promise.all([
      prisma.queueTicket.findMany({
        where: { appointmentDate: todayStr },
        include: {
          poli: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.poli.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      }),
    ]);
    if (dbQueues) queues = dbQueues;
    if (dbPolis && dbPolis.length > 0) polis = dbPolis;
  } catch (err) {
    console.warn("[AdminAntreanPage] Database unavailable:", err);
  }

  return (
    <div className="space-y-6">
      <AdminAntreanManager initialQueues={queues} polis={polis} todayDate={todayStr} />
    </div>
  );
}
