import React from "react";
import { prisma } from "@/lib/prisma";
import AdminAntreanManager from "./AdminAntreanManager";
import { getTodayDateString } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAntreanPage() {
  const todayStr = getTodayDateString();

  const [queues, polis] = await Promise.all([
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

  return (
    <div className="space-y-6">
      <AdminAntreanManager initialQueues={queues} polis={polis} todayDate={todayStr} />
    </div>
  );
}
