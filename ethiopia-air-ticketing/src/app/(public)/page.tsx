import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import FlightTrail from "@/components/ui/FlightTrail";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PopularServices from "@/components/sections/PopularServices";
import TrustedAirlines from "@/components/ui/TrustedAirlines";
import Testimonials from "@/components/sections/Testimonials";
import { Plane, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedAirlines />

      <section className="relative pt-6 sm:pt-10 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FlightTrail />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reduced gap on small screens: gap-6 sm:gap-8 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start lg:items-stretch">
            
            {/* Left Column: Information + Ethiopian Airlines Night Visual */}
            <div className="animate-slideUp text-center lg:text-left flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight">
                  Your Journey <br className="hidden lg:inline" />
                  <span className="text-brand-gold">Starts Here</span>
                </h2>

                <p className="mt-2.5 sm:mt-4 text-base sm:text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Tell us where you want to go and we will find the best flight options for you quickly and seamlessly.
                </p>

                {/* Trust Indicators List */}
                <div className="mt-5 sm:mt-8 w-fit mx-auto lg:mx-0 space-y-2.5 sm:space-y-4">
                  <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                    <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                    <span className="text-text-secondary font-medium text-sm sm:text-base">
                      Best flight deals delivered instantly.
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                    <span className="text-text-secondary font-medium text-sm sm:text-base">
                      Trusted by thousands of Ethiopian travelers
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                    <span className="text-text-secondary font-medium text-sm sm:text-base">
                      Fast response via WhatsApp or Telegram
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-10 w-full max-w-md md:max-w-lg mx-auto lg:max-w-none flex-1 flex flex-col justify-end">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hidden sm:block h-56 sm:h-64 lg:h-full min-h-[240px]">
                  <Image
                    src="/eth.jpg"
                    alt="Ethiopian Airlines night flight arrival"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="animate-slideUp animation-delay-200 h-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-7 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl  font-extrabold text-brand-900 mb-5 sm:mb-6 text-center lg:text-left tracking-tight leading-tight">
                    Find Your <span className="text-brand-gold lg:text-brand-900">Flight</span>
                  </h3>
                  <BookingForm />
                </div>
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