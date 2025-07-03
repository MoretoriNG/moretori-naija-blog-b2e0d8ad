
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Clock, ChevronRight } from "lucide-react";
import { CategoryBadge } from "../CategoryBadge";
import { Post } from "@/types/blog";

interface GridPostItemProps {
  post: Post;
  saved: boolean;
  onSave: () => void;
}

export function GridPostItem({ post, saved, onSave }: GridPostItemProps) {
  return (
    <div className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link to={`/post/${post.slug}`} className="block">
          <img 
            src={post.coverImage || post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Save button overlay */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white ${saved ? 'text-yellow-500' : 'text-gray-600'}`}
          onClick={onSave}
        >
          <BookmarkPlus className={`h-4 w-4 ${saved ? 'fill-yellow-500' : ''}`} />
        </Button>
        
        {/* Category badge */}
        <div className="absolute bottom-2 left-2">
          <CategoryBadge category={post.category} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2 group-hover:text-blue-600">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
              <Clock className="mr-1 h-3 w-3" />
              {new Date(post.publishedAt || post.published_at || '').toLocaleDateString()}
            </time>
            <span className="hidden sm:inline-block truncate">{post.author}</span>
          </div>
          
          <Link 
            to={`/post/${post.slug}`} 
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center group-hover:translate-x-1 transition-transform"
          >
            Read <ChevronRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
