"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Book a Flight", href: "/booking" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => pathname === href;


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ticket-logo.png"
            alt="Ethiopia Air Ticketing"
            width={140}
            height={40}
            className="h-10 lg:h-15 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-gold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-brand-gold"
                    : "text-brand-900 hover:text-brand-gold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-brand-gold after:transition-all hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Call Now button */}
          <a
            href="tel:+251994941164"
            className="ml-2 inline-flex items-center gap-1.5 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-brand-900 hover:text-brand-500 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown (overlay, no push) */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="px-4 py-3 space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block text-base font-medium ${
                    active
                      ? "text-brand-gold"
                      : "text-brand-900 hover:text-brand-gold"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="tel:+251994941164"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors w-full"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}