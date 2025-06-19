
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Toaster } from "@/components/ui/sonner";
import { FooterAdBanner } from "@/components/blog/advertising/FooterAdBanner";
import AdBanner from "@/components/blog/advertising/AdBanner";

export default function MainLayout() {
  const location = useLocation();
  
  // Hide sidebar on certain pages
  const hideSidebarRoutes = ['/auth', '/admin'];
  const shouldShowSidebar = !hideSidebarRoutes.some(route => location.pathname.startsWith(route));
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Outlet />
        
        {/* Right Sidebar - Show below content on all pages */}
        {shouldShowSidebar && (
          <div className="container my-8 flex justify-center">
            <RightSidebar />
          </div>
        )}
      </main>
      
      {/* Single footer ad banner */}
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
