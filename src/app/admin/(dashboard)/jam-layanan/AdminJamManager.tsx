"use client";

import React, { useState } from "react";
import { Clock, Save, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

interface OperationalHourItem {
  id: string;
  dayOfWeek: number;
  dayName: string;
  loketOpen: string;
  loketClose: string;
  serviceOpen: string;
  serviceClose: string;
  isClosed: boolean;
  notes: string | null;
}

interface Props {
  initialHours: OperationalHourItem[];
}

export default function AdminJamManager({ initialHours }: Props) {
  const [hours, setHours] = useState<OperationalHourItem[]>(initialHours);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpdate = async (item: OperationalHourItem) => {
    setSavingId(item.id);
    setSuccessMsg(null);
    try {
      const res = await fetch("/api/operational-hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(`Jam operasional hari ${item.dayName} berhasil diperbarui.`);
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert(json.message || "Gagal menyimpan.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setSavingId(null);
    }
  };

  const handleFieldChange = (
    id: string,
    field: keyof OperationalHourItem,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    setHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Pengaturan Jam Operasional Puskesmas
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sesuaikan waktu pendaftaran loket, pelayanan poli rawat jalan, dan status libur/tutup per hari. UGD dan PONED selalu berstatus siaga 24 jam.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Hari</th>
                <th className="py-3.5 px-4 font-bold">Loket Buka - Tutup</th>
                <th className="py-3.5 px-4 font-bold">Pelayanan Poli Buka - Selesai</th>
                <th className="py-3.5 px-4 font-bold text-center">Status Tutup / Libur</th>
                <th className="py-3.5 px-4 font-bold">Catatan Khusus</th>
                <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hours.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.dayName}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        disabled={item.isClosed}
                        value={item.loketOpen}
                        onChange={(e) =>
                          handleFieldChange(item.id, "loketOpen", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono disabled:bg-slate-100"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        disabled={item.isClosed}
                        value={item.loketClose}
                        onChange={(e) =>
                          handleFieldChange(item.id, "loketClose", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono disabled:bg-slate-100"
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        disabled={item.isClosed}
                        value={item.serviceOpen}
                        onChange={(e) =>
                          handleFieldChange(item.id, "serviceOpen", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono disabled:bg-slate-100"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        disabled={item.isClosed}
                        value={item.serviceClose}
                        onChange={(e) =>
                          handleFieldChange(item.id, "serviceClose", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono disabled:bg-slate-100"
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={item.isClosed}
                      onChange={(e) =>
                        handleFieldChange(item.id, "isClosed", e.target.checked)
                      }
                      className="rounded text-medical-600 focus:ring-medical-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <input
                      type="text"
                      placeholder="Catatan..."
                      value={item.notes || ""}
                      onChange={(e) =>
                        handleFieldChange(item.id, "notes", e.target.value)
                      }
                      className="w-full px-2.5 py-1 border border-slate-200 rounded-lg text-xs"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleUpdate(item)}
                      disabled={savingId === item.id}
                      className="inline-flex items-center gap-1 bg-medical-600 hover:bg-medical-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingId === item.id ? "Menyimpan..." : "Simpan"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
