"use client";

import React, { useState } from "react";
import {
  Building2,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  User,
  ShieldAlert,
  MessageCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface SettingData {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  headOfClinic: string;
  mapsUrl: string;
}

interface Props {
  initialSetting: SettingData;
}

export default function AdminInformasiManager({ initialSetting }: Props) {
  const [form, setForm] = useState<SettingData>(initialSetting);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Informasi profil dan kontak Puskesmas berhasil diperbarui!");
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        alert(json.message || "Gagal menyimpan.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">
          Edit Informasi & Kontak Puskesmas
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Perbarui data pimpinan, alamat, nomor telepon darurat, dan kontak resmi yang tampil di halaman website.
        </p>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Instansi */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-medical-600" />
            <span>Identitas Instansi & Pimpinan</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Nama Instansi *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Nama Kepala Puskesmas *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.headOfClinic}
                  onChange={(e) => setForm({ ...form, headOfClinic: e.target.value })}
                  placeholder="dr. Cepy Tricahyadi"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1.5">Slogan / Tagline Pelayanan</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1.5">Alamat Lengkap *</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Kontak & Hotline Darurat */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="w-4 h-4 text-medical-600" />
            <span>Kontak & Saluran Darurat</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Hotline Darurat / Ambulans 24 Jam *</label>
              <div className="relative">
                <ShieldAlert className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.emergencyPhone}
                  onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                  placeholder="0812-9587-4439"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-rose-200 rounded-xl bg-rose-50/20 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden font-semibold text-rose-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Nomor WhatsApp Pelayanan *</label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="081295874439"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Telepon Kantor / Loket Pendaftaran</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(022) 7792-341"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Email Resmi Puskesmas</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="puskesmascimanggung@gmail.com"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1.5">Link Google Maps Lokasi</label>
            <div className="relative">
              <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={form.mapsUrl}
                onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-bold px-6 py-3 rounded-xl shadow-card transition text-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Perubahan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Informasi</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
