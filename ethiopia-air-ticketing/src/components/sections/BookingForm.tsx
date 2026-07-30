"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, Search, AlertCircle, Plane, Mail, Loader2 } from "lucide-react";
import Image from "next/image";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const COMPANY_EMAIL = "info@asktravel.com"; 
const WHATSAPP_NUMBER = "251901421142";
const TELEGRAM_USERNAME = "Asktravel2";

type Airport = { code: string; city: string; country: string };
type Airline = { code: string; name: string; logo: string };

const bookingSchema = z
  .object({
    from: z.string().min(1, "Departure city/airport is required"),
    to: z.string().min(1, "Destination city/airport is required"),
    departureDate: z
      .string()
      .min(1, "Departure date is required")
      .refine(
        (val) => {
          const selected = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selected >= today;
        },
        { message: "Departure date cannot be in the past" }
      ),
    returnDate: z.string().optional(),
    adults: z.number().min(1, "At least 1 adult is required"),
    children: z.number().min(0),
    infants: z.number().min(0),
    travelClass: z.enum(["Economy", "Business", "First"]),
    flexibleDates: z.boolean(),
    preferredAirlines: z.string().optional(),
    budget: z.enum(["under500", "500to1000", "above1000", "noLimit"]),
    specialRequests: z.string().optional(),
    name: z.string().min(1, "Full name is required"),
    phone: z.string().refine((val) => (val ? isValidPhoneNumber(val) : false), {
      message: "Please enter a valid phone number",
    }),
    email: z.string().optional(),
    contactMethod: z.enum(["Email", "WhatsApp", "Telegram"]),
  })
  .refine(
    (data) => {
      if (data.returnDate && data.returnDate < data.departureDate) return false;
      return true;
    },
    { message: "Return date must be on or after departure date", path: ["returnDate"] }
  )
  .refine(
    (data) => {
      if (data.contactMethod === "Email") {
        if (!data.email || !data.email.trim()) return false;
        return z.string().email().safeParse(data.email).success;
      }
      if (data.email && data.email.trim().length > 0) {
        return z.string().email().safeParse(data.email).success;
      }
      return true;
    },
    { message: "Please enter a valid email address", path: ["email"] }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

function AirportAutocomplete({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
}) {
  const safeValue = value || "";
  const [airports, setAirports] = useState<Airport[]>([]);
  const [filtered, setFiltered] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/airports")
      .then((r) => (r.ok ? r.json() : []))
      .then(setAirports)
      .catch(() => setAirports([]));
  }, []);

  useEffect(() => {
    const query = safeValue.toLowerCase().split("(")[0].trim();
    if (query.length < 2) {
      setFiltered([]);
      return;
    }
    const results = airports.filter(
      (a) =>
        a.city.toLowerCase().includes(query) ||
        a.code.toLowerCase().includes(query) ||
        a.country.toLowerCase().includes(query)
    );
    setFiltered(results.slice(0, 8));
  }, [safeValue, airports]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(`${airport.city} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={safeValue}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          aria-invalid={!!error}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium pr-10"
        />
        <Search className="absolute right-3.5 top-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-xl mt-1.5 max-h-48 overflow-y-auto shadow-xl text-sm py-1">
          {filtered.map((a) => (
            <li
              key={a.code}
              onClick={() => handleSelect(a)}
              className="px-4 py-2.5 hover:bg-brand-gold/10 hover:text-brand-900 cursor-pointer flex justify-between items-center transition-colors font-medium"
            >
              <span>{a.city}, {a.country}</span>
              <span className="font-bold text-xs bg-gray-100 text-brand-900 px-2 py-0.5 rounded">{a.code}</span>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-rose-500 text-xs font-semibold mt-1.5">{error}</p>}
    </div>
  );
}

function AirlineAutocomplete({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const safeValue = value || "";
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [filtered, setFiltered] = useState<Airline[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/airlines")
      .then((r) => (r.ok ? r.json() : []))
      .then(setAirlines)
      .catch(() => setAirlines([]));
  }, []);

  useEffect(() => {
    const query = safeValue.toLowerCase().trim();
    if (query.length === 0) {
      setFiltered(airlines.slice(0, 8));
      return;
    }
    const results = airlines.filter((a) =>
      a.name.toLowerCase().includes(query)
    );
    setFiltered(results.slice(0, 8));
  }, [safeValue, airlines]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airline: Airline) => {
    onChange(airline.name);
    setIsOpen(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16'%3E%3Crect width='24' height='16' fill='%23f0f0f0'/%3E%3C/svg%3E";
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={safeValue}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search airline (optional)"
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium pr-10"
        />
        <Search className="absolute right-3.5 top-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-xl mt-1.5 max-h-48 overflow-y-auto shadow-xl text-sm py-1">
          <li
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-gray-500"
          >
            Any Airline (Best Price)
          </li>
          {filtered.map((a, idx) => (
            <li
              key={`${a.code}-${idx}`}
              onClick={() => handleSelect(a)}
              className="px-4 py-2.5 hover:bg-brand-gold/10 hover:text-brand-900 cursor-pointer flex items-center gap-3 transition-colors font-medium"
            >
              <div className="w-6 h-4 relative shrink-0">
                <Image
                  src={a.logo}
                  alt={a.name}
                  width={24}
                  height={16}
                  className="object-contain"
                  onError={handleError}
                />
              </div>
              {a.name}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-rose-500 text-xs font-semibold mt-1.5">{error}</p>}
    </div>
  );
}

export default function BookingForm() {
  const [success, setSuccess] = useState(false);
  const [submittedMethod, setSubmittedMethod] = useState<"Email" | "WhatsApp" | "Telegram">("Email");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
      travelClass: "Economy",
      flexibleDates: false,
      budget: "noLimit",
      contactMethod: "Email",
      email: "",
    },
  });

  const selectedContactMethod = watch("contactMethod");
  const departureDate = watch("departureDate");
  const today = new Date().toISOString().split("T")[0];

  const formatBudget = (budgetKey: string) => {
    switch (budgetKey) {
      case "under500":
        return "Under $500";
      case "500to1000":
        return "$500 - $1,000";
      case "above1000":
        return "Above $1,000";
      default:
        return "Flexible / Best Available Rate";
    }
  };

const onSubmit = async (data: BookingFormData) => {
  setIsSubmitting(true);
  setSubmitError("");

  try {
    const passengerSummary = `${data.adults} Adult${data.adults > 1 ? "s" : ""}${
      data.children > 0 ? `, ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""
    }${data.infants > 0 ? `, ${data.infants} Infant${data.infants > 1 ? "s" : ""}` : ""}`;

    const flexibleStatus = data.flexibleDates ? "Yes (±2 days)" : "No";
    const budgetText = formatBudget(data.budget);
    const returnInfo = data.returnDate || "One-Way";

    if (data.contactMethod === "Email") {
      // 1. Professional Email Format
      const emailSubject = encodeURIComponent(
        `[Flight Inquiry] ${data.from} to ${data.to} - ${data.name} (${data.departureDate})`
      );

      const emailBody = `Dear Ask Travel Team,

I would like to request a quote and availability for the following flight booking details:

TRIP INFORMATION
- Departure: ${data.from}
- Destination: ${data.to}
- Departure Date: ${data.departureDate}
- Return Date: ${returnInfo}
- Flexible Dates: ${flexibleStatus}

PASSENGER & CLASS PREFERENCES
- Passengers: ${passengerSummary}
- Cabin Class: ${data.travelClass}
- Budget Target: ${budgetText}
${data.preferredAirlines ? `- Preferred Airline: ${data.preferredAirlines}\n` : ""}${data.specialRequests ? `- Special Requests: ${data.specialRequests}\n` : ""}
CONTACT INFORMATION
- Primary Contact: ${data.name}
- Phone Number: ${data.phone}
- Email Address: ${data.email || "N/A"}

Please let me know the best available flight options and pricing at your earliest convenience.

Best regards,
${data.name}`;

      const mailtoUrl = `mailto:${COMPANY_EMAIL}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl, "_blank");

    } else if (data.contactMethod === "WhatsApp") {
      // 2. WhatsApp: Emojis Removed
      const waMessage = `FLIGHT BOOKING INQUIRY

TRIP DETAILS
- Departure: ${data.from}
- Destination: ${data.to}
- Departure Date: ${data.departureDate}
- Return Date: ${returnInfo}
- Flexible Dates: ${flexibleStatus}

PASSENGER & CLASS
- Passengers: ${passengerSummary}
- Class: ${data.travelClass}
- Budget: ${budgetText}
${data.preferredAirlines ? `- Preferred Airline: ${data.preferredAirlines}\n` : ""}${data.specialRequests ? `- Notes: ${data.specialRequests}\n` : ""}
CONTACT
- Name: ${data.name}
- Phone: ${data.phone}
${data.email ? `- Email: ${data.email}\n` : ""}
Please provide the best available options. Thank you.`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );

    } else if (data.contactMethod === "Telegram") {
      const tgMessage = `Selam Ask Travel! 🌼 I would like to book a flight with the following details:

✈️ TRIP DETAILS
🛫 From: ${data.from}
🛬 To: ${data.to}
🗓️ Departure: ${data.departureDate}
🔄 Return: ${returnInfo}
📆 Flexible Dates: ${flexibleStatus}

👥 PASSENGER & CLASS
🎟️ Passengers: ${passengerSummary}
💺 Cabin Class: ${data.travelClass}
💵 Budget Preference: ${budgetText}
${data.preferredAirlines ? `Preferred Airline: ${data.preferredAirlines}\n` : ""}${data.specialRequests ? `📝 Special Notes: ${data.specialRequests}\n` : ""}
👤 CONTACT DETAILS
Name: ${data.name}
📱 Phone: ${data.phone}
${data.email ? `📧 Email: ${data.email}\n` : ""}
Please share the best available options! Thank you 😊`;

      window.open(
        `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(tgMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    setSubmittedMethod(data.contactMethod);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 6000);
  } catch (error: any) {
    console.error(error);
    setSubmitError("Failed to initiate contact. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="w-full">
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm sm:text-base font-medium animate-in fade-in duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>
            Flight request prepared! Redirecting via {submittedMethod}...
          </p>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm sm:text-base font-medium animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" noValidate>
        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            From <span className="text-rose-500">*</span>
          </label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="City or Airport (e.g. Addis Ababa)"
                error={errors.from?.message}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            To <span className="text-rose-500">*</span>
          </label>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="City or Airport (e.g. Dubai)"
                error={errors.to?.message}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Departure Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            {...register("departureDate")}
            min={today}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
          />
          {errors.departureDate && (
            <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.departureDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Return Date <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            type="date"
            {...register("returnDate")}
            min={departureDate || today}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
          />
          {errors.returnDate && (
            <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.returnDate.message}</p>
          )}
        </div>

        <div className="sm:col-span-2 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
              Adults <span className="text-gray-400 font-normal lowercase">(12+)</span>
            </label>
            <input
              type="number"
              {...register("adults", { valueAsNumber: true })}
              min={1}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
              Children <span className="text-gray-400 font-normal lowercase">(2-11)</span>
            </label>
            <input
              type="number"
              {...register("children", { valueAsNumber: true })}
              min={0}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
              Infants <span className="text-gray-400 font-normal lowercase">(&lt;2)</span>
            </label>
            <input
              type="number"
              {...register("infants", { valueAsNumber: true })}
              min={0}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Cabin Class <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("travelClass")}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium cursor-pointer"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Target Budget
          </label>
          <select
            {...register("budget")}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium cursor-pointer"
          >
            <option value="noLimit">Flexible / Best Available Rate</option>
            <option value="under500">Under $500</option>
            <option value="500to1000">$500 – $1,000</option>
            <option value="above1000">Above $1,000</option>
          </select>
        </div>

        <div className="sm:col-span-2 flex items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            {...register("flexibleDates")}
            id="flexible"
            className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-900 cursor-pointer"
          />
          <label htmlFor="flexible" className="text-sm text-text-secondary font-medium cursor-pointer select-none">
            My travel dates are flexible (±2 days for best fare)
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Preferred Airline <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <Controller
            name="preferredAirlines"
            control={control}
            render={({ field }) => (
              <AirlineAutocomplete
                value={field.value || ""}
                onChange={field.onChange}
                error={errors.preferredAirlines?.message}
              />
            )}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Special Requests & Notes
          </label>
          <textarea
            {...register("specialRequests")}
            rows={2}
            placeholder="e.g. Extra baggage allowance, aisle seats, visa guidance..."
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none resize-none transition-all duration-200 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Abebe Bikila"
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
          />
          {errors.name && (
            <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                international
                defaultCountry="ET"
                countryCallingCodeEditable={false}
                value={field.value}
                onChange={field.onChange}
                className="w-full [&>input]:bg-gray-50/50 [&>input]:border [&>input]:border-gray-200 [&>input]:rounded-xl [&>input]:px-4 [&>input]:py-3 [&>input]:text-base [&>input]:text-brand-900 [&>input]:focus:bg-white [&>input]:focus:border-brand-900 [&>input]:focus:ring-1 [&>input]:focus:ring-brand-900 [&>input]:outline-none [&>input]:font-medium"
                placeholder="+251 9XX XXX XXX"
              />
            )}
          />
          {errors.phone && (
            <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.phone.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Email Address{" "}
            {selectedContactMethod === "Email" ? (
              <span className="text-rose-500">*</span>
            ) : (
              <span className="text-gray-400 font-normal lowercase">(optional)</span>
            )}
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="e.g. abebe@example.com"
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-base text-brand-900 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 font-medium"
          />
          {errors.email && (
            <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-2 pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-sm font-bold text-brand-900">Confirm & Send Via:</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-base font-bold text-brand-900">
              <input
                type="radio"
                value="Email"
                {...register("contactMethod")}
                className="w-4 h-4 text-brand-gold focus:ring-brand-900"
              />
              Email
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-base font-bold text-brand-900">
              <input
                type="radio"
                value="WhatsApp"
                {...register("contactMethod")}
                className="w-4 h-4 text-brand-gold focus:ring-brand-900"
              />
              WhatsApp
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-base font-bold text-brand-900">
              <input
                type="radio"
                value="Telegram"
                {...register("contactMethod")}
                className="w-4 h-4 text-brand-gold focus:ring-brand-900"
              />
              Telegram
            </label>
          </div>
        </div>

        <div className="sm:col-span-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white font-bold text-base sm:text-lg py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-md active:scale-[0.99] cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : selectedContactMethod === "Email" ? (
              <Mail className="w-5 h-5" />
            ) : (
              <Plane className="w-5 h-5" />
            )}
            <span>
              {isSubmitting
                ? "Processing..."
                : `Send Inquiry via ${selectedContactMethod}`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}