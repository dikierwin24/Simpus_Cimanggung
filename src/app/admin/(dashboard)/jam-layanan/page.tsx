import React from "react";
import { prisma } from "@/lib/prisma";
import AdminJamManager from "./AdminJamManager";

export const dynamic = "force-dynamic";

export default async function AdminJamLayananPage() {
  const hours = await prisma.operationalHour.findMany({
    orderBy: { dayOfWeek: "asc" },
  });

  return (
    <div className="space-y-6">
      <AdminJamManager initialHours={hours} />
    </div>
  );
}
