import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",  
});

export const metadata: Metadata = {
  title: "Ethiopia Air Ticketing | Flight Quotations & Booking",
  description:
    "Get fast flight quotes and book tickets from Addis Ababa to worldwide destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}