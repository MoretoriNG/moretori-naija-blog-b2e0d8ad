
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
      
      <div className="flex flex-1">
        <main className={`flex-1 ${shouldShowSidebar ? 'mr-6' : ''}`}>
          <Outlet />
        </main>
        
        {/* Right Sidebar - Hidden on mobile, shown on desktop */}
        {shouldShowSidebar && (
          <aside className="hidden xl:block flex-shrink-0 sticky top-20 h-fit">
            <RightSidebar />
          </aside>
        )}
      </div>
      
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
