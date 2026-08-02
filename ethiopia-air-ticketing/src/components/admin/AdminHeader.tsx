"use client";

import { UserPayload } from "@/lib/auth";
import { LogOut, UserCircle, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHeader({ user, onMenuClick }: { user: UserPayload | null; onMenuClick?: () => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm relative z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-semibold text-gray-700 text-sm hidden sm:block">
          {user ? `Welcome, ${user.name}` : "Admin Dashboard"}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 text-sm">
        {user && (
          <>
            <div className="flex items-center gap-2 text-gray-600 border-r pr-2 md:pr-4">
              <UserCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium hidden sm:inline">{user.role}</span>
              {user.branch && <span className="text-gray-400 hidden sm:inline">({user.branch})</span>}
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
