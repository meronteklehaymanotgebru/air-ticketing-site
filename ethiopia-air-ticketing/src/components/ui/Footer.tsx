import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

const phoneNumbers = [
  "+251901599959",
  "+251901421142",
  "+251953489821",
  "+251932050807",
];

const formatPhone = (phone: string) => {
  return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
};

export default function Footer() {
  return (
    <footer className="relative bg-white text-text-primary pt-16 sm:pt-20 pb-8 overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold/10 rotate-45 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-brand-900/5 rotate-12 pointer-events-none" />

      {/* Golden Wavy Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-full">
        <svg
          className="relative block w-full h-10 sm:h-12"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 C360,0 1080,0 1440,80"
            stroke="#F4B400"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start mb-12">
          
          {/* Column 1 – Logo & Identity */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="relative block h-16 sm:h-20 md:h-24 w-full max-w-[260px] sm:max-w-[300px] mb-3 -mt-2"
            >
              <Image
                src="/ask-logo.jpg"
                alt="Ask Travel Logo"
                width={440}
                height={102}
                priority
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <p className="text-text-secondary text-base leading-relaxed max-w-xs sm:max-w-sm lg:max-w-none font-medium">
              Your trusted partner for domestic and international flight bookings. <br />
            </p>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="font-bold text-brand-900 text-base sm:text-lg uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-text-secondary text-base font-medium">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  Find Your Flight
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Contact & Socials */}
          <div>
            <h3 className="font-bold text-brand-900 text-base sm:text-lg uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            
            <ul className="space-y-3 text-text-secondary text-base font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  {phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone}`}
                      className="hover:text-brand-gold transition-colors text-base"
                    >
                      {formatPhone(phone)}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a
                  href="mailto:asktravel7@gmail.com"
                  className="hover:text-brand-gold transition-colors break-all text-base"
                >
                  asktravel7@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {/* Telegram */}
              <a
                href="https://t.me/Asktravel2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@ask_air_ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200"
                aria-label="TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>

              {/* Facebook (Placeholder for later) */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* Instagram (Placeholder for later) */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4 – Google Maps Embed */}
          <div className="w-full h-56 lg:h-64 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.54898124982!2d38.7830!3d9.0025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8538f29d4a81%3A0x39f6e5168d8d52bb!2sAsk%20air%20ticket%20office!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ask Air Ticket Office Location"
            ></iframe>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center text-text-secondary text-sm font-medium">
          &copy; {new Date().getFullYear()} Ask Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}