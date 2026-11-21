import React from "react";
import { prisma } from "@/lib/prisma";
import AdminInformasiManager from "./AdminInformasiManager";
import { PKM_INFO } from "@/lib/constants";

export const dynamic = "force-dynamic";

const DEFAULT_SETTING = {
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
};

export default async function AdminInformasiPage() {
  let setting: any = DEFAULT_SETTING;

  try {
    const dbSetting = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    if (dbSetting) {
      setting = dbSetting;
    } else {
      setting = await prisma.siteSetting.create({
        data: DEFAULT_SETTING,
      });
    }
  } catch (err) {
    console.warn("[AdminInformasiPage] Database unavailable, using default setting:", err);
  }

  return (
    <div className="space-y-6">
      <AdminInformasiManager initialSetting={setting} />
    </div>
  );
}
