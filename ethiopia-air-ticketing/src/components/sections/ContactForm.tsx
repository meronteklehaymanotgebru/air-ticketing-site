"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get("from_name") as string)?.trim();
    const email = (formData.get("reply_to") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMsg("Email service is currently offline. Please contact us directly via phone or Telegram.");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setStatus("success");
      form.reset();
      
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        (err as { text?: string })?.text || "Failed to send your message. Please check your connection and try again."
      );
    }
  };

  const isSubmitting = status === "loading";

  return (
    <div className="w-full">
      {status === "success" && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-base font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>Message sent successfully! Our agents will contact you within 2 hours.</p>
        </div>
      )}

      {/* Error Notification Banner */}
      {status === "error" && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-base font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6"
        noValidate
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            placeholder="e.g. Yonas Welearegay"
            disabled={isSubmitting}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 disabled:opacity-50 font-medium"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="reply_to"
            placeholder="asktravel7@gmail.com"
            disabled={isSubmitting}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 disabled:opacity-50 font-medium"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Flight booking / Visa assistance / Group travel"
            disabled={isSubmitting}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all duration-200 disabled:opacity-50 font-medium"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
            Your Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your flight dates, destination, or specific travel requests..."
            disabled={isSubmitting}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-base text-brand-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none resize-none transition-all duration-200 disabled:opacity-50 font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white font-bold text-base sm:text-lg px-6 py-4 rounded-xl transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-current" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}