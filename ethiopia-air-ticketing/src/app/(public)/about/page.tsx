"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Award,
  Headphones,
  ShieldCheck,
  CheckCircle2,
  Target,
  Compass,
  Globe,
  ChevronLeft,
  ChevronRight,
  Building2,
  Ticket,
} from "lucide-react";

const STATS = [
  { label: "Industry Experience", value: "3+ Yrs", icon: Award },
  { label: "Current Status", value: "IATA Accredited", icon: ShieldCheck },
  { label: "Coverage", value: "Global & Local", icon: Globe },
  { label: "Dedicated Support", value: "24/7", icon: Headphones },
];

const CORE_VALUES = [
  { name: "Customer First", desc: "Prioritizing traveler needs and delivering personalized support at every step." },
  { name: "Integrity", desc: "Providing transparent airfares and honest, reliable travel advisory." },
  { name: "Professionalism", desc: "Delivering expert airline ticketing with high operational standards." },
  { name: "Reliability", desc: "Dependable booking fulfillment and responsive emergency travel support." },
  { name: "Innovation", desc: "Utilizing advanced travel solutions and modern ticketing technology." },
  { name: "Teamwork", desc: "Collaborative expertise ensuring smooth, hassle-free travel experiences." },
  { name: "Excellence", desc: "Uncompromising quality across all domestic and international services." },
];

const CREDENTIALS = [
  {
    title: "Commercial Business License",
    subtitle: "Ministry of Trade & Regional Integration",
    image: "/Business-License.png",
    icon: Building2,
    desc: "Fully registered and licensed Ethiopian travel agency operating in Addis Ababa.",
  },
  {
    title: "IATA Accreditation Certificate",
    subtitle: "International Air Transport Association",
    image: "/IATA-certification.png",
    icon: ShieldCheck,
    desc: "Authorized direct ticketing authority for international and domestic airlines.",
  },
  {
    title: "Reservation, Fares & Ticketing Qualification",
    subtitle: "Certified Professional Training",
    image: "/certificate.jpg",
    icon: Ticket,
    desc: "Certified expertise in global reservation systems, fare calculation, and ticketing procedures.",
  },
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CORE_VALUES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CORE_VALUES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="bg-white text-gray-900 min-h-screen antialiased">
      <section className="relative bg-brand-900 text-white pt-10 pb-16 sm:pt-16 sm:pb-20 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            About <span className="text-brand-gold">Ask Travel Trading PLC</span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            An Ethiopian travel agency based in Addis Ababa, dedicated to providing reliable and professional travel solutions for individual and corporate clients.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="py-6 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="p-3 bg-brand-900 text-brand-gold rounded-xl shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-brand-900 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-gray-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-brand-gold">
                  Our Journey
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 leading-tight">
                  Company History
                </h2>
              </div>

              <div className="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base font-medium">
                <p>
                  <strong className="text-brand-900 font-bold">Ask Travel Trading PLC</strong> is an Ethiopian travel agency based in Addis Ababa, dedicated to providing reliable and professional travel solutions for both individual and corporate clients. Since our establishment, we have built a reputation for excellent customer service, competitive airfares, and personalized travel support.
                </p>
                <p>
                  Starting as a Non-IATA travel agency, Ask Travel successfully served thousands of travelers while expanding its network and expertise. The company has now achieved <strong className="text-brand-900 font-bold">IATA Accreditation</strong>, strengthening our ability to provide international airline ticketing and travel services directly.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-900">IATA Accredited</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Direct global airline ticketing capabilities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-900">3+ Years Experience</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Proven track record in Ethiopian travel.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-2 lg:mt-0">
              <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
                <div className="absolute top-0 right-0 w-[78%] h-[78%] rounded-3xl overflow-hidden shadow-md border-4 border-white z-10 hover:z-30 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/office-2.png"
                    alt="Ask Travel team at work"
                    fill
                    sizes="(max-width: 768px) 70vw, 30vw"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 w-[78%] h-[78%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 hover:scale-105 transition-all duration-300">
                  <Image
                    src="/office-1.png"
                    alt="Ask Travel office in Addis Ababa"
                    fill
                    sizes="(max-width: 768px) 70vw, 30vw"
                    className="object-cover"
                    priority
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>

                <div className="absolute bottom-1 -right-1 -translate-x-1/2 -translate-y-1/2 z-30 bg-brand-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-brand-gold/40 shadow-xl whitespace-nowrap text-center">
                  <span className="text-xs font-black text-brand-gold tracking-wider uppercase block">Bole Main Office</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-50/50 to-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-brand-gold">
              Purpose & Direction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-0.5">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg shadow-gray-200/40 flex flex-col items-center text-center group hover:border-brand-gold/40 transition-all">
              <div className="relative w-16 h-16 rounded-full bg-brand-900 text-white flex items-center justify-center mb-4 shadow-md shadow-brand-900/20 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                To provide reliable, affordable, and customer-focused travel solutions by delivering professional airline ticketing, visa assistance, hotel reservations, and travel support with integrity, efficiency, and excellence.
              </p>
            </div>

            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg shadow-gray-200/40 flex flex-col items-center text-center group hover:border-brand-gold/40 transition-all">
              <div className="relative w-16 h-16 rounded-full bg-brand-900 text-white flex items-center justify-center mb-4 shadow-md shadow-brand-900/20 group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-900 mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                To become one of Ethiopia&apos;s most trusted and innovative travel agencies, recognized for exceptional customer service, advanced travel solutions, and strong global partnerships.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-gold">
                What Guides Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mt-0.5">
                Our Core Values
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous value"
                className="p-2.5 rounded-full border border-gray-200 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all text-gray-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next value"
                className="p-2.5 rounded-full border border-gray-200 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative bg-brand-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden min-h-[180px] flex flex-col justify-center">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-brand-gold/20 text-brand-gold rounded-full text-[10px] font-bold uppercase tracking-wider">
                <span>Value {currentIndex + 1} of {CORE_VALUES.length}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                {CORE_VALUES[currentIndex].name}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                {CORE_VALUES[currentIndex].desc}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {CORE_VALUES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-6 bg-brand-gold" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gray-50/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 pt-1">
              Accreditation, Licensing & Certifications
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              We operate with full legal compliance, authorized IATA ticketing, and certified expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {CREDENTIALS.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-56 sm:h-64 bg-gray-900/90 overflow-hidden p-4 flex items-center justify-center">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    
                    <div className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-md rounded-xl text-brand-900 shadow-md z-10">
                      <Icon className="w-4 h-4 text-brand-900" />
                    </div>
                  </div>

                  <div className="p-5 space-y-1 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
                        {cert.subtitle}
                      </p>
                      <h3 className="text-base font-extrabold text-brand-900 leading-snug mt-0.5">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed pt-1.5">
                        {cert.desc}
                      </p>
                    </div>
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