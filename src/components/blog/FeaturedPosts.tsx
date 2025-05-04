
import { useState } from "react";
import { Post } from "@/types/blog";
import { PostCard } from "./PostCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-secondary/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Featured Posts</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              View All Featured
            </Button>
          </div>
        </div>
        
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
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-full" />
            <CarouselNext className="static translate-y-0 h-9 w-9 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
