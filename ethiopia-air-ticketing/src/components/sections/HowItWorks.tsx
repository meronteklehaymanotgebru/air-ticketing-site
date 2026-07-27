import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Request",
    desc: "Fill the form with your travel details. It only takes a minute.",
  },
  {
    number: "02",
    title: "Receive Quote",
    desc: "We send you a tailored price via WhatsApp or Telegram within 2 hours.",
  },
  {
    number: "03",
    title: "Book & Fly",
    desc: "Accept the quote, we handle the booking, and you’re ready to go.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column – Timeline Steps */}
          <div className="text-center lg:text-left">
            {/* Standardized Two-Tone Header */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900 tracking-tight mb-6 sm:mb-8 text-center lg:text-left">
              How It <span className="text-brand-gold">Works</span>
            </h2>

            {/* Steps Container */}
            <div className="w-fit mx-auto lg:mx-0 space-y-5 sm:space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start text-left group">
                  {/* Step Number Badge */}
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                    <span className="text-lg sm:text-xl font-bold text-brand-gold group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="pt-0.5 sm:pt-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-brand-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[200px] sm:max-w-xs lg:max-w-lg aspect-[4/3] lg:aspect-square">
              <Image
                src="/plane.jpg"
                alt="Airplane illustration"
                fill
                priority
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 320px, 512px"
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}