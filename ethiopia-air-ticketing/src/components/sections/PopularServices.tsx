"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ticket,
  Crown,
  Globe2,
  Hotel,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const POPULAR_SERVICES = [
  {
    icon: Ticket,
    title: "International & Domestic Ticketing",
    desc: "Direct IATA-accredited bookings across Ethiopian Airlines, Emirates, Qatar Airways, and 100+ global airlines with flexible itinerary adjustments.",
  },
  {
    icon: Globe2,
    title: "Visa Assistance & Travel Advisory",
    desc: "End-to-end guidance for tourist, business, and transit visa applications with document validation.",
  },
  {
    icon: Hotel,
    title: "Hotel & Accommodation Booking",
    desc: "Curated stays worldwide, negotiated corporate rates, and preferred travel discounts.",
  },
];

const VIP_SERVICES = [
  {
    icon: Crown,
    title: "VIP Airport Concierge & Lounge Access",
    desc: "Fast-track security clearance, priority check-in, private baggage assistance, and lounge access globally.",
  },
  {
    icon: Sparkles,
    title: "Private Jet & Charter Coordination",
    desc: "Bespoke executive aircraft chartering for corporate teams, diplomatic delegations, or luxury private trips.",
  },
  {
    icon: ShieldCheck,
    title: "Corporate & Executive Travel Management",
    desc: "Dedicated account manager, 24/7 priority hotline, flexible billing, and instant emergency rerouting.",
  },
];

export default function PopularServices() {
  const [activeTab, setActiveTab] = useState<"popular" | "vip">("popular");
  const currentServices = activeTab === "popular" ? POPULAR_SERVICES : VIP_SERVICES;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-gray-50/60 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative w-full h-[480px] sm:h-[540px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-0 left-0 w-[48%] h-[40%] rounded-2xl overflow-hidden shadow-lg border-2 border-white hover:z-30 hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800"
                alt="Traveler with suitcase at airport terminal"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="absolute top-4 right-0 w-[48%] h-[45%] rounded-2xl overflow-hidden shadow-xl border-2 border-white hover:z-30 hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800"
                alt="Happy Black woman traveler at departure gate"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="absolute top-[32%] left-[26%] w-[48%] h-[38%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
                alt="Passenger airliner preparing for flight"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-black uppercase text-brand-gold tracking-widest">
                  Premium Experience
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-4 w-[42%] h-[42%] rounded-2xl overflow-hidden shadow-lg border-2 border-white hover:z-30 hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800"
                alt="Hands holding flight boarding passes, visas, and passports"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-2 right-4 w-[44%] h-[38%] rounded-2xl overflow-hidden shadow-lg border-2 border-white hover:z-30 hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
                alt="Approved visa documents and travel ticket preparation"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-gold block mb-1">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight leading-tight">
                Tailored Solutions for Every Traveler
              </h2>
            </div>

            <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
              <button
                onClick={() => setActiveTab("popular")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "popular"
                    ? "bg-brand-900 text-white shadow-md"
                    : "text-gray-600 hover:text-brand-900"
                }`}
              >
                Popular Services
              </button>
              <button
                onClick={() => setActiveTab("vip")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "vip"
                    ? "bg-brand-gold text-brand-900 shadow-md font-black"
                    : "text-gray-600 hover:text-brand-900"
                }`}
              >
                <Crown className="w-4 h-4" />
                VIP & Executive
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {currentServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-brand-900/5 text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-brand-900 flex items-center gap-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}