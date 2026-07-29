import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Clock, MapPin, ShieldCheck, Mail } from "lucide-react";

const phoneNumbers = [
  { raw: "+251901599959", display: "+251 901 599 959" },
  { raw: "+251901421142", display: "+251 901 421 142" },
  { raw: "+251953489821", display: "+251 953 489 821" },
  { raw: "+251932050807", display: "+251 932 050 807" },
];

export default function ContactPage() {
  return (
    <div className="bg-white text-text-primary min-h-screen antialiased">
      
      {/* Page Header */}
      <section className="relative bg-brand-900 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Get in Touch <span className="text-brand-gold">with Us</span>
          </h1>
          
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question or need best flight fares? Send us a message or reach out directly to our team in Addis Ababa.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 md:h-10 lg:h-12 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-6 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-text-secondary text-base sm:text-lg mt-2 leading-relaxed font-medium">
                  Fill out the form below and one of our travel agents will review your request and get back to you shortly.
                </p>
              </div>

              <ContactForm />
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <div className="bg-brand-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden border border-brand-gold/20">
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-6 border-b border-white/10 pb-6">
                  <Image
                    src="/ticketing-logo.png"
                    alt="Ask Travel Logo"
                    width={180}
                    height={54}
                    className="h-10 w-auto brightness-0 invert mb-4"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Direct Contact</h3>
                  <p className="mt-1 text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                    Call us, chat on Telegram, or visit our office.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone List */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-brand-gold tracking-wider">Phone / WhatsApp</p>
                      <div className="mt-1.5 flex flex-col space-y-1">
                        {phoneNumbers.map((p, idx) => (
                          <a
                            key={idx}
                            href={`tel:${p.raw}`}
                            className="text-base font-bold text-white hover:text-brand-gold transition-colors"
                          >
                            {p.display}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-brand-gold tracking-wider">Email Us</p>
                      <a
                        href="mailto:asktravel7@gmail.com"
                        className="text-base font-bold text-white hover:text-brand-gold transition-colors break-all mt-1 block"
                      >
                        asktravel7@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-brand-gold tracking-wider">Fast Turnaround</p>
                      <p className="text-base font-medium text-gray-200 mt-1">Average response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-brand-gold tracking-wider">Office Location</p>
                      <p className="text-base font-medium text-gray-200 mt-1">Djibouti St, Bole, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Your information is strictly protected and never shared.</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}