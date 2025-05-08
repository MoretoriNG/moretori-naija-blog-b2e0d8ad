
import { useState, useEffect, useRef } from 'react';
import { Post } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, User, BookmarkPlus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDate } from "@/lib/blog/utils";
import { CategoryBadge } from './CategoryBadge';
import { toast } from 'sonner';

interface FeaturedPostsProps {
  posts?: Post[];
}

// High-quality placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
];

export function FeaturedPosts({ posts = [] }: FeaturedPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
        setVisiblePosts(2);
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
  
  // Get current visible posts
  const currentPosts = displayPosts.slice(
    currentPage * visiblePosts, 
    (currentPage + 1) * visiblePosts
  );
  
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

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(() => {
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  const handleSave = (title: string) => {
    toast.success(`"${title}" saved to your reading list`);
  };

  return (
    <div className="container py-12" ref={scrollRef}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Latest Updates
          </h2>
          <p className="text-muted-foreground">Discover our most recent articles and news</p>
        </div>
        
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
        {currentPosts.map((post, index) => {
          // Ensure each post has an image
          const postImage = post.coverImage || 
            post.image_url || 
            placeholderImages[index % placeholderImages.length];
            
          return (
            <Card 
              key={post.id} 
              className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/post/${post.slug}`} className="block relative">
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={postImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                </div>
                <div className="absolute top-3 left-3">
                  <CategoryBadge category={post.category} />
                </div>
                
                {/* Quick action buttons that appear on hover */}
                <div className={`absolute top-3 right-3 flex space-x-1 transition-opacity duration-200 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave(post.title);
                    }}
                  >
                    <BookmarkPlus size={16} />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare(post.title);
                    }}
                  >
                    <Share2 size={16} />
                  </Button>
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
          );
        })}
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
      
      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
          <Link to="/blog">Browse All Articles</Link>
        </Button>
      </div>
    </div>
  );
}

export default FeaturedPosts;
