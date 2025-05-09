
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { FooterAdBanner } from "@/components/blog/advertising/FooterAdBanner";
import AdBanner from "@/components/blog/advertising/AdBanner";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Banner */}
      <AdBanner 
        size="header" 
        id="header-promo"
        className="z-20"
      />

      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Additional footer ad banner */}
      <AdBanner 
        size="large" 
        id="footer-banner"
        className="container my-6"
      />
      
      <FooterAdBanner />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
