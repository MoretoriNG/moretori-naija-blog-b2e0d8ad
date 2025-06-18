
import { ReactNode } from "react";
import AdBanner from "@/components/blog/advertising/AdBanner";

interface PostLayoutWrapperProps {
  children: ReactNode;
}

export function PostLayoutWrapper({ children }: PostLayoutWrapperProps) {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Leaderboard ad banner after navbar */}
      <AdBanner size="large" className="container my-2" />
      
      {children}
      
      {/* Footer Ad Banner */}
      <AdBanner size="large" className="container my-8" />
    </div>
  );
}
