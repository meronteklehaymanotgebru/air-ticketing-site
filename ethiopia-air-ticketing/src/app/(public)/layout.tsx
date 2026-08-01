import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBanner/>
      <Header />
      {children}
      <Footer />
      <ChatbotWidget />
    </>
  );
}
