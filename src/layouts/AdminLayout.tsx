
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check
  // In a real app, this would check a token in localStorage or a cookie
  useEffect(() => {
    const checkAuth = () => {
      // For demo purposes, we'll consider the user authenticated
      // In a real app, this would verify a token with your backend
      const isLoggedIn = localStorage.getItem("admin_authenticated") === "true";
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };

    // Add a small delay to simulate an API call
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNav />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
