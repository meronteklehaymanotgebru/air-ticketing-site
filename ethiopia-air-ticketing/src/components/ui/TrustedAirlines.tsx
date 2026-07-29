import Image from "next/image";

const airlines = [
  { name: "Ethiopian Airlines", logo: "/airlines/ethiopian.png" },
  { name: "Emirates", logo: "/airlines/emirates.png" },
  { name: "Qatar Airways", logo: "/airlines/qatar.png" },
  { name: "Turkish Airlines", logo: "/airlines/turkish.png" },
  { name: "FlyDubai", logo: "/airlines/flydubai.png" },
  { name: "Etihad Airways", logo: "/airlines/etihad.png" },
  { name: "Kenya Airways", logo: "/airlines/kenya.png" },
  { name: "EgyptAir", logo: "/airlines/egypt.png" },
  { name: "Saudia", logo: "/airlines/saudia.png" },
];

export default function TrustedAirlines() {
  return (
    <section className="relative -mt-6 sm:-mt-10 lg:mt-0 pt-2 sm:pt-4 lg:pt-10 pb-5 sm:pb-8 lg:pb-15 bg-white overflow-hidden z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          <div className="lg:col-span-5 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight">
              Airlines <span className="text-brand-gold">Served</span>
            </h2>
            <p className="mt-1.5 text-base sm:text-lg md:text-xl text-text-secondary font-medium">
              We book and issue tickets across premier regional and international carriers.
            </p>
          </div>

          <div className="lg:col-span-7 relative w-full overflow-hidden py-3">
            
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 sm:gap-12 items-center animate-scroll hover:[animation-play-state:paused] w-max mx-auto lg:mx-0">
              {[...airlines, ...airlines].map((airline, idx) => {
                const isFeatured = [
                  "Ethiopian Airlines",
                  "Emirates",
                  "FlyDubai",
                  "Qatar Airways",
                  "Etihad Airways",
                  "Kenya Airways",
                ].includes(airline.name);

                return (
                  <div
                    key={`${airline.name}-${idx}`}
                    className={`flex-shrink-0 relative grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 ${
                      isFeatured
                        ? "w-40 sm:w-48 lg:w-56 h-16 sm:h-20 lg:h-24"
                        : "w-28 sm:w-36 lg:w-40 h-11 sm:h-14 lg:h-16"
                    }`}
                  >
                    <Image
                      src={airline.logo}
                      alt={airline.name}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                          : "(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
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