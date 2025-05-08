
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blog";
import { CategoryBadge } from "../CategoryBadge";
import { formatDate } from "@/lib/blog/utils";

interface HeroSlideProps {
  post: Post;
  index: number;
  backgroundImages: string[];
}

export const HeroSlide = ({ post, index, backgroundImages }: HeroSlideProps) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={post.coverImage}
        alt={post.title}
        className="h-full w-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = backgroundImages[index % backgroundImages.length];
        }}
      />
      
      {/* Modern gradient overlay with mesh pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMkgyMFYyMEgyVjIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')]"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end z-10">
        <div className="container px-4 sm:px-6 pb-12 md:pb-16 animate-fade-in">
          <div className="max-w-2xl text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <CategoryBadge category={post.category} />
              
              <div className="flex items-center text-white/70 text-xs">
                <Clock className="mr-1 h-3 w-3" />
                <time dateTime={post.publishedAt || post.published_at}>
                  {formatDate(post.publishedAt || post.published_at)}
                </time>
              </div>
              
              <div className="flex items-center text-white/70 text-xs">
                <User className="mr-1 h-3 w-3" />
                <span>{post.author}</span>
              </div>
            </div>
            
            <Link to={`/post/${post.slug}`}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-white/80 mb-4 text-sm md:text-base max-w-xl line-clamp-2 hidden sm:block">
              {post.excerpt}
            </p>
            
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
              size="sm"
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
  );
};
