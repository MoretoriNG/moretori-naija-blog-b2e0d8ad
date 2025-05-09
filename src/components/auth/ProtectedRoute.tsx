
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export function ProtectedRoute({ redirectTo = "/auth" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Debug logs
  useEffect(() => {
    console.log("ProtectedRoute: isLoading =", isLoading, "user =", !!user, "path =", location.pathname);
  }, [isLoading, user, location]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-200 border-l-blue-200 border-r-blue-200 rounded-full animate-spin mb-4"></div>
          <p className="text-blue-600 font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
}
