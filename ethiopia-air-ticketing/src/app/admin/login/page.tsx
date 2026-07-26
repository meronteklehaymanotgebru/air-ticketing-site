"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "YourSecurePassword123") { // use env var in production
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
          placeholder="Enter password"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-brand-500 text-white w-full py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
}