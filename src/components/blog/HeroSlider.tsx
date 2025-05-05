
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/blog-data";

interface HeroSliderProps {
  posts: Post[];
}

export function HeroSlider({ posts }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const nextSlide = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    
    // Reset animation state after transition
    setTimeout(() => setAnimating(false), 700);
  };
  
  const prevSlide = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    
    // Reset animation state after transition
    setTimeout(() => setAnimating(false), 700);
  };
  
  const goToSlide = (index: number) => {
    if (animating || index === currentIndex) return;
    
    setAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => setAnimating(false), 700);
  };
  
  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    
    if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Auto advance slides
  useEffect(() => {
    if (paused || posts.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(timer);
  }, [currentIndex, paused, posts.length]);
  
  if (posts.length === 0) {
    return null;
  }
  
  const currentPost = posts[currentIndex];
  
  return (
    <section 
      className="relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-green-500/30 to-orange-500/40 z-10 mix-blend-overlay"></div>
      
      {/* Images carousel */}
      <div className="absolute inset-0">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              currentIndex === index 
                ? 'opacity-100 scale-105 blur-0' 
                : 'opacity-0 scale-110 blur-sm'
            }`}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={currentPost.category} />
            <time className="text-sm text-white/80" dateTime={currentPost.publishedAt}>
              {formatDate(currentPost.publishedAt)}
            </time>
          </div>
          
          <Link to={`/post/${currentPost.slug}`}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:text-blue-300 transition-colors leading-tight">
              {currentPost.title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-6 text-base md:text-lg max-w-2xl line-clamp-2 md:line-clamp-3">
            {currentPost.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600">
              <Link to={`/post/${currentPost.slug}`}>Read Article</Link>
            </Button>
            
            {currentPost.video && (
              <Button asChild variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                <Link to={`/post/${currentPost.slug}`} className="flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Video
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation arrows - modernized design */}
      <div className="absolute bottom-6 right-6 md:right-10 flex gap-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={animating}
          className="bg-blue-500/20 border-white/20 hover:bg-blue-500 text-white h-10 w-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={animating}
          className="bg-blue-500/20 border-white/20 hover:bg-blue-500 text-white h-10 w-10 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Slide indicators with progress animation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {posts.map((_, i) => (
          <button
            key={i}
            className="group h-2 rounded-full transition-all focus:outline-none"
            style={{ width: i === currentIndex ? '2rem' : '0.5rem' }}
            onClick={() => goToSlide(i)}
            disabled={animating}
          >
            <span 
              className={`block h-full w-full rounded-full transition-all ${
                i === currentIndex 
                  ? 'bg-blue-500' 
                  : 'bg-white/50 group-hover:bg-white/70'
              }`}
              style={{
                animation: i === currentIndex 
                  ? 'progress 6s linear forwards' 
                  : 'none',
                transformOrigin: 'left'
              }}
            />
          </button>
        ))}
      </div>
      
      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
