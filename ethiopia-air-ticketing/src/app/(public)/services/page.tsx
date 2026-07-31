import { prisma } from "@/lib/prisma";
import ServicesList from "@/components/sections/ServicesList";
import Link from "next/link";
import { Plane, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Make it dynamic so it fetches latest DB content on every request
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  // Fetch services from Postgres database
  const servicesData = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="bg-slate-50 text-text-primary min-h-screen antialiased">
      {/* Header Banner */}
      <section className="relative bg-brand-900 text-white pt-10 pb-16 sm:pt-16 sm:pb-20 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Our Full Range of <span className="text-brand-gold">Services</span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need for a frictionless journey, from instant tickets to VIP airport lounge clearance.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 bg-slate-50"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      <section className="pt-2 pb-16 sm:pb-20 lg:pb-24">
        {/* We pass the dynamically fetched services to our Client Component */}
        <ServicesList services={servicesData} />
      </section>
    </div>
  );
}