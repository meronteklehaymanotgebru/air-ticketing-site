import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-brand-900 text-white pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden min-h-[70vh] flex items-center">
      {/* ---------- Background Video ---------- */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-plane.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
        preload="metadata"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-brand-900/70 z-10" />

      {/* ---------- Content ---------- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-3/5 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-md">
            Fly Anywhere, <br />
            Anytime with Confidence
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 md:max-w-none">
            We take care of every booking detail so you can relax and look forward to your trip.
          </p>

          {/* Buttons with golden hover effect */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/booking"
              className="min-w-[180px] inline-flex justify-center items-center bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Book a Flight
            </Link>
            <a
              href="https://wa.me/251994941164?text=I%20need%20a%20flight%20quotation"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[180px] inline-flex justify-center items-center bg-brand-500 hover:bg-brand-gold hover:text-brand-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="md:w-2/5" />
      </div>

      {/* Curved bottom transition */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-white"
        style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
      />
    </section>
  );
}