// src/components/ui/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-white text-text-primary pt-16 pb-8 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold/10 rotate-45 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-brand-900/5 rotate-12 pointer-events-none" />

      {/* Golden wavy border at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-full">
        <svg
          className="relative block w-full h-12"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 4‑column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start mb-12">
          
          {/* Column 1 – Logo + Description */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="relative block h-20 sm:h-24 md:h-28 lg:h-32 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mb-2 -mt-3"
            >
              <Image
                src="/ticketing-logo.png"
                alt="Ethiopia Air Ticketing"
                width={440}
                height={102}
                priority
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs sm:max-w-sm lg:max-w-none">
              Your trusted partner for flight bookings and quotations from Addis Ababa to the world.
            </p>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-900 text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-text-secondary text-sm">
              <li><Link href="/booking" className="hover:text-brand-gold transition-colors">Book a Flight</Link></li>
              <li><Link href="/services" className="hover:text-brand-gold transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 – Contact + Social */}
          <div>
            <h3 className="font-semibold text-brand-900 text-sm uppercase tracking-wider mb-4">
              Find Us
            </h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+251945082026" className="hover:text-brand-gold transition-colors">
                  +251 945 082 026
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:info@ethiopiaairticketing.com" className="hover:text-brand-gold transition-colors break-all">
                  info@ethiopiaairticketing.com
                </a>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200" aria-label="Telegram">
                <FaTelegramPlane className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200" aria-label="TikTok">
                <FaTiktok className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 hover:bg-brand-gold hover:text-white transition-all duration-200" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4 – Map */}
          <div className="h-48 lg:h-56 rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.123456789012!2d38.123456789012!3d9.123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2set!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our office location"
            ></iframe>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-text-secondary text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Ethiopia Air Ticketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}