import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Hana T.',
    route: 'Addis Ababa → Dubai',
    text: 'I needed a last-minute ticket for a family emergency. They found me a seat within an hour and the price was better than what I saw online. Truly lifesavers.',
    rating: 5,
  },
  {
    name: 'Daniel M.',
    route: 'Addis Ababa → London',
    text: 'Professional, fast, and transparent. No hidden fees. My agent kept me updated on WhatsApp throughout the entire process. Will book again.',
    rating: 5,
  },
  {
    name: 'Sara K.',
    route: 'Addis Ababa → Nairobi',
    text: 'Group booking for 8 people handled flawlessly. They negotiated a group rate that saved us over $400 total. Highly recommend for corporate travel.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">What Our Travelers Say</h2>
          <p className="text-muted">Real feedback from real bookings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-bg-main rounded-xl p-6 border border-default relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/30" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-text-dark text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>

              <div className="border-t border-default pt-3">
                <p className="font-semibold text-text-dark text-sm">{t.name}</p>
                <p className="text-xs text-muted">{t.route}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}