import { ShieldCheck, Clock, Headphones } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted Agency",
    desc: "5+ years serving Ethiopian travelers with verified flight solutions.",
  },
  {
    icon: Clock,
    title: "Fast Quotes",
    desc: "Get personalized quotations and itineraries delivered in under 2 hours.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Direct 1-on-1 personal assistance via WhatsApp and Telegram.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standardized Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 tracking-tight">
            Why <span className="text-brand-gold">Choose Us</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
            What makes us the preferred travel partner in Ethiopia
          </p>
        </div>

        {/* Responsive Grid System: 1-col Mobile -> 3-col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 pt-10 sm:pt-12 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-900 flex items-center justify-center">
                  <r.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-brand-900 mb-2 sm:mb-3">
                {r.title}
              </h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}