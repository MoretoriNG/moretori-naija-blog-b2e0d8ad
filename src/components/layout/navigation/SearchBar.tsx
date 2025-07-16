
import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const trendingSearches = [
  "Technology trends",
  "Nigeria economy",
  "Lagos traffic",
  "Afrobeats music",
  "Nigerian politics"
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search articles, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10 w-full md:w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 bg-white shadow-lg border z-50 max-h-96 overflow-y-auto">
          {query ? (
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 hover:bg-gray-50"
                onClick={() => handleSearch(query)}
              >
                <Search size={16} className="mr-2 text-gray-400" />
                Search for "{query}"
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Searches</h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 hover:bg-gray-50"
                        onClick={() => handleSearch(search)}
                      >
                        <Search size={14} className="mr-2 text-gray-400" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  Trending
                </h3>
                <div className="space-y-1">
                  {trendingSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 hover:bg-gray-50"
                      onClick={() => handleSearch(search)}
                    >
                      <TrendingUp size={14} className="mr-2 text-orange-500" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
