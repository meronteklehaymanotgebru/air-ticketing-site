import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Clock, MapPin, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white text-text-primary min-h-screen antialiased">
      
      <section className="relative bg-brand-900 text-white pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden min-h-[25vh] sm:min-h-[30vh] md:min-h-[35vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Get in Touch <span className="text-brand-gold">with Us</span>
          </h1>
          
          <p className="mt-2 sm:mt-2.5 md:mt-3 text-sm sm:text-base md:text-lg text-gray-200 max-w-[85%] sm:max-w-md md:max-w-xl mx-auto font-normal leading-relaxed">
            Have a question or need a custom flight quote? Send us a message or reach out directly to our team in Addis Ababa.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 md:h-10 lg:h-12 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-4 pb-12 sm:pb-16 md:pt-6 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-xl">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-text-secondary text-sm sm:text-base mt-1.5 leading-relaxed">
                  Fill out the form below and one of our travel agents will review your request and get back to you shortly.
                </p>
              </div>

              <ContactForm />
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <div className="bg-brand-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden border border-brand-500/20">
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-6 sm:mb-8 border-b border-white/10 pb-6">
                  <Image
                    src="/ticketing-logo.png"
                    alt="Ethiopia Air Ticketing"
                    width={180}
                    height={54}
                    className="h-9 sm:h-10 w-auto brightness-0 invert mb-3.5"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Prefer direct contact?</h3>
                  <p className="mt-1 text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Reach out via phone or visit our office during business hours.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <a
                    href="tel:+251994941164"
                    className="flex items-start gap-3.5 group p-2 -mx-2 rounded-xl transition-colors hover:bg-white/5"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase font-semibold text-brand-gold tracking-wider">Phone / WhatsApp</p>
                      <p className="text-sm sm:text-base font-bold text-white mt-0.5">+251 9xxxxxxx</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3.5 p-2 -mx-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase font-semibold text-brand-gold tracking-wider">Fast Turnaround</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-200 mt-0.5">Average response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-2 -mx-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs uppercase font-semibold text-brand-gold tracking-wider">Office Location</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-200 mt-0.5">Bole, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 pt-5 border-t border-white/10 flex items-center gap-2.5 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Your information is strictly protected and never shared with third parties.</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}