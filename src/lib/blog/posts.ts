
import { Post, PostCategory } from "@/types/blog";
import { getCategoryById, getCategoryBySlug } from "./categories";
import { posts } from "./posts-data";

// Post related functions - these remain unchanged but now import from modular structure
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

// Helper function to assign proper categories to posts
const assignCategoriesToPosts = () => {
  return posts.map(post => {
    // If post doesn't have a proper category_id, assign one based on content/title
    if (!post.category_id || post.category_id === 0) {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
      
      if (title.includes('tech') || title.includes('technology') || title.includes('ai') || title.includes('software') || content.includes('technology')) {
        return { ...post, category_id: 1 }; // Tech
      } else if (title.includes('car') || title.includes('auto') || title.includes('vehicle') || content.includes('automotive')) {
        return { ...post, category_id: 2 }; // Auto
      } else if (title.includes('health') || title.includes('medical') || title.includes('fitness') || content.includes('health')) {
        return { ...post, category_id: 3 }; // Health
      } else if (title.includes('entertainment') || title.includes('movie') || title.includes('music') || content.includes('entertainment')) {
        return { ...post, category_id: 4 }; // Entertainment
      } else if (title.includes('business') || title.includes('finance') || title.includes('economy') || content.includes('business')) {
        return { ...post, category_id: 5 }; // Business
      } else if (title.includes('sport') || title.includes('football') || title.includes('soccer') || content.includes('sports')) {
        return { ...post, category_id: 6 }; // Sports
      } else {
        return { ...post, category_id: 1 }; // Default to Tech
      }
    }
    return post;
  });
};

// Helper to get all posts with properly mapped types and assigned categories
export const getAllPosts = (): Post[] => {
  const categorizedPosts = assignCategoriesToPosts();
  return categorizedPosts.map(post => ({
    ...post,
    id: String(post.id), // Convert numeric ID to string
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'tech',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
};
