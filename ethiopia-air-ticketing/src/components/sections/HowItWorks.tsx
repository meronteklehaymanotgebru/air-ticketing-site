// src/components/ui/HowItWorks.tsx
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
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column – Steps (aligned) */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-10">
              How It Works
            </h2>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5 items-start">
                  {/* Large Golden Number */}
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-gold">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-brand-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column – Airplane Image */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/plane.jpg"
              alt="Airplane illustration"
              width={500}
              height={500}
              className="object-contain w-full max-w-md lg:max-w-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}