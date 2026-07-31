"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ServiceData = {
  id: string;
  category: string;
  title: string;
  iconName: string;
  badge: string;
  desc: string;
  image: string;
  isLightVip: boolean;
  items: string[];
};

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "air", label: "✈️ Air Travel & Support" },
  { id: "visa", label: "🛂 Visa & Protection" },
  { id: "stay-tours", label: "🏨 Hotels, Tours & Transport" },
  { id: "corp-vip", label: "⭐️ Corporate & VIP" },
];

export default function ServicesList({ services }: { services: ServiceData[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter(
          (s) => s.category === activeTab || (activeTab === "corp-vip" && s.isLightVip)
        );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Premium Highlight Card */}
      <div className="relative bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-amber-500/10 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-44 h-44 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-amber-400 to-brand-gold text-brand-900 rounded-full font-black text-xs uppercase tracking-wider shadow-sm">
              <span>⭐️ Premium VIP Experience</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900">
              Airport Meet & Greet, CIP/VIP & Lounge Access
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
              Bypass the long airport lines. Enjoy dedicated baggage assistance, CIP/VIP expedited terminal clearance, Special Assistance Requests (SSR), and private lounge booking.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white px-7 py-4 rounded-2xl font-bold transition-all text-sm shrink-0 shadow-lg hover:shadow-xl"
          >
            <span>Request VIP Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === cat.id
                ? "bg-brand-900 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-brand-900"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dynamic Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          // Dynamically grab the icon from lucide-react based on the string name
          const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.Globe2;
          const isVip = service.isLightVip;

          return (
            <div
              key={service.id}
              className={`rounded-3xl transition-all duration-300 flex flex-col justify-between border overflow-hidden ${
                isVip
                  ? "bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-amber-300 shadow-md ring-1 ring-amber-200"
                  : "bg-white border-gray-200/80 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-100">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                      isVip
                        ? "bg-amber-300 text-amber-950"
                        : "bg-white/90 text-brand-900 backdrop-blur-sm"
                    }`}
                  >
                    {service.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      isVip
                        ? "bg-amber-400 text-amber-950"
                        : "bg-brand-900 text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-sm">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-text-secondary text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <div className="pt-2 border-t border-gray-100/80">
                    <div className="grid grid-cols-1 gap-2">
                      {service.items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 border transition-all ${
                            isVip
                              ? "bg-white/80 border-amber-200/80 text-amber-950"
                              : "bg-slate-50/70 border-slate-100 text-gray-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isVip ? "bg-amber-500" : "bg-brand-gold"
                            }`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-medium">
          No services found for this category yet.
        </div>
      )}
    </div>
  );
}
