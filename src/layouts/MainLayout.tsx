
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { FooterAdBanner } from "@/components/blog/advertising/FooterAdBanner";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterAdBanner />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
