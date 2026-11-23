"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Bell,
  Clock,
  LogOut,
  Stethoscope,
  ChevronRight,
  Shield,
  Home,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jadwal", label: "Kelola Jadwal Dokter", icon: Calendar },
    { href: "/admin/pengumuman", label: "Pengumuman & Edukasi", icon: Bell },
    { href: "/admin/jam-layanan", label: "Jam Operasional", icon: Clock },
    { href: "/admin/informasi", label: "Informasi & Kontak", icon: Shield },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-medical-500 text-white flex items-center justify-center font-black shadow-md shadow-medical-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-tight leading-none">
              PANEL ADMIN
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
              Puskesmas Cimanggung
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 py-2">
          Menu Manajemen
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                active
                  ? "bg-medical-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </div>
              {active && <ChevronRight className="w-3.5 h-3.5 text-medical-200" />}
            </Link>
          );
        })}

        <div className="pt-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 py-2">
          Pintasan Publik
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Lihat Website Publik</span>
        </Link>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-600/80 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
