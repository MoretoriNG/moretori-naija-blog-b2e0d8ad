
import { useState } from 'react';
import { toast } from 'sonner';
import { useEngagementTracker } from '@/hooks/useEngagementTracker';

export function usePostInteraction(postId: string | number) {
  const [likedPosts, setLikedPosts] = useState<Record<string, number>>({});
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const { recordLike, recordSave, removeSave } = useEngagementTracker();
  
  const postIdStr = String(postId);
  const isLiked = (likedPosts[postIdStr] || 0) > 0;
  const isSaved = savedPosts.includes(postIdStr);
  
  const handleLike = () => {
    setLikedPosts(prev => {
      const currentLikes = prev[postIdStr] || 0;
      const newValue = { ...prev, [postIdStr]: currentLikes + 1 };
      
      if (currentLikes === 0) {
        toast.success("You liked this post");
        recordLike(postId);
      }
      
      return newValue;
    });
  };
  
  const handleSave = () => {
    setSavedPosts(prev => {
      if (prev.includes(postIdStr)) {
        toast.success("Removed from your reading list");
        removeSave(postId);
        return prev.filter(id => id !== postIdStr);
      } else {
        toast.success("Added to your reading list");
        recordSave(postId);
        return [...prev, postIdStr];
      }
    });
  };
  
  const handleShare = (title: string, slug: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.origin + `/post/${slug}`,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.origin + `/post/${slug}`);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/post/${slug}`);
      toast.success('Link copied to clipboard!');
    }
  };
  
  return {
    isLiked,
    isSaved,
    handleLike,
    handleSave,
    handleShare
  };
}
