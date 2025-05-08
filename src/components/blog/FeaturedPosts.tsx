
import { useState, useEffect } from 'react';
import { Post } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDate } from "@/lib/blog/utils";
import { CategoryBadge } from './CategoryBadge';

interface FeaturedPostsProps {
  posts?: Post[];
}

export function FeaturedPosts({ posts = [] }: FeaturedPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // If no posts are provided, use an empty array
  const displayPosts = posts.length > 0 ? posts : [];

  // Determine how many posts to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisiblePosts(mobile ? 1 : 4);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(displayPosts.length / visiblePosts));
  
  // Get current visible posts
  const currentPosts = displayPosts.slice(
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
    <div className="container py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Latest Updates
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="rounded-full border-blue-200 hover:bg-blue-50"
            disabled={displayPosts.length <= visiblePosts}
          >
            <ChevronLeft size={18} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="rounded-full border-blue-200 hover:bg-blue-50"
            disabled={displayPosts.length <= visiblePosts}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {currentPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/post/${post.slug}`} className="block relative">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={post.coverImage || post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="absolute top-3 left-3">
                <CategoryBadge category={post.category} />
              </div>
            </Link>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDate(post.publishedAt || post.published_at)}
                </time>
                
                <span className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {post.author}
                </span>
              </div>
              
              <Link to={`/post/${post.slug}`}>
                <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              <Link 
                to={`/post/${post.slug}`} 
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
              >
                Read More <ChevronRight size={16} className="ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Mobile pagination indicator */}
      <div className="flex justify-center mt-6 md:hidden">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full mx-1",
              currentPage === index ? "bg-blue-500" : "bg-gray-300"
            )}
            onClick={() => setCurrentPage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedPosts;
