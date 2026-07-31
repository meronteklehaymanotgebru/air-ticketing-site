"use client";
import { useEffect, useState } from "react";
import { BookingRequest } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Check, Copy, Send } from "lucide-react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuth(true);
    fetch("/api/admin/bookings")
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const generateQuote = async (bookingId: number, price: string, validity: string, notes?: string) => {
    await fetch("/api/admin/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, price, validity, notes }),
    });
    // Refresh list
    const res = await fetch("/api/admin/bookings");
    setBookings(await res.json());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!auth) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Booking Requests</h1>
      {bookings.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div key={b.id} className={`bg-white shadow p-6 rounded-xl ${b.status === "quoted" ? "border-l-4 border-green-500" : ""}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{b.name} — {b.from} → {b.to}</h2>
                  <p className="text-text-secondary text-sm">{b.departureDate} | {b.adults} Adult(s) | {b.travelClass}</p>
                  <p className="text-sm mt-1">Phone: {b.phone} ({b.contactMethod})</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${b.status === "pending" ? "bg-yellow-100" : "bg-green-100"}`}>
                  {b.status}
                </span>
              </div>
              {b.status === "pending" ? (
                <QuoteGeneratorForm bookingId={b.id} onGenerate={generateQuote} />
              ) : b.quotation ? (
                <div className="mt-4 bg-gray-50 p-3 rounded">
                  <p><strong>Price:</strong> {b.quotation.price}</p>
                  <p><strong>Valid:</strong> {b.quotation.validity}</p>
                  {b.quotation.notes && <p><strong>Notes:</strong> {b.quotation.notes}</p>}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(composeQuoteMessage(b))}
                      className="text-sm flex items-center gap-1 text-blue-600"
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </button>
                    <a
                      href={`https://wa.me/${b.phone}?text=${encodeURIComponent(composeQuoteMessage(b))}`}
                      target="_blank"
                      className="text-sm flex items-center gap-1 text-green-600"
                    >
                      <Send className="w-4 h-4" /> Send WhatsApp
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function composeQuoteMessage(booking: BookingRequest) {
  const q = booking.quotation!;
  return `*FlyEthiopia Quotation #${booking.id}*\n` +
    `Route: ${booking.from} → ${booking.to}\n` +
    `Date: ${booking.departureDate}\n` +
    `Class: ${booking.travelClass}\n` +
    `${booking.adults} Adult(s), ${booking.children} Child(ren), ${booking.infants} Infant(s)\n` +
    `Total: ${q.price} (${q.validity})\n` +
    `${q.notes ? `Notes: ${q.notes}\n` : ''}` +
    `Reply to this message to book.`;
}

function QuoteGeneratorForm({ bookingId, onGenerate }: { bookingId: number; onGenerate: (id: number, price: string, validity: string, notes?: string) => void }) {
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("48 hours");
  const [notes, setNotes] = useState("");

  return (
    <div className="mt-4 flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs">Price (e.g., $890)</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="border rounded p-2 w-28" />
      </div>
      <div>
        <label className="block text-xs">Validity</label>
        <select value={validity} onChange={(e) => setValidity(e.target.value)} className="border rounded p-2">
          <option>24 hours</option>
          <option>48 hours</option>
          <option>72 hours</option>
        </select>
      </div>
      <div>
        <label className="block text-xs">Notes (optional)</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} className="border rounded p-2 w-40" />
      </div>
      <button
        onClick={() => onGenerate(bookingId, price, validity, notes)}
        className="bg-brand-gold text-brand-900 px-4 py-2 rounded font-semibold"
      >
        Generate
      </button>
    </div>
  );
}