"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Trash2,
  Calendar,
  User,
  X,
  Pin,
  CheckCircle2,
  AlertCircle,
  Tag,
} from "lucide-react";

interface AnnouncementItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  isPinned: boolean;
  author: string;
  publishedAt: Date | string;
}

interface Props {
  initialAnnouncements: AnnouncementItem[];
}

export default function AdminPengumumanManager({
  initialAnnouncements,
}: Props) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(
    initialAnnouncements
  );
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "UMUM",
    isPinned: false,
    author: "Tim Promkes Puskesmas Cimanggung",
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    try {
      const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus.");
    }
  };

  const handleTogglePin = async (item: AnnouncementItem) => {
    try {
      const res = await fetch(`/api/announcements/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !item.isPinned }),
      });
      if (res.ok) {
        setAnnouncements((prev) =>
          prev.map((a) =>
            a.id === item.id ? { ...a, isPinned: !item.isPinned } : a
          )
        );
      }
    } catch (err) {
      alert("Gagal memperbarui pin.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setAnnouncements((prev) => [json.data, ...prev]);
        setShowModal(false);
        setForm({
          title: "",
          summary: "",
          content: "",
          category: "UMUM",
          isPinned: false,
          author: "Tim Promkes Puskesmas Cimanggung",
        });
      } else {
        alert(json.message || "Gagal menyimpan pengumuman");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Pengumuman & Berita Kesehatan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publikasikan kabar vaksinasi, jadwal Posyandu, program CKG, dan edukasi kesehatan untuk masyarakat Cimanggung.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 bg-medical-600 hover:bg-medical-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Pengumuman</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-5 shadow-soft flex flex-col justify-between transition ${
              item.isPinned ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-medical-50 text-medical-700 border border-medical-200 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <button
                  onClick={() => handleTogglePin(item)}
                  className={`p-1 rounded-lg text-xs flex items-center gap-1 font-bold ${
                    item.isPinned
                      ? "text-amber-700 bg-amber-50"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                  title={item.isPinned ? "Lepas semat" : "Sematkan di atas"}
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{item.isPinned ? "Tersemat" : "Pin"}</span>
                </button>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{item.author}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL BUAT PENGUMUMAN */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Buat Pengumuman Baru</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Cek Kesehatan Gratis Desa Sindangpakuon"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    aria-label="Kategori"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="UMUM">Umum</option>
                    <option value="CKG">Cek Kesehatan Gratis (CKG)</option>
                    <option value="POSYANDU">Posyandu & Balita</option>
                    <option value="VAKSINASI">Vaksinasi</option>
                    <option value="DARURAT">Darurat / Siaga</option>
                    <option value="EDUKASI">Edukasi Hidup Sehat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Unit *</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Lead) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 1-2 kalimat yang tampil di kartu depan..."
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Lengkap Pengumuman *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tuliskan isi informasi, syarat, tanggal, dan lokasi lengkap..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={form.isPinned}
                  onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                  className="rounded text-medical-600 focus:ring-medical-500"
                />
                <label htmlFor="isPinned" className="font-semibold text-slate-700 cursor-pointer">
                  Sematkan di posisi teratas (Pinned Announcement)
                </label>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold"
                >
                  {submitting ? "Menyimpan..." : "Publikasikan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
