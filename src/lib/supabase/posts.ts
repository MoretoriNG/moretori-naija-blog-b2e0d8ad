
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/blog";

export const supabasePosts = {
  // Get all posts with optional filtering
  async getAllPosts(filters?: { category?: string; featured?: boolean; published?: boolean }) {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters?.published !== undefined) {
      query = query.eq('published', filters.published);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new post
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.coverImage,
        category: post.category,
        author: post.author,
        featured: post.featured || false,
        published: post.publishedAt ? true : false,
        video_url: post.video,
        tags: post.tags || [],
        user_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update post
  async updatePost(id: string, post: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.coverImage,
        category: post.category,
        author: post.author,
        featured: post.featured,
        published: post.publishedAt ? true : false,
        video_url: post.video,
        tags: post.tags,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete post
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }
};
