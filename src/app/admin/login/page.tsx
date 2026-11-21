"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Stethoscope,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Home,
  Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@pkmcimanggung.go.id");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password,
      });

      if (res?.error) {
        setError(res.error || "Email atau password yang Anda masukkan salah.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan saat masuk. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-medical-950 to-teal-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative background glow & subtle dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-medical-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-teal-400/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top back button */}
      <div className="mb-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-xs transition border border-white/10"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-medical-600 to-medical-400 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-medical-500/30">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Staf & Dokter</h1>
          <p className="text-xs text-slate-500">
            UPTD Puskesmas Cimanggung • Kab. Sumedang
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-medical-50 border border-medical-200 rounded-2xl p-4 text-xs text-medical-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-medical-800">
            <ShieldCheck className="w-4 h-4 text-medical-600" />
            <span>Kredensial Login Administrator:</span>
          </div>
          <div className="font-mono text-[11px] pt-1 space-y-0.5 text-medical-900">
            <div>Email: <strong className="text-slate-900">admin@pkmcimanggung.go.id</strong></div>
            <div>Password: <strong className="text-slate-900">admin123</strong></div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Petugas / Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@pkmcimanggung.go.id"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:bg-white focus:outline-hidden transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Hanya tenaga medis dan staf resmi Puskesmas Cimanggung yang berhak mengakses panel ini.
          </p>
        </div>
      </div>
    </div>
  );
}
