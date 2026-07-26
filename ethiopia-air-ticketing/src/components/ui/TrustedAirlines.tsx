// src/components/ui/TrustedAirlines.tsx
import Image from "next/image";

const airlines = [
  { name: "Ethiopian Airlines", logo: "/airlines/ethiopian.png" },
  { name: "Emirates", logo: "/airlines/emirates.png" },
  { name: "Qatar Airways", logo: "/airlines/qatar.png" },
  { name: "Turkish Airlines", logo: "/airlines/turkish.png" },
  { name: "FlyDubai", logo: "/airlines/flydubai.png" },
];

export default function TrustedAirlines() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left column – Heading + Message */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-900">
              Trusted <span className="text-brand-gold">Airlines</span>
            </h2>
            <p className="mt-4 text-lg text-brand-900 font-medium">
              We partner with the world&apos;s leading carriers
            </p>
          </div>

          {/* Right column – Sliding logos */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused]">
              {[...airlines, ...airlines, ...airlines].map((airline, idx) => (
                <div
                  key={`${airline.name}-${idx}`}
                  className="flex-shrink-0 w-28 h-14 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={airline.logo}
                    alt={airline.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}