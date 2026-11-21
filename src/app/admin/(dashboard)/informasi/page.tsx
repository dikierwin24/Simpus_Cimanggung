import React from "react";
import { prisma } from "@/lib/prisma";
import AdminInformasiManager from "./AdminInformasiManager";
import { PKM_INFO } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminInformasiPage() {
  let setting = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });

  if (!setting) {
    setting = await prisma.siteSetting.create({
      data: {
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
      },
    });
  }

  return (
    <div className="space-y-6">
      <AdminInformasiManager initialSetting={setting} />
    </div>
  );
}
