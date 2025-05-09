
import { useState, useEffect } from "react";
import { Post } from "@/types/blog";
import { HeroDots } from "./HeroDots";
import { HeroAutoplayIndicator } from "./HeroAutoplayIndicator";
import { useHeroSlider } from "./useHeroSlider";
import { PostCard } from "../PostCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
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
  const {
    activeIndex,
    setActiveIndex,
    autoplayEnabled,
    setAutoplayEnabled,
    shufflePosts,
    pauseAutoplay,
    handleDotClick
  } = useHeroSlider(posts);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  if (posts.length === 0) {
    return null;
  }
  
  const enhancedPosts = shufflePosts(posts).map((post, index) => ({
    ...post,
    coverImage: post.coverImage || post.image_url || heroBackgroundImages[index % heroBackgroundImages.length]
  }));
  
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="h-[350px] md:h-[450px] relative">
        {/* Images carousel */}
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full h-full"
          onMouseEnter={() => setAutoplayEnabled(false)}
          onMouseLeave={() => setAutoplayEnabled(true)}
        >
          <CarouselContent className="h-full">
            {enhancedPosts.map((post, index) => (
              <CarouselItem 
                key={post.id} 
                className="h-full" 
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative h-full w-full">
                  {/* Use a wrapper with absolute positioning for the special hero styling */}
                  <div className="absolute inset-0 z-10">
                    <PostCard 
                      post={post}
                      featured={true}
                      heroMode={true}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <HeroDots 
            posts={enhancedPosts} 
            activeIndex={activeIndex} 
            onDotClick={handleDotClick} 
          />
          
          <CarouselPrevious 
            onClick={pauseAutoplay}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/10 text-white h-8 w-8 rounded-full transition-colors z-20" 
          />
          <CarouselNext 
            onClick={pauseAutoplay}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/10 text-white h-8 w-8 rounded-full transition-colors z-20" 
          />
        </Carousel>
        
        {/* Autoplay indicator */}
        <HeroAutoplayIndicator 
          autoplayEnabled={autoplayEnabled}
          setAutoplayEnabled={setAutoplayEnabled} 
        />
        
        <style>
          {`
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}
        </style>
      </div>
    </section>
  );
}
