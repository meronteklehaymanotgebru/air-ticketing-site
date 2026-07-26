import Image from "next/image";

const airlines = ["ethiopian", "emirates", "qatar", "turkish", "flydubai"];

export default function AirlinePartners() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Our Airline Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {airlines.map((airline) => (
            <Image
              key={airline}
              src={`/airlines/${airline}.png`}
              alt={airline}
              width={120}
              height={40}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}