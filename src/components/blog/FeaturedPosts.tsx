
import { useState, useEffect } from 'react';
import { getRecentPosts } from '@/lib/blog-data';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FeaturedPosts() {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const recentPosts = getRecentPosts(12); // Get more posts for pagination
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
  const totalPages = Math.ceil(recentPosts.length / visiblePosts);
  
  // Get current visible posts
  const currentPosts = recentPosts.slice(
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
    <div className="container py-12 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">
            Latest Updates
          </span>
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-500"
          >
            <ChevronLeft size={18} className="text-cyan-600" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "w-8 h-8 p-0 rounded-full",
                  currentPage === index 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "text-muted-foreground hover:bg-orange-100"
                )}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="rounded-full border-cyan-200 hover:bg-cyan-50 hover:border-cyan-500"
          >
            <ChevronRight size={18} className="text-cyan-600" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {currentPosts.map((post) => (
          <Card key={post.id} className="post-card overflow-hidden h-full flex flex-col border-none shadow-lg">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
            </div>
            
            <CardContent className="pt-4 flex-grow flex flex-col">
              <span className="text-xs text-muted-foreground mb-2">
                {new Date(post.published_at).toLocaleDateString()}
              </span>
              
              <Link to={`/post/${post.slug}`} className="group">
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <Link 
                to={`/post/${post.slug}`} 
                className="mt-auto text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center"
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
              currentPage === index ? "bg-orange-500" : "bg-gray-300"
            )}
            onClick={() => setCurrentPage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
