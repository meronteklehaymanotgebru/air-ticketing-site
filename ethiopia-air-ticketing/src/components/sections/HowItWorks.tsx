import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Share Your Trip Details",
    desc: "Fill in where you want to go and your preferred travel dates. It takes less than a minute.",
  },
  {
    number: "02",
    title: "Get Best Options",
    desc: "We send you tailored flight routes and best fares directly via WhatsApp or Telegram within 2 hours.",
  },
  {
    number: "03",
    title: "Confirm & Fly",
    desc: "Pick your preferred flight, we handle your ticket booking, and you're ready to take off.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-5 sm:py-8 lg:py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column – Timeline Steps */}
          <div className="text-center lg:text-left">
            {/* Standardized Two-Tone Header */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight mb-8 sm:mb-10 text-center lg:text-left">
              How It <span className="text-brand-gold">Works</span>
            </h2>

            {/* Steps Container */}
            <div className="w-fit mx-auto lg:mx-0 space-y-6 sm:space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-5 sm:gap-6 items-start text-left group">
                  {/* Visual Timeline Line Connector */}
                  {i !== steps.length - 1 && (
                    <div className="absolute left-[23px] sm:left-[27px] top-14 w-[2px] h-[calc(100%-1rem)] bg-gray-100 group-hover:bg-brand-gold/20 transition-colors duration-300 pointer-events-none" />
                  )}

                  {/* Step Number Badge */}
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:shadow-md z-10">
                    <span className="text-lg sm:text-xl font-extrabold text-brand-gold group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="pt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-900 mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column – Graphic Illustration */}
          <div className="relative flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-lg aspect-square">
              <Image
                src="/plane.jpg"
                alt="Airplane illustration showing simple booking steps"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 512px"
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}