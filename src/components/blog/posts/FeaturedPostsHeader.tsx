
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedPostsHeaderProps {
  totalPages: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPosts: number;
  visiblePosts: number;
}

export function FeaturedPostsHeader({
  totalPages,
  currentPage,
  onPrevPage,
  onNextPage,
  totalPosts,
  visiblePosts
}: FeaturedPostsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Latest Updates
        </h2>
        <p className="text-sm text-muted-foreground">Discover our most recent articles across all categories</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevPage}
          className="rounded-full border-blue-200 hover:bg-blue-50 hidden sm:flex"
          disabled={totalPosts <= visiblePosts}
        >
          <ChevronLeft size={16} />
        </Button>
        
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">
          {currentPage + 1}/{totalPages}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextPage}
          className="rounded-full border-blue-200 hover:bg-blue-50 hidden sm:flex"
          disabled={totalPosts <= visiblePosts}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
