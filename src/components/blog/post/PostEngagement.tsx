
import { useState } from "react";
import { Heart, MessageCircle, Share2, BookmarkPlus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePostInteraction } from "@/hooks/usePostInteraction";
import { toast } from "sonner";

interface PostEngagementProps {
  postId: string;
  postTitle: string;
  postSlug: string;
}

export function PostEngagement({ postId, postTitle, postSlug }: PostEngagementProps) {
  const { isLiked, isSaved, handleLike, handleSave, handleShare } = usePostInteraction(postId);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed author" : "Following author");
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Enjoyed this article?</h3>
        <p className="text-sm text-gray-600">Show your support and stay connected</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-white' : ''}`} />
          Like
        </Button>
        
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <BookmarkPlus className={`h-4 w-4 ${isSaved ? 'fill-white' : ''}`} />
          Save
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare(postTitle, postSlug)}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        <Button
          variant={isFollowing ? "default" : "outline"}
          size="sm"
          onClick={handleFollow}
          className="flex items-center gap-2"
        >
          <ThumbsUp className="h-4 w-4" />
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200 text-center">
        <p className="text-xs text-gray-500">
          Join {Math.floor(Math.random() * 500) + 100} others who found this helpful
        </p>
      </div>
    </Card>
  );
}
