const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ORIGINAL_SERVICES_DATA = [
  {
    category: "air",
    title: "Air Travel Services",
    iconName: "Plane",
    badge: "Core Service",
    desc: "Complete ticketing solutions for all global and domestic routes.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Domestic Flight Booking",
      "International Flight Booking",
      "Flight Ticket Issuance",
      "Flight Ticket Rebooking & Date Changes",
      "Flight Ticket Cancellation",
      "Flight Refund Processing",
      "Group Flight Reservations",
      "Corporate Travel Management",
      "Multi-City Flight Bookings"
    ]
  },
  {
    category: "visa",
    title: "Visa & Travel Documentation",
    iconName: "FileText",
    badge: "Documentation",
    desc: "End-to-end guidance and filing assistance for smooth approvals.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Visa Application Assistance",
      "Tourist Visa Services",
      "Student Visa Assistance",
      "Visa Appointment Booking",
      "Travel Document Consultation"
    ]
  },
  {
    category: "stay-tours",
    title: "Hotel & Accommodation",
    iconName: "Building2",
    badge: "Stays",
    desc: "Worldwide reservations tailored to luxury, business, or budget needs.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Hotel Reservations Worldwide",
      "Budget Hotel Bookings",
      "Business Hotel Reservations",
      "Apartment & Resort Bookings"
    ]
  },
  {
    category: "stay-tours",
    title: "Ground Transportation",
    iconName: "Car",
    badge: "Transfers",
    desc: "Seamless vehicle arrangements upon landing at your destination.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Airport Transfer Arrangements",
      "Car Rental Services",
      "Chauffeur Services"
    ]
  },
  {
    category: "visa",
    title: "Travel Protection",
    iconName: "ShieldCheck",
    badge: "Insurance",
    desc: "Comprehensive security policies shielding you against unexpected delays.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Travel Insurance",
      "Medical Travel Insurance",
      "Trip Protection Plans"
    ]
  },
  {
    category: "stay-tours",
    title: "Holiday & Tour Packages",
    iconName: "Globe2",
    badge: "Vacations",
    desc: "Handcrafted leisure and tour arrangements for families, pairs, and groups.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "International Tour Packages",
      "Domestic Tour Packages",
      "Honeymoon Packages",
      "Family Vacation Packages",
      "Group Tours",
      "Customized Travel Packages"
    ]
  },
  {
    category: "corp-vip",
    title: "Corporate Travel Solutions",
    iconName: "Briefcase",
    badge: "Business",
    desc: "Dedicated corporate account handling, compliance, and group itineraries.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Business Travel Planning",
      "Corporate Flight Bookings",
      "Travel Policy Support",
      "Conference & Event Travel"
    ]
  },
  {
    category: "corp-vip",
    title: "VIP & Airport Assistance",
    iconName: "Crown",
    badge: "VIP Exclusive",
    desc: "White-glove airport reception, fast-tracking, and lounge arrangements.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    isLightVip: true,
    items: [
      "Airport Meet & Greet",
      "CIP/VIP Airport Assistance",
      "Special Assistance Requests (SSR)",
      "Lounge Access Arrangements (where available)"
    ]
  },
  {
    category: "air",
    title: "Travel Support & Advisory",
    iconName: "Headphones",
    badge: "Advisory",
    desc: "Expert flight updates, route consultation, and traveler support.",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=600",
    isLightVip: false,
    items: [
      "Travel Consultation",
      "Travel Itinerary Planning",
      "Destination Information",
      "Baggage Guidance",
      "Airline Schedule Updates",
      "Travel Advisory Information"
    ]
  },
  {
    category: "air",
    title: "Payment & Customer Care",
    iconName: "CreditCard",
    badge: "After-Sales",
    desc: "Transparent invoicing, receipting, and 24/7 client care desk.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    isLightVip: false,
    items: [
      "Flexible Payment Options",
      "Booking Confirmation",
      "Invoice & Receipt Issuance",
      "After-Sales Customer Support",
      "24/7 Emergency Travel Assistance"
    ]
  }
];

async function seedOriginalServices() {
  console.log("Restoring ORIGINAL 10 services to the database...");
  
  // Clear existing services
  await prisma.service.deleteMany();
  
  for (const service of ORIGINAL_SERVICES_DATA) {
    await prisma.service.create({
      data: service
    });
    console.log(`Created service: ${service.title}`);
  }
  
  console.log("Migration complete!");
}

seedOriginalServices()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
