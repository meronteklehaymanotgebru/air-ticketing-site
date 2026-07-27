import Image from "next/image";
import { Award, Users, Plane, Headphones, MapPin } from "lucide-react";

const STATS = [
  { label: "Years Experience", value: "5+", icon: Award },
  { label: "Happy Travelers", value: "10k+", icon: Users },
  { label: "Airline Partners", value: "15+", icon: Plane },
  { label: "Dedicated Support", value: "24/7", icon: Headphones },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-text-primary min-h-screen antialiased">
      
      {/* ---------- 1. Dark Hero Header ---------- */}
      <section className="relative bg-brand-900 text-white pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden min-h-[25vh] sm:min-h-[30vh] md:min-h-[35vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            About <span className="text-brand-gold">Us</span>
          </h1>
          
          <p className="mt-2 sm:mt-2.5 md:mt-3 text-sm sm:text-base md:text-lg text-gray-200 max-w-[85%] sm:max-w-md md:max-w-xl mx-auto font-normal leading-relaxed">
            We are Ethiopia’s trusted flight booking partner, dedicated to making your travel simple, affordable, and enjoyable.
          </p>
        </div>

        {/* Curved Bottom Transition */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 md:h-10 lg:h-12 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-4 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 leading-tight">
                Company Profile
              </h2>
              
              <div className="space-y-3.5 text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg">
                <p>
                  Based in Bole, Addis Ababa, <strong className="text-brand-900 font-semibold">Ethiopia Air Ticketing</strong> is a premier travel agency connecting local and international travelers with seamless flight solutions. Over the past five years, we have built a reputation for accuracy, rapid quote delivery, and reliable customer care.
                </p>
                <p>
                  Partnering directly with leading global airlines, we deliver transparent fares, flexible group rates, and dedicated support for every step of your journey—from booking to landing.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto group">
                
                {/* Back Image (office-2) */}
                <div className="absolute top-0 right-0 w-[78%] h-[78%] rounded-2xl overflow-hidden shadow-md border-4 border-white z-10 transition-all duration-500 ease-out hover:z-30 hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <Image
                    src="/office-2.jpg"
                    alt="Our team at work"
                    fill
                    sizes="(max-width: 768px) 70vw, 30vw"
                    className="object-cover"
                  />
                </div>

                {/* Front Image (office-1) */}
                <div className="absolute bottom-0 left-0 w-[78%] h-[78%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer">
                  <Image
                    src="/office-1.jpg"
                    alt="Our office interior in Bole"
                    fill
                    sizes="(max-width: 768px) 70vw, 30vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Persistent Office Location Badge (Visible on ALL Screens) */}
                <div className="absolute bottom-2 right-2 sm:-bottom-3 sm:-right-2 z-40 bg-brand-900/95 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-xl shadow-xl border border-brand-500/20 flex items-center gap-2.5 pointer-events-none">
                  <div className="p-1.5 bg-brand-gold/10 rounded-lg text-brand-gold shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-brand-gold uppercase tracking-wider leading-none">Main Office</p>
                    <p className="text-xs sm:text-sm font-bold mt-0.5 leading-tight">Bole, Addis Ababa</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------- 3. Metrics Cards ---------- */}
      <section className="py-8 sm:py-10 bg-surface-light border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-2 sm:p-2.5 bg-brand-900/5 rounded-xl text-brand-900 mb-2.5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-500" />
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-brand-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-text-secondary mt-0.5 sm:mt-1">
                    {stat.label}
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