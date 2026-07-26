'use client';

import { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const quotes = [
  "Travel is the only thing you buy that makes you richer.",
  "The world is a book, and those who do not travel read only one page.",
  "Wherever you go becomes a part of you somehow.",
  "Life is short and the world is wide. Let's get you there."
];

export default function QuoteSlider() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000); // Changes every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-bg-main border-y border-default">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Plane className="h-6 w-6 text-accent mx-auto mb-4 opacity-80" />
        <blockquote className="text-xl md:text-2xl font-serif italic text-text-dark transition-opacity duration-500 ease-in-out">
          &quot;{quotes[currentQuote]}&quot;
        </blockquote>
      </div>
    </section>
  );
}