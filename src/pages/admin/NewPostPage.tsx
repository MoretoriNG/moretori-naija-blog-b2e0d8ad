
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";
import { Post } from "@/types/blog";
import { toast } from "sonner";

// Generate a unique ID for new posts
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function NewPostPage() {
  const navigate = useNavigate();
  
  const handleCreatePost = (formData: Partial<Post>) => {
    // In a real app, this would be an API call
    const newPost = {
      id: generateId(),
      ...formData,
    } as Post;
    
    // For demo purposes, we'll just show a success message
    toast.success("Post created successfully!");
    navigate("/admin");
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Create Post"
        description="Add a new blog post"
      />
      
      <div className="bg-card shadow rounded-lg border p-6">
        <PostForm onSubmit={handleCreatePost} />
      </div>
    </div>
  );
}
