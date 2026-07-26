// src/app/page.tsx
import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import FlightTrail from "@/components/ui/FlightTrail";
import HowItWorks from "@/components/sections/HowItWorks";
import PopularRoutes from "@/components/sections/PopularRoutes";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustedAirlines from "@/components/ui/TrustedAirlines";
import { Plane, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />
      <TrustedAirlines />
      {/* Booking Section */}
      <section className="relative py-16 bg-white overflow-hidden">
        {/* Background flight trails – no extra opacity, component handles it */}
        <div className="absolute inset-0 pointer-events-none">
          <FlightTrail />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column – Benefit Text + Animation */}
            <div className="animate-slideUp text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-900 leading-tight">
                Your Journey <br />
                <span className="text-brand-gold">Starts Here</span>
              </h2>
              <p className="mt-4 text-lg text-text-secondary max-w-md">
                Tell us where you want to go and we&apos;ll find the best flight options for you – quickly and hassle‑free.
              </p>

              {/* Trust indicators */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Plane className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
                  <span className="text-text-secondary">
                    Personalized quotations within 2 hours
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
                  <span className="text-text-secondary">
                    Trusted by thousands of Ethiopian travelers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
                  <span className="text-text-secondary">
                    Fast response via WhatsApp or Telegram
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column – Compact Form Card */}
            <div className="animate-slideUp animation-delay-200">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-brand-900 mb-6">
                  Request a Quote
                </h3>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <HowItWorks />
      {/* <PopularRoutes /> */}
      <WhyChooseUs />


    </>
  );
}