
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
  CarouselNext
} from "@/components/ui/carousel";
import { getPostsByCategory, getAllPosts } from "@/lib/blog";

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
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Get latest posts from different categories for playlists
    const categories: PostCategory[] = ['tech', 'health', 'entertainment', 'business', 'sports', 'lifestyle'];
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
  
  if (posts.length === 0) {
    return null;
  }
  
  const enhancedPosts = shufflePosts(posts).slice(0, 6).map((post, index) => ({
    ...post,
    coverImage: post.coverImage || post.image_url || heroBackgroundImages[index % heroBackgroundImages.length]
  }));
  
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 h-[400px] md:h-[500px]">
        {/* Main Carousel - Takes 3/4 of the width */}
        <div className="lg:col-span-3 relative">
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
