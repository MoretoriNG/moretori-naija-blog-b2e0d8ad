
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/types/blog";
import { PostCard } from "./PostCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem, 
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMjMyMzIiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-vibehub-purple" />
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-vibehub-purple to-vibehub-blue-bright bg-clip-text text-transparent">Featured Stories</h2>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="hover:bg-vibehub-purple hover:text-white transition-colors" asChild>
              <Link to="/featured">View All Featured</Link>
            </Button>
          </div>
        </div>
        
        {/* Diagonal pattern overlay */}
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-br from-vibehub-purple/10 to-vibehub-blue-bright/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-vibehub-blue-bright/10 to-transparent rounded-full blur-3xl"></div>
        
        <Carousel
          opts={{ 
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="h-full">
                  <PostCard post={post} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-full border-vibehub-purple/30 hover:bg-vibehub-purple hover:text-white" />
            <CarouselNext className="static translate-y-0 h-9 w-9 rounded-full border-vibehub-purple/30 hover:bg-vibehub-purple hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
