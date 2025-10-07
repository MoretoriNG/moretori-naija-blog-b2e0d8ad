
import { BookmarkIcon, Heart, MessageSquareIcon, ShareIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import DOMPurify from 'dompurify';

interface PostContentProps {
  content: string;
  excerpt: string;
  author: string;
  tags?: string[];
  handleShare: (platform?: string) => void;
  onShowCommentForm: () => void;
}

export function PostContent({
  content,
  excerpt,
  author,
  tags,
  handleShare,
  onShowCommentForm
}: PostContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 5);
  const [comments, setComments] = useState<{id: number, author: string, text: string, date: Date}[]>([]);
  
  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
    toast.success('You liked this article');
  };

  // Sanitize and enhance content with embedded images
  const enhancedContent = useMemo(() => {
    // First sanitize the content
    const sanitized = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                     'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'figure', 'figcaption'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
    
    // Then add embedded images
    return sanitized.replace(
      /<p>(.*?)<\/p>/g, 
      (match, p1, offset) => {
        // Every third paragraph, add an image
        if (offset > 300 && (offset % 700) < 200) {
          const placeholderImages = [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
          ];
          const randomImgIndex = Math.floor(Math.random() * placeholderImages.length);
          return `<figure class="my-8">
            <img src="${placeholderImages[randomImgIndex]}" alt="Article illustration" class="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md" />
            <figcaption class="text-center text-sm text-muted-foreground mt-2">Article illustration</figcaption>
          </figure>
          ${match}`;
        }
        return match;
      }
    );
  }, [content]);

  return (
    <div className="flex-1">
      {/* Post excerpt */}
      <p className="text-base text-muted-foreground mb-6 font-medium italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50" style={{ textIndent: '1.5rem', textAlign: 'left' }}>
        {excerpt}
      </p>
      
      {/* Social sharing sidebar - Desktop */}
      <div className="hidden md:flex flex-col fixed left-4 top-1/2 -translate-y-1/2 space-y-2 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
          onClick={() => handleShare('facebook')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full border border-gray-200 hover:bg-blue-400 hover:text-white"
          onClick={() => handleShare('twitter')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className={`rounded-full border ${isBookmarked ? 'bg-yellow-100 text-yellow-600 border-yellow-300' : 'border-gray-200 hover:bg-gray-100'}`}
          onClick={handleBookmark}
        >
          <BookmarkIcon size={18} className={isBookmarked ? "fill-yellow-500" : ""} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-500"
          onClick={handleLike}
        >
          <Heart size={18} />
          <span className="sr-only">Like</span>
        </Button>
      </div>
      
      {/* Post Content */}
      <div 
        className="post-content mb-12 prose prose-sm max-w-none prose-headings:text-foreground prose-a:text-blue-600 prose-img:rounded-lg" 
        style={{ textAlign: 'left' }}
        dangerouslySetInnerHTML={{ __html: enhancedContent }}
      />
      
      {/* Social sharing bar - Mobile */}
      <div className="flex md:hidden justify-center gap-2 my-6 border-t border-b py-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="rounded-full text-blue-600"
          onClick={() => handleShare('facebook')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          Share
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="rounded-full text-blue-400"
          onClick={() => handleShare('twitter')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          Tweet
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`rounded-full ${isBookmarked ? 'text-yellow-600' : ''}`}
          onClick={handleBookmark}
        >
          <BookmarkIcon size={16} className={`mr-1 ${isBookmarked ? "fill-yellow-500" : ""}`} />
          {isBookmarked ? 'Saved' : 'Save'}
        </Button>
      </div>
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            {tags.map(tag => (
              <a 
                key={tag} 
                href={`/tag/${tag.toLowerCase()}`}
                className="bg-muted px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Author bio */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-sm text-muted-foreground">Writer & Content Creator</p>
          </div>
        </div>
      </div>
      
      {/* Engagement Section */}
      <div className="bg-muted rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">Did you enjoy this article?</h3>
            <p className="text-muted-foreground">Let us know your thoughts in the comments</p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onShowCommentForm}
            >
              <MessageSquareIcon size={16} className="mr-2" />
              Comment
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleShare()}
            >
              <ShareIcon size={16} className="mr-2" /> 
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
