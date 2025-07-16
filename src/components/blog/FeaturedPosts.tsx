
import { useState, useEffect, useRef } from 'react';
import { Post } from '@/types/blog';
import { FeaturedPostsHeader } from './posts/FeaturedPostsHeader';
import { PostGrid } from './posts/PostGrid';
import { FeaturedPostsFooter } from './posts/FeaturedPostsFooter';

interface FeaturedPostsProps {
  posts?: Post[];
}

export function FeaturedPosts({ posts = [] }: FeaturedPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // If no posts are provided, use an empty array
  const displayPosts = posts.length > 0 ? posts.slice(0, 12) : [];

  // Determine how many posts to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      
      if (width < 640) {
        setVisiblePosts(1);
      } else if (width < 1024) {
        // Tablet: show 3 cards
        setVisiblePosts(3);
      } else if (width < 1280) {
        setVisiblePosts(3);
      } else {
        setVisiblePosts(4);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(displayPosts.length / visiblePosts));
  
  const nextPage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        behavior: 'smooth',
        top: 0
      });
    }
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        behavior: 'smooth',
        top: 0
      });
    }
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="py-8 md:py-12 bg-white" ref={scrollRef}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <FeaturedPostsHeader 
          totalPages={totalPages}
          currentPage={currentPage}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          totalPosts={displayPosts.length}
          visiblePosts={visiblePosts}
        />
        
        <PostGrid 
          posts={displayPosts} 
          visiblePosts={visiblePosts}
        />
        
        <FeaturedPostsFooter />
      </div>
    </div>
  );
}

export default FeaturedPosts;
