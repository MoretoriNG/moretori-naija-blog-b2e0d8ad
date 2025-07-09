
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AdBanner from "@/components/blog/advertising/AdBanner";

interface PostLayoutWrapperProps {
  children: ReactNode;
}

export function PostLayoutWrapper({ children }: PostLayoutWrapperProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const location = useLocation();

  // Calculate reading progress and show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate estimated reading time
  useEffect(() => {
    const content = document.querySelector('article');
    if (content) {
      const text = content.textContent || '';
      const wordsPerMinute = 200;
      const words = text.trim().split(/\s+/).length;
      setReadingTime(Math.ceil(words / wordsPerMinute));
    }
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={scrollProgress} className="h-1 rounded-none bg-transparent" />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
        {/* Reading Time Indicator */}
        {readingTime > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3 text-blue-600" />
            <span className="text-gray-700">{readingTime} min</span>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            size="icon"
            className="rounded-full bg-gray-800 hover:bg-gray-900 shadow-lg transition-all duration-300 hover:scale-110"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Leaderboard ad banner after navbar */}
      <AdBanner size="large" className="container my-2" />
      
      {/* Main Content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Footer Ad Banner */}
      <AdBanner size="large" className="container my-8" />
    </div>
  );
}
