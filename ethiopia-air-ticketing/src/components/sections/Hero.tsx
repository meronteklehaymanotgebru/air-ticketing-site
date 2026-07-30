import Link from "next/link";
import { ShieldCheck, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-brand-900 text-white min-h-[72vh] flex items-center justify-center overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://res.cloudinary.com/igairvb1/video/upload/f_auto:video,q_auto/v1785233391/142647-780599383_a8fkds.mp4"
          type="video/mp4" 
        />
        <source 
          src="https://res.cloudinary.com/igairvb1/video/upload/f_webm,q_auto/v1785233391/142647-780599383_a8fkds.webm"
          type="video/webm" 
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-brand-900/75 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-2xl text-center md:mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-brand-gold border border-brand-gold/30 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
            <Award className="w-4 h-4 text-brand-gold shrink-0" />
            <span className="truncate">IATA Accredited Travel Agency • 3+ Years Experience</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md">
            JUST ASK 
            <span className="text-brand-gold"> WE FLY YOU.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-normal max-w-xl mx-auto">
            We take care of every booking detail so you can relax and look forward to your trip.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto w-full">
            <Link
              href="/booking"
              className="h-11 sm:h-13 w-full flex items-center justify-center bg-brand-gold hover:bg-brand-200 hover:text-white text-brand-900 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg border border-white/10 text-center whitespace-nowrap leading-none box-border"
            >
              Book a Flight
            </Link>
            <a
              href="https://wa.me/251901421142?text=Selam%20Ask%20Travel!%20I%20would%20like%20to%20get%20a%20flight%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 sm:h-14 w-full flex items-center justify-center bg-brand-900 hover:bg-brand-900 hover:text-brand-gold text-white rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 border border-white/10 text-center whitespace-nowrap leading-none box-border"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Direct Airline Issuance</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Competitive Airfares</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              <span>24/7 Booking Support</span>
            </div>
          </div>

        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-30 h-12 sm:h-16 bg-white pointer-events-none"
        style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
      />
    </section>
  );
}