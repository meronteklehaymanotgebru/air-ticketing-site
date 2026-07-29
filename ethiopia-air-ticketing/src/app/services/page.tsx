"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  FileText,
  Building2,
  Briefcase,
  Crown,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Headphones,
  CreditCard,
  Car,
} from "lucide-react";

const MAIN_SERVICE = {
  title: "Flight Booking & Instant Ticket Issuance",
  desc: "Our primary expertise. Fast, reliable domestic and international flight reservations with real-time seat locks and fast turnarounds.",
  image:
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=1000",
  features: [
    "Domestic & International Flight Booking",
    "Instant Ticket Issuance",
    "Rebooking & Date Changes",
    "Flight Refund Processing",
  ],
};

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "air", label: "✈️ Air Travel & Support" },
  { id: "visa", label: "🛂 Visa & Protection" },
  { id: "stay-tours", label: "🏨 Hotels, Tours & Transport" },
  { id: "corp-vip", label: "⭐️ Corporate & VIP" },
];

const SERVICES_DATA = [
  {
    id: "air",
    category: "air",
    title: "Air Travel Services",
    icon: Plane,
    badge: "Core Service",
    desc: "Complete ticketing solutions for all global and domestic routes.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600",
    items: [
      "Domestic Flight Booking",
      "International Flight Booking",
      "Flight Ticket Issuance",
      "Flight Ticket Rebooking & Date Changes",
      "Flight Ticket Cancellation",
      "Flight Refund Processing",
      "Group Flight Reservations",
      "Corporate Travel Management",
      "Multi-City Flight Bookings",
    ],
  },
  {
    id: "visa",
    category: "visa",
    title: "Visa & Travel Documentation",
    icon: FileText,
    badge: "Documentation",
    desc: "End-to-end guidance and filing assistance for smooth approvals.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    items: [
      "Visa Application Assistance",
      "Tourist Visa Services",
      "Student Visa Assistance",
      "Visa Appointment Booking",
      "Travel Document Consultation",
    ],
  },
  {
    id: "hotels",
    category: "stay-tours",
    title: "Hotel & Accommodation",
    icon: Building2,
    badge: "Stays",
    desc: "Worldwide reservations tailored to luxury, business, or budget needs.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    items: [
      "Hotel Reservations Worldwide",
      "Budget Hotel Bookings",
      "Business Hotel Reservations",
      "Apartment & Resort Bookings",
    ],
  },
  {
    id: "transport",
    category: "stay-tours",
    title: "Ground Transportation",
    icon: Car,
    badge: "Transfers",
    desc: "Seamless vehicle arrangements upon landing at your destination.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    items: [
      "Airport Transfer Arrangements",
      "Car Rental Services",
      "Chauffeur Services",
    ],
  },
  {
    id: "protection",
    category: "visa",
    title: "Travel Protection",
    icon: ShieldCheck,
    badge: "Insurance",
    desc: "Comprehensive security policies shielding you against unexpected delays.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    items: [
      "Travel Insurance",
      "Medical Travel Insurance",
      "Trip Protection Plans",
    ],
  },
  {
    id: "tours",
    category: "stay-tours",
    title: "Holiday & Tour Packages",
    icon: Globe2,
    badge: "Vacations",
    desc: "Handcrafted leisure and tour arrangements for families, pairs, and groups.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600",
    items: [
      "International Tour Packages",
      "Domestic Tour Packages",
      "Honeymoon Packages",
      "Family Vacation Packages",
      "Group Tours",
      "Customized Travel Packages",
    ],
  },
  {
    id: "corporate",
    category: "corp-vip",
    title: "Corporate Travel Solutions",
    icon: Briefcase,
    badge: "Business",
    desc: "Dedicated corporate account handling, compliance, and group itineraries.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    items: [
      "Business Travel Planning",
      "Corporate Flight Bookings",
      "Travel Policy Support",
      "Conference & Event Travel",
    ],
  },
  {
    id: "premium-vip",
    category: "corp-vip",
    title: "VIP & Airport Assistance",
    icon: Crown,
    badge: "VIP Exclusive",
    isLightVip: true,
    desc: "White-glove airport reception, fast-tracking, and lounge arrangements.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    items: [
      "Airport Meet & Greet",
      "CIP/VIP Airport Assistance",
      "Special Assistance Requests (SSR)",
      "Lounge Access Arrangements (where available)",
    ],
  },
  {
    id: "support",
    category: "air",
    title: "Travel Support & Advisory",
    icon: Headphones,
    badge: "Advisory",
    desc: "Expert flight updates, route consultation, and traveler support.",
    image:
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=600",
    items: [
      "Travel Consultation",
      "Travel Itinerary Planning",
      "Destination Information",
      "Baggage Guidance",
      "Airline Schedule Updates",
      "Travel Advisory Information",
    ],
  },
  {
    id: "payment",
    category: "air",
    title: "Payment & Customer Care",
    icon: CreditCard,
    badge: "After-Sales",
    desc: "Transparent invoicing, receipting, and 24/7 client care desk.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    items: [
      "Flexible Payment Options",
      "Booking Confirmation",
      "Invoice & Receipt Issuance",
      "After-Sales Customer Support",
      "24/7 Emergency Travel Assistance",
    ],
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices =
    activeTab === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter(
          (s) => s.category === activeTab || (activeTab === "corp-vip" && s.isLightVip)
        );

  return (
    <div className="bg-slate-50 text-text-primary min-h-screen antialiased">
      {/* Header Banner */}
      <section className="relative bg-brand-900 text-white pt-10 pb-16 sm:pt-16 sm:pb-20 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Our Full Range of <span className="text-brand-gold">Services</span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need for a frictionless journey, from instant tickets to VIP airport lounge clearance.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 bg-slate-50"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-2 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
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

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 text-center lg:text-left flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-brand-gold/15 text-brand-900 font-bold text-xs uppercase tracking-wider rounded-full">
                  Core Specialty
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 tracking-tight">
                  {MAIN_SERVICE.title}
                </h2>

                <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  {MAIN_SERVICE.desc}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
                  {MAIN_SERVICE.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-brand-900 font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-sm shadow-md text-center"
                >
                  <Plane className="w-4 h-4" />
                  <span>Book Flight Now</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-brand-900 px-6 py-3.5 rounded-xl font-bold transition-all text-sm text-center"
                >
                  <span>Inquire Direct</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-900 overflow-hidden">
              <Image
                src={MAIN_SERVICE.image}
                alt="Global Flight Network"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <p className="text-xs uppercase tracking-widest text-brand-gold font-extrabold">
                  Global Flight Booking
                </p>
                <p className="text-xs text-gray-200 font-medium mt-0.5">
                  Direct rates and flight reservations from Addis Ababa globally.
                </p>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const Icon = service.icon;
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
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
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

                    {/* Card Action Link */}

                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>
    </div>
  );
}