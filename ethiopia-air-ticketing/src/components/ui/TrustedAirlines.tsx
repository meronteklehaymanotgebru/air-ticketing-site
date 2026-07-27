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
    <section className="relative -mt-6 sm:-mt-10 lg:mt-0 pt-2 sm:pt-4 lg:pt-14 pb-10 sm:pb-12 lg:pb-16 bg-white overflow-hidden z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 tracking-tight">
              Trusted <span className="text-brand-gold">Airlines</span>
            </h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg text-text-secondary font-medium">
              We partner with the world&apos;s leading carriers
            </p>
          </div>

          <div className="lg:col-span-7 relative w-full overflow-hidden py-2">
            
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 sm:gap-12 items-center animate-scroll hover:[animation-play-state:paused] w-max mx-auto lg:mx-0">
              {[...airlines, ...airlines, ...airlines].map((airline, idx) => {
                const isFeatured = [
                  "Ethiopian Airlines",
                  "Emirates",
                  "FlyDubai",
                ].includes(airline.name);

                return (
                  <div
                    key={`${airline.name}-${idx}`}
                    className={`flex-shrink-0 relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 ${
                      isFeatured
                        ? "w-32 sm:w-40 lg:w-48 h-12 sm:h-14 lg:h-16"
                        : "w-24 sm:w-28 lg:w-36 h-9 sm:h-10 lg:h-12"
                    }`}
                  >
                    <Image
                      src={airline.logo}
                      alt={airline.name}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                          : "(max-width: 640px) 96px, (max-width: 1024px) 112px, 144px"
                      }
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}