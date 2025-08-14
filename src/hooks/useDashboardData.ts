import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalCategories: number;
  recentPosts: number;
  monthlyPosts: number;
  growthRate: number;
}

export function useDashboardData() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
    totalCategories: 0,
    recentPosts: 0,
    monthlyPosts: 0,
    growthRate: 0
  });
  
  const { user, profile } = useAuth();

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allPosts, stats] = await Promise.all([
        supabasePosts.getAllPosts(),
        supabasePosts.getDashboardStats()
      ]);
      
      // Posts are already transformed by supabasePosts.getAllPosts()
      setPosts(allPosts);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setTimeout(() => setRefreshing(false), 500);
    toast.success("Dashboard refreshed");
  };

  const handleDeletePost = async (id: string) => {
    try {
      await supabasePosts.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success("Post deleted successfully");
      await loadDashboardData();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete post");
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await supabasePosts.bulkDeletePosts(ids);
      setPosts(posts.filter(post => !ids.includes(post.id)));
      toast.success(`Successfully deleted ${ids.length} posts`);
      await loadDashboardData();
    } catch (error) {
      console.error('Error bulk deleting posts:', error);
      toast.error("Failed to delete posts");
    }
  };

  useEffect(() => {
    if (user && (profile?.role === 'admin' || user?.user_metadata?.role === 'admin')) {
      loadDashboardData();
    }
  }, [user, profile]);

  return {
    posts,
    loading,
    refreshing,
    dashboardStats,
    loadDashboardData,
    handleRefresh,
    handleDeletePost,
    handleBulkDelete
  };
}