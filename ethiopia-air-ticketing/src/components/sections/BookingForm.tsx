// src/components/sections/BookingForm.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// ---------- Types ----------
type Airport = { code: string; city: string; country: string };
type Airline = { code: string; name: string; logo: string };

// ---------- Schema ----------
const bookingSchema = z.object({
  from: z.string().min(1, "Required"),
  to: z.string().min(1, "Required"),
  departureDate: z.string().min(1, "Required").refine(
    (val) => new Date(val) >= new Date(new Date().toDateString()),
    { message: "Departure date cannot be in the past" }
  ),
  returnDate: z.string().optional(),
  adults: z.number().min(1, "At least 1 adult"),
  children: z.number().min(0),
  infants: z.number().min(0),
  travelClass: z.enum(["Economy", "Business", "First"]),
  flexibleDates: z.boolean(),                           // removed .default(false)
  preferredAirlines: z.string().optional(),
  budget: z.enum(["under500", "500to1000", "above1000", "noLimit"]),   // removed .default("noLimit")
  specialRequests: z.string().optional(),
  name: z.string().min(1, "Required"),
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message: "Invalid phone number",
  }),
  contactMethod: z.enum(["WhatsApp", "Telegram"]),      // removed .default("WhatsApp")
}).refine(
  (data) => {
    if (data.returnDate && data.returnDate < data.departureDate) return false;
    return true;
  },
  { message: "Return date must be after departure", path: ["returnDate"] }
);

type BookingFormData = z.infer<typeof bookingSchema>;

// ---------- Airport Autocomplete ----------
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
          className="w-full border border-gray-300 rounded-lg p-2.5 pr-8 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
        />
        <Search className="absolute right-2.5 top-3 text-gray-400 w-4 h-4" />
      </div>
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-36 overflow-y-auto shadow-lg text-sm">
          {filtered.map((a) => (
            <li
              key={a.code}
              onClick={() => handleSelect(a)}
              className="px-2.5 py-1.5 hover:bg-brand-500 hover:text-white cursor-pointer flex justify-between"
            >
              <span>{a.city}</span>
              <span className="text-gray-400">{a.code}</span>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ---------- Airline Dropdown ----------
function AirlineDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selected = airlines.find((a) => a.name === value);

  useEffect(() => {
    fetch("/api/airlines")
      .then((r) => (r.ok ? r.json() : []))
      .then(setAirlines)
      .catch(() => setAirlines([]));
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16'%3E%3Crect width='24' height='16' fill='%23f0f0f0'/%3E%3C/svg%3E";
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-lg p-2.5 flex items-center justify-between bg-white text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-3.5 relative shrink-0">
              <Image
                src={selected.logo}
                alt=""
                width={20}
                height={14}
                className="object-contain"
                onError={handleError}
              />
            </div>
            {selected.name}
          </span>
        ) : (
          <span className="text-gray-400">Select airline (optional)</span>
        )}
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      {isOpen && (
        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-36 overflow-y-auto shadow-lg text-sm">
          <li
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
          >
            None
          </li>
          {airlines.map((a, idx) => (
            <li
              key={`${a.code}-${idx}`}
              onClick={() => {
                onChange(a.name);
                setIsOpen(false);
              }}
              className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <div className="w-5 h-3.5 relative shrink-0">
                <Image
                  src={a.logo}
                  alt=""
                  width={20}
                  height={14}
                  className="object-contain"
                  onError={handleError}
                />
              </div>
              {a.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Main Form ----------
export default function BookingForm() {
  const [success, setSuccess] = useState(false);
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
      contactMethod: "WhatsApp",
    },
  });

  const selectedContactMethod = watch("contactMethod");
  const departureDate = watch("departureDate");
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-green-800">
            Request sent! We will contact you via <strong>{selectedContactMethod}</strong> within 2 hours.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* From */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            From <span className="text-red-500">*</span>
          </label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="Departure city"
                error={errors.from?.message}
              />
            )}
          />
        </div>
        {/* To */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            To <span className="text-red-500">*</span>
          </label>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <AirportAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="Destination city"
                error={errors.to?.message}
              />
            )}
          />
        </div>

        {/* Dates */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Departure <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("departureDate")}
            min={today}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
          {errors.departureDate && (
            <p className="text-red-500 text-xs mt-1">{errors.departureDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Return (optional)
          </label>
          <input
            type="date"
            {...register("returnDate")}
            min={departureDate || today}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
          {errors.returnDate && (
            <p className="text-red-500 text-xs mt-1">{errors.returnDate.message}</p>
          )}
        </div>

        {/* Passengers */}
        <div className="sm:col-span-2 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Adults <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("adults", { valueAsNumber: true })}
              min={1}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Children</label>
            <input
              type="number"
              {...register("children", { valueAsNumber: true })}
              min={0}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Infants</label>
            <input
              type="number"
              {...register("infants", { valueAsNumber: true })}
              min={0}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
            />
          </div>
        </div>

        {/* Class & Budget */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            {...register("travelClass")}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Budget</label>
          <select
            {...register("budget")}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          >
            <option value="noLimit">No limit</option>
            <option value="under500">Under $500</option>
            <option value="500to1000">$500 – $1000</option>
            <option value="above1000">Above $1000</option>
          </select>
        </div>

        {/* Flexible dates */}
        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            {...register("flexibleDates")}
            id="flexible"
            className="w-4 h-4 rounded focus:ring-brand-900 text-brand-900"
          />
          <label htmlFor="flexible" className="text-xs text-text-secondary">
            My dates are flexible (±2 days)
          </label>
        </div>

        {/* Preferred Airlines */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Preferred Airlines (optional)
          </label>
          <Controller
            name="preferredAirlines"
            control={control}
            render={({ field }) => (
              <AirlineDropdown value={field.value || ""} onChange={field.onChange} />
            )}
          />
        </div>

        {/* Special Requests */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Special Requests
          </label>
          <textarea
            {...register("specialRequests")}
            rows={2}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Phone Number <span className="text-red-500">*</span>
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
                className="w-full [&>input]:border [&>input]:border-gray-300 [&>input]:rounded-lg [&>input]:p-2.5 [&>input]:text-sm [&>input]:focus:ring-2 [&>input]:focus:ring-brand-900 [&>input]:focus:border-brand-900 [&>input]:outline-none"
                placeholder="+251 9XX XXX XXX"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Contact method */}
        <div className="sm:col-span-2 flex items-center gap-4">
          <label className="text-xs font-medium text-text-secondary">Contact me via:</label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="WhatsApp"
              {...register("contactMethod")}
              className="w-4 h-4 text-brand-900 focus:ring-brand-900"
            />
            WhatsApp
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Telegram"
              {...register("contactMethod")}
              className="w-4 h-4 text-brand-900 focus:ring-brand-900"
            />
            Telegram
          </label>
        </div>

        {/* Submit Button – Dark Blue with Golden Hover */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Sending..." : "Get Quote"}
          </button>
        </div>
      </form>
    </div>
  );
}