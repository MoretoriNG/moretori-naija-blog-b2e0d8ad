
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/blog/utils";

interface HeroSliderProps {
  posts: Post[];
}

// High-quality image URLs for the hero slider
const heroBackgroundImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80", // Woman using laptop
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&q=80", // Woman on bed with laptop
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80", // Tech with blue lights
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80", // Matrix code
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1920&q=80", // Night sky
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80", // Yellow lights through trees
];

export function HeroSlider({ posts }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const enhancedPosts = posts.map((post, index) => ({
    ...post,
    // Use provided image URL or fallback to high-quality images
    coverImage: post.coverImage || post.image_url || heroBackgroundImages[index % heroBackgroundImages.length]
  }));
  
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === enhancedPosts.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [enhancedPosts.length, isTransitioning]);
  
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? enhancedPosts.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [enhancedPosts.length, isTransitioning]);
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      nextSlide();
    }
    
    if (touchStart - touchEnd < -150) {
      prevSlide();
    }
  };
  
  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(timer);
  }, [currentIndex, nextSlide]);
  
  if (enhancedPosts.length === 0) {
    return null;
  }
  
  const currentPost = enhancedPosts[currentIndex];
  
  return (
    <section 
      className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-black/50 to-purple-500/40 z-10 mix-blend-multiply"></div>
      
      {/* Images carousel with parallax effect */}
      <div className="absolute inset-0 transition-transform duration-700 ease-in-out">
        {enhancedPosts.map((post, index) => (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              currentIndex === index 
                ? 'opacity-100 scale-105 translate-x-0' 
                : 'opacity-0 scale-110 translate-x-full'
            }`}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover animate-ken-burns"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = heroBackgroundImages[index % heroBackgroundImages.length];
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20 z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Animated overlay elements */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-2xl animate-fade-in text-white">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={currentPost.category} />
            <time className="text-sm text-white/80" dateTime={currentPost.publishedAt || currentPost.published_at}>
              {formatDate(currentPost.publishedAt || currentPost.published_at)}
            </time>
          </div>
          
          <Link to={`/post/${currentPost.slug}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:text-blue-300 transition-colors">
              {currentPost.title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-6 text-base max-w-xl line-clamp-2 md:line-clamp-3">
            {currentPost.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white"
            >
              <Link to={`/post/${currentPost.slug}`}>
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            >
              <Link to={`/category/${currentPost.category}`}>
                More {currentPost.category} Stories
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows - modernized design */}
      <div className="absolute bottom-6 right-6 md:right-10 flex gap-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white hover:text-black text-white h-12 w-12 rounded-full transition-colors duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white hover:text-black text-white h-12 w-12 rounded-full transition-colors duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {enhancedPosts.map((_, i) => (
          <button
            key={i}
            className={`h-2.5 transition-all duration-300 ${
              i === currentIndex ? "w-10 bg-blue-500" : "w-2.5 bg-white/50 hover:bg-white/70"
            } rounded-full`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

// Add this to your index.css or tailwind config
// @keyframes ken-burns {
//   0% { transform: scale(1); }
//   100% { transform: scale(1.05); }
// }
// .animate-ken-burns {
//   animation: ken-burns 20s alternate infinite;
// }
