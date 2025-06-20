
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";
import { Post } from "@/types/blog";
import { toast } from "sonner";
import { supabasePosts } from "@/lib/supabase/posts";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const allPosts = await supabasePosts.getAllPosts();
      const foundPost = allPosts.find(p => String(p.id) === id);
      
      if (!foundPost) {
        toast.error("Post not found");
        navigate("/admin", { replace: true });
        return;
      }

      // Transform Supabase data to match our Post type
      const transformedPost: Post = {
        id: String(foundPost.id),
        title: foundPost.title,
        slug: foundPost.slug,
        excerpt: foundPost.excerpt || '',
        content: foundPost.content,
        coverImage: foundPost.cover_image || '',
        category: foundPost.category as any,
        author: foundPost.author || 'Unknown',
        publishedAt: foundPost.created_at || new Date().toISOString(),
        featured: foundPost.featured || false,
        video: foundPost.video_url,
        tags: foundPost.tags || []
      };

      setPost(transformedPost);
    } catch (error) {
      console.error('Error loading post:', error);
      toast.error("Failed to load post");
      navigate("/admin", { replace: true });
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdatePost = (formData: Partial<Post>) => {
    // Navigation is handled in PostForm after successful update
    console.log('Post update handled in PostForm');
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Edit Post"
        description={`Editing: ${post.title}`}
      />
      
      <div className="bg-card shadow-lg rounded-lg border p-6">
        <PostForm post={post} onSubmit={handleUpdatePost} />
      </div>
    </div>
  );
}
