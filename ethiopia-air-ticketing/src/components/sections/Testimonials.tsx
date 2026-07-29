"use client";

import { Star, Quote, CheckCircle } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  date: string;
  title?: string;
  comment: string;
  tag: string;
}

const REVIEWS: Review[] = [
  {
    author: "Frehiwot Dejene",
    rating: 5,
    date: "3 months ago",
    tag: "Verified Booking",
    comment:
      "I'm very satisfied with the service! They are honest, helpful and always available to support. Booking my ticket was easy and stress-free. Thank you so much!",
  },
  {
    author: "Prince",
    rating: 5,
    date: "2 months ago",
    tag: "Flight Reservation",
    comment:
      "Excellent service! The booking process was incredibly fast and smooth. The staff was very professional and helped me find exactly what I needed. Highly recommended!",
  },
  {
    author: "Kidist",
    rating: 5,
    date: "A year ago",
    tag: "Budget Flight Option",
    title: "Great Experience!",
    comment:
      "I had a smooth and pleasant experience at this air ticket office. The staff were professional, patient, and helped me find the best flight options within my budget. Everything was explained clearly, and my ticket was issued quickly. I definitely recommend their service!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-20 bg-white from-gray-50/80 via-white to-gray-50/50 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/60 pb-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-900/5 border border-brand-900/10 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-900">
                Real Customer Stories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 tracking-tight">
              Trusted by Travelers
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              Here is what our clients have to say about their ticket booking experience with Ask Travel.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-sm shrink-0">
            <div className="text-center border-r border-gray-200/80 pr-5">
              <div className="text-4xl font-black text-brand-900 tracking-tight leading-none">
                4.8
              </div>
              <div className="text-[10px] font-black text-brand-gold uppercase tracking-widest mt-1">
                Out of 5.0
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm"
                  />
                ))}
              </div>
              <div className="text-xs font-bold text-gray-700">
                Google Verified Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 group-hover:text-brand-gold/10 transition-colors pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Rating & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-900/60 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {review.tag}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {review.title && (
                    <h3 className="text-base font-extrabold text-brand-900">
                      {review.title}
                    </h3>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-900 text-brand-gold flex items-center justify-center font-black text-sm shadow-md shadow-brand-900/10">
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-900 leading-tight">
                      {review.author}
                    </h4>
                    <span className="text-[11px] font-medium text-gray-400">
                      {review.date}
                    </span>
                  </div>
                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}