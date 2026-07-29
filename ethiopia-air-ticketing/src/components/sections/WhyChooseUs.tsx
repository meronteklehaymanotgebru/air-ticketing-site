import { 
  Award, 
  Tag, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Headphones 
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "IATA-Accredited Agency",
    desc: "Trusted airline ticketing backed by international standards and global airline access.",
  },
  {
    icon: Tag,
    title: "Competitive Airfares",
    desc: "We compare domestic and international routes to secure the best available fares for your budget.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Service",
    desc: "Quick turnaround on itinerary requests and efficient handling of all your travel arrangements.",
  },
  {
    icon: Layers,
    title: "One-Stop Travel Solutions",
    desc: "Flights, hotels, visa assistance, travel insurance, and corporate travel, all in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    desc: "Clear pricing with no surprises, coupled with convenient and flexible payment options.",
  },
  {
    icon: Headphones,
    title: "Dedicated After-Sales Care",
    desc: "Continuous 1-on-1 support for flight changes, refunds, and updates long after booking.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-5 sm:py-5 lg:py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight">
            Why Choose <span className="text-brand-gold">Ask Travel?</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-medium">
            Professional travel experts committed to making every journey simple, affordable, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 pt-4">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 pt-10 sm:pt-12 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
            >
              {/* Floating Circular Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-900 flex items-center justify-center">
                  <r.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-brand-900 mb-2 sm:mb-3">
                {r.title}
              </h3>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-medium">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}