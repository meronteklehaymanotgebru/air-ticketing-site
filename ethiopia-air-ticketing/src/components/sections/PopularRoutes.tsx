// src/components/sections/PopularRoutes.tsx
import { Plane } from "lucide-react";
import Link from "next/link";

const routes = [
  { from: "Addis Ababa", to: "Dubai", price: "From $450" },
  { from: "Addis Ababa", to: "Nairobi", price: "From $250" },
  { from: "Addis Ababa", to: "London", price: "From $780" },
  { from: "Addis Ababa", to: "New York", price: "From $890" },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-2">
          Popular Routes
        </h2>
        <p className="text-lg text-text-secondary mb-10">
          Favourite destinations from Addis Ababa
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, i) => (
            <div
              key={i}
              className="group relative bg-surface-light rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-brand-gold/30"
            >
              {/* Decorative airplane icon */}
              <div className="absolute top-4 right-4 text-brand-gold/10 w-12 h-12 group-hover:text-brand-gold/30 transition-colors">
                <Plane className="w-full h-full" />
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 text-lg font-semibold text-brand-900">
                <span>{route.from}</span>
                <Plane className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{route.to}</span>
              </div>

              {/* Price */}
              <p className="text-3xl font-bold text-brand-gold mt-4">{route.price}</p>
              <p className="text-sm text-text-secondary mt-1">Round trip</p>

              {/* Action link */}
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors"
              >
                Get quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}