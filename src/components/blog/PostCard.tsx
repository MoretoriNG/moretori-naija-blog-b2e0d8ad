import { Link } from "react-router-dom";
import { Post } from "@/types/blog";
import { formatDate } from "@/lib/blog/utils";
import { CategoryBadge } from "./CategoryBadge";
import { Video } from "lucide-react";
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
  
  // Handle both old and new image paths
  const coverImage = post.coverImage || post.image_url || "/placeholder.svg";
  
  // Handle both old and new date formats
  const publishedAt = post.publishedAt || post.published_at;

  return (
    <article className={`post-card overflow-hidden rounded-lg border bg-card shadow ${featured ? 'md:grid md:grid-cols-2 gap-6' : ''}`}>
      <Link to={`/post/${slug}`} className="block">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img 
            src={coverImage} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {video && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </AspectRatio>
      </Link>
      
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={category} />
          <time className="text-xs text-muted-foreground" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
        </div>
        
        <Link to={`/post/${slug}`}>
          <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold leading-tight tracking-tight mb-2 hover:text-primary transition-colors`}>
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2 md:line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center text-sm">
          <span className="text-foreground font-medium">By {author}</span>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
