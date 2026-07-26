// src/app/contact/page.tsx
import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left side – Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-2">
              Get in Touch <br />
              <span className="text-brand-gold">with Us</span>
            </h1>
            <p className="text-text-secondary mb-8">
              Have a question or need a quote? Send us a message and we’ll reply shortly.
            </p>
            <ContactForm />
          </div>

          {/* Right side – Centered lower & pushed right */}
          <div className="self-center lg:pl-8">
            <div className="bg-brand-gold rounded-2xl p-8 lg:p-10 text-white shadow-xl flex flex-col items-center text-center min-h-[450px]">
              {/* Logo or icon */}
              <div className="mb-6">
                <Image
                  src="/ticketing-logo.png"
                  alt="Ethiopia Air Ticketing"
                  width={160}
                  height={48}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>

              <h2 className="text-2xl font-bold">Prefer to talk?</h2>
              <p className="mt-2 text-white/10 text-sm max-w-xs">
                Reach out directly - we&apos;re happy to help with anything.
              </p>

              {/* Quick contact highlights */}
              <div className="mt-8 space-y-4 w-full max-w-[250px] text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">+251 994 941 164</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Response within 2 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Bole, Addis Ababa</span>
                </div>
              </div>

              {/* Subtle divider */}
              <div className="mt-8 w-16 h-px bg-white/30" />

              <p className="mt-4 text-white/70 text-xs max-w-[250px]">
                Your details are safe with us. We’ll never share your information.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}