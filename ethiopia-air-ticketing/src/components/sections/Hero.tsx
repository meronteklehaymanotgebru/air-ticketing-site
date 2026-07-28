import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-brand-900 text-white pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden min-h-[70vh] flex items-center">
      {/* Background Video */}
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
        {/* Fallback source in case .mp4 MIME check fails */}
        <source 
          src="https://res.cloudinary.com/igairvb1/video/upload/f_webm,q_auto/v1785233391/142647-780599383_a8fkds.webm"
          type="video/webm" 
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-900/70 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight drop-shadow-md">
            Fly Anywhere, <br />
            Anytime with Confidence
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            We take care of every booking detail so you can relax and look forward to your trip.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="/booking"
              className="min-w-[180px] inline-flex justify-center items-center bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white px-6 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg"
            >
              Book a Flight
            </Link>
            <a
              href="https://wa.me/251945082026?text=I%20need%20a%20flight%20quotation"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[180px] inline-flex justify-center items-center bg-brand-500 hover:bg-brand-gold hover:text-brand-900 text-white px-6 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="hidden lg:block lg:w-2/5" />
      </div>

      {/* Curved bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-white"
        style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
      />
    </section>
  );
}