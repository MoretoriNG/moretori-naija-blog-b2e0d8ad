
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <div className={cn(
      "transition-all duration-300",
      isSearchOpen 
        ? "w-48 md:w-64 border rounded-full overflow-hidden bg-white shadow-sm" 
        : "w-10"
    )}>
      {isSearchOpen ? (
        <div className="flex items-center">
          <Input
            placeholder="Search articles..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsSearchOpen(false)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-blue-600/10"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  );
}
