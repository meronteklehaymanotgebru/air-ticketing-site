// src/components/sections/WhyChooseUs.tsx
import { ShieldCheck, Clock, Headphones } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted Agency",
    desc: "5+ years serving Ethiopian travelers.",
  },
  {
    icon: Clock,
    title: "Fast Quotes",
    desc: "Quotations in under 2 hours.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Personal assistance via WhatsApp / Telegram.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-900">
            Why Choose Us
          </h2>
          <p className="mt-2 text-lg text-text-secondary">
            What makes us the preferred travel partner in Ethiopia
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 pt-12 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Circular icon container */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-brand-900 flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-brand-900 mb-3">
                {r.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}