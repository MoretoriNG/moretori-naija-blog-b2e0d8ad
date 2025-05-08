
import { useState, useEffect, useRef } from 'react';
import { Post } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, User, BookmarkPlus, Share2, Heart, MessageSquare, ExternalLink } from 'lucide-react';
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
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, number>>({});
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

  const handleShare = (title: string, slug: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.origin + `/post/${slug}`,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.origin + `/post/${slug}`);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/post/${slug}`);
      toast.success('Link copied to clipboard!');
    }
  };
  
  const handleSave = (postId: string) => {
    setSavedPosts(prev => {
      if (prev.includes(postId)) {
        toast.success("Removed from your reading list");
        return prev.filter(id => id !== postId);
      } else {
        toast.success("Added to your reading list");
        return [...prev, postId];
      }
    });
  };
  
  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const currentLikes = prev[postId] || 0;
      const newValue = { ...prev, [postId]: currentLikes + 1 };
      
      if (currentLikes === 0) {
        toast.success("You liked this post");
      }
      
      return newValue;
    });
  };

  return (
    <div className="py-8 md:py-12 bg-white" ref={scrollRef}>
      <div className="container px-4 sm:px-6 lg:px-8">
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
              onClick={prevPage}
              className="rounded-full border-blue-200 hover:bg-blue-50 hidden sm:flex"
              disabled={displayPosts.length <= visiblePosts}
            >
              <ChevronLeft size={16} />
            </Button>
            
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              {currentPage + 1}/{totalPages}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full border-blue-200 hover:bg-blue-50 hidden sm:flex"
              disabled={displayPosts.length <= visiblePosts}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
          {currentPosts.map((post, index) => {
            // Ensure each post has an image
            const postImage = post.coverImage || 
              post.image_url || 
              placeholderImages[index % placeholderImages.length];
            
            const isLiked = (likedPosts[post.id] || 0) > 0;
            const isSaved = savedPosts.includes(post.id);
              
            return (
              <Card 
                key={post.id} 
                className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link to={`/post/${post.slug}`} className="block relative">
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img
                      src={postImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImages[index % placeholderImages.length];
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <CategoryBadge category={post.category} />
                  </div>
                  
                  {/* Stats overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 text-white text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" fill={isLiked ? "white" : "none"} />
                        {(likedPosts[post.id] || 0) + Math.floor(Math.random() * 20) + 5}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {Math.floor(Math.random() * 10)}
                      </span>
                    </div>
                    <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(post.publishedAt || post.published_at)}
                    </time>
                  </div>
                  
                  {/* Quick action buttons that appear on hover */}
                  <div className={`absolute top-3 right-3 flex space-x-1 transition-opacity duration-200 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSave(post.id);
                      }}
                    >
                      <BookmarkPlus className={`h-4 w-4 ${isSaved ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(post.title, post.slug);
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {post.author}
                    </span>
                    
                    {/* Estimated read time */}
                    <span className="text-xs">
                      {Math.max(1, Math.floor(post.title.length / 15))} min read
                    </span>
                  </div>
                  
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/post/${post.slug}`} 
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Read More <ChevronRight size={14} className="ml-1" />
                    </Link>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(post.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Mobile pagination indicator */}
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
                  "w-2 h-2 rounded-full transition-colors",
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
        
        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
            <Link to="/blog" className="flex items-center">
              Browse All Articles
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPosts;
