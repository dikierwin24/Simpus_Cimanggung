"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Menu,
  PhoneCall,
  UserCheck,
  X,
  Shield,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PKM_INFO } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda", icon: Activity },
    { href: "/jadwal", label: "Jadwal Dokter", icon: Calendar },
    { href: "/alur-layanan", label: "Alur & Jam Kerja", icon: Clock },
    { href: "/pengumuman", label: "Pengumuman", icon: FileText },
    { href: "/kontak", label: "Kontak & Lokasi", icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-medical-200/70 shadow-soft">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-medical-800 to-teal-800 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-medical-100">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              UGD & Rawat Inap PONED Siaga 24 Jam
            </span>
            <span className="text-medical-300">|</span>
            <span className="text-medical-100">
              Hotline Ambulans: <strong className="text-white font-semibold">{PKM_INFO.emergencyPhone}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-medical-200 text-[11px]">{PKM_INFO.dinas}</span>
            <Link
              href="/admin/login"
              className="text-medical-50 hover:text-white flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs transition"
            >
              <Shield className="w-3 h-3 text-amber-300" />
              Portal Staf Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-medical-700 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-glow group-hover:scale-105 transition duration-200">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-medical-700 transition">
                  PUSKESMAS CIMANGGUNG
                </span>
              </div>
              <p className="text-[11px] font-semibold text-medical-700/80 mt-1 leading-none tracking-wider">
                KABUPATEN SUMEDANG • JAWA BARAT
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? "text-medical-600 bg-medical-50 shadow-xs"
                      : "text-slate-600 hover:text-medical-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-medical-600" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Status badge & Call To Action */}
          <div className="hidden lg:flex items-center gap-3">
            <StatusBadge />
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-medical-500/20 hover:shadow-lg transition-all duration-200"
            >
              <span>Jadwal Dokter</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <StatusBadge />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-medical-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="p-2 mb-2 bg-slate-50 rounded-xl">
            <div className="text-xs text-slate-500 font-medium mb-1">Status Puskesmas Saat Ini:</div>
            <StatusBadge detailed />
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-medical-50 text-medical-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-medical-600" : "text-slate-400"}`} />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/jadwal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-medical-600 text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              Lihat Jadwal Dokter & Tenaga Medis
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-slate-100 text-slate-700 font-medium py-2.5 rounded-xl text-xs hover:bg-slate-200 transition"
            >
              Login Portal Staf & Dokter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
