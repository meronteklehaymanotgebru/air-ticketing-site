"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.text || "Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      {/* Success banner */}
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-green-800 text-sm">Message sent! We’ll get back to you shortly.</p>
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-red-800 text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            placeholder="Meron"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="reply_to"
            placeholder="meron@example.com"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Flight quotation / General enquiry"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us how we can help you…"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-900 focus:border-brand-900 outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-60 shadow-md"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}