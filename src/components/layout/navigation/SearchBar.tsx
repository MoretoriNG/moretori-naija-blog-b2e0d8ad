
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "transition-all duration-300",
            isExpanded ? "opacity-100" : "opacity-70 hover:opacity-100"
          )}
        >
          <Search className="h-4 w-4" />
        </Button>
        
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "w-64 ml-2" : "w-0"
        )}>
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm"
            onBlur={() => {
              if (!searchQuery) {
                setIsExpanded(false);
              }
            }}
            autoFocus={isExpanded}
          />
        </div>
      </div>
    </form>
  );
}
