
import { Post, PostCategory } from "@/types/blog";
import { getCategoryById, getCategoryBySlug } from "./categories";
import { posts } from "./posts-data";

// Post related functions
export const getPostsByCategory = (categorySlug: PostCategory | string) => {
  const category = getCategoryBySlug(categorySlug as string);
  return category ? posts.filter(post => post.category_id === category.id) : [];
};

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.slug === slug);
};

export const getFeaturedPosts = () => {
  return posts.filter(post => post.featured);
};

export const getRecentPosts = (limit = 6) => {
  return [...posts]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit);
};

export const getRelatedPosts = (currentPostId: number | string, categoryId: number, limit = 3) => {
  return posts
    .filter(post => post.category_id === categoryId && String(post.id) !== String(currentPostId))
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const searchPosts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.excerpt.toLowerCase().includes(lowercaseQuery) || 
    post.content.toLowerCase().includes(lowercaseQuery)
  );
};

// Tags related functions
export const getAllTags = () => {
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
};

export const getPostsByTag = (tag: string) => {
  return posts.filter(post => post.tags && post.tags.includes(tag));
};

// Helper to get all posts with properly mapped types
export const getAllPosts = (): Post[] => {
  return posts.map(post => ({
    ...post,
    id: String(post.id), // Convert numeric ID to string
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
};
