
import { Link } from "react-router-dom";
import { Post } from "@/types/blog";
import { PostCard } from "../PostCard";
import AdBanner from "../advertising/AdBanner";

interface GridPostListProps {
  posts: Post[];
  compactView: boolean;
  handleSavePost: (postId: string) => void;
  savedPosts: string[];
}

export function GridPostList({ posts, compactView, handleSavePost, savedPosts }: GridPostListProps) {
  return (
    <div className={`grid grid-cols-1 ${compactView ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4`}>
      {posts.map((post, index) => (
        <div key={post.id} className={compactView ? 'mb-0' : 'mb-0'}>
          {/* Insert an ad after the first 4 posts */}
          {index === 4 && (
            <div className="col-span-full mb-4">
              <AdBanner size="medium" id="category-feed-ad" />
            </div>
          )}
          <PostCard 
            post={post} 
            onSave={() => handleSavePost(String(post.id))}
            saved={savedPosts.includes(String(post.id))}
          />
        </div>
      ))}
    </div>
  );
}
