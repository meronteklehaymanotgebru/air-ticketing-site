// src/app/services/page.tsx
import {
  Plane,
  Briefcase,
  Users,
  FileText,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const mainService = {
  icon: Plane,
  title: "Flight Booking",
  desc: "Domestic & international flights at the best rates. Personalised quotations within 2 hours.",
};

const orbitServices = [
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "Guidance & support for your visa application.",
  },
  {
    icon: Users,
    title: "Group Travel",
    desc: "Special discounts for families & groups.",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Tailored solutions for business trips.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    desc: "Comprehensive coverage for peace of mind.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always available via WhatsApp & Telegram.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900">
            Our <span className="text-brand-gold">Services</span>
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need for a smooth journey – from booking to landing and beyond.
          </p>
        </div>
      </section>

      {/* Circular Layout – visible on lg+ screens */}
      <section className="hidden lg:block relative py-8 pb-24">
        <div className="relative w-full max-w-[900px] h-[700px] mx-auto">
          {/* Central large circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white border-2 border-brand-gold shadow-2xl flex flex-col items-center justify-center p-8 text-center group hover:scale-105 transition-transform duration-300 z-20">
            <div className="w-20 h-20 rounded-full bg-brand-900 flex items-center justify-center mb-4 group-hover:bg-brand-gold transition-colors duration-300">
              <mainService.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">{mainService.title}</h3>
            <p className="mt-2 text-text-secondary text-sm leading-relaxed">{mainService.desc}</p>
          </div>

          {/* Orbiting smaller circles */}
          {orbitServices.map((service, idx) => {
            // 5 items equally spaced around a circle (start from top, clockwise)
            const angle = idx * (360 / 5) - 90; // -90 so first is at top
            const radius = 280; // distance from center
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={idx}
                className="absolute w-48 h-48 rounded-full bg-white border border-gray-200 shadow-md flex flex-col items-center justify-center p-4 text-center group hover:shadow-xl hover:border-brand-gold hover:scale-105 transition-all duration-300 z-10"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center mb-3 group-hover:bg-brand-gold transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-base font-semibold text-brand-900">{service.title}</h4>
                <p className="mt-1 text-text-secondary text-xs leading-snug">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mobile/Tablet fallback – linear grid */}
      <section className="lg:hidden py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Main service card */}
            <div className="bg-white border border-brand-gold rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-900 flex items-center justify-center mb-4">
                <mainService.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-900">{mainService.title}</h3>
              <p className="mt-2 text-text-secondary text-sm">{mainService.desc}</p>
            </div>
            {/* Orbit services */}
            {orbitServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:border-brand-gold transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center mb-3">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-brand-900">{service.title}</h4>
                <p className="mt-1 text-text-secondary text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}