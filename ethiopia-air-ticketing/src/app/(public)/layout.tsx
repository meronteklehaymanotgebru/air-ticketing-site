import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatbotWidget />
    </>
  );
}
