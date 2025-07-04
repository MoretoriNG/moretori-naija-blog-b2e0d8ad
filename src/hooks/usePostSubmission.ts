import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { toast } from "sonner";

export function usePostSubmission(
  post: Post | undefined,
  onSubmit: (post: Partial<Post>) => void,
  validate: () => boolean,
  getFormData: () => Partial<Post>
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditing = !!post;

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please correct the errors below");
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = getFormData();
      
      if (!isEditing) {
        formData.publishedAt = asDraft ? "" : new Date().toISOString();
      }
      
      if (isEditing && post) {
        await supabasePosts.updatePost(String(post.id), formData);
      } else {
        await supabasePosts.createPost(formData as Omit<Post, 'id' | 'created_at' | 'updated_at'>);
      }
      
      onSubmit(formData);
      
      if (asDraft) {
        toast.success("Post saved as draft");
      } else {
        toast.success(isEditing ? "Post updated successfully" : "Post published successfully");
      }
      
      navigate("/admin");
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = (e: React.FormEvent) => {
    handleSubmit(e, true);
  };

  return {
    loading,
    isEditing,
    handleSubmit,
    handleSaveAsDraft,
  };
}