"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, RotateCcw, ArrowRight, Loader2 } from "lucide-react";

const WHATSAPP_NUMBER = "251901421142";
const TELEGRAM_USERNAME = "Asktravel2";
const COMPANY_NAME = "Ask Travel Trading PLC";
const SLOGAN = "JUST ASK WE FLY YOU";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
};

type BookingState = {
  from?: string;
  to?: string;
  departureDate?: string;
  passengers?: string;
  travelClass?: string;
  contactMethod?: "WhatsApp" | "Telegram";
};

const sanitizeText = (text: string): string => {
  if (!text) return "";
  let clean = text.trim();
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'")) ||
    (clean.startsWith("`") && clean.endsWith("`"))
  ) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingState>({});
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: sanitizeText(`Selam! 🌼 Welcome to ${COMPANY_NAME}.\n"${SLOGAN}"\n\nHow can our IATA-certified team help you travel today?`),
      options: ["✈️ Find a Cheap Ticket", "💳 Payment & Visa Guidance", "📞 Talk to an Agent"],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const fetchGeminiReply = async (userText: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      return sanitizeText(
        data.reply ||
          "Selam! I am here to help. Would you like to check flight prices or speak directly with an agent?"
      );
    } catch (err) {
      console.error("Chat API error:", err);
      return `Selam! You can contact our support team directly via WhatsApp (+251 901 421 142) or Telegram (@${TELEGRAM_USERNAME}) for immediate assistance.`;
    }
  };

  const getNextBookingQuestion = (
    data: BookingState
  ): { text: string; options?: string[] } | null => {
    if (!data.from) {
      return {
        text: "Where are you flying from?\n\nSelect a city below, or type your departure location in the input box 👇",
        options: [
          "Addis Ababa (Bole)",
          "Bahar Dar",
          "Mekelle",
          "Hawassa",
          "Gondar",
          "Dire Dawa",
          "✍️ Type My Own City",
        ],
      };
    }
    if (!data.to) {
      return {
        text: `Awesome! Where are you going from ${data.from}?\n\nSelect a destination below or type any city in the chat 👇`,
        options: [
          "Dubai",
          "Washington DC",
          "Guangzhou",
          "Jeddah",
          "Nairobi",
          "Domestic Flight",
          "✍️ Type My Own Destination",
        ],
      };
    }
    if (!data.departureDate) {
      return {
        text: "When do you plan to fly?\n\n(Choose an option below or type your exact date)",
        options: ["Tomorrow", "This Weekend", "Next Week", "✍️ Type My Own Date"],
      };
    }
    if (!data.passengers) {
      return {
        text: "How many passengers are travelling?",
        options: ["Just Me (1 Person)", "2 People", "3+ Passengers", "Family / Group"],
      };
    }
    if (!data.travelClass) {
      return {
        text: "Which class do you prefer?",
        options: ["Economy Class", "Business / Cloud Nine"],
      };
    }
    if (!data.contactMethod) {
      return {
        text: "Where should our agent send your best airline options and exact pricing?",
        options: ["WhatsApp", "Telegram"],
      };
    }
    return null;
  };

  const processUserInput = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    if (
      userText === "✍️ Type My Own City" ||
      userText === "✍️ Type My Own Destination" ||
      userText === "✍️ Type My Own Date"
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Sure! Type your details in the text box below and hit send. 👇",
        },
      ]);
      return;
    }

    const cleanInput = userText.trim();
    const userMessageId = Date.now().toString();

    const updatedMessages: Message[] = [
      ...messages,
      { id: userMessageId, sender: "user", text: cleanInput },
    ];

    setMessages(updatedMessages);
    setInputVal("");

    const lowerInput = cleanInput.toLowerCase();

    if (
      !isBookingMode &&
      (lowerInput.includes("book") ||
        lowerInput.includes("ticket") ||
        lowerInput.includes("flight") ||
        lowerInput.includes("find") ||
        cleanInput === "✈️ Find a Cheap Ticket")
    ) {
      setIsBookingMode(true);
      const nextQ = getNextBookingQuestion(bookingData);
      if (nextQ) {
        setMessages([
          ...updatedMessages,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: sanitizeText(`Great! Let's find your ticket options. ✈️\n\n${nextQ.text}`),
            options: nextQ.options,
          },
        ]);
      }
      return;
    }

    if (isBookingMode) {
      const updatedData = { ...bookingData };

      if (!updatedData.from) {
        updatedData.from = cleanInput;
      } else if (!updatedData.to) {
        updatedData.to = cleanInput;
      } else if (!updatedData.departureDate) {
        updatedData.departureDate = cleanInput;
      } else if (!updatedData.passengers) {
        updatedData.passengers = cleanInput;
      } else if (!updatedData.travelClass) {
        updatedData.travelClass = cleanInput;
      } else if (!updatedData.contactMethod) {
        if (lowerInput.includes("whatsapp")) updatedData.contactMethod = "WhatsApp";
        else if (lowerInput.includes("telegram")) updatedData.contactMethod = "Telegram";
        else updatedData.contactMethod = "WhatsApp";
      }

      setBookingData(updatedData);

      const nextQ = getNextBookingQuestion(updatedData);
      if (nextQ) {
        setMessages([
          ...updatedMessages,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: sanitizeText(nextQ.text),
            options: nextQ.options,
          },
        ]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: sanitizeText(
              `All set! Click the button below to send your flight inquiry to our travel team on ${updatedData.contactMethod}. We will send you the best IATA fares right away!`
            ),
          },
        ]);
      }
      return;
    }

    setIsLoading(true);
    const aiReply = await fetchGeminiReply(cleanInput);
    setIsLoading(false);

    setMessages([
      ...updatedMessages,
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiReply,
        options: ["✈️ Find a Cheap Ticket", "📞 Talk to an Agent"],
      },
    ]);
  };

  const handleReset = () => {
    setBookingData({});
    setIsBookingMode(false);
    setIsLoading(false);
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: sanitizeText(`Selam! 🌼 Welcome to ${COMPANY_NAME}.\n"${SLOGAN}"\n\nHow can our team help you travel today?`),
        options: ["✈️ Find a Cheap Ticket", "💳 Payment & Visa Guidance", "📞 Talk to an Agent"],
      },
    ]);
  };

  const handleSendToMessagingApp = () => {
    const { from, to, departureDate, passengers, travelClass, contactMethod } = bookingData;
    let rawMessage = "";

    if (contactMethod === "WhatsApp") {
      rawMessage = `Selam Ask Travel! 🌼 I need help booking a ticket.

TRIP INQUIRY
From: ${from || "Not specified"}
To: ${to || "Not specified"}
Travel Date: ${departureDate || "Not specified"}

PASSENGERS & SEAT
Passengers: ${passengers || "1 Person"}
Class: ${travelClass || "Economy"}

Please send me your best available ticket prices and options. Thank you!`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`,
        "_blank"
      );
    } else {
      rawMessage = `Selam Ask Travel! 🌼 I would like to check ticket prices.

✈️ TRIP DETAILS
🛫 Flying From: ${from || "Not specified"}
🛬 Flying To: ${to || "Not specified"}
🗓️ Date: ${departureDate || "Not specified"}

👥 PASSENGERS & SEAT
🎟️ Passengers: ${passengers || "1 Person"}
💺 Class: ${travelClass || "Economy"}

Please send me your best available fares! Thank you 😊`;

      window.open(
        `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(rawMessage)}`,
        "_blank"
      );
    }
  };

  const isBookingComplete =
    bookingData.from &&
    bookingData.to &&
    bookingData.departureDate &&
    bookingData.passengers &&
    bookingData.travelClass &&
    bookingData.contactMethod;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] sm:w-[380px] h-[calc(100vh-6rem)] max-h-[580px] min-h-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-3 sm:mb-4 transition-all duration-200">
          <div className="bg-brand-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-900 flex items-center justify-center font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold leading-tight truncate">
                  {COMPANY_NAME}
                </h3>
                <span className="text-[10px] text-green-300 font-medium block">
                  IATA Accredited • AI Assistant
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleReset}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Start Over"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-gray-50/50 text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-brand-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-brand-900 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line text-xs sm:text-xs">
                    {m.text}
                  </p>

                  {m.options && !isLoading && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => processUserInput(opt)}
                          className="bg-brand-50 hover:bg-brand-900 hover:text-white text-brand-900 border border-brand-200 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-6 h-6 rounded-full bg-brand-900 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-gray-500 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-900" />
                  <span>Checking details...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            {isBookingComplete ? (
              <button
                onClick={handleSendToMessagingApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Chat on {bookingData.contactMethod} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  processUserInput(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a message or book my flight..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 border-0 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-brand-900 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="p-2 sm:p-2.5 bg-brand-900 text-white rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-colors disabled:opacity-40 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white p-3.5 sm:p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
        aria-label="Toggle Ticket Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 shrink-0" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[160px] transition-all duration-300 text-xs font-semibold whitespace-nowrap">
              Ask or Book Tickets
            </span>
          </>
        )}
      </button>
    </div>
  );
}