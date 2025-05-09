
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Clock, ChevronRight } from "lucide-react";
import { CategoryBadge } from "../CategoryBadge";
import { Post } from "@/types/blog";

interface ListPostItemProps {
  post: Post;
  saved: boolean;
  onSave: () => void;
}

export function ListPostItem({ post, saved, onSave }: ListPostItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-3 rounded-lg border hover:shadow-md transition-shadow">
      <div className="sm:w-1/4">
        <Link to={`/post/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-md">
          <img 
            src={post.coverImage || post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="sm:w-3/4">
        <div className="flex justify-between items-start mb-1">
          <CategoryBadge category={post.category} />
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 rounded-full ${saved ? 'text-yellow-500' : ''}`}
            onClick={onSave}
          >
            <BookmarkPlus className={`h-4 w-4 ${saved ? 'fill-yellow-500' : ''}`} />
          </Button>
        </div>
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-base font-bold mb-1 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs mb-2 line-clamp-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
              <Clock className="mr-1 h-3 w-3" />
              {new Date(post.publishedAt || post.published_at || '').toLocaleDateString()}
            </time>
            <span className="hidden sm:inline-block">{post.author}</span>
          </div>
          <Link 
            to={`/post/${post.slug}`} 
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            Read <ChevronRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
