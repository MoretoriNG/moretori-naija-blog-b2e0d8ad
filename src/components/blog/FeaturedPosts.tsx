
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/types/blog";
import { PostCard } from "./PostCard";
import { ChevronLeft, ChevronRight, Sparkles, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem, 
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { PostCategory } from "@/types/blog";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [filter, setFilter] = useState<PostCategory | 'all'>('all');
  
  if (posts.length === 0) {
    return null;
  }
  
  const categories: Array<PostCategory | 'all'> = ['all', 'tech', 'auto', 'health', 'entertainment', 'news'];
  
  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category === filter);
  
  const getCategoryColor = (category: PostCategory | 'all'): string => {
    const colors: Record<string, string> = {
      'all': 'border-gray-300 text-gray-700 hover:border-gray-500',
      'tech': 'border-cyan-300 text-cyan-700 hover:border-cyan-500',
      'auto': 'border-orange-300 text-orange-700 hover:border-orange-500',
      'health': 'border-green-300 text-green-700 hover:border-green-500',
      'entertainment': 'border-purple-300 text-purple-700 hover:border-purple-500',
      'news': 'border-amber-300 text-amber-700 hover:border-amber-500'
    };
    return colors[category] || 'border-gray-300';
  };
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMjMyMzIiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-500" />
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Latest Updates</h2>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    filter === cat 
                      ? `bg-gradient-to-r from-cyan-500 to-orange-500 border-transparent text-white`
                      : getCategoryColor(cat)
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Diagonal pattern overlay */}
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No posts available for this category.</p>
            <Button 
              variant="link" 
              onClick={() => setFilter('all')}
              className="mt-2 text-cyan-600"
            >
              View all categories instead
            </Button>
          </div>
        ) : (
          <Carousel
            opts={{ 
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredPosts.slice(0, 6).map((post) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <div className="h-full">
                    <PostCard post={post} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-cyan-500 hover:bg-cyan-500 hover:text-white h-12 w-12 transform transition-all hover:scale-110"
                onClick={() => document.querySelector('.embla__prev')?.dispatchEvent(new MouseEvent('click'))}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous slides</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-orange-500 hover:bg-orange-500 hover:text-white h-12 w-12 transform transition-all hover:scale-110"
                onClick={() => document.querySelector('.embla__next')?.dispatchEvent(new MouseEvent('click'))}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next slides</span>
              </Button>
            </div>
            <div className="hidden">
              <CarouselPrevious className="embla__prev" />
              <CarouselNext className="embla__next" />
            </div>
          </Carousel>
        )}
        
        {/* View All link */}
        <div className="mt-10 text-center">
          <Button 
            asChild
            variant="outline" 
            className="group border-cyan-500 text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-orange-500 hover:text-white hover:border-transparent"
          >
            <Link to="/featured" className="flex items-center">
              View All Latest Updates 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
