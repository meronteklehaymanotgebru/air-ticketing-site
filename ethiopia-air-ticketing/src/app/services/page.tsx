import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  FileText,
  Users,
  Briefcase,
  ShieldCheck,
  Headphones,
  Globe2,
} from "lucide-react";

const MAIN_SERVICE = {
  icon: Plane,
  title: "Flight Booking & Ticketing",
  desc: "Our core specialty. Secure domestic and international flights at competitive rates with instant personalized quotations.",
  image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=1000",
  features: [
    "Personalized quotes within 2 hours",
    "Direct booking with 15+ major airlines",
    "Multi-city & flexible date options",
    "Special group & corporate discounts",
  ],
};

const SERVICES = [
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "End-to-end guidance and document verification for tourist, business, and transit visa applications.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Users,
    title: "Group Travel",
    desc: "Tailored flight arrangements and discounted rates for families, tour groups, and special events.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Seamless business travel management with flexible rebooking policies and dedicated account support.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    desc: "Comprehensive coverage options protecting you against flight cancellations, medical emergencies, and lost baggage.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Headphones,
    title: "24/7 Agent Support",
    desc: "Direct access to real travel experts in Addis Ababa via WhatsApp and Telegram for urgent changes.",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-text-primary min-h-screen antialiased">
      
      <section className="relative bg-brand-900 text-white pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden min-h-[25vh] sm:min-h-[30vh] md:min-h-[35vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Our <span className="text-brand-gold">Services</span>
          </h1>
          
          <p className="mt-2 sm:mt-2.5 md:mt-3 text-sm sm:text-base md:text-lg text-gray-200 max-w-[85%] sm:max-w-md md:max-w-xl mx-auto font-normal leading-relaxed">
            Everything you need for a smooth journey, from quick flight issuance to visa support and insurance.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 md:h-10 lg:h-12 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-2 sm:pt-4 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
            
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 text-center lg:text-left flex flex-col justify-between space-y-6 z-10">
              <div className="space-y-4">

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight">
                  {MAIN_SERVICE.title}
                </h2>

                <p className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {MAIN_SERVICE.desc}
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  {MAIN_SERVICE.features.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs sm:text-sm text-brand-900 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md w-full sm:w-auto text-center text-sm sm:text-base"
                >
                  Book a Flight
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-gradient-to-br from-brand-900 to-slate-900 flex items-center justify-center p-6 sm:p-8 overflow-hidden">
              <Image
                src={MAIN_SERVICE.image}
                alt="Global Flight Network"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-20 mix-blend-overlay"
              />

              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center animate-pulse">
                    <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" />
                  </div>
                  <Plane className="w-5 h-5 text-white absolute -top-1 -right-1 rotate-45" />
                </div>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
                  Global Flight Coverage
                </p>
                <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                  Connecting Addis Ababa with over 100+ destinations worldwide.
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Card Image Header */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-brand-900/10 transition-colors" />

                    <div className="absolute bottom-4 left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-brand-900 shadow-md flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {service.desc}
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