
import { Post } from "@/types/blog";
import { ListPostItem } from "./ListPostItem";
import AdBanner from "../advertising/AdBanner";

interface ListPostListProps {
  posts: Post[];
  handleSavePost: (postId: string) => void;
  savedPosts: string[];
}

export function ListPostList({ posts, handleSavePost, savedPosts }: ListPostListProps) {
  return (
    <div className="space-y-3">
      {posts.map((post, index) => (
        <>
          {/* Insert an ad after the third post in list view */}
          {index === 3 && (
            <div className="mb-4">
              <AdBanner size="medium" id="category-list-ad" />
            </div>
          )}
          <ListPostItem 
            key={post.id} 
            post={post}
            saved={savedPosts.includes(String(post.id))}
            onSave={() => handleSavePost(String(post.id))}
          />
        </>
      ))}
    </div>
  );
}
