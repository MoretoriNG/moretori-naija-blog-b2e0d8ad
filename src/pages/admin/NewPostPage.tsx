
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";
import { Post } from "@/types/blog";

export default function NewPostPage() {
  const navigate = useNavigate();
  
  const handleCreatePost = (formData: Partial<Post>) => {
    // Navigation is handled in PostForm after successful creation
    console.log('Post creation handled in PostForm');
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Create Post"
        description="Add a new blog post to your website"
      />
      
      <div className="bg-card shadow-lg rounded-lg border p-6">
        <PostForm onSubmit={handleCreatePost} />
      </div>
    </div>
  );
}
