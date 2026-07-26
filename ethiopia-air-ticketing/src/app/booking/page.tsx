// src/app/booking/page.tsx
import BookingForm from "@/components/sections/BookingForm";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-900 leading-tight">
            Book with <span className="text-brand-gold">Us</span>
          </h1>
          <p className="mt-2 text-lg text-text-secondary max-w-xl mx-auto">
            Share your travel plans and we&apos;ll handle everything else.
          </p>
        </div>

        {/* Form card (same style as homepage) */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-brand-900 mb-6">Request a Quote</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}