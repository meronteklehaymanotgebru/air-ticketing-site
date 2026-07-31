"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Compass } from "lucide-react";

interface Destination {
  id: string;
  title: string;
  country: string;
  image: string;
  tag: string;
  description: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "lalibela",
    title: "Lalibela",
    country: "Ethiopia",
    image: "/lalibela.jpg",
    tag: "Ancient Wonder",
    description: "The 12th-century architectural masterpiece carved downwards into solid volcanic rock.",
  },
  {
    id: "axum",
    title: "Axum",
    country: "Ethiopia",
    image: "/axum.jpg",
    tag: "Historical Empire",
    description: "The cradle of the ancient Aksumite Empire defined by towering monolithic granite obelisks.",
  },
  {
    id: "dubai",
    title: "Dubai",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    tag: "Metropolis",
    description: "A dynamic global hub where soaring skyscrapers meet opulent hospitality and desert luxury.",
  },
  {
    id: "paris",
    title: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    tag: "Global Capital",
    description: "The timeless capital of art, fashion, and romance framed by iconic historic monuments.",
  },
  // Row 2
  {
    id: "zanzibar",
    title: "Zanzibar",
    country: "Tanzania",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    tag: "Island Paradise",
    description: "An idyllic tropical archipelago famed for crystal-clear turquoise waters and historic alleys.",
  },
  {
    id: "simien-mountains",
    title: "Simien Mountains",
    country: "Ethiopia",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
    tag: "Nature & Trekking",
    description: "Breathtaking UNESCO World Heritage jagged escarpments serving as rare wildlife sanctuaries.",
  },
  {
    id: "mombasa",
    title: "Mombasa",
    country: "Kenya",
    image: "/mombasa.jpg",
    tag: "Coastal Paradise",
    description: "Kenya's historic coastal gem featuring pristine white-sand beaches, Swahili culture, and turquoise Indian Ocean waters.",
  },
  {
    id: "gondar",
    title: "Gondar",
    country: "Ethiopia",
    image: "/gondar.jpg",
    tag: "Royal Heritage",
    description: "Referred to as Africa's Camelot, featuring majestic 17th-century stone castles and palaces.",
  },
  {
    id: "rome",
    title: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    tag: "Eternal City",
    description: "A sprawling cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and culture.",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tag: "Cultural Haven",
    description: "Famed for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
  },
  {
    id: "cairo",
    title: "Cairo",
    country: "Egypt",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    tag: "Pharaonic Wonder",
    description: "Set on the majestic Nile River, home to medieval Islamic architecture and ancient world pyramids.",
  },
  {
    id: "cape-town",
    title: "Cape Town",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    tag: "Coastal Majesty",
    description: "A stunning port city beneath Table Mountain, featuring dramatic oceans, vineyards, and vibrant culture.",
  },
];

export default function GalleryPage() {
  // Track image sources per card to safely switch to a fallback if a local asset is missing
  const [imageSrcs, setImageSrcs] = useState<{ [key: string]: string }>(
    Object.fromEntries(DESTINATIONS.map((d) => [d.id, d.image]))
  );

  const handleImageError = (id: string) => {
    setImageSrcs((prev) => ({
      ...prev,
      [id]: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    }));
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen antialiased pb-28">
      
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white pt-10 pb-16 sm:pt-16 sm:pb-20 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1D9BF0_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md max-w-3xl mx-auto">
            Destination <span className="text-brand-gold">Gallery</span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            A comprehensive collection of iconic historical, tropical, and metropolitan wonders handpicked by Ask Travel.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-8 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      {/* Grid Content Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.id}
                style={{ animationDelay: `${(idx % 4) * 80}ms` }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200/85 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between animate-fade-in-up"
              >
                {/* Uniform Image Header */}
                <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={imageSrcs[dest.id]}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                    onError={() => handleImageError(dest.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85 z-10" />
                  
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-900 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm border border-white/20 z-20">
                    {dest.tag}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                    <div className="flex items-center gap-1 text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      {dest.country}
                    </div>
                    <h3 className="text-xl font-black tracking-tight leading-snug">{dest.title}</h3>
                  </div>
                </div>

                {/* Narrative Body */}
                <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 bg-white flex-1">
                  <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-900/60 uppercase tracking-wider group-hover:text-brand-gold transition-colors">
                      <Compass className="w-3 h-3 text-brand-gold" />
                      Ask Travel Experience
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}