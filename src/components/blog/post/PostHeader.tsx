
import { Link } from "react-router-dom";
import { CalendarIcon, User2Icon, ClockIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostCategory } from "@/types/blog";

interface PostHeaderProps {
  title: string;
  imageUrl: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
}

export function PostHeader({
  title,
  imageUrl,
  category,
  author,
  publishedAt,
  readingTimeMinutes
}: PostHeaderProps) {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover animate-ken-burns" 
        />
        {/* Cool gradient overlay with animated particles */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-blue-900/30 to-purple-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/40 rounded-full animate-ping"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-2 flex flex-wrap gap-2">
            <CategoryBadge category={category} />
            
            <div className="flex items-center gap-3 text-xs text-white/80">
              <div className="flex items-center">
                <ClockIcon size={14} className="mr-1" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-shadow-lg">{title}</h1>
        
          <div className="flex flex-wrap gap-3 items-center text-sm text-white/80">
            <div className="flex items-center gap-1">
              <User2Icon size={14} />
              <span>{author}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <CalendarIcon size={14} />
              <span>{new Date(publishedAt).toLocaleDateString()}</span>
              <span className="text-xs ml-1">({formatDistanceToNow(new Date(publishedAt), { addSuffix: true })})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
