"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, Search, AlertCircle, Loader2, Users, Send } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const COMPANY_EMAIL = "info@asktravel.com"; 
const WHATSAPP_NUMBER = "251901421142";
const TELEGRAM_USERNAME = "Asktravel2";

type Airport = { code: string; city: string; country: string };

const bookingSchema = z
  .object({
    from: z.string().min(1, "Departure is required"),
    to: z.string().min(1, "Destination is required"),
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
        { message: "Date cannot be in the past" }
      ),
    returnDate: z.string().optional(),
    adults: z.number().min(1, "At least 1 adult required"),
    children: z.number().min(0),
    infants: z.number().min(0),
    travelClass: z.enum(["Economy", "Business", "Both"]),
    flexibleDates: z.boolean(),
    preferredAirlines: z.string().optional(),
    specialRequests: z.string().optional(),
    name: z.string().min(1, "Full name is required"),
    phone: z.string().refine((val) => (val ? isValidPhoneNumber(val) : false), {
      message: "Valid phone required",
    }),
    email: z.string().optional(),
    contactMethod: z.enum(["WhatsApp", "Telegram", "Email"]),
  })
  .refine(
    (data) => {
      if (data.returnDate && data.returnDate < data.departureDate) return false;
      return true;
    },
    { message: "Return must be on or after departure", path: ["returnDate"] }
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
    { message: "Valid email address required", path: ["email"] }
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFiltered([]);
      return;
    }
    const results = airports.filter(
      (a) =>
        a.city.toLowerCase().includes(query) ||
        a.code.toLowerCase().includes(query) ||
        a.country.toLowerCase().includes(query)
    );
    setFiltered(results.slice(0, 6));
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
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all font-medium pr-8"
        />
        <Search className="absolute right-2.5 top-2.5 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
      </div>
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-40 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-xl text-xs py-1">
          {filtered.map((a) => (
            <li
              key={a.code}
              onClick={() => handleSelect(a)}
              className="px-3 py-2 hover:bg-brand-gold/10 hover:text-brand-900 cursor-pointer flex justify-between items-center font-medium"
            >
              <span>{a.city}, {a.country}</span>
              <span className="font-bold bg-gray-100 text-brand-900 px-1.5 py-0.5 rounded">{a.code}</span>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-rose-500 text-[10px] font-medium mt-0.5">{error}</p>}
    </div>
  );
}

function PassengerSelector({
  adults,
  children,
  infants,
  onChange,
}: {
  adults: number;
  children: number;
  infants: number;
  onChange: (counts: { adults: number; children: number; infants: number }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = adults + children + infants;
  const label = `${total} Traveler${total > 1 ? "s" : ""}`;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 flex items-center justify-between font-medium hover:bg-white focus:outline-none focus:ring-1 focus:ring-brand-900"
      >
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-gray-500" />
          {label}
        </span>
        <span className="text-[10px] text-gray-400">▾</span>
      </button>

      {isOpen && (
        <div className="absolute z-40 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-3 text-xs space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-brand-900">Adults</p>
              <p className="text-[10px] text-gray-400">12+ yrs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={adults <= 1}
                onClick={() => onChange({ adults: adults - 1, children, infants })}
                className="w-6 h-6 border rounded font-bold text-gray-600 disabled:opacity-30"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{adults}</span>
              <button
                type="button"
                onClick={() => onChange({ adults: adults + 1, children, infants })}
                className="w-6 h-6 border rounded font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-brand-900">Children</p>
              <p className="text-[10px] text-gray-400">2–11 yrs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={children <= 0}
                onClick={() => onChange({ adults, children: children - 1, infants })}
                className="w-6 h-6 border rounded font-bold text-gray-600 disabled:opacity-30"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{children}</span>
              <button
                type="button"
                onClick={() => onChange({ adults, children: children + 1, infants })}
                className="w-6 h-6 border rounded font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-brand-900">Infants</p>
              <p className="text-[10px] text-gray-400">&lt;2 yrs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={infants <= 0}
                onClick={() => onChange({ adults, children, infants: infants - 1 })}
                className="w-6 h-6 border rounded font-bold text-gray-600 disabled:opacity-30"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{infants}</span>
              <button
                type="button"
                onClick={() => onChange({ adults, children, infants: infants + 1 })}
                className="w-6 h-6 border rounded font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingForm() {
  const [success, setSuccess] = useState(false);
  const [submittedMethod, setSubmittedMethod] = useState<"Email" | "WhatsApp" | "Telegram">("WhatsApp");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
      travelClass: "Economy",
      flexibleDates: false,
      contactMethod: "WhatsApp",
      email: "",
    },
  });

  const adults = watch("adults");
  const children = watch("children");
  const infants = watch("infants");
  const departureDate = watch("departureDate");
  const selectedContactMethod = watch("contactMethod");
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const passengerSummary = `${data.adults} Adult${data.adults > 1 ? "s" : ""}${
        data.children > 0 ? `, ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""
      }${data.infants > 0 ? `, ${data.infants} Infant${data.infants > 1 ? "s" : ""}` : ""}`;

      const flexibleStatus = data.flexibleDates ? "Yes (±2 days)" : "No";
      const returnInfo = data.returnDate || "One-Way";

      if (data.contactMethod === "Email") {
        const emailSubject = encodeURIComponent(
          `[Flight Inquiry] ${data.from} to ${data.to} - ${data.name}`
        );

        const emailBody = `Dear Ask Travel Team,

Flight Inquiry Details:
- Route: ${data.from} ➔ ${data.to}
- Dates: ${data.departureDate} (Return: ${returnInfo})
- Flexible: ${flexibleStatus}
- Passengers: ${passengerSummary} (${data.travelClass})
${data.specialRequests ? `- Special Requests / Notes: ${data.specialRequests}\n` : ""}
Contact: ${data.name} | ${data.phone} | ${data.email || "N/A"}`;

        window.open(`mailto:${COMPANY_EMAIL}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`, "_blank");

      } else if (data.contactMethod === "WhatsApp") {
        const waMessage = `FLIGHT BOOKING REQUEST

✈️ Route: ${data.from} ➔ ${data.to}
🗓️ Dates: ${data.departureDate} (Return: ${returnInfo})
📆 Flexible: ${flexibleStatus}
👥 Passengers: ${passengerSummary} (${data.travelClass})
${data.specialRequests ? `📝 Notes: ${data.specialRequests}\n` : ""}
👤 Contact: ${data.name} (${data.phone})`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`, "_blank", "noopener,noreferrer");

      } else if (data.contactMethod === "Telegram") {
        const tgMessage = `Selam Ask Travel! 🌼 Flight Inquiry:

✈️ Route: ${data.from} ➔ ${data.to}
🗓️ Dates: ${data.departureDate} (Return: ${returnInfo})
👥 Passengers: ${passengerSummary} (${data.travelClass})
${data.specialRequests ? `📝 Notes: ${data.specialRequests}\n` : ""}
👤 Name: ${data.name}
📱 Phone: ${data.phone}`;

        window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(tgMessage)}`, "_blank", "noopener,noreferrer");
      }

      setSubmittedMethod(data.contactMethod);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      setSubmitError("Failed to prepare request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {success && (
        <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs font-medium shrink-0">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Opening {submittedMethod}...</span>
        </div>
      )}

      {submitError && (
        <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-800 text-xs font-medium shrink-0">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Section 1: Route */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              From <span className="text-rose-500">*</span>
            </label>
            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <AirportAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="e.g. Addis Ababa (ADD)"
                  error={errors.from?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              To <span className="text-rose-500">*</span>
            </label>
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <AirportAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="e.g. Dubai (DXB)"
                  error={errors.to?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Section 2: Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Departure <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              {...register("departureDate")}
              min={today}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium"
            />
            {errors.departureDate && (
              <p className="text-rose-500 text-[10px] font-medium mt-0.5">{errors.departureDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Return <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="date"
              {...register("returnDate")}
              min={departureDate || today}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium"
            />
          </div>
        </div>

        {/* Section 3: Passengers & Class */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Passengers
            </label>
            <PassengerSelector
              adults={adults}
              // eslint-disable-next-line react/no-children-prop
              children={children}
              infants={infants}
              onChange={({ adults, children, infants }) => {
                setValue("adults", adults);
                setValue("children", children);
                setValue("infants", infants);
              }}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Cabin Class
            </label>
            <select
              {...register("travelClass")}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium cursor-pointer"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business (Cloud Nine)</option>
              <option value="Both">Both Best Option</option>
            </select>
          </div>
        </div>

        {/* Flexible Dates Checkbox */}
        <div className="flex items-center gap-2 py-0.5">
          <input
            type="checkbox"
            {...register("flexibleDates")}
            id="flexible"
            className="w-3.5 h-3.5 rounded text-brand-gold focus:ring-brand-900 cursor-pointer"
          />
          <label htmlFor="flexible" className="text-xs text-text-secondary font-medium cursor-pointer">
            Dates are flexible (±2 days)
          </label>
        </div>

        {/* Section 4: Personal Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Abebe Bikila"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium"
            />
            {errors.name && (
              <p className="text-rose-500 text-[10px] font-medium mt-0.5">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
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
                  className="w-full [&>input]:bg-gray-50 [&>input]:border [&>input]:border-gray-200 [&>input]:rounded-lg [&>input]:px-3 [&>input]:py-2 [&>input]:text-xs [&>input]:text-brand-900 [&>input]:outline-none [&>input]:font-medium"
                  placeholder="+251 9XX XXX XXX"
                />
              )}
            />
            {errors.phone && (
              <p className="text-rose-500 text-[10px] font-medium mt-0.5">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Section 5: Optional Notes / Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
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
              placeholder="abebe@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium"
            />
            {errors.email && (
              <p className="text-rose-500 text-[10px] font-medium mt-0.5">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1">
              Notes / Airline <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              {...register("specialRequests")}
              placeholder="Preferred airline, extra luggage..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-900 focus:bg-white focus:border-brand-900 outline-none font-medium"
            />
          </div>
        </div>

        {/* Section 6: Direct Channel Chooser */}
        <div className="pt-2">
          <label className="block text-[11px] font-bold text-brand-900 uppercase tracking-wider mb-1.5">
            Send Request Via:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center justify-center gap-1.5 p-2 rounded-lg border border-gray-200 cursor-pointer text-xs font-bold text-brand-900 hover:bg-gray-50">
              <input
                type="radio"
                value="WhatsApp"
                {...register("contactMethod")}
                className="w-3.5 h-3.5 text-brand-gold focus:ring-brand-900"
              />
              <span>WhatsApp</span>
            </label>

            <label className="flex items-center justify-center gap-1.5 p-2 rounded-lg border border-gray-200 cursor-pointer text-xs font-bold text-brand-900 hover:bg-gray-50">
              <input
                type="radio"
                value="Telegram"
                {...register("contactMethod")}
                className="w-3.5 h-3.5 text-brand-gold focus:ring-brand-900"
              />
              <span>Telegram</span>
            </label>

            <label className="flex items-center justify-center gap-1.5 p-2 rounded-lg border border-gray-200 cursor-pointer text-xs font-bold text-brand-900 hover:bg-gray-50">
              <input
                type="radio"
                value="Email"
                {...register("contactMethod")}
                className="w-3.5 h-3.5 text-brand-gold focus:ring-brand-900"
              />
              <span>Email</span>
            </label>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-900 font-extrabold py-3 px-4 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Preparing Your Booking...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Your Flight</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}