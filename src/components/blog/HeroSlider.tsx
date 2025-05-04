
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { formatDate } from "@/lib/blog-data";

interface HeroSliderProps {
  posts: Post[];
}

export function HeroSlider({ posts }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };
  
  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);
  
  if (posts.length === 0) {
    return null;
  }
  
  const currentPost = posts[currentIndex];
  
  return (
    <section className="relative h-[350px] md:h-[450px] overflow-hidden bg-black">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-green-500/30 to-orange-500/40 z-10 mix-blend-overlay"></div>
      
      {/* Images carousel */}
      <div className="absolute inset-0 transition-transform duration-700 ease-in-out">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-700 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
              style={{transform: `scale(${currentIndex === index ? 1.05 : 1.2})`}}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in text-white">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={currentPost.category} />
            <time className="text-sm text-white/80" dateTime={currentPost.publishedAt}>
              {formatDate(currentPost.publishedAt)}
            </time>
          </div>
          
          <Link to={`/post/${currentPost.slug}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 hover:text-blue-300 transition-colors">
              {currentPost.title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-6 text-base max-w-xl line-clamp-2">
            {currentPost.excerpt}
          </p>
          
          <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Link to={`/post/${currentPost.slug}`}>Read Article</Link>
          </Button>
        </div>
      </div>
      
      {/* Navigation arrows - modernized design */}
      <div className="absolute bottom-6 right-6 md:right-10 flex gap-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-blue-500/20 border-white/20 hover:bg-blue-500 text-white h-10 w-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-blue-500/20 border-white/20 hover:bg-blue-500 text-white h-10 w-10 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {posts.map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-white/50"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
