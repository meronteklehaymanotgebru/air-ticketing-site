// src/app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900">
            About <span className="text-brand-gold">Us</span>
          </h1>
          <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            We are Ethiopia’s trusted flight‑booking partner – dedicated to making your travel simple, affordable, and enjoyable.
          </p>
        </div>
      </section>

      {/* Story + Overlapping Images */}
      <section className="py-0 md:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="space-y-4">
            <p className="text-text-secondary leading-relaxed">
              <strong className="text-brand-900">Ethiopia Air Ticketing</strong> is a dedicated flight booking agency based in the heart of Addis Ababa. With over five years of experience, we have helped thousands of travelers find the best fares, receive personalised quotations within hours, and enjoy stress‑free journeys.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We partner with major airlines – including Ethiopian Airlines, Emirates, Qatar Airways, Turkish Airlines, and FlyDubai – to offer competitive prices for individuals, families, and corporate clients. Whether you’re flying for business, a family holiday, or a group event, we’re here to make it happen.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our mission is simple: provide reliable, fast, and friendly service that puts you first. Visit our office in Bole, call us, or send a WhatsApp message – we’re always ready to help.
            </p>
          </div>

          {/* Overlapping images container */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            {/* Front image (office-1) */}
            <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl z-20 transition-all duration-500 hover:scale-105">
              <Image
                src="/office-1.jpg"
                alt="Our office interior"
                fill
                className="object-cover"
              />
            </div>

            {/* Back image (office-2) */}
            <div className="absolute bottom-0 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-xl z-10 transition-all duration-500 hover:z-30 hover:bottom-4 hover:right-4 hover:scale-105">
              <Image
                src="/office-2.jpg"
                alt="Our team at work"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}