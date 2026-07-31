"use client";

import { UserPayload } from "@/lib/auth";
import { LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHeader({ user }: { user: UserPayload | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0 shadow-sm">
      <div className="font-semibold text-gray-700 text-sm">
        {user ? `Welcome, ${user.name}` : "Admin Dashboard"}
      </div>

      <div className="flex items-center gap-4 text-sm">
        {user && (
          <>
            <div className="flex items-center gap-2 text-gray-600 border-r pr-4">
              <UserCircle className="w-4 h-4" />
              <span className="font-medium">{user.role}</span>
              {user.branch && <span className="text-gray-400">({user.branch})</span>}
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
