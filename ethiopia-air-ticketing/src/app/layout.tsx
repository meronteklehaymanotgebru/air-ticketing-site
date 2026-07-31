import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",  
});

export const metadata: Metadata = {
  title: "Ask Travel Trading PLC | Flight Booking Agency",
  description:
    "Book flights from Addis Ababa to worldwide destinations with our reliable booking agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}