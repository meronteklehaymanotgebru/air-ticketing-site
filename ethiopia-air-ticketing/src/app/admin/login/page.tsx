"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Use replace instead of push so the user cannot hit 'Back' to return to the login page
        router.replace("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-gold/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-brand-900/50 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10">
        
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-amber-600 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <Plane className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-300 text-sm mt-2 font-medium">Enter your credentials to access the system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                placeholder="admin@flyethiopia.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-3.5 rounded-xl text-sm font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-brand-gold to-amber-500 text-amber-950 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : "Secure Sign In"}</span>
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}