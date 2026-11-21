"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { User, Bell, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  userName?: string;
  userRole?: string;
}

export default function AdminHeader({
  userName = "Staf Puskesmas",
  userRole = "Administrator",
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <StatusBadge />
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs font-bold text-slate-800">{userName}</div>
          <div className="text-[10px] text-medical-600 font-semibold uppercase tracking-wider flex items-center justify-end gap-1">
            <ShieldCheck className="w-3 h-3" />
            {userRole}
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-medical-50 text-medical-600 border border-medical-200 flex items-center justify-center font-bold text-xs">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
