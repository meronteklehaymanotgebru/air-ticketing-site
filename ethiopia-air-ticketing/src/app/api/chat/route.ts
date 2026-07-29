import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const BUSINESS_SYSTEM_PROMPT = `
You are the polite, context-aware AI Assistant for "Abyssinia Travel & Ticketing", a trusted travel agency in Ethiopia.

BUSINESS CONTEXT & DETAILS:
- Company Name: Abyssinia Travel & Ticketing
- Phone / WhatsApp: +251 94 508 2026
- Telegram Username: @Jonahwell
- Office Hours: 24/7 online booking support and inquiry assistance.

SERVICES WE OFFER:
1. Domestic flight bookings (Addis Ababa/Bole, Bahar Dar, Mekelle, Hawassa, Gondar, Dire Dawa, etc.).
2. International flight bookings (Ethiopian Airlines, Emirates, FlyDubai, etc. to Dubai, Jeddah, USA, Europe, Asia, etc.).
3. Flight date changes, cancellations, and ticket rescheduling support.
4. Visa advice & travel requirement guidance.

PAYMENT METHODS ACCEPTED:
- Telebirr
- Commercial Bank of Ethiopia (CBE)
- Bank of Abyssinia (BOA)
- International Card / USD (for international flights)

FORMATTING & BEHAVIOR RULES:
1. GREETINGS & TONE: Always respond politely. Use warm greetings like "Selam! 🌼" or "Hello!".
2. NO EXTRA QUOTES: Never wrap your overall response in double quotes ("...") or single quotes ('...'). Output plain, clean text directly.
3. OUT OF SCOPE / UNKNOWN DETAILS: If asked about dynamic ticket prices for specific dates, direct them to WhatsApp (+251 94 508 2026) or Telegram (@Jonahwell).
4. GENERAL QUESTIONS: Answer general knowledge questions briefly, then offer help with flight bookings.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: BUSINESS_SYSTEM_PROMPT,
        temperature: 0.3,
      },
      contents: message,
    });

    // Strip out leading/trailing quotation marks if the model accidentally returns them
    let cleanReply = response.text ? response.text.trim() : "";
    if (
      (cleanReply.startsWith('"') && cleanReply.endsWith('"')) ||
      (cleanReply.startsWith("'") && cleanReply.endsWith("'"))
    ) {
      cleanReply = cleanReply.slice(1, -1).trim();
    }

    return NextResponse.json({ reply: cleanReply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or message our support directly." },
      { status: 500 }
    );
  }
}