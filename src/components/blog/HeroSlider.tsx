
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
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-black">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-vibehub-purple/80 to-vibehub-blue-bright/80 z-10 opacity-30"></div>
      
      {/* Images with parallax effect */}
      <div className="absolute inset-0 transition-transform duration-700 ease-in-out">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-700 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover scale-110"
              style={{transform: `scale(${currentIndex === index ? 1.05 : 1.2})`}}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in text-white">
          <h1 className="font-heading text-white/90 mb-3 text-xl md:text-2xl">Moretori Naija</h1>
          
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={currentPost.category} />
            <time className="text-sm text-white/80" dateTime={currentPost.publishedAt}>
              {formatDate(currentPost.publishedAt)}
            </time>
          </div>
          
          <Link to={`/post/${currentPost.slug}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:text-primary/90 transition-colors">
              {currentPost.title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-6 text-lg max-w-2xl">
            {currentPost.excerpt}
          </p>
          
          <Button asChild size="lg" className="bg-vibehub-purple hover:bg-vibehub-purple-dark">
            <Link to={`/post/${currentPost.slug}`}>Read More</Link>
          </Button>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-black/30 border-white/20 hover:bg-black/60 text-white h-10 w-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-black/30 border-white/20 hover:bg-black/60 text-white h-10 w-10 rounded-full"
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
              i === currentIndex ? "w-8 bg-vibehub-purple" : "w-2 bg-white/50"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
