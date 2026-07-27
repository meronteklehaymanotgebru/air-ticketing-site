import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import FlightTrail from "@/components/ui/FlightTrail";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustedAirlines from "@/components/ui/TrustedAirlines";
import { Plane, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedAirlines />

      <section className="relative pt-6 sm:pt-8 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FlightTrail />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            <div className="animate-slideUp text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight leading-tight">
                Your Journey <br className="hidden lg:inline" />
                <span className="text-brand-gold">Starts Here</span>
              </h2>

              <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-text-secondary max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Tell us where you want to go and we will find the best flight options for you quickly and seamlessly.
              </p>

              <div className="mt-6 sm:mt-8 w-fit mx-auto lg:mx-0 space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                  <span className="text-text-secondary text-sm sm:text-base">
                    Personalized quotations within 2 hours
                  </span>
                </div>
                
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                  <span className="text-text-secondary text-sm sm:text-base">
                    Trusted by thousands of Ethiopian travelers
                  </span>
                </div>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold shrink-0" />
                  <span className="text-text-secondary text-sm sm:text-base">
                    Fast response via WhatsApp or Telegram
                  </span>
                </div>
              </div>
            </div>

            <div className="animate-slideUp animation-delay-200 mt-4 lg:mt-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
                <h3 className="text-lg sm:text-xl font-semibold text-brand-900 mb-6 text-center lg:text-left">
                  Request a Quote
                </h3>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyChooseUs />
    </>
  );
}