
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/blog/utils";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface HeroSliderProps {
  posts: Post[];
}

// High-quality image URLs for the hero slider
const heroBackgroundImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80",
];

export function HeroSlider({ posts }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const enhancedPosts = posts.map((post, index) => ({
    ...post,
    coverImage: post.coverImage || post.image_url || heroBackgroundImages[index % heroBackgroundImages.length]
  }));
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };
  
  if (enhancedPosts.length === 0) {
    return null;
  }
  
  const currentPost = enhancedPosts[activeIndex];
  
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="h-[500px] md:h-[600px] relative">
        {/* Images carousel */}
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full h-full"
          onSlideChange={(index) => setActiveIndex(index)}
          defaultIndex={activeIndex}
        >
          <CarouselContent className="h-full">
            {enhancedPosts.map((post, index) => (
              <CarouselItem key={post.id} className="h-full">
                <div className="relative w-full h-full">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = heroBackgroundImages[index % heroBackgroundImages.length];
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-end z-10">
                    <div className="container pb-16 md:pb-20 animate-fade-in">
                      <div className="max-w-2xl text-white">
                        <div className="flex items-center gap-3 mb-3">
                          <CategoryBadge category={post.category} />
                          <time className="text-sm text-white/80" dateTime={post.publishedAt || post.published_at}>
                            {formatDate(post.publishedAt || post.published_at)}
                          </time>
                        </div>
                        
                        <Link to={`/post/${post.slug}`}>
                          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 hover:text-blue-300 transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        
                        <p className="text-white/80 mb-6 text-base max-w-xl line-clamp-2 md:line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <Button 
                          asChild 
                          className="bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <Link to={`/post/${post.slug}`}>
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {enhancedPosts.map((_, i) => (
              <button
                key={i}
                className={`h-2 transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-blue-500" : "w-2 bg-white/50 hover:bg-white/70"
                } rounded-full`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
          
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/10 text-white h-10 w-10 rounded-full transition-colors" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/10 text-white h-10 w-10 rounded-full transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
