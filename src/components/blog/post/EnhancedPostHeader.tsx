
import { Link } from "react-router-dom";
import { CalendarIcon, User2Icon, ClockIcon, Eye, Heart, Share2, BookmarkPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostCategory } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { usePostInteraction } from "@/hooks/usePostInteraction";

interface EnhancedPostHeaderProps {
  title: string;
  imageUrl: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  postId: string;
  slug: string;
}

export function EnhancedPostHeader({
  title,
  imageUrl,
  category,
  author,
  publishedAt,
  readingTimeMinutes,
  postId,
  slug
}: EnhancedPostHeaderProps) {
  const { isLiked, isSaved, handleLike, handleSave, handleShare } = usePostInteraction(postId);

  return (
    <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover animate-ken-burns" 
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-blue-900/40 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Floating action buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={handleSave}
          >
            <BookmarkPlus className={`h-5 w-5 ${isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={() => handleShare(title, slug)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400/50 rounded-full animate-ping"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <CategoryBadge category={category} />
            
            <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <ClockIcon size={16} />
                <span>{readingTimeMinutes} min read</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{Math.floor(Math.random() * 1000) + 100} views</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-lg leading-tight">{title}</h1>
        
          <div className="flex flex-wrap gap-4 items-center text-sm text-white/90">
            <div className="flex items-center gap-2">
              <User2Icon size={16} />
              <span className="font-medium">{author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              <span>{new Date(publishedAt).toLocaleDateString()}</span>
              <span className="text-xs opacity-80">({formatDistanceToNow(new Date(publishedAt), { addSuffix: true })})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
