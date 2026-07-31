const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEFAULT_SERVICES = [
  {
    category: "air",
    title: "Global Flight Ticketing",
    iconName: "Plane",
    badge: "Core Service",
    desc: "Instant booking and issuance of flight tickets to over 150 destinations worldwide with exclusive rates.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    isLightVip: false,
    items: [
      "Instant E-Ticket Issuance",
      "Free Date Changes (on flex fares)",
      "24/7 Priority Support",
      "Special Baggage Allowance"
    ]
  },
  {
    category: "visa",
    title: "Visa Processing & Support",
    iconName: "Globe2",
    badge: "Essential",
    desc: "Complete end-to-end assistance with tourist, business, and transit visa applications for major embassies.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    isLightVip: false,
    items: [
      "Document Verification",
      "Interview Preparation",
      "Embassy Appointment Booking",
      "Application Tracking"
    ]
  },
  {
    category: "stay-tours",
    title: "Luxury Hotel Reservations",
    iconName: "Hotel",
    badge: "Popular",
    desc: "Secure the best rooms at top-rated hotels globally, tailored to your budget and travel preferences.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    isLightVip: false,
    items: [
      "Free Cancellation Options",
      "Complimentary Breakfast",
      "Airport Transfer Included",
      "Exclusive Corporate Rates"
    ]
  },
  {
    category: "corp-vip",
    title: "VIP Airport Meet & Greet",
    iconName: "Crown",
    badge: "Premium",
    desc: "Bypass the long airport lines with our dedicated CIP/VIP expedited terminal clearance and lounge access.",
    image: "https://images.unsplash.com/photo-1540339832862-4745ea984274?q=80&w=800&auto=format&fit=crop",
    isLightVip: true,
    items: [
      "Dedicated Baggage Assistance",
      "Expedited Immigration Clearance",
      "Private VIP Lounge Access",
      "Chauffeur Service to Hotel"
    ]
  }
];

async function seedServices() {
  console.log("Seeding default services into the database...");
  
  // Clear existing services to prevent duplicates if run multiple times
  await prisma.service.deleteMany();
  
  for (const service of DEFAULT_SERVICES) {
    await prisma.service.create({
      data: service
    });
    console.log(`Created service: ${service.title}`);
  }
  
  console.log("Migration complete! You can now view them in the Admin Dashboard.");
}

seedServices()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
