
import { useState, useEffect } from "react";
import { Post, PostCategory } from "@/types/blog";
import { HeroDots } from "./HeroDots";
import { HeroAutoplayIndicator } from "./HeroAutoplayIndicator";
import { useHeroSlider } from "./useHeroSlider";
import { PostCard } from "../PostCard";
import { CategoryPlaylist } from "./CategoryPlaylist";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi
} from "@/components/ui/carousel";
import { getPostsByCategory } from "@/lib/blog";
import Autoplay from "embla-carousel-autoplay";

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
  const [categoryPlaylists, setCategoryPlaylists] = useState<{[key: string]: Post[]}>({});
  const [api, setApi] = useState<CarouselApi>();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Get latest posts from different categories for playlists
    const categories: PostCategory[] = ['tech', 'health', 'entertainment', 'business', 'sports', 'auto'];
    const playlists: {[key: string]: Post[]} = {};
    
    categories.forEach(category => {
      const categoryPosts = getPostsByCategory(category).slice(0, 6).map(post => ({
        ...post,
        id: String(post.id),
        category,
        coverImage: post.image_url,
        publishedAt: post.published_at
      })) as Post[];
      playlists[category] = categoryPosts;
    });
    
    setCategoryPlaylists(playlists);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api, setActiveIndex]);
  
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Moretori Naija</h2>
          <p className="text-gray-300 text-lg mb-6">Your premier destination for the latest news and insights</p>
          <div className="animate-pulse">
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const enhancedPosts = shufflePosts(posts).slice(0, 6).map((post, index) => ({
    ...post,
    coverImage: post.coverImage || post.image_url || heroBackgroundImages[index % heroBackgroundImages.length]
  }));
  
  // Fallback to show at least something if no enhanced posts
  if (!enhancedPosts || enhancedPosts.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Moretori Naija</h2>
          <p className="text-gray-300 text-lg">Your latest stories will appear here</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 h-[400px] md:h-[500px]">
        {/* Main Carousel - Takes 3/4 of the width */}
        <div className="lg:col-span-3 relative">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {enhancedPosts.map((post, index) => (
                <CarouselItem 
                  key={post.id} 
                  className="h-full" 
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="relative h-full w-full">
                    <PostCard 
                      post={post}
                      featured={true}
                      heroMode={true}
                    />
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
        </div>
        
        {/* Category Playlist Sidebar - Takes 1/4 of the width */}
        <div className="lg:col-span-1 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 hidden lg:block">
          <CategoryPlaylist playlists={categoryPlaylists} />
        </div>
      </div>
    </section>
  );
}
