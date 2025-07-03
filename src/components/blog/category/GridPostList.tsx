
import { Post } from "@/types/blog";
import { GridPostItem } from "./GridPostItem";
import AdBanner from "../advertising/AdBanner";

interface GridPostListProps {
  posts: Post[];
  compactView: boolean;
  handleSavePost: (postId: string) => void;
  savedPosts: string[];
}

export function GridPostList({ posts, compactView, handleSavePost, savedPosts }: GridPostListProps) {
  return (
    <div className={`grid grid-cols-1 ${compactView ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
      {posts.map((post, index) => (
        <div key={post.id}>
          {/* Insert an ad after the first 4 posts */}
          {index === 4 && (
            <div className="col-span-full mb-6">
              <AdBanner size="medium" id="category-feed-ad" />
            </div>
          )}
          <GridPostItem 
            post={post} 
            onSave={() => handleSavePost(String(post.id))}
            saved={savedPosts.includes(String(post.id))}
          />
        </div>
      ))}
    </div>
  );
}
