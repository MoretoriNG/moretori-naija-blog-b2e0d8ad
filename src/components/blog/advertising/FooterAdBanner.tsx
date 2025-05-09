
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterAdBannerProps {
  className?: string;
}

export function FooterAdBanner({ className = "" }: FooterAdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white py-3 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=150&h=100&q=80"
                alt="Promo"
                className="h-16 w-24 object-cover rounded"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Business Conference 2025
              </h4>
              <p className="text-sm text-white/80 max-w-lg">
                Join industry leaders at the biggest business conference in Nigeria. Early bird tickets available now!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="#promo"
              className="hidden sm:inline-flex text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
            >
              Register Now <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 rounded-full p-0 bg-white/10 hover:bg-white/20"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
