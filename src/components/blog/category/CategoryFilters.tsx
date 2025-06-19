
import { TrendingUp } from "lucide-react";

interface CategoryFiltersProps {
  postsCount: number;
  sortBy: 'recent' | 'popular';
  viewMode: 'grid' | 'list';
  compactView: boolean;
  setSortBy: (value: 'recent' | 'popular') => void;
  setViewMode: (value: 'grid' | 'list') => void;
  setCompactView: (value: boolean) => void;
}

export function CategoryFilters({
  postsCount
}: CategoryFiltersProps) {
  return (
    <div className="flex items-center justify-center bg-white p-2 rounded-lg shadow-sm border">
      <div className="text-sm text-muted-foreground flex items-center">
        <TrendingUp className="h-4 w-4 mr-2" /> 
        <span><strong>{postsCount}</strong> articles available</span>
      </div>
    </div>
  );
}
