
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { toast } from "sonner";
import { Post } from "@/types/blog";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>(getAllPosts());
  
  const handleDeletePost = (id: string) => {
    // In a real app, this would be an API call
    setPosts(posts.filter(post => post.id !== id));
    toast.success("Post deleted successfully");
  };
  
  return (
    <div className="container py-8">
      <AdminHeader
        title="Dashboard"
        description="Manage your blog posts"
        actions={
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card shadow rounded-lg p-6 border">
          <h3 className="font-medium text-muted-foreground mb-1">Total Posts</h3>
          <p className="text-3xl font-bold">{posts.length}</p>
        </div>
        <div className="bg-card shadow rounded-lg p-6 border">
          <h3 className="font-medium text-muted-foreground mb-1">Featured Posts</h3>
          <p className="text-3xl font-bold">{posts.filter(post => post.featured).length}</p>
        </div>
        <div className="bg-card shadow rounded-lg p-6 border">
          <h3 className="font-medium text-muted-foreground mb-1">Categories</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>
      
      <div className="bg-card shadow rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        <PostList posts={posts} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}
