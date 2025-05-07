
import { Link } from "react-router-dom";
import { Post } from "@/types/blog";
import { formatDate } from "@/lib/blog/utils";
import { CategoryBadge } from "./CategoryBadge";
import { Video, Clock, User } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  // Handle both old and new data structure
  const {
    title, 
    slug, 
    excerpt, 
    category,
    author,
    video
  } = post;
  
  // Handle both old and new image paths with a default fallback image
  const coverImage = post.coverImage || 
    post.image_url || 
    `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`;
  
  // Handle both old and new date formats
  const publishedAt = post.publishedAt || post.published_at;

  return (
    <article className={`post-card overflow-hidden rounded-lg border bg-card shadow-md hover:shadow-lg transition-all duration-300 ${featured ? 'md:grid md:grid-cols-2 gap-6' : ''}`}>
      <Link to={`/post/${slug}`} className="block relative overflow-hidden">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img 
            src={coverImage} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
          
          {video && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
          
          {category && (
            <div className="absolute top-3 left-3">
              <CategoryBadge category={category} />
            </div>
          )}
        </AspectRatio>
      </Link>
      
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <time className="flex items-center" dateTime={publishedAt}>
            <Clock className="mr-1 h-3 w-3" />
            {formatDate(publishedAt)}
          </time>
          
          <span className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            {author}
          </span>
        </div>
        
        <Link to={`/post/${slug}`}>
          <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold leading-tight tracking-tight mb-2 hover:text-primary transition-colors`}>
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2 md:line-clamp-3">{excerpt}</p>
        
        <Link 
          to={`/post/${slug}`}
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          Read More
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
