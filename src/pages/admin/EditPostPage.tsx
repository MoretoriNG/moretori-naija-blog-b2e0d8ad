
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";
import { Post } from "@/types/blog";
import { getPostBySlug } from "@/lib/blog-data";
import { toast } from "sonner";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would fetch the post data from an API
  // For demo purposes, we'll use our sample data
  const posts = [
    ...require("@/lib/blog-data").posts
  ];
  
  const post = posts.find(p => p.id === id);
  
  useEffect(() => {
    if (!post) {
      toast.error("Post not found");
      navigate("/admin", { replace: true });
    }
  }, [post, navigate]);
  
  const handleUpdatePost = (formData: Partial<Post>) => {
    // In a real app, this would be an API call
    
    // For demo purposes, we'll just show a success message
    toast.success("Post updated successfully!");
    navigate("/admin");
  };
  
  if (!post) return null;
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Edit Post"
        description={`Editing: ${post.title}`}
      />
      
      <div className="bg-card shadow rounded-lg border p-6">
        <PostForm post={post} onSubmit={handleUpdatePost} />
      </div>
    </div>
  );
}
