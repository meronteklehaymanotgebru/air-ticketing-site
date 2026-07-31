import BookingForm from "@/components/sections/BookingForm";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standardized Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight leading-tight">
            Book with <span className="text-brand-gold">Us</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Share your travel plans and we&apos;ll handle everything else.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
          <h2 className="text-lg sm:text-xl font-semibold text-brand-900 mb-6">
            Request a Quote
          </h2>
          <BookingForm />
        </div>

      </div>
    </main>
  );
}