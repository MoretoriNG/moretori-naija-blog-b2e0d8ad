
import { useState } from 'react';
import { Post } from '@/types/blog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeaturedPostCard } from './FeaturedPostCard';

interface PostGridProps {
  posts: Post[];
  visiblePosts: number;
}

export function PostGrid({ posts, visiblePosts }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(posts.length / visiblePosts));
  
  // Get current visible posts
  const currentPosts = posts.slice(
    currentPage * visiblePosts, 
    (currentPage + 1) * visiblePosts
  );
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
        {currentPosts.map((post) => (
          <FeaturedPostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Mobile pagination indicator */}
      {posts.length > visiblePosts && (
        <div className="flex justify-center items-center mt-6 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft size={16} />
          </Button>
          
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors cursor-pointer",
                  currentPage === index ? "bg-blue-500" : "bg-gray-300"
                )}
                onClick={() => setCurrentPage(index)}
              ></div>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="h-8 w-8 p-0"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </>
  );
}
