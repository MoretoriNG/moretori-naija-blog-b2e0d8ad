
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, User, BookmarkPlus, Share2, Heart, MessageSquare } from 'lucide-react';
import { formatDate } from "@/lib/blog/utils";
import { CategoryBadge } from '../CategoryBadge';
import { toast } from 'sonner';
import { usePostInteraction } from '@/hooks/usePostInteraction';

interface FeaturedPostCardProps {
  post: Post;
}

// High-quality placeholder images - moving them to a separate file would be good for future refactoring
const placeholderImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
];

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<boolean>(false);
  const { isLiked, isSaved, handleLike, handleSave, handleShare } = usePostInteraction(post.id);
  
  // Ensure each post has an image
  const postImage = post.coverImage || 
    post.image_url || 
    placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
            
  return (
    <Card 
      key={post.id} 
      className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
      onMouseEnter={() => setHoveredIndex(true)}
      onMouseLeave={() => setHoveredIndex(false)}
    >
      <Link to={`/post/${post.slug}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img
            src={postImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform hover:scale-110 duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        </div>
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
        
        {/* Stats overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 text-white text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" fill={isLiked ? "white" : "none"} />
              {Math.floor(Math.random() * 20) + 5}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {Math.floor(Math.random() * 10)}
            </span>
          </div>
          <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(post.publishedAt || post.published_at)}
          </time>
        </div>
        
        {/* Quick action buttons that appear on hover */}
        <div className={`absolute top-3 right-3 flex space-x-1 transition-opacity duration-200 ${hoveredIndex ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <BookmarkPlus className={`h-4 w-4 ${isSaved ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              handleShare(post.title, post.slug);
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            {post.author}
          </span>
          
          {/* Estimated read time */}
          <span className="text-xs">
            {Math.max(1, Math.floor(post.title.length / 15))} min read
          </span>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/post/${post.slug}`} 
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
          >
            Read More <ChevronRight size={14} className="ml-1" />
          </Link>
          
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={(e) => {
              e.preventDefault();
              handleLike();
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
