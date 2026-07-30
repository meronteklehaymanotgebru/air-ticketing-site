import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import FlightTrail from "@/components/ui/FlightTrail";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PopularServices from "@/components/sections/PopularServices"; // 👈 Import new component
import TrustedAirlines from "@/components/ui/TrustedAirlines";
import Testimonials from "@/components/sections/Testimonials";
import { Plane, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedAirlines />

      <section className="relative pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FlightTrail />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            <div className="animate-slideUp text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight">
                Your Journey <br className="hidden lg:inline" />
                <span className="text-brand-gold">Starts Here</span>
              </h2>

              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Tell us where you want to go and we will find the best flight options for you quickly and seamlessly.
              </p>

              {/* Trust Indicators List */}
              <div className="mt-8 sm:mt-10 w-fit mx-auto lg:mx-0 space-y-4 sm:space-y-5">
                <div className="grid grid-cols-[auto_1fr] items-center gap-3.5 text-left">
                  <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold shrink-0" />
                  <span className="text-text-secondary font-medium text-base sm:text-lg">
                    Best flight deals delivered instantly.
                  </span>
                </div>
                
                <div className="grid grid-cols-[auto_1fr] items-center gap-3.5 text-left">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold shrink-0" />
                  <span className="text-text-secondary font-medium text-base sm:text-lg">
                    Trusted by thousands of Ethiopian travelers
                  </span>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3.5 text-left">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold shrink-0" />
                  <span className="text-text-secondary font-medium text-base sm:text-lg">
                    Fast response via WhatsApp or Telegram
                  </span>
                </div>
              </div>
            </div>

            <div className="animate-slideUp animation-delay-200 mt-2 lg:mt-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-900 mb-6 sm:mb-8 text-center lg:text-left tracking-tight">
                  Find Your Flight
                </h3>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <HowItWorks />
      <PopularServices />

      <WhyChooseUs />

      <Testimonials />

      <div className="py-5 text-center">
        <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
          Our Promise
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold text-brand-gold tracking-tight">
          JUST ASK, WE FLY YOU.
        </p>
      </div>
    </>
  );
}